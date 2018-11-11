function Player(id) {
  this.id = id;
  this.x = 50;
  this.y = 50;
  this.tam = 20;
  this.velX = 1;
  this.velY = 0;
  this.col = color(random(255), random(255), random(255));

  this.mostrar = function() {
    noStroke();
    fill(this.col);
    rect(this.x, this.y, this.tam, this.tam);
  }

  this.mover = function() {
    this.x += this.velX * this.tam;
    this.y += this.velY * this.tam;

    this.x = constrain(this.x, this.tam, width - this.tam);
    this.y = constrain(this.y, this.tam, height - this.tam);
  }
}
