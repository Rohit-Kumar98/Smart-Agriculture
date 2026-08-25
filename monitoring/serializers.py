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
            "ph",
            "latitude",
            "longitude",
            "image",
            "image_url",
            "disease",
            "confidence",
            "severity",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "image_url",
            "disease",
            "confidence",
            "severity",
            "created_at",
        ]

    def create(self, validated_data):

        image_data = validated_data.pop(
            "image",
            None
        )

        observation = RoverObservation(
            **validated_data
        )

        if image_data:

            try:
                # Support both:
                # "base64-data"
                # and
                # "data:image/jpeg;base64,..."

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

            try:
                image = Image.open(
                    BytesIO(decoded)
                )

                image.verify()

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

            filename = (
                f"leaf_scan.{extensions[image_format]}"
            )

            observation.image.save(
                filename,
                ContentFile(decoded),
                save=False
            )

        observation.save()

        return observation

    def get_image_url(self, obj):

        if not obj.image:
            return None

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(
                obj.image.url
            )

        return obj.image.url