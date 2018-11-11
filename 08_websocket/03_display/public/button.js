//funcion botón
function Button(x, y, dir){
  this. x = x;
  this.y = y;
  this.dir = dir; //direccion
  this.tam = Math.min(width, height)/5;
  this.col = color(255);
  this.oprimido = false;

  //dibuja al boton
  this.mostrar = function() {

    fill(this.col);
    stroke(255, 0, 0);
    strokeWeight(4);
    rectMode(CENTER);
    rect(this.x, this.y, this.tam, this.tam );

    fill(255, 0, 0);
    if (this.dir === "UP") {

      triangle(this.x - this.tam/3, this.y + this.tam/3, this.x, this.y - this.tam/3,
       this.x + this.tam/3, this.y + this.tam/3);

    } else if (this.dir === "DOWN") {

      triangle(this.x - this.tam/3, this.y - this.tam/3, this.x, this.y + this.tam/3,
       this.x + this.tam/3, this.y - this.tam/3);

    } else if (this.dir === "LEFT") {

      triangle(this.x + this.tam/3, this.y - this.tam/3, this.x + this.tam/3, this.y + this.tam/3,
       this.x - this.tam/3, this.y);

    } else if (this.dir === "RIGHT") {

      triangle(this.x - this.tam/3, this.y - this.tam/3, this.x - this.tam/3, this.y + this.tam/3,
       this.x + this.tam/3, this.y);
    }
  }

  //revisa si el boton es oprimido
  this.oprimir = function(x, y) {

    if( x > this.x - this.tam/2 && x < this.x + this.tam/2 &&
    y > this.y - this.tam/2 && y < this.y + this.tam/2) {

      this.col = color(0, 0, 255);
      this.oprimido = true;

    } else {

      this.col = color(255);
      this.oprimido = false;
    }
  }
}
