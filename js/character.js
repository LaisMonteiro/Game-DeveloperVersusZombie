class Character {
  constructor(game, x, y, jumping, health, x_velocity, y_velocity) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.jumping = jumping;
    this.health = health === 100;
    this.x_velocity = x_velocity;
    this.y_velocity = y_velocity;

    this.gravity = 40;
    this.friction = 1;
    this.position = "standing";

    // -------------------- IMAGES HACKER
    this.stopedH = new Image();
    this.stopedH.src = "images/hWalk1.png";
    this.stopedHL = new Image();
    this.stopedHL.src = "images/walk1Left.png";

    this.hWalk3 = new Image();
    this.hWalk3.src = "images/hWalk3.png";
    this.hWalk3L = new Image();
    this.hWalk3L.src = "images/hWalk3L.png";

    this.hPunch2 = new Image();
    this.hPunch2.src = "images/hPunch2.png";
    this.hPunch2L = new Image();
    this.hPunch2L.src = "images/punchInvert.png";

    // -------------------- IMAGES VIRUS
    this.stopedV = new Image();
    this.stopedV.src = "images/virusStoped.png";
    this.stopedVL = new Image();
    this.stopedVL.src = "images/stopedVL.png";

    this.walkingV = new Image();
    this.walkingV.src = "images/walkingV.png";
    this.walkingVL = new Image();
    this.walkingVL.src = "images/walkingVL.png";

    this.vPunch = new Image();
    this.vPunch.src = "images/punchV.png";
    this.vPunchL = new Image();
    this.vPunchL.src = "images/punchVL.png";
 
  }

  // -------------------- CHARACTERS FUNCTIONS
  jump() {
    if (this.jumping) {
      this.y_velocity = 5;
    } else {
      this.y_velocity = -20;
    }
    this.jumping = true;
  }

  moveLeft() {
    this.x_velocity = -1 * 5;
  }
  moveRight() {
    this.x_velocity = 5;
  }

  movePlayer() {
    const { x, y, x_velocity, y_velocity, gravity, friction } = this;

    let newX_velocity = x_velocity / (1 + (friction / 1000) * 16);
    let newY_velocity = y_velocity + (gravity / 1000) * 16;

    let newX = x + newX_velocity;
    let newY = y + newY_velocity;

    if (this.playerLimitsY()) {
      newY_velocity = 0;
      newY = y;
    }

    if (this.playerLimitsX()) {
      newX_velocity = 0;
      newX = x;
    }
    this.x = newX;
    this.y = newY;
    this.x_velocity = newX_velocity;
    this.y_velocity = newY_velocity;
  }

  playerLimitsY() {
    const height = this.game.$canvas.height;
    const playerY = this.y + this.y_velocity;
    if (playerY > height - 215) {
      this.jumping = false;
      return true;
    } else if (playerY < 0) {
      return true;
    }
  }

  playerLimitsX() {
    const width = this.game.$canvas.width;
    const playerX = this.x + this.x_velocity;
    if (playerX < -50 || playerX > 1050) {
      return true;
    }
  }

  // -------------------- DRAW CHARACTERS

  drawH(enemyX) {
    const context = this.game.$canvas.getContext("2d");
    if (this.x < enemyX) {
      if (this.position == "walking") {
        context.drawImage(this.hWalk3, this.x, this.y, 150, 210);
      } else if (this.position == "standing") {
        context.drawImage(this.stopedH, this.x, this.y, 200, 200);
      } else if (this.position == "shoot") {
        context.drawImage(this.hPunch2, this.x, this.y, 150, 210);
      }
    } else if (this.x > enemyX) {
      if (this.position == "walking") {
        context.drawImage(this.hWalk3L, this.x, this.y, 150, 210);
      } else if (this.position == "standing") {
        context.drawImage(this.stopedHL, this.x, this.y, 200, 200);
      } else if (this.position == "shoot") {
        context.drawImage(this.hPunch2L, this.x, this.y, 150, 210);
      }
    }
  }

  drawV(enemyX) {
    const context = this.game.$canvas.getContext("2d");
    if (this.x < enemyX) {
      if (this.position == "walking") {
        context.drawImage(this.walkingVL, this.x, this.y, 170, 170);
      } else if (this.position == "standing") {
        context.drawImage(this.stopedVL, this.x, this.y, 170, 170);
      } else if (this.position == "shoot") {
        context.drawImage(this.vPunchL, this.x, this.y, 170, 170);
      }
    } else if (this.x > enemyX) {
      if (this.position == "walking") {
        context.drawImage(this.walkingV, this.x, this.y, 170, 170);
      } else if (this.position == "standing") {
        context.drawImage(this.stopedV, this.x, this.y, 170, 170);
      } else if (this.position == "shoot") {
        context.drawImage(this.vPunch, this.x, this.y, 170, 170);
      }
    }
  }
}
