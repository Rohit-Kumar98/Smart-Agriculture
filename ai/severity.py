def calculate_severity(confidence):

    if confidence is None:
        return ""

    if confidence < 35:
        return "Low"

    elif confidence < 60:
        return "Moderate"

    else:
        return "High"