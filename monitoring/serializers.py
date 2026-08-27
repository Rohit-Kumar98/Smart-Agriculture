import base64
from io import BytesIO

from django.core.files.base import ContentFile
from PIL import Image
from rest_framework import serializers

from .models import RoverObservation


class RoverObservationSerializer(serializers.ModelSerializer):

    image = serializers.CharField(
        required=False,
        allow_blank=True,
        allow_null=True,
        write_only=True
    )

    image_url = serializers.SerializerMethodField(
        read_only=True
    )

    class Meta:

        model = RoverObservation

        fields = [
            "id",
            "temperature",
            "humidity",
            "soil_moisture",
            "latitude",
            "longitude",
            "sensor_status",
            "image",
            "image_url",
            "disease",
            "confidence",
            "severity",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "sensor_status",
            "image_url",
            "disease",
            "confidence",
            "severity",
            "created_at",
        ]

    # ============================================================
    # Sensor validation + status detection
    # ============================================================

    def validate(self, attrs):

        sensor_status = {}

        # --------------------------------------------------------
        # Temperature
        # No arbitrary range is applied.
        # --------------------------------------------------------

        if "temperature" not in attrs:
            sensor_status["temperature"] = "unavailable"

        elif attrs["temperature"] is None:
            sensor_status["temperature"] = "unavailable"

        else:
            sensor_status["temperature"] = "ok"

        # --------------------------------------------------------
        # Humidity
        # Valid range: 0–100
        # --------------------------------------------------------

        if "humidity" not in attrs:
            sensor_status["humidity"] = "unavailable"

        elif attrs["humidity"] is None:
            sensor_status["humidity"] = "unavailable"

        elif not 0 <= attrs["humidity"] <= 100:
            attrs["humidity"] = None
            sensor_status["humidity"] = "fault"

        else:
            sensor_status["humidity"] = "ok"

        # --------------------------------------------------------
        # Soil moisture
        # Valid range: 0–100
        # --------------------------------------------------------

        if "soil_moisture" not in attrs:
            sensor_status["soil_moisture"] = "unavailable"

        elif attrs["soil_moisture"] is None:
            sensor_status["soil_moisture"] = "unavailable"

        elif not 0 <= attrs["soil_moisture"] <= 100:
            attrs["soil_moisture"] = None
            sensor_status["soil_moisture"] = "fault"

        else:
            sensor_status["soil_moisture"] = "ok"

        # --------------------------------------------------------
        # GPS
        # Latitude: -90 to 90
        # Longitude: -180 to 180
        # --------------------------------------------------------

        latitude = attrs.get("latitude")
        longitude = attrs.get("longitude")

        latitude_invalid = (
            latitude is not None
            and not -90 <= latitude <= 90
        )

        longitude_invalid = (
            longitude is not None
            and not -180 <= longitude <= 180
        )

        if latitude_invalid:
            attrs["latitude"] = None

        if longitude_invalid:
            attrs["longitude"] = None

        if latitude_invalid or longitude_invalid:
            sensor_status["gps"] = "fault"

        elif latitude is None or longitude is None:
            sensor_status["gps"] = "unavailable"

        else:
            sensor_status["gps"] = "ok"

        # --------------------------------------------------------
        # Camera
        # --------------------------------------------------------

        image = attrs.get("image")

        if image:
            sensor_status["camera"] = "ok"
        else:
            sensor_status["camera"] = "unavailable"

        # --------------------------------------------------------
        # Save generated sensor status
        # --------------------------------------------------------

        attrs["sensor_status"] = sensor_status

        return attrs

    # ============================================================
    # Create observation
    # ============================================================

    def create(self, validated_data):

        image_data = validated_data.pop(
            "image",
            None
        )

        observation = RoverObservation(
            **validated_data
        )

        # --------------------------------------------------------
        # Process Base64 image
        # --------------------------------------------------------

        if image_data:

            try:

                # Support:
                # Raw Base64
                # data:image/jpeg;base64,...

                if "," in image_data:

                    image_data = image_data.split(
                        ",",
                        1
                    )[1]

                decoded = base64.b64decode(
                    image_data,
                    validate=True
                )

            except Exception:

                raise serializers.ValidationError(
                    {
                        "image":
                        "Invalid Base64 image."
                    }
                )

            # ----------------------------------------------------
            # Validate image
            # ----------------------------------------------------

            try:

                image = Image.open(
                    BytesIO(decoded)
                )

                image.verify()

                # Re-open after verify()
                image = Image.open(
                    BytesIO(decoded)
                )

            except Exception:

                raise serializers.ValidationError(
                    {
                        "image":
                        "Invalid image file."
                    }
                )

            # ----------------------------------------------------
            # Validate image format
            # ----------------------------------------------------

            image_format = image.format.lower()

            extensions = {
                "jpeg": "jpg",
                "png": "png",
                "webp": "webp",
            }

            if image_format not in extensions:

                raise serializers.ValidationError(
                    {
                        "image":
                        "Only JPEG, PNG and WebP images are supported."
                    }
                )

            # ----------------------------------------------------
            # Save image
            # ----------------------------------------------------

            filename = (
                f"leaf_scan.{extensions[image_format]}"
            )

            observation.image.save(
                filename,
                ContentFile(decoded),
                save=False
            )

        # --------------------------------------------------------
        # Save observation
        # --------------------------------------------------------

        observation.save()

        return observation

    # ============================================================
    # Image URL
    # ============================================================

    def get_image_url(self, obj):

        if not obj.image:
            return None

        request = self.context.get(
            "request"
        )

        if request:

            return request.build_absolute_uri(
                obj.image.url
            )

        return obj.image.url