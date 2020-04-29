class Game{
  constructor($canvas){
    this.$canvas = $canvas
    this.context = $canvas.getContext('2d')

  }

  startGame(){
    //starting characters
    this.background = new Background(this)
    this.playerH = new Character(this, 300, 430, false, 100, 0, 0);
    this.playerV = new Character(this, 750, 455, false, 100, 0, 0);
    this.controllers = new Controller(this);
    this.controllers.setKeyBinding()
    //starting the shooting arrays
    this.playerHShoots = []
    this.playerVShoots = []
    //starting loop
    this.loop()
  }

  shoot(character){
    const image = character === 'hacker' ? './images/pills.png' : './images/virus.png'
    if(character === 'hacker'){
      const shoot = new Shoot(this ,this.playerH.x + 130, this.playerH.y + 30, this.playerV.x, image)
      this.playerHShoots.push(shoot)
      this.punch = true;
     }else{
      const shoot = new Shoot(this ,this.playerV.x + 40, this.playerV.y + 30, this.playerH.x, image)
      this.playerVShoots.push(shoot)
    }
  }

  runLogic(){
    //moving shoots
    this.playerH.movePlayer()
    this.playerV.movePlayer()
    for(let shoot of this.playerVShoots){
      shoot.move()
    }
    for(let shoot of this.playerHShoots){
      shoot.move()
    }
  }


  drawEverything(){
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.background.drawBackground()
    this.playerH.drawH(this.playerV.x)
    this.playerV.drawV(this.playerH.x)


    for(let shoot of this.playerVShoots){
      shoot.drawShootV()
    }
    for(let shoot of this.playerHShoots){
      shoot.drawShootH()
    }

  }

  loop(){
    //functions
    this.runLogic()
    this.drawEverything()
    window.requestAnimationFrame(timestamp => this.loop(timestamp))
  }

}