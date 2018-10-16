var locationData;
var lat;
var lng;

let myMap;
let canvas;

const mappa = new Mappa('Leaflet');

var options = {
  lat: 0,
  lng: 0,
  zoom: 8,
  style: "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup() {

  canvas = createCanvas(500, 500);

  console.log('geoCheck: ' + geoCheck())
  getCurrentPosition(doThisOnLocation);

}

function doThisOnLocation(position) {

  options.lat = position.latitude
  options.lng = position.longitude
  lat = position.latitude
  lng = position.longitude

  if (!myMap)
  drawMap();

}

function drawMap() {
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(drawPoint);

}

function drawPoint() {

  clear();
  var pos = myMap.latLngToPixel(lat, lng);

  fill(0, 255, 0);
  ellipse(pos.x, pos.y, 20, 20);

}
