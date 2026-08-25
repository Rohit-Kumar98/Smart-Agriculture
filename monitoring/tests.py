from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import RoverObservation


class RoverDataApiTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.observation_data = {
            "temperature": 25.0,
            "humidity": 60.0,
            "soil_moisture": 40.0,
            "ph": 6.5,
            "latitude": 28.6139,
            "longitude": 77.2090,
            "disease": "Healthy",
            "confidence": 98.0,
            "severity": "None",
        }

    def test_create_rover_observation(self):
        response = self.client.post("/api/rover-data/", self.observation_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(RoverObservation.objects.count(), 1)
        self.assertEqual(RoverObservation.objects.first().disease, "Healthy")

    def test_get_rover_observations(self):
        RoverObservation.objects.create(**self.observation_data)
        response = self.client.get("/api/rover-data/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["temperature"], 25.0)
