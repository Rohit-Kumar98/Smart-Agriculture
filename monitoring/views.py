from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import RoverObservation
from .serializers import RoverObservationSerializer


class RoverDataView(APIView):

    parser_classes = [
        JSONParser
    ]

    def post(self, request):

        serializer = RoverObservationSerializer(
            data=request.data,
            context={
                "request": request
            }
        )

        if serializer.is_valid():

            observation = serializer.save()

            return Response(
                RoverObservationSerializer(
                    observation,
                    context={
                        "request": request
                    }
                ).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request):

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
            serializer.data,
            status=status.HTTP_200_OK
        )