var capture;
var w = 640;
var h = 480;

var captureArgs = {
  audio: false,
  video: {
    width: w,
    height: h
  }
}

function setup() {
    capture = createCapture(captureArgs, function() {
        console.log('captura lista :)')
    });

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
