from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from PIL import Image

from .models import RoverObservation
from .serializers import RoverObservationSerializer

from ai.predict import predict_image
from ai.environment import assess_environment


class RoverDataView(APIView):

    parser_classes = [
        JSONParser
    ]

    # ============================================================
    # POST - Receive rover observation
    # ============================================================

    def post(self, request):

        # --------------------------------------------------------
        # Validate incoming data
        # --------------------------------------------------------

        serializer = RoverObservationSerializer(
            data=request.data,
            context={
                "request": request
            }
        )

        if not serializer.is_valid():

            return Response(
                {
                    "success": False,
                    "error": "Invalid rover data.",
                    "details": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # --------------------------------------------------------
        # Save observation
        # --------------------------------------------------------

        try:

            observation = serializer.save()

        except Exception as error:

            print(
                f"Observation save failed: {error}"
            )

            return Response(
                {
                    "success": False,
                    "error": "Failed to save rover observation."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # ========================================================
        # ENVIRONMENTAL ASSESSMENT
        # ========================================================

        environmental_error = None

        try:

            environmental_assessment = assess_environment(
                observation
            )

            observation.environmental_assessment = (
                environmental_assessment
            )

            observation.save(
                update_fields=[
                    "environmental_assessment"
                ]
            )

        except Exception as error:

            print(
                f"Environmental assessment failed: {error}"
            )

            environmental_error = (
                "Environmental assessment failed."
            )

        # ========================================================
        # AI DISEASE PREDICTION
        # ========================================================

        ai_error = None

        if observation.image:

            try:

                # ------------------------------------------------
                # Open uploaded image
                # ------------------------------------------------

                observation.image.open("rb")

                # ------------------------------------------------
                # Convert Django ImageFieldFile
                # into PIL Image
                # ------------------------------------------------

                image = Image.open(
                    observation.image
                )

                # ------------------------------------------------
                # Run AI prediction
                # ------------------------------------------------

                prediction = predict_image(
                    image
                )

                # ------------------------------------------------
                # Disease
                # ------------------------------------------------

                observation.disease = (
                    prediction["disease"]
                    or ""
                )

                # ------------------------------------------------
                # Confidence
                # ------------------------------------------------

                observation.confidence = (
                    prediction["confidence"]
                )

                # ------------------------------------------------
                # Severity
                # ------------------------------------------------
                # Currently based on confidence.
                # ------------------------------------------------

                confidence = prediction["confidence"]

                if confidence >= 80:

                    observation.severity = "High"

                elif confidence >= 55:

                    observation.severity = "Moderate"

                else:

                    observation.severity = "Low"

                # ------------------------------------------------
                # Save AI results
                # ------------------------------------------------

                observation.save(
                    update_fields=[
                        "disease",
                        "confidence",
                        "severity"
                    ]
                )

            except Exception as error:

                print(
                    f"AI prediction failed: {error}"
                )

                ai_error = (
                    "AI disease prediction failed."
                )

            finally:

                # ------------------------------------------------
                # Always close image
                # ------------------------------------------------

                try:
                    observation.image.close()
                except Exception:
                    pass

        # ========================================================
        # PREPARE RESPONSE
        # ========================================================

        response_data = RoverObservationSerializer(
            observation,
            context={
                "request": request
            }
        ).data

        # --------------------------------------------------------
        # Add processing status
        # --------------------------------------------------------

        response_data["processing_status"] = {
            "environmental_assessment": (
                "failed"
                if environmental_error
                else "completed"
            ),
            "ai_prediction": (
                "failed"
                if ai_error
                else (
                    "completed"
                    if observation.image
                    else "skipped"
                )
            )
        }

        # --------------------------------------------------------
        # Add errors only when something failed
        # --------------------------------------------------------

        processing_errors = {}

        if environmental_error:

            processing_errors[
                "environmental_assessment"
            ] = environmental_error

        if ai_error:

            processing_errors[
                "ai_prediction"
            ] = ai_error

        if processing_errors:

            response_data["processing_errors"] = (
                processing_errors
            )

        # ========================================================
        # RETURN RESPONSE
        # ========================================================

        return Response(
            {
                "success": True,
                "data": response_data
            },
            status=status.HTTP_201_CREATED
        )

    # ============================================================
    # GET - Return all observations
    # ============================================================

    def get(self, request):

        try:

            observations = (
                RoverObservation.objects
                .all()
                .order_by("-created_at")
            )

            serializer = RoverObservationSerializer(
                observations,
                many=True,
                context={
                    "request": request
                }
            )

            return Response(
                {
                    "success": True,
                    "count": observations.count(),
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )

        except Exception as error:

            print(
                f"Failed to retrieve observations: {error}"
            )

            return Response(
                {
                    "success": False,
                    "error": "Failed to retrieve rover observations."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )