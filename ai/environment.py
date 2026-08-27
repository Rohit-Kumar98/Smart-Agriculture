def assess_environment(observation):
    """
    Analyze available environmental sensor data.

    Faulty or unavailable sensors are ignored.

    Returns:
        {
            "temperature": {...},
            "humidity": {...},
            "soil_moisture": {...},
            "overall_status": str,
            "risk": str,
            "recommendation": str
        }
    """

    status = observation.sensor_status

    result = {
        "temperature": None,
        "humidity": None,
        "soil_moisture": None,
        "overall_status": "unknown",
        "risk": "unknown",
        "recommendation": "Insufficient environmental data."
    }

    risks = []
    recommendations = []

    # ============================================================
    # TEMPERATURE
    # ============================================================

    if (
        status.get("temperature") == "ok"
        and observation.temperature is not None
    ):

        temperature = observation.temperature

        if temperature < 15:

            result["temperature"] = {
                "value": temperature,
                "status": "low"
            }

            risks.append("Low temperature")
            recommendations.append(
                "Monitor the crop for cold stress."
            )

        elif temperature > 35:

            result["temperature"] = {
                "value": temperature,
                "status": "high"
            }

            risks.append("High temperature")
            recommendations.append(
                "Monitor the crop for heat stress."
            )

        elif 20 <= temperature <= 30:

            result["temperature"] = {
                "value": temperature,
                "status": "optimal"
            }

        else:

            result["temperature"] = {
                "value": temperature,
                "status": "moderate"
            }

    # ============================================================
    # HUMIDITY
    # ============================================================

    if (
        status.get("humidity") == "ok"
        and observation.humidity is not None
    ):

        humidity = observation.humidity

        if humidity >= 80:

            result["humidity"] = {
                "value": humidity,
                "status": "high"
            }

            risks.append("High humidity")
            recommendations.append(
                "Improve airflow and avoid unnecessary overhead irrigation."
            )

        elif humidity < 40:

            result["humidity"] = {
                "value": humidity,
                "status": "low"
            }

            risks.append("Low humidity")
            recommendations.append(
                "Monitor the crop for moisture stress."
            )

        else:

            result["humidity"] = {
                "value": humidity,
                "status": "normal"
            }

    # ============================================================
    # SOIL MOISTURE
    # ============================================================

    if (
        status.get("soil_moisture") == "ok"
        and observation.soil_moisture is not None
    ):

        moisture = observation.soil_moisture

        if moisture < 30:

            result["soil_moisture"] = {
                "value": moisture,
                "status": "low"
            }

            risks.append("Low soil moisture")
            recommendations.append(
                "Consider irrigation based on crop requirements."
            )

        elif moisture > 70:

            result["soil_moisture"] = {
                "value": moisture,
                "status": "high"
            }

            risks.append("High soil moisture")
            recommendations.append(
                "Avoid unnecessary irrigation and monitor for waterlogging."
            )

        else:

            result["soil_moisture"] = {
                "value": moisture,
                "status": "normal"
            }

    # ============================================================
    # OVERALL ASSESSMENT
    # ============================================================

    available_sensors = sum(
        1
        for sensor in [
            "temperature",
            "humidity",
            "soil_moisture"
        ]
        if status.get(sensor) == "ok"
    )

    if available_sensors == 0:

        result["overall_status"] = "insufficient_data"
        result["risk"] = "unknown"

    elif len(risks) == 0:

        result["overall_status"] = "healthy"
        result["risk"] = "low"
        result["recommendation"] = (
            "Environmental conditions are within the monitored ranges."
        )

    elif len(risks) == 1:

        result["overall_status"] = "attention"
        result["risk"] = "moderate"
        result["recommendation"] = " ".join(
            recommendations
        )

    else:

        result["overall_status"] = "warning"
        result["risk"] = "high"
        result["recommendation"] = " ".join(
            recommendations
        )

    return result