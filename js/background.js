class Background {
  constructor(game) {
    this.game = game
    this.image = new Image();
    this.image.src = "images/background.jpg";
  }

  drawBackground() {
    const width = this.game.$canvas.width
    const height = this.game.$canvas.height
    context.drawImage(this.image, 0, 0, width, height);
  }
}
