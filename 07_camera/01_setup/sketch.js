var capture; //variable para guardar la captura

var w = 640; //ancho
var h = 480; //alto

function setup() {
    //Define la densidad de pixeles para que la imagen sea igual en todos los dispositivos
    pixelDensity(1);
    capture = createCapture(VIDEO); //crea una captura de video

    capture.size(w, h); //definde el tamaño de la captura
    createCanvas(w, h); //crea un canvas del tamaño de la captura
    capture.hide(); //esconde la captura
}

function draw() {
    image(capture, 0, 0, w, h); //dibuja una imagen con los pixeles recibidos de la camara
}
