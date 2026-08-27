import os
import copy
import torch
import torch.nn as nn
import torch.optim as optim

from torchvision import datasets, models, transforms
from torch.utils.data import DataLoader


# ============================================================
# Configuration
# ============================================================

DATA_DIR = "ai/dataset"
MODEL_DIR = "ai/models"

BATCH_SIZE = 32
NUM_EPOCHS = 10
LEARNING_RATE = 0.0001

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print(f"Using device: {DEVICE}")

if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")


# ============================================================
# Image transformations
# ============================================================

train_transforms = transforms.Compose([
    transforms.Resize((224, 224)),

    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.ColorJitter(
        brightness=0.2,
        contrast=0.2,
        saturation=0.2
    ),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


valid_transforms = transforms.Compose([
    transforms.Resize((224, 224)),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


# ============================================================
# Dataset
# ============================================================

train_dataset = datasets.ImageFolder(
    os.path.join(DATA_DIR, "train"),
    transform=train_transforms
)

valid_dataset = datasets.ImageFolder(
    os.path.join(DATA_DIR, "valid"),
    transform=valid_transforms
)

print(f"\nClasses ({len(train_dataset.classes)}):")
for i, class_name in enumerate(train_dataset.classes):
    print(f"{i}: {class_name}")

print(f"\nTraining images: {len(train_dataset)}")
print(f"Validation images: {len(valid_dataset)}")


# ============================================================
# Data loaders
# ============================================================

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=0,
    pin_memory=True
)

valid_loader = DataLoader(
    valid_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=0,
    pin_memory=True
)


# ============================================================
# Model
# ============================================================

print("\nLoading EfficientNet-B0...")

weights = models.EfficientNet_B0_Weights.DEFAULT

model = models.efficientnet_b0(weights=weights)

# Replace the final classifier
num_features = model.classifier[1].in_features

model.classifier[1] = nn.Linear(
    num_features,
    len(train_dataset.classes)
)

model = model.to(DEVICE)


# ============================================================
# Loss & optimizer
# ============================================================

criterion = nn.CrossEntropyLoss()

optimizer = optim.AdamW(
    model.parameters(),
    lr=LEARNING_RATE
)


# ============================================================
# Training
# ============================================================

best_accuracy = 0.0
best_model_weights = copy.deepcopy(model.state_dict())


for epoch in range(NUM_EPOCHS):

    print("\n" + "=" * 60)
    print(f"Epoch {epoch + 1}/{NUM_EPOCHS}")
    print("=" * 60)

    # --------------------------------------------------------
    # Training
    # --------------------------------------------------------

    model.train()

    running_loss = 0.0
    correct = 0
    total = 0

    for batch_idx, (images, labels) in enumerate(train_loader):

        images = images.to(
            DEVICE,
            non_blocking=True
        )

        labels = labels.to(
            DEVICE,
            non_blocking=True
        )

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs, labels)

        loss.backward()

        optimizer.step()

        running_loss += loss.item() * images.size(0)

        _, predictions = torch.max(outputs, 1)

        total += labels.size(0)

        correct += (
            predictions == labels
        ).sum().item()

        if (batch_idx + 1) % 50 == 0:
            print(
                f"Batch {batch_idx + 1}/{len(train_loader)}"
            )

    train_loss = running_loss / len(train_dataset)

    train_accuracy = (
        correct / total
    ) * 100


    # --------------------------------------------------------
    # Validation
    # --------------------------------------------------------

    model.eval()

    valid_loss = 0.0
    correct = 0
    total = 0

    with torch.no_grad():

        for images, labels in valid_loader:

            images = images.to(
                DEVICE,
                non_blocking=True
            )

            labels = labels.to(
                DEVICE,
                non_blocking=True
            )

            outputs = model(images)

            loss = criterion(outputs, labels)

            valid_loss += (
                loss.item() * images.size(0)
            )

            _, predictions = torch.max(
                outputs,
                1
            )

            total += labels.size(0)

            correct += (
                predictions == labels
            ).sum().item()

    valid_loss = (
        valid_loss / len(valid_dataset)
    )

    valid_accuracy = (
        correct / total
    ) * 100


    # --------------------------------------------------------
    # Results
    # --------------------------------------------------------

    print(
        f"\nTrain Loss: {train_loss:.4f}"
    )

    print(
        f"Train Accuracy: {train_accuracy:.2f}%"
    )

    print(
        f"Validation Loss: {valid_loss:.4f}"
    )

    print(
        f"Validation Accuracy: {valid_accuracy:.2f}%"
    )


    # --------------------------------------------------------
    # Save best model
    # --------------------------------------------------------

    if valid_accuracy > best_accuracy:

        best_accuracy = valid_accuracy

        best_model_weights = copy.deepcopy(
            model.state_dict()
        )

        os.makedirs(
            MODEL_DIR,
            exist_ok=True
        )

        torch.save(
            {
                "model_state_dict": model.state_dict(),
                "classes": train_dataset.classes,
                "validation_accuracy": valid_accuracy
            },
            os.path.join(
                MODEL_DIR,
                "tomato_disease_model.pth"
            )
        )

        print(
            f"\n✓ New best model saved!"
        )

        print(
            f"✓ Validation accuracy: "
            f"{valid_accuracy:.2f}%"
        )


# ============================================================
# Finish
# ============================================================

model.load_state_dict(best_model_weights)

print("\n" + "=" * 60)
print("TRAINING COMPLETE")
print("=" * 60)

print(
    f"Best validation accuracy: "
    f"{best_accuracy:.2f}%"
)

print(
    "Model saved to:"
)

print(
    os.path.join(
        MODEL_DIR,
        "tomato_disease_model.pth"
    )
)