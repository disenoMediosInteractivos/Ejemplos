function punto(x, y, lat, lng) {
  this.x = x;
  this.y = y;
  this.lat = lat;
  this.lng = lng;

  this.dibujar = function(l) {
    ellipse(this.x, this.y, l, l);
  }

  this.mover = function(x, y, lat, lng) {
    this.x = x;
    this.y = y;
    this.lat = lat;
    this.lng = lng;
  }

  //esta función recibe como parametro un objeto punto
  this.calcDist = function(p) {

    line(this.x, this.y, p.x, p.y);

  }
}
