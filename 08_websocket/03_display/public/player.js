function Player(id) {
  this.id = id;
  this.x = 50;
  this.y = 50;
  this.tam = 20;
  this.velX = 1;
  this.velY = 0;

  this.mostrar = function() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.tam, this.tam);
  }

  this.mover = function() {
    this.x += this.velX * 2;
    this.y += this.velY * 2;

    this.x = constrain(this.x, this.tam, width - this.tam);
    this.y = constrain(this.y, this.tam, height - this.tam);
  }
}
