import base64
import subprocess

path = input("Enter image path: ").strip().strip('"')

with open(path, "rb") as file:
    encoded = base64.b64encode(file.read()).decode("utf-8")

subprocess.run("clip", input=encoded, text=True, shell=True)

print("\nBase64 string copied to clipboard!")
input("Press Enter to exit...")