var lat;
var lng;
var accuracy;
var altitude;
var altitudeAccuracy;
var heading;
var speed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(225);
	textSize(20);
  console.log("GeoCheck: " + geoCheck());
  watchPosition(doThisOnLocation);
}

function doThisOnLocation(position) {
  lat = position.latitude;
  lng = position.longitude;
  accuracy = position.accuracy;
  altitudeAccuracy = position.altitudeAccuracy;
  heading = position.heading;
  speed = position.speed;

}

function draw() {
  background(255);

  text("Latitude: " + lat, 10, 30);
  text("Longitude: " + lng, 10, 60);
  text("Accuracy: " + accuracy, 10, 90);
  text("Altitude accuracy: " + altitudeAccuracy, 10, 120);
  text("Heading: " + heading, 10, 150);
  text("Speed: " + speed, 10, 180);

}
