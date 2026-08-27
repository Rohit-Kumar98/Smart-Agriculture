# ============================================================
# Disease Advisory System
# ============================================================

DISEASE_ADVISORIES = {

    "Bacterial_spot": {
        "cause": "Bacterial infection favored by warm, wet conditions.",
        "recommendation": "Remove severely affected leaves and avoid overhead watering.",
        "prevention": "Use clean planting material, maintain good airflow, and avoid working with wet plants."
    },

    "Early_blight": {
        "cause": "Fungal disease that commonly develops under warm and humid conditions.",
        "recommendation": "Remove affected leaves and improve airflow around the plants.",
        "prevention": "Avoid overhead irrigation, remove plant debris, and maintain proper spacing."
    },

    "Late_blight": {
        "cause": "Fungal-like disease favored by cool, wet and humid conditions.",
        "recommendation": "Remove affected plant material promptly and improve air circulation.",
        "prevention": "Keep foliage dry, provide adequate spacing, and remove infected debris."
    },

    "Leaf_Mold": {
        "cause": "Fungal disease associated with high humidity and poor air circulation.",
        "recommendation": "Remove affected leaves and reduce humidity around the crop.",
        "prevention": "Improve ventilation, maintain plant spacing, and avoid prolonged leaf wetness."
    },

    "Septoria_leaf_spot": {
        "cause": "Fungal disease that develops readily in warm, humid and wet conditions.",
        "recommendation": "Remove infected leaves and improve airflow around the plants.",
        "prevention": "Avoid overhead watering, remove infected debris, and maintain good plant spacing."
    },

    "Spider_mites Two-spotted_spider_mite": {
        "cause": "Spider mites are tiny pests that commonly increase under hot and dry conditions.",
        "recommendation": "Inspect the underside of leaves and remove heavily affected plant material.",
        "prevention": "Monitor plants regularly and maintain adequate moisture while avoiding plant stress."
    },

    "Target_Spot": {
        "cause": "Fungal disease favored by warm, humid conditions.",
        "recommendation": "Remove affected leaves and improve air circulation.",
        "prevention": "Avoid prolonged leaf wetness, maintain spacing, and remove infected plant debris."
    },

    "Tomato_mosaic_virus": {
        "cause": "Viral disease that can spread through infected plant material and contaminated tools.",
        "recommendation": "Remove severely infected plants and disinfect tools used around the crop.",
        "prevention": "Use clean planting material and maintain good sanitation practices."
    },

    "Tomato_Yellow_Leaf_Curl_Virus": {
        "cause": "Viral disease commonly transmitted by whiteflies.",
        "recommendation": "Remove severely affected plants and monitor the crop for whitefly activity.",
        "prevention": "Monitor and manage whitefly populations and use healthy planting material."
    },

    "Powdery_Mildew": {
        "cause": "Fungal disease that can develop under favorable humidity conditions.",
        "recommendation": "Remove heavily affected leaves and improve airflow around the plants.",
        "prevention": "Maintain adequate plant spacing and avoid conditions that promote prolonged humidity."
    },

    "Healthy": {
        "cause": "No visible disease detected by the classification model.",
        "recommendation": "Continue regular monitoring and maintain current crop-care practices.",
        "prevention": "Maintain good irrigation, nutrition, sanitation and plant spacing."
    }
}


# ============================================================
# Get advisory
# ============================================================

def get_advisory(disease):

    if not disease:
        return {
            "cause": "",
            "recommendation": "",
            "prevention": ""
        }

    advisory = DISEASE_ADVISORIES.get(
        disease
    )

    if advisory:
        return advisory

    # Fallback for an unknown class
    return {
        "cause": "No advisory information is available for this disease.",
        "recommendation": "Inspect the plant manually and continue monitoring.",
        "prevention": "Maintain good crop hygiene and regular monitoring."
    }