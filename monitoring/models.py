from django.db import models


class RoverObservation(models.Model):
    temperature = models.FloatField()
    humidity = models.FloatField()
    soil_moisture = models.FloatField()
    ph = models.FloatField()

    latitude = models.FloatField()
    longitude = models.FloatField()

    image = models.ImageField(
        upload_to="crop_scans/",
        null=True,
        blank=True
    )

    # AI fields — will be populated later
    disease = models.CharField(
        max_length=100,
        blank=True
    )

    confidence = models.FloatField(
        null=True,
        blank=True
    )

    severity = models.CharField(
        max_length=50,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Observation {self.id} - {self.created_at}"