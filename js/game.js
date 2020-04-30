class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext("2d");
    this.gameIsRunning = false;
  }

  startGame() {
    this.gameIsRunning = true;
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
  }

  pauseGame() {
    if (this.gameIsRunning) {
      this.gameIsRunning = !this.gameIsRunning;
    } else {
      this.gameIsRunning = !this.gameIsRunning;
      this.loop();
    }
  }

  shoot(character) {
    const image = character === "hacker";
    if (character === "hacker") {
      const shoot = new Shoot(
        this,
        this.playerH.x + 50,
        this.playerH.y + 30,
        this.playerV.x,
        image
      );
      this.playerHShoots.push(shoot);
    } else {
      const shoot = new Shoot(
        this,
        this.playerV.x + 50,
        this.playerV.y + 30,
        this.playerH.x,
        image
      );
      this.playerVShoots.push(shoot);
    }
  }

  runLogic() {
    this.playerV.movePlayer();
    this.playerH.movePlayer();
    //moving shoots player ZOMBIE
    for(let i=0; i < this.playerVShoots.length; i++){
      this.playerVShoots[i].move();
      if( 
        // if zoombie are looking to the left
        this.playerV.x > this.playerH.x &&
        this.playerVShoots[i].x < this.playerH.x + 50 &&
        this.playerVShoots[i].x + 50 > this.playerH.x &&
        this.playerVShoots[i].y > this.playerH.y &&
        this.playerVShoots[i].y < this.playerH.y + 50
      ){
        this.playerH.health -= 10;
        this.playerVShoots.splice(i, 1);
      } else if (
        // if zoombie are looking to the right
        this.playerV.x < this.playerH.x &&
        this.playerVShoots[i].x < this.playerH.x + 150 &&
        this.playerVShoots[i].x + 50 > this.playerH.x &&
        this.playerVShoots[i].y > this.playerH.y &&
        this.playerVShoots[i].y < this.playerH.y + 50
      ) {
        this.playerH.health -= 10;
        this.playerVShoots.splice(i, 1);
      }
    }

    //moving shoots player HACKER
    //for (let shoot of this.playerHShoots) {
    for (let i = 0; i < this.playerHShoots.length; i++) {
      this.playerHShoots[i].move();
      if ( // if zoombie are looking to the left
        this.playerH.x > this.playerV.x &&
        this.playerHShoots[i].x < this.playerV.x + 50 &&
        this.playerHShoots[i].x + 50 > this.playerV.x &&
        this.playerHShoots[i].y > this.playerV.y &&
        this.playerHShoots[i].y < this.playerV.y + 50
      ) {
        console.log("player health before", this.playerV.health);
        this.playerV.health -= 10;
        console.log("player health after", this.playerV.health);
        this.playerHShoots.splice(i, 1);
      } else if (
        // if zoombie are looking to the right
        this.playerH.x < this.playerV.x &&
        this.playerHShoots[i].x < this.playerV.x + 150 &&
        this.playerHShoots[i].x + 50 > this.playerV.x &&
        this.playerHShoots[i].y > this.playerV.y &&
        this.playerHShoots[i].y < this.playerV.y + 50
      ) {
        this.playerV.health -= 10;
        this.playerHShoots.splice(i, 1);
      }
      console.log(this.playerV.health);
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
    this.runLogic();
    this.drawEverything();
    this.gameOver();
    if (this.gameIsRunning) {
      window.requestAnimationFrame((timestamp) => this.loop(timestamp));
    }
  }

  gameOver() {
    if (this.playerH.health <= 0) {
      this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
      this.image = new Image();
      this.image.src = "images/zombieWins.gif";
      this.context.drawImage(this.image,0,0,this.$canvas.width,this.$canvas.height);
    } else if (this.playerV.health <= 0) {
      this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
      this.image = new Image();
      this.image.src = "images/developerWins.gif";
      this.context.drawImage(this.image,0,0,this.$canvas.width,this.$canvas.height
      );
    }
  }
}
