class Shoot {
  constructor(game, x, y,enemyX){
    this.game = game
    this.y = y;
    this.x = x
    this.enemyX = enemyX
    this.decideSide();
    this.speedX = 5;
    
    this.imagePills = new Image();
    this.imagePills.src = "images/pills-1135250_960_720.webp";
    this.imageVirus = new Image();
    this.imageVirus.src = "images/virus.png";
  }

  decideSide(){
    if (this.x < this.enemyX){
      this.side = "left";
    } else {
      this.side = "right";
    }
  }

  move() {
    if (this.side === "left") {
      this.x += this.speedX;
    } else {
     this.x -= this.speedX;
    }
  }

  drawShootH() {
    const context = this.game.$canvas.getContext('2d')
    context.drawImage(this.imagePills, this.x, this.y, 30, 30);
  }
  drawShootV() {
    const context = this.game.$canvas.getContext('2d')
    context.drawImage(this.imageVirus, this.x, this.y, 40, 40);
  }

}