class MapScore {
  constructor(game) {
    this.game = game;

    this.avatarPlayerImg = new Image();
    this.avatarPlayerImg.src = "images/iconH.png";
    this.avatarPlayer2Img = new Image();
    this.avatarPlayer2Img.src = "images/iconZ.png";
  }

  drawMapScore() {
    const width = this.game.$canvas.width
    const height = this.game.$canvas.height
    context.font = "17px Tahoma, 'Reenie Beanie', cursive";
    context.fillStyle = "#9ea869";
    context.fillText(`${this.game.playerH.health}`, 50, 90, width,height);
    context.drawImage(this.avatarPlayerImg, 40, 20, 50, 50);
    context.fillText(`${this.game.playerV.health}`, 1080, 100, width, height);
    context.drawImage(this.avatarPlayer2Img, 1070, 30, 50, 50);
    //   context.drawImage(this.image, 0, 0, width, height);
  }
}
