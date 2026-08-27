from PIL import Image

from predict import predict_image


image = Image.open(
    "test_images/earlyblight.jpg"
)

result = predict_image(image)

print(result)