var socket; //variable para el socket
var ip = "http://0.0.0.0:3000"; //dirección ip del dispositivo REEMPLAZAR!!

var display = false; //variable para saber si se es el display
var players = []; //lista de jugadores
var buttons = []; //lista de botones
var upbtn, downbtn, leftbtn, rightbtn; //botones para mover al jugador

function setup() {
  createCanvas(windowWidth, windowHeight);

  //crea 4 botones y los agrega a la lista de botones
  var tam = Math.min(width, height)/5;
  upbtn = new Button(width/2, height/2 - tam, 'UP');
  downbtn = new Button(width/2, height/2 + tam, 'DOWN');
  leftbtn = new Button(width/2 - tam, height/2, 'LEFT');
  rightbtn = new Button(width/2 + tam, height/2, 'RIGHT');

  buttons.push(upbtn, downbtn, leftbtn, rightbtn);

  //conectar el socket al servidor
  socket = io.connect(ip);

  //envia el mensaje start
  socket.emit('start');

  //Recibe el mensaje 'display del profesor'
  socket.on('display', function(data) { //data = es true or false

    //asigna el valor de data a display
    //si es true este sketch sera el display del juego
    //de lo contrario será un jugador
    display = data;
  });

  //cuando recibe el mensaje 'newPlayer' del servidor
  socket.on('newPlayer', function(data) { //data es un objeto de clase jugador

    player = data; //guarda la información recibida en una variable
    player = new Player(data.id); //inicializa la variable como un objeto jugador
    players.push(player); //agrega al jugador a la lista de jugadores
  });

  //cuando recibe el mensaje 'newPlayer' del servidor
  socket.on('deletePlayer', function(data) {  //data es un objeto de clase jugador

    //recorre la lista de jugadores
    for ( var i = 0; i < players.length; i++){

      //busca el jugador con el id recibido
      if ( players[i].id == data.id ) {

        players.splice(i, 1); //lo elimina de la lista de jugadores
      }
    }
  });

  //cuando recibe el mensaje 'newPlayer' del servidor
  socket.on('update', function(data) { //data es un objeto con valores VelX, velY y id

    //recorre la lista de jugadores
    for( var i = 0; i < players.length; i++ ) {

      //busca el jugador con el id recibido
      if( players[i].id == data.id ) {

        //actualiza la direccion del jugador
        players[i].velX = data.velX;
        players[i].velY = data.velY;
      }
    }
  });
}

function draw() {

  //si es display muestra una pantalla con los jugadores
  if (display) {
    background(0);

    //muestra y mueve a los jugadores existentes
    for( var i = 0; i < players.length; i++) {
      players[i].mostrar();
      players[i].mover();
    }

  //si no es display muestra un control
  } else {
    background(255, 255, 0);

    //dibuja los botones
    upbtn.mostrar();
    downbtn.mostrar();
    leftbtn.mostrar();
    rightbtn.mostrar();
  }
}

//cuando el mouse es presionado se ejecuta esta función
function mousePressed() {

  //recorre la lista de botones
  for ( var i = 0; i < buttons.length; i++) {

    //revisa si estan siendo oprimidos por el mouse
    buttons[i].oprimir(mouseX, mouseY);

    //si el boton es oprimido
    if(buttons[i].oprimido){

      data = buttons[i].dir; //guarda la direccion del boton en una variable
      socket.emit('dir', data); //envia la dirección oprimida al servidor
    }
  }
}
