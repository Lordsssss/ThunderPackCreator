# Mod Manifest Builder

This project is a Mod Manifest Builder designed to simplify the process of creating mod manifests for game mods. It provides a user-friendly interface for entering mod details and dependencies, generating a manifest.json file, and packaging it into a downloadable zip file.

## Getting Started

1. Clone or download this repository to your local machine.

2. Run the main.py file, or use pyinstaller to build an executable (.exe) file. 

3. Fill in the required details for your mod, including Mod Name, Version Number, Website URL, Description, and Dependencies.

4. Optionally, upload an existing `manifest.json` file, choose an image, and enter readme content.

5. Click the "Add Dependency" button to include additional dependencies.

6. Click the "Create Manifest" button to generate the mod manifest.

7. Once the manifest is created, you'll find a zip file in your download folder.

## File Structure

- **index.html**: The main HTML file containing the structure and layout of the Mod Manifest Builder interface.

- **script.js**: The JavaScript file with functions for handling user input, creating the mod manifest, and managing dependencies.

- **style.css**: The stylesheet defining the visual appearance of the Mod Manifest Builder.

- **main.py**: External python file for Eel, a Python library for creating simple Electron-like desktop apps with HTML, CSS, and JavaScript.

## Dependencies

- [Eel](https://github.com/samuelhwilliams/Eel): A Python library for creating Electron-like desktop apps with HTML, CSS, and JavaScript.

## Usage

1. Run the Python script `main.py` to start the Eel app and open the Mod Manifest Builder in a web browser.

2. Follow the on-screen instructions to enter mod details and dependencies.

3. Click the "Create Manifest" button to generate the mod manifest and download the zip file.

4. Upload your mod pack on [Thunderstore](https://h3vr.thunderstore.io/package/create/).

## Contributing

If you'd like to contribute to the development of this Mod Manifest Builder, feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.