var lat; //variable para guardar latitud del usuario
var lng; //variable para guardar longitud del usuario

var myMap; //variable para guardar el mapa
var canvas; //variable para guardar el canvas
var mappa; //variable para guardar el mapa

//objeto de opciones con las que se inicializa el mapa
var options = {

  lat: 0, //latitud de centro del mapa
  lng: 0, //longitud de cetro del mapa
  zoom: 8, //zoom inicial
  style: "https://{s}.tile.osm.org/{z}/{x}/{y}.png" //url de donde se toma la imagen del mapa
}

function setup() {

  //crea un canvas de pantalla completa
   canvas = createCanvas(windowWidth, windowHeight);

  //crea un map ade leaflet
   mappa = new Mappa('Leaflet');

  //Si geoCheck es true es que es posible medir la posicion del dispositivo
  console.log("GeoCheck: " + geoCheck());

  //Se llama a la función doThisOnLocation una vez
  getCurrentPosition(doThisOnLocation);
}

//La variable position es un objeto con los datos de localizacion del dispositivo
function doThisOnLocation(position) {

  //se acutalizan las opciones del mapa para que el zoom inicial sea en la posicion del usuario
  options.lat = position.latitude
  options.lng = position.longitude

  //guarda la posicion obtenida en las variables lat y lng
  lat = position.latitude
  lng = position.longitude

  //llama a la funcion drawMap
  drawMap();
}

function drawMap() {

  //inicializa el mapa con el objeto options
  myMap = mappa.tileMap(options);

  //pone en la misma posicion del canvas
  myMap.overlay(canvas);

  //cada vez que se mueva o haga zoom en el mapa se dibuja el punto de posicion
  myMap.onChange(drawPoint);
}

function drawPoint() {

  //limpia el canvas
  clear();

  //convierte a pixeles la latitud y longitud del dispositivo
  var pos = myMap.latLngToPixel(lat, lng);

  //dibuja una elipse en la posicion del usuario
  fill(0, 255, 0);
  ellipse(pos.x, pos.y, 20, 20);
}
