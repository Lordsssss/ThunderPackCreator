let dependencies = [];

function addDependency() {
    const dependencyInput = document.getElementById("dependencyInput");
    const dependencyValue = dependencyInput.value.trim();

    if (dependencyValue !== "") {
        dependencies.push(dependencyValue);
        updateDependencyList();
        dependencyInput.value = ""; // Clear the input box
    }
}

function deleteDependency(index) {
    return function () {
        dependencies.splice(index, 1);
        updateDependencyList();
    };
}

function updateDependencyList() {
    const dependencyListContainer = document.getElementById("dependencyList");
    dependencyListContainer.innerHTML = ""; // Clear the existing list

    dependencies.forEach((dep, index) => {
        const dependencyItem = document.createElement("div");
        dependencyItem.classList.add("dependencyItem");

        const deleteButton = document.createElement("span");
        deleteButton.classList.add("deleteDependency");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = deleteDependency(index);

        dependencyItem.innerHTML = `${dep}`;
        dependencyItem.appendChild(deleteButton);

        dependencyListContainer.appendChild(dependencyItem);
    });
}


let selectedImage = null;

document.getElementById("imageInput").addEventListener("change", function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                selectedImage = img;
                document.getElementById("imagePreview").style.display = "block";
                document.getElementById("previewImage").src = img.src;
            };
        };

        reader.readAsDataURL(file);
    } else {
        alert("Please choose a valid image file.");
        fileInput.value = ""; // Clear the file input
    }
});

// Add an event listener to handle changes in the manifestInput field
document.getElementById("manifestInput").addEventListener("change", function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file && file.type === "application/json") {
        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                const manifestData = JSON.parse(e.target.result);

                // Populate the form fields with the data from manifest.json
                document.getElementById("modName").value = manifestData.name || "";
                document.getElementById("versionNumber").value = manifestData.version_number || "";
                document.getElementById("websiteURL").value = manifestData.website_url || "";
                document.getElementById("description").value = manifestData.description || "";

                // Populate dependencies
                dependencies = manifestData.dependencies || [];
                updateDependencyList();

                // Optionally, you can handle other fields as needed

            } catch (error) {
                console.error("Error parsing manifest.json:", error);
            }
        };

        reader.readAsText(file);
    } else {
        alert("Please choose a valid JSON file.");
        fileInput.value = ""; // Clear the file input
    }
});

function createManifest() {
    var modName = document.getElementById("modName").value;
    var versionNumber = document.getElementById("versionNumber").value;
    var websiteURL = document.getElementById("websiteURL").value;
    var description = document.getElementById("description").value;
    var dependencies = Array.from(document.querySelectorAll('.dependencyItem')).map(item => {
        const depText = item.firstChild.textContent.trim();
        return depText;
    });
    var readmeContent = document.getElementById("readmeContent").value;

    // Check if the image is selected
    if (selectedImage) {
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(selectedImage, 0, 0, 256, 256);

        const imageDataURL = canvas.toDataURL("image/png");
        const imageData = imageDataURL.split(",")[1];  // Extract the base64 part

        eel.create_manifest(modName, versionNumber, websiteURL, description, dependencies, imageData, readmeContent)(function (result, zipData) {
            alert(result);
            // Trigger download link
            downloadZip(zipData);
        });
    } else {
        // If no image is selected, call create_manifest without image data
        eel.create_manifest(modName, versionNumber, websiteURL, description, dependencies, null, readmeContent)(function (result, zipData) {
            alert(result);
            // Trigger download link
            downloadZip(zipData);
        });
    }
}

function downloadZip(zipData) {
    if (zipData) {
        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = `data:application/zip;base64,${zipData}`;
        downloadLink.download = "mod_files.zip";
        downloadLink.click();
    }
}

// Your existing import statements and Eel initialization
