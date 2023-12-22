import eel
import json
import base64
from io import BytesIO
from PIL import Image
import zipfile
import os
import requests

eel.init("./web")

@eel.expose
def create_manifest(mod_name, version_number, website_url, description, dependencies, image_data, readme_content):
    # Save resized image directly to the zip file
    image_path = None
    
    if image_data:
        image = Image.open(BytesIO(base64.b64decode(image_data)))
        base_width = 256
        w_percent = (base_width / float(image.size[0]))
        h_size = int((float(image.size[1]) * float(w_percent)))
        image = image.resize((base_width, h_size), Image.LANCZOS)

        # Ensure the 'images' directory exists
        images_dir = os.path.join(os.getcwd(), 'images')
        os.makedirs(images_dir, exist_ok=True)

        # Save image with a specific path
        image_path = os.path.join(images_dir, "icon.png")
        image.save(image_path, format='PNG')
        print(image_path,"test")
    # Save manifest
    manifest = {
        "name": mod_name,
        "version_number": version_number,
        "website_url": website_url,
        "description": description,
        "dependencies": dependencies
    }

    zip_file_path = os.path.join(os.path.expanduser("~"), "Downloads", "mod_files.zip")
    image_path = "images/icon.png"

    with zipfile.ZipFile(zip_file_path, "w") as zip_file:
        zip_file.writestr("manifest.json", json.dumps(manifest, indent=2))
        zip_file.write(image_path, arcname="icon.png")  # Specify the name inside the ZIP file
        zip_file.writestr("README.md", readme_content)

    # Read the zip file as bytes and encode it in base64
    with open(zip_file_path, "rb") as zip_file:
        zip_data = base64.b64encode(zip_file.read()).decode()

    return "Manifest, icon, and readme saved successfully in your download folder !"

eel.start("./index.html", mode='default')
