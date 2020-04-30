class Controller{
  constructor(game){
    this.game = game
  }

  setKeyBinding(){
    const playerH = this.game.playerH
    const playerV = this.game.playerV
    window.addEventListener('keydown', (event)=>{
      event.preventDefault()
      switch (event.keyCode) {
        case 68: //D right
          playerH.moveRight()
          playerH.position = 'walking'
          break;
        case 87: //W up
          playerH.jump()
          break;
        case 65: //A left
          playerH.moveLeft()
          playerH.position = 'walking'
          break;
        case 82: //R shoot
          this.game.shoot('hacker')
          playerH.position = 'shoot'
          break;
        case 39: //arrow right
          playerV.moveRight()
          playerV.position = 'walking'
          break;
        case 38: //arrow up
          playerV.jump()
          break;
        case 37: //arrow left
          playerV.moveLeft()
          playerV.position = 'walking'
          break;
        case 32: //space shoot
          this.game.shoot('virus')
          playerV.position = 'shoot'
        break;
        case 13:
          this.game.start()
        break;
      }
    })
    window.addEventListener('keyup', (event)=>{
      if (event.keyCode) {
        playerH.position = 'standing';
        playerV.position = 'standing';
      } 
    })
  }
}
