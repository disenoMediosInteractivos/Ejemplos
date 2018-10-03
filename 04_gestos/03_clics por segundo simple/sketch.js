var tiempo; //crea una lista de tiempo para guardar el tiempo entre dos clics
var vel; //variable para guardar la velocidad de los clics
var tam; //tamaño de la bola
var mtam; //variable para suavizar el tamaño de la bola

function setup() {
  createCanvas(windowWidth, windowHeight); //crea un canvas de pantalla completa
  background(0);

  tiempo = [0, 0]; //crea una lista de tiempo para guardar el tiempo entre dos clics
  vel = 0; //velocidad inicial es cero

  //tamaño inicial es 10px
  tam = 10;
  mtam = 10;

  //tamaño del texto
  textSize(20);
}

function draw() {
  background(0);

  //la velocidad de la bola se obtiene de la division de 60 segundos entre el intervalo de dos clics
  //tiempo[1] = tiempo en el que se hizo el primer clic
  //tiempo[0] = tiempo en el que se hizo el segundo clic
  var vel = 60000 / (tiempo[1] - tiempo[0]);

  //si han pasado mas de 200 millisegundos entre un clic y otro se asigna un valor de 0 a la velocidad
  if (millis() - tiempo[1] > 200) {
    vel = 0;
  }

  //texto de la pantalla
  fill(255);
  noStroke();
  text("Hacer clic lo más rápido posible", 30, 50);

  //floor() redondea el numero de vel a un valor entero
  text(floor(vel) + " clics por minuto", 30, 80);

  //revisa que la velocidad no sea infinita (es decir que no exista) y que sea mayor a 200 clics por segundo
  if (vel != Infinity && floor(vel) > 200){

    //aumenta el tamaño de la elipse dependiendo de los clics por minuto
    tam+= vel/400;

  } else if (tam > 10){ //si la velocidad es menor a 200 y el tamaño de la elipse es mayor a 10

    //disminuye el tamaño de la elipse
    tam-= 3;

  } else {

    //establece 10 como el tamaño mínimo para la elipse
    tam = 10;

  }

  //esta parte del codigo permite suavizar el cambio de tamaño de la ellipse
  var dif = tam - mtam; //resta del tamaño actual de la bola con el nuevo tamaño

  //si la bola debe cambiar de tamaño lo hace pero de manera suave
  if(abs(dif) > 1.0) {
    mtam = mtam + dif/8.0;
  }

  //pinta la ellipse con el nuevo tamaño
  fill(255, 0, 0);
  strokeWeight(3);
  stroke(255);
  ellipse (width/2, height/2, mtam, mtam);

}

//funcion que se llama cuando se hace clic
function mouseClicked() {

  //el tiempo del segundo clic se corre a la segunda posicion
  tiempo[0] = tiempo[1];

  //se guarda el tiempo del primer clic en el arreglo
  tiempo[1] = millis();
}
