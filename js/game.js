class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext("2d");
  }

  startGame(){
    // if (!this.controllers.game){
    //   this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    // } else {
      //starting characters
      this.background = new Background(this);
      this.playerH = new Character(this, 300, 430, false, 100, 0, 0);
      this.playerV = new Character(this, 750, 455, false, 100, 0, 0);
      this.controllers = new Controller(this);
      this.controllers.setKeyBinding();
      //starting the shooting arrays
      this.playerHShoots = [];
      this.playerVShoots = [];
      //starting loop
      this.loop();
  //}
  }

  shoot(character) {
    const image = character === "hacker";
    if (character === "hacker") {
      const shoot = new Shoot(
        this,
        this.playerH.x + 100,
        this.playerH.y + 30,
        this.playerV.x,
        image
      );
      this.playerHShoots.push(shoot);
    } else {
      const shoot = new Shoot(
        this,
        this.playerV.x + 40,
        this.playerV.y + 30,
        this.playerH.x,
        image
      );
      this.playerVShoots.push(shoot);
    }
  }


  runLogic() {
    this.playerH.movePlayer();
    this.playerV.movePlayer();
    
    //moving shoots player ZOMBIE
    for (let shoot of this.playerVShoots) {
      shoot.move();
      if (
        // if zoombie are looking to the left
        this.playerV.x > this.playerH.x &&
        shoot.x < this.playerH.x + 50 &&
        shoot.x + 50 > this.playerH.x &&
        shoot.y > this.playerH.y && 
        shoot.y < this.playerH.y + 50) {
          this.playerVShoots.shift();
        } else if (
        // if zoombie are looking to the right
        this.playerV.x < this.playerH.x &&
        shoot.x < this.playerH.x + 150 &&
        shoot.x + 50 > this.playerH.x &&
        shoot.y > this.playerH.y && 
        shoot.y < this.playerH.y + 50) {
          this.playerVShoots.shift();
        }
    }

    //moving shoots player HACKER
    for (let shoot of this.playerHShoots) {
      shoot.move();
      if (
        // if zoombie are looking to the left
        this.playerH.x > this.playerV.x &&
        shoot.x < this.playerV.x + 50 &&
        shoot.x + 50 > this.playerV.x &&
        shoot.y > this.playerV.y && 
        shoot.y < this.playerV.y + 50) {
          this.playerHShoots.shift();
        } else if (
        // if zoombie are looking to the right
        this.playerH.x < this.playerV.x &&
        shoot.x < this.playerV.x + 150 &&
        shoot.x + 50 > this.playerV.x &&
        shoot.y > this.playerV.y && 
        shoot.y < this.playerV.y + 50) {
          this.playerHShoots.shift();
        }
    }
  }

  drawEverything() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.background.drawBackground();
    this.playerH.drawH(this.playerV.x);
    this.playerV.drawV(this.playerH.x);

    for (let shoot of this.playerVShoots) {
      shoot.drawShootV();
    }
    for (let shoot of this.playerHShoots) {
      shoot.drawShootH();
    }
  }

  loop() {
    //functions
    this.playerHShoots.forEach((currentValue, index, array, thisArg) => {
      if (array[index].x === this.playerV.x) {
        console.log(currentValue);
      }
    });

    this.runLogic();
    this.drawEverything();
    window.requestAnimationFrame((timestamp) => this.loop(timestamp));
  }
}
