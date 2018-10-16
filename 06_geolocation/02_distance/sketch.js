var currentLat; //variable para guardar latitud del usuario
var currentLon; //longitud del usuario

var boboLat = 4.601215765889439; //latitud del bobo
var boboLon = -74.06554536195473; //longitud del bobo

var richardLat = 4.601611411584872; //latitud plazoleta R
var richardLon = -74.06404292676599; //longitud plazoleta R

var distanceRichard; //variable para guardar distancia al R
var distanceBobo; //variable para guardar distancia al Bobo

var isClose = false; //variable para saber si se está cerca a alguno de los puntos

function setup() {
  //crea un canvas de pantalla completa
  createCanvas(windowWidth, windowHeight);
  background(225);
	textSize(20);

  //Si geoCheck es true es que es posible medir la posicion del dispositivo
  console.log("GeoCheck: " + geoCheck());

  //Se llama a la función doThisOnLocation cada vez que cambie la posicion del usuario
  watchPosition(doThisOnLocation);
}

//Esta función es llamada por watchPosition cada vez que cambia la posicion del usuario
//La variable position es un objeto con los datos de localizacion del dispositivo
function doThisOnLocation(position) {

  print("lat: " + position.latitude + " long: " + position.longitude);

  //se asigna la altitud y longitud obtenida a las variables currentLat y currentLon
  currentLat = position.latitude;
  currentLon = position.longitude;
}

function draw() {
  //calcula la distancia entre el usuario y la plazoleta R
  //se multiplica por 1000 para pasar de 'km' a 'm'
  distanceRichard = calcGeoDistance(richardLat, richardLon, currentLat, currentLon, 'km') * 1000;

  //calcula la distancia entre el usuario y el Bobo
  //se multiplica por 1000 para pasar de 'km' a 'm'
  distanceBobo = calcGeoDistance(boboLat, boboLon, currentLat, currentLon, 'km')*1000;

  //Si alguna de las dos distancias es menor a 20 metros cambia el color de fondo
  if (distanceRichard < 20 || distanceBobo < 20) {
    isClose = true;
    background(0, 255, 0);
  } else {
    isClose = false;
    background(255, 0, 0);
  }

  //Pinta las distancias en la pantalla
  text('Te encuentras a ' + floor(distanceRichard) + ' metros de la plazoleta del R', 20, 50);
  text('Te encuentras a ' + floor(distanceBobo) + ' metros del Bobo', 20, 100);
}
