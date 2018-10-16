var currentLat;
var currentLon;

var boboLat = 4.601215765889439;
var boboLon = -74.06554536195473;

var richardLat = 4.601611411584872;
var richardLon = -74.06404292676599;

var distanceRichard;
var distanceBobo;

var isClose = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(255);
  textSize(32);

  print("GeoCheck: " + geoCheck());
  watchPosition(doThisOnLocation);
}

function doThisOnLocation(position) {
  print("lat: " + position.latitude + " long: " + position.longitude);
  currentLat = position.latitude;
  currentLon = position.longitude;
}

function draw() {
  distanceRichard = calcGeoDistance(richardLat, richardLon, currentLat, currentLon, 'km')*1000;
  distanceBobo = calcGeoDistance(boboLat, boboLon, currentLat, currentLon, 'km')*1000;

  if (distanceRichard < 20 || distanceBobo < 20) {
    isClose = true;
    background(0, 255, 0);
  } else {
    isClose = false;
    background(255, 0, 0);
  }

  text('Te encuentras a ' + floor(distanceRichard) + ' metros de la plazoleta del R', 20, 50);
  text('Te encuentras a ' + floor(distanceBobo) + ' metros del Bobo', 20, 100);
}
