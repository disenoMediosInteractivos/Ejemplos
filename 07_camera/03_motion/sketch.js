var capture;
var w = 640;
var h = 480;

var r, g, b;
var ar, ag, ab;

var tol = 25;

var pixelesAnteriores;

function setup() {
    pixelDensity(1);
    capture = createCapture(VIDEO);

    capture.size(w, h);
    createCanvas(w, h);
    capture.hide();
}

function draw() {
  capture.loadPixels();
  loadPixels();
  var total = 0;

  if (capture.pixels.length > 0) {

    if(!pixelesAnteriores) {

      pixelesAnteriores = capture.pixels;

    } else {

      for (var y = 0; y < h; y++) {

        for (var x = 0; x < w; x++) {

          var i = (x + y * w) * 4;

          r = capture.pixels[i + 0];
          g = capture.pixels[i + 1];
          b = capture.pixels[i + 2];

          ar = pixelesAnteriores[i + 0];
          ag = pixelesAnteriores[i + 1];
          ab = pixelesAnteriores[i + 2];

          var aBrillo = (ar + ag + ab)/3;
          var brillo = (r+g+b)/3;

          if(abs(aBrillo - brillo) > tol) {

            total++;

            pixels[i + 0] = 255;
            pixels[i + 1] = 255;
            pixels[i + 2] = 0;
            pixels[i + 3] = 255;

          } else {

            pixels[i + 0] = 255;
            pixels[i + 1] = 0;
            pixels[i + 2] = 0;
            pixels[i + 3] = 255;
          }
        }
      }

      if (total > 0) { //hay que poner esto porque a veces los frames se repiten
        updatePixels();
      }

      pixelesAnteriores = capture.pixels;
    }
  }
}
