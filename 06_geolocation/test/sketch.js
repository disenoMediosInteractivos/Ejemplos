var lat; //variable para guardar la latitud
var lng; //variable para guardar la longitud
var accuracy; //variable para guardar la precisión
var altitude; //variable para guardar la altitud
var altitudeAccuracy; //variable para guardar la presición en altitud
var heading; //variable para guardar la dirección
var speed; //variable para guardar la rapidez

function setup() {

  //crea un canvas de pantalla completa
  createCanvas(windowWidth, windowHeight);
  background(225);
	textSize(20);

  //Si geoCheck es true es que es posible medir la posicion del dispositivo
  console.log("GeoCheck: " + geoCheck());

  //Se llama a la función doThisOnLocation cada vez que cambie la posicion del usuario
  intervalCurrentPosition(doThisOnLocation, 1000);
}

//Esta función es llamada por watchPosition cada vez que cambia la posicion del usuario
//La variable position es un objeto con los datos de localizacion del dispositivo
function doThisOnLocation(position) {

  //toma la posicion del dispositivo y asigna valores a las variables de posicion
  lat = position.latitude;
  lng = position.longitude;
  accuracy = position.accuracy;
  altitudeAccuracy = position.altitudeAccuracy;
  heading = position.heading;
  speed = position.speed;

}

function draw() {
  background(255);

  //dibuja en la pantalla los valores de posición obtenidos
  text("Latitude: " + lat, 10, 30);
  text("Longitude: " + lng, 10, 60);
  text("Accuracy: " + accuracy, 10, 90);
  text("Altitude accuracy: " + altitudeAccuracy, 10, 120);
  text("Heading: " + heading, 10, 150);
  text("Speed: " + speed, 10, 180);

}
