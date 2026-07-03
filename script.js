function showMessage() {
    alert("Welcome to AI Photo & Video Studio!");
}

function previewImage(event) {
    const image = document.getElementById("preview");
    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.display = "block";
}
