from django.db import models


class RoverObservation(models.Model):

    # ============================================================
    # Rover sensor data
    # ============================================================

    temperature = models.FloatField(
        null=True,
        blank=True
    )

    humidity = models.FloatField(
        null=True,
        blank=True
    )

    soil_moisture = models.FloatField(
        null=True,
        blank=True
    )

    # ============================================================
    # GPS data
    # ============================================================

    latitude = models.FloatField(
        null=True,
        blank=True
    )

    longitude = models.FloatField(
        null=True,
        blank=True
    )

    # ============================================================
    # Sensor health/status
    #
    # Example:
    # {
    #     "temperature": "ok",
    #     "humidity": "fault",
    #     "soil_moisture": "unavailable",
    #     "gps": "ok",
    #     "camera": "ok"
    # }
    # ============================================================

    sensor_status = models.JSONField(
        default=dict,
        blank=True
    )

    environmental_assessment = models.JSONField(
        default=dict,
        blank=True
    )

    # ============================================================
    # Image
    # ============================================================

    image = models.ImageField(
        upload_to="crop_scans/",
        null=True,
        blank=True
    )

    # ============================================================
    # AI results
    # ============================================================

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

    # ============================================================
    # Timestamp
    # ============================================================

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    # ============================================================
    # String representation
    # ============================================================

    def __str__(self):
        return (
            f"Observation {self.id} - "
            f"{self.created_at}"
        )