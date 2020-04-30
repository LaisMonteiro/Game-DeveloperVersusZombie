context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 650;
context.canvas.width = 1152;

const $canvas = document.querySelector("canvas");
const game = new Game($canvas);

const $pauseButton = document.querySelector(".btnPause");

window.addEventListener("load", () => {
  //load initial pages
});
$pauseButton.addEventListener("click", () => {
  game.pauseGame();
});

window.addEventListener("keydown", (event) => {
  if (!game.gameIsRunning) {
    if (event.keyCode === 13) {
      game.startGame();
    }
  }
});
