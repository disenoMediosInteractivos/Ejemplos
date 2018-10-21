var capture;
var w = 640;
var h = 480;

function setup() {
    pixelDensity(1);
    capture = createCapture(VIDEO);

    capture.size(w, h);
    createCanvas(w, h);
    capture.hide();
}

function draw() {
    image(capture, 0, 0, w, h);
    capture.loadPixels();

    if (capture.pixels.length > 0) {
    }
}
