var capture; // variable para guardar la captura
var w = 640; //ancho
var h = 480; //alto

var r, g, b; //variable para guardar color de pixeles
var ar, ag, ab; //variable para guardar color de pixeles anteriores

var tol = 25; //tolerancia al movimiento

var pixelesAnteriores; //variable para guardar arreglo de pixeles de la captura

function setup() {
  //Define la densidad de pixeles para que la imagen sea igual en todos los dispositivos
  pixelDensity(1);
  capture = createCapture(VIDEO); //crea una captura de video

  capture.size(w, h); //define el tamaño de la captura
  createCanvas(w, h); //crea un canvas del tamaño de la captura
  capture.hide(); //esconde la captura
}

function draw() {
  capture.loadPixels(); //carga los pixeles de la captura
  loadPixels(); //carga los pixeles del canvas
  var total = 0; //variable para guardar el numero de pixeles que cambiaron

  // si la cámara esta captando alguna imagen
  if (capture.pixels.length > 0) {

    //si no hay pixeles guardados en la imagen anterior
    //si es la primera vez que se ejecuta el código
    if(!pixelesAnteriores) {

      //toma los pixeles de la captura y los guarda en una variable
      pixelesAnteriores = capture.pixels;

    } else { //si existen pixeles de la imagen anterior guardados

      //recorre el arreglo de pixeles
      for (var y = 0; y < h; y++) {

        for (var x = 0; x < w; x++) {

          var i = (x + y * w) * 4; //obtiene el índice del pixel actual

          r = capture.pixels[i + 0]; //obtiene el valor rojo del pixel
          g = capture.pixels[i + 1]; //obtiene el valor verde del pixel
          b = capture.pixels[i + 2]; //obtiene el valor azul del pixel

          ar = pixelesAnteriores[i + 0]; //obtiene el valor rojo del pixel anterior
          ag = pixelesAnteriores[i + 1]; //obtiene el valor verde del pixel anterior
          ab = pixelesAnteriores[i + 2]; //obtiene el valor azul del pixel anterior

          //calcula el brillo promedio de los pixeles
          var brillo = (r+g+b)/3;
          var aBrillo = (ar + ag + ab)/3;

          // si la diferencia entre la captura anterior y la captura actual
          // es mayor a la tolerancia
          if(abs(aBrillo - brillo) > tol) {

            total++; //aumenta el total de pixeles que cambiaron

            //pinta el pixel de amarillo
            pixels[i + 0] = 255;
            pixels[i + 1] = 255;
            pixels[i + 2] = 0;
            pixels[i + 3] = 255;

          } else { //si el pixel no cambio de manera significante

            //lo pinta de rojo
            pixels[i + 0] = 255;
            pixels[i + 1] = 0;
            pixels[i + 2] = 0;
            pixels[i + 3] = 255;
          }
        }
      }

      //solo se actualizan los pixeles si la imagen cambio
      //(a veces los frames se repiten)
      if (total > 0) {
        updatePixels(); //actualiza los pixeles del canvas
        fill(255);
        textSize(20);
        var area = w*h; // calcula area del canvas
        var mov = (total / area) * 100; //calcula el porcentaje de pixeles en movimiento
        //texto
        text("Porcentaje de movimiento = " + floor(mov) + "%", 20, 40);
      }

      //guarda los pixeles actuales en la variable de pixeles anteriores
      pixelesAnteriores = capture.pixels;
    }
  }
}
