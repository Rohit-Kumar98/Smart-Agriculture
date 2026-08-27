import os

import torch
import torch.nn as nn

from torchvision import models, transforms
from PIL import Image


# ============================================================
# Configuration
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "tomato_disease_model.pth"
)


# ============================================================
# Device
# ============================================================

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)


# ============================================================
# Image preprocessing
# Must match validation preprocessing
# ============================================================

transform = transforms.Compose([
    transforms.Resize((224, 224)),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


# ============================================================
# Load model
# ============================================================

def load_model():

    checkpoint = torch.load(
        MODEL_PATH,
        map_location=DEVICE
    )

    classes = checkpoint["classes"]

    model = models.efficientnet_b0(
        weights=None
    )

    num_features = (
        model.classifier[1].in_features
    )

    model.classifier[1] = nn.Linear(
        num_features,
        len(classes)
    )

    model.load_state_dict(
        checkpoint["model_state_dict"]
    )

    model = model.to(DEVICE)

    model.eval()

    return model, classes


# ============================================================
# Load model once
# ============================================================

MODEL, CLASSES = load_model()


# ============================================================
# Predict image
# ============================================================

def predict_image(image):

    """
    Predict tomato disease from a PIL Image.

    Always returns the highest-probability
    prediction, even if confidence is below 55%.

    Returns:
        {
            "disease": str,
            "confidence": float,
            "status": str
        }
    """

    # --------------------------------------------------------
    # Make sure image is RGB
    # --------------------------------------------------------

    image = image.convert("RGB")


    # --------------------------------------------------------
    # Preprocess
    # --------------------------------------------------------

    image_tensor = transform(image)

    image_tensor = image_tensor.unsqueeze(0)

    image_tensor = image_tensor.to(DEVICE)


    # --------------------------------------------------------
    # Prediction
    # --------------------------------------------------------

    with torch.no_grad():

        outputs = MODEL(
            image_tensor
        )

        probabilities = torch.softmax(
            outputs,
            dim=1
        )

        confidence, prediction = torch.max(
            probabilities,
            dim=1
        )


    # --------------------------------------------------------
    # Result
    # --------------------------------------------------------

    disease = CLASSES[
        prediction.item()
    ]

    confidence_percent = (
        confidence.item() * 100
    )


    # --------------------------------------------------------
    # Always return highest prediction
    # --------------------------------------------------------

    return {
        "disease": disease,
        "confidence": round(
            confidence_percent,
            2
        ),
        "status": "prediction"
    }