from django.core.management.base import BaseCommand
from monitoring.models import RoverObservation


class Command(BaseCommand):
    help = "Seed initial telemetry observations for testing the plant monitoring system"

    def handle(self, *args, **kwargs):
        if RoverObservation.objects.count() > 0:
            self.stdout.write(self.style.SUCCESS("Database already contains rover observations."))
            return

        sample_data = [
            {
                "temperature": 26.5,
                "humidity": 62.0,
                "soil_moisture": 48.0,
                "ph": 6.4,
                "latitude": 28.6139,
                "longitude": 77.2090,
                "disease": "Healthy Crop",
                "confidence": 96.5,
                "severity": "None",
            },
            {
                "temperature": 29.1,
                "humidity": 55.0,
                "soil_moisture": 32.5,
                "ph": 6.2,
                "latitude": 28.6145,
                "longitude": 77.2098,
                "disease": "Early Leaf Blight",
                "confidence": 88.2,
                "severity": "Low",
            },
            {
                "temperature": 31.0,
                "humidity": 45.0,
                "soil_moisture": 18.0,
                "ph": 5.8,
                "latitude": 28.6152,
                "longitude": 77.2105,
                "disease": "Powdery Mildew",
                "confidence": 91.0,
                "severity": "Moderate",
            },
        ]

        for data in sample_data:
            RoverObservation.objects.create(**data)

        self.stdout.write(self.style.SUCCESS(f"Successfully seeded {len(sample_data)} rover observations!"))
