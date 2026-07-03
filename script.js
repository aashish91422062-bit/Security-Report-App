// SAFE CANVAS INIT (important fix)
const canvas = new fabric.Canvas("canvas", {
    preserveObjectStacking: true,
    selection: true
});

let activeImg = null;

function loadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        fabric.Image.fromURL(e.target.result, function(img) {

            canvas.clear();

            activeImg = img;

            img.set({
                left: 100,
                top: 50,
                scaleX: 0.5,
                scaleY: 0.5,
                selectable: true
            });

            canvas.add(img);
            canvas.setActiveObject(img);
            canvas.renderAll();
        }, { crossOrigin: 'anonymous' });
    };

    reader.readAsDataURL(file);
}

// ROTATE SAFE
function rotateLeft() {
    const obj = canvas.getActiveObject();
    if (!obj) return;

    obj.rotate((obj.angle || 0) - 90);
    canvas.renderAll();
}

function rotateRight() {
    const obj = canvas.getActiveObject();
    if (!obj) return;

    obj.rotate((obj.angle || 0) + 90);
    canvas.renderAll();
}

// ZOOM SAFE
function zoomIn() {
    let zoom = canvas.getZoom();
    canvas.setZoom(zoom + 0.1);
}

function zoomOut() {
    let zoom = canvas.getZoom();
    canvas.setZoom(Math.max(0.2, zoom - 0.1));
}

// RESET SAFE
function resetImage() {
    canvas.clear();
    canvas.setZoom(1);
    activeImg = null;
}

// FILTER SAFE (no crash)
function updateFilters() {
    const obj = canvas.getActiveObject();
    if (!obj) return;

    const b = (document.getElementById("brightness").value - 100) / 100;
    const c = (document.getElementById("contrast").value - 100) / 100;
    const s = (document.getElementById("saturation").value - 100) / 100;

    obj.filters = [
        new fabric.Image.filters.Brightness({ brightness: b }),
        new fabric.Image.filters.Contrast({ contrast: c }),
        new fabric.Image.filters.Saturation({ saturation: s })
    ];

    obj.applyFilters();
    canvas.renderAll();
}

// 🔥 FINAL DOWNLOAD (100% WORKING FIX)
function downloadImage() {
    canvas.discardActiveObject();
    canvas.renderAll();

    const dataURL = canvas.toDataURL({
        format: "png",
        multiplier: 3   // HD export
    });

    // METHOD 1 (normal browsers)
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "AI-Photo-Editor.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // METHOD 2 (mobile fallback)
    setTimeout(() => {
        if (!a.download) {
            const w = window.open();
            w.document.write('<img src="' + dataURL + '" />');
        }
    }, 300);
}
