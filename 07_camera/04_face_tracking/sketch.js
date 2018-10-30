var capture;
var tracker;

var w = 640;
var h = 480;

var x;
var y;
var rw;
var rh;

var rec;

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
  pixelDensity(1);
  canvas= createCanvas(w, h);

  capture.parent('container');
  canvas.parent('container');

  activarTracking();

  rec = new rec();
}

function draw() {
  strokeWeight(2);
  stroke(255, 255, 0);
  noFill();
  rect(rec.x, rec.y, rec.w, rec.h);
}

function rec(){
  this.x = -10;
  this.y = -10;
  this.w = 0;
  this.h = 0;

  this.mover = function(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

function activarTracking() {
  tracker = new tracking.ObjectTracker(['face']);
  capture.elt.id = 'p5video';
  tracker.setInitialScale(4);
  tracker.setStepSize(1);
  tracker.setEdgesDensity(0.05);

  tracking.track('#p5video', tracker, {
       camera: true
   });

  tracker.on('track', function (event) {
    clear();
    event.data.forEach(function (r) {
      rec.mover(r.x, r.y, r.width, r.height);
    })
  });
}
