var distance = 0;
var currentLat = 0;
var currentLon = 0;

var boboLat = 4.601220206709155;
var boboLon = -74.06554860994221;

var isInside = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(255);
  textSize(32);

  print("GeoCheck: " + geoCheck());
  watchPosition(doThisOnLocation);
  geoFenceCircle(boboLat, boboLon, 0.005, insideTheFence, outsideTheFence, 'km');

}

function doThisOnLocation(position) {
  print("lat: " + position.latitude + " long: " + position.longitude);
  currentLat = position.latitude;
  currentLon = position.longitude;
}

function insideTheFence(position) {
  print("INlat: " + position.latitude + " INlong: " + position.longitude);
  print("outside of the fence");
  isInside = true;
}

function outsideTheFence(position) {
  print("OUTlat: " + position.latitude + " OUTlong: " + position.longitude);
  print("outside of the fence");
  isInside = false;
  //setup();
}

function draw() {
  distance = calcGeoDistance(boboLat, boboLon, currentLat, currentLon, 'km');

  if (isInside) {
    background(0, 0, 255);
  } else {
    background(255, 0, 0);
  }

  text('Te encuentras a ' + floor(distance * 1000) + ' metros del Bobo', 20, 50);
}
