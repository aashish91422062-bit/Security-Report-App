function showMessage() {
    alert("Welcome to AI Photo & Video Studio!");
}

function previewImage(event) {
    const image = document.getElementById("preview");
    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.display = "block";
}
function previewVideo(event) {
    const video = document.getElementById("videoPreview");
    video.src = URL.createObjectURL(event.target.files[0]);
    video.style.display = "block";
}

function downloadMessage() {
    alert("Download feature coming soon!");
}

function removeImage() {
    document.getElementById("preview").src = "";
    document.getElementById("preview").style.display = "none";
}

function removeVideo() {
    document.getElementById("videoPreview").src = "";
    document.getElementById("videoPreview").style.display = "none";
}
