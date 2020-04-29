
context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 650;
context.canvas.width = 1152;

const $canvas = document.querySelector("canvas")
const game = new Game($canvas)

game.startGame()

