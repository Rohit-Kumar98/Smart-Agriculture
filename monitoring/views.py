# ============================================================
# Rover Data API Views
# ============================================================

import base64
import binascii
import uuid

from PIL import Image

from django.core.files.base import ContentFile

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import RoverObservation
from .serializers import RoverObservationSerializer

from ai.predict import predict_image
from ai.severity import calculate_severity
from ai.advisory import get_advisory


# ============================================================
# Helper: Decode Base64 Image
# ============================================================

def decode_base64_image(image_data):
    """
    Convert a base64 encoded image into a Django ContentFile.

    Supports both:

        data:image/jpeg;base64,...

    and:

        /9j/4AAQSkZJRgABAQ...
    """

    if not image_data:
        return None

    try:

        # Remove data URL prefix if present
        if "," in image_data:
            image_data = image_data.split(",", 1)[1]

        image_data = image_data.strip()

        # Decode base64
        image_bytes = base64.b64decode(
            image_data,
            validate=True
        )

        # Generate unique filename
        filename = (
            f"leaf_scan_{uuid.uuid4().hex[:8]}.jpg"
        )

        return ContentFile(
            image_bytes,
            name=filename
        )

    except (
        ValueError,
        TypeError,
        binascii.Error
    ):

        return None


# ============================================================
# Rover Data API
# ============================================================

class RoverDataView(APIView):

    # ========================================================
    # POST
    # ========================================================

    def post(self, request):

        # ----------------------------------------------------
        # Get sensor/environmental data
        # ----------------------------------------------------

        temperature = request.data.get(
            "temperature"
        )

        humidity = request.data.get(
            "humidity"
        )

        soil_moisture = request.data.get(
            "soil_moisture"
        )

        latitude = request.data.get(
            "latitude"
        )

        longitude = request.data.get(
            "longitude"
        )

        image_data = request.data.get(
            "image"
        )

        # ----------------------------------------------------
        # Create observation
        # ----------------------------------------------------

        observation = RoverObservation(
            temperature=temperature,
            humidity=humidity,
            soil_moisture=soil_moisture,
            latitude=latitude,
            longitude=longitude
        )

        # ====================================================
        # Sensor Status
        # ====================================================

        sensor_status = {

            "temperature": (
                "ok"
                if temperature is not None
                else "fault"
            ),

            "humidity": (
                "ok"
                if humidity is not None
                else "fault"
            ),

            "soil_moisture": (
                "ok"
                if soil_moisture is not None
                else "unavailable"
            ),

            "gps": (
                "ok"
                if (
                    latitude is not None
                    and longitude is not None
                )
                else "fault"
            ),

            "camera": (
                "ok"
                if image_data
                else "unavailable"
            )
        }

        observation.sensor_status = sensor_status

        # ====================================================
        # Default AI values
        # ====================================================

        disease = ""
        confidence = None
        severity = ""
        advisory = None

        processing_status = {
            "environmental_assessment": "completed",
            "ai_prediction": "skipped"
        }

        # ====================================================
        # IMAGE PROVIDED
        # ====================================================

        if image_data:

            # ------------------------------------------------
            # Decode image
            # ------------------------------------------------

            image_file = decode_base64_image(
                image_data
            )

            # ------------------------------------------------
            # Invalid image
            # ------------------------------------------------

            if image_file is None:

                return Response(
                    {
                        "success": False,
                        "error": "Invalid base64 image."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # ------------------------------------------------
            # Save image to ImageField
            # ------------------------------------------------

            observation.image.save(
                image_file.name,
                image_file,
                save=False
            )

            # =================================================
            # AI Prediction
            # =================================================

            try:

                # ---------------------------------------------
                # IMPORTANT:
                # predict_image() expects a PIL Image.
                #
                # observation.image is a Django
                # ImageFieldFile, so open the actual file
                # using PIL first.
                # ---------------------------------------------

                with Image.open(
                    observation.image.path
                ) as image:

                    prediction = predict_image(
                        image
                    )

                # ---------------------------------------------
                # Get prediction result
                # ---------------------------------------------

                disease = prediction.get(
                    "disease",
                    ""
                )

                confidence = prediction.get(
                    "confidence"
                )

                # ---------------------------------------------
                # Calculate severity
                # ---------------------------------------------

                severity = calculate_severity(
                    confidence
                )

                # ---------------------------------------------
                # Generate disease advisory
                # ---------------------------------------------

                advisory = get_advisory(
                    disease
                )

                processing_status[
                    "ai_prediction"
                ] = "completed"

            except Exception as e:

                # ------------------------------------------------
                # Keep sensor data successful even if AI fails
                # ------------------------------------------------

                print(
                    "AI prediction failed:",
                    e
                )

                processing_status[
                    "ai_prediction"
                ] = "failed"

                disease = ""
                confidence = None
                severity = ""
                advisory = None

        # ====================================================
        # Save AI results
        # ====================================================

        observation.disease = disease

        observation.confidence = confidence

        observation.severity = severity

        # ----------------------------------------------------
        # Save observation
        # ----------------------------------------------------

        observation.save()

        # ====================================================
        # Serialize observation
        # ====================================================

        serializer = RoverObservationSerializer(
            observation
        )

        response_data = serializer.data

        # ====================================================
        # Add Advisory
        # ====================================================

        response_data[
            "advisory"
        ] = advisory

        # ====================================================
        # Add Processing Status
        # ====================================================

        response_data[
            "processing_status"
        ] = processing_status

        # ====================================================
        # Return Response
        # ====================================================

        return Response(
            {
                "success": True,
                "data": response_data
            },
            status=status.HTTP_201_CREATED
        )


# ============================================================
# Rover Data List API
# ============================================================

class RoverDataListView(APIView):

    def get(self, request):

        observations = (
            RoverObservation.objects
            .all()
            .order_by("-created_at")
        )

        serializer = RoverObservationSerializer(
            observations,
            many=True
        )

        return Response(
            {
                "success": True,
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )