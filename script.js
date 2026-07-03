<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Photo Editor</title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js"></script>
<link rel="stylesheet" href="style.css">
</head>

<body>

<header>
<h1>🎨 AI Photo Editor</h1>
<p>Professional Image Editor</p>
</header>

<div class="card">

<input type="file" accept="image/*" onchange="loadImage(event)">

<br><br>

<canvas id="canvas" width="900" height="600"
style="border:2px solid #00c6ff;border-radius:12px;background:white;"></canvas>

<br><br>

<div class="tools">

<button onclick="rotateLeft()">⤺ Rotate Left</button>
<button onclick="rotateRight()">⤻ Rotate Right</button>
<button onclick="zoomIn()">➕ Zoom In</button>
<button onclick="zoomOut()">➖ Zoom Out</button>
<button onclick="resetImage()">🔄 Reset</button>
function downloadImage() {
    canvas.discardActiveObject();
    canvas.renderAll();

    const dataURL = canvas.toDataURL({
        format: "png",
        multiplier: 3   // ultra HD quality
    });

    try {
        const a = document.createElement("a");
        a.href = dataURL;
        a.download = "AI-Photo-Studio.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (e) {
        // fallback for mobile browsers
        const newWindow = window.open();
        newWindow.document.write('<img src="' + dataURL + '" />');
    }
}
    canvas.discardActiveObject();
    canvas.renderAll();

    // Safe export
    const dataURL = canvas.toDataURL({
        format: "png",
        multiplier: 2
    });

    // Method 1: normal download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "AI-Photo.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Method 2: fallback (mobile fix)
    setTimeout(() => {
        if (!link.download) {
            window.open(dataURL);
        }
    }, 300);
}

</div>

<br>

<label>Brightness</label>
<input type="range" id="brightness" min="50" max="150" value="100" oninput="updateFilters()">

<label>Contrast</label>
<input type="range" id="contrast" min="50" max="150" value="100" oninput="updateFilters()">

<label>Saturation</label>
<input type="range" id="saturation" min="0" max="200" value="100" oninput="updateFilters()">

</div>

<footer>
<p>© 2026 AI Photo Editor</p>
<p><b>Editing by Ashish Kumar, Security Guard</b></p>
</footer>

<script src="editor.js"></script>

</body>
</html>
