// * MY CANVAS SETUP
const canvas = document.querySelector("#pong4two");
canvas.style.backgroundColor = "green";
canvas.width = 650;
canvas.height = 400;
const ctx = canvas.getContext("2d");

let scoreOne = 0;
let scoreTwo = 0;

const paddleMovement = (event) => {
  const key = event.code;
  if (key === "KeyW" && playerOne.y - playerOne.gravity > 0) {
    playerOne.y -= playerOne.gravity * 4;
  } else if (key === "KeyS" && playerOne.y + playerOne.height + playerOne.gravity < canvas.height) {
    playerOne.y += playerOne.gravity * 4;
  }
  if (key === "ArrowUp" && playerTwo.y - playerTwo.gravity > 0) {
    playerTwo.y -= playerTwo.gravity * 4;
  } else if (key === "ArrowDown" && playerTwo.y + playerTwo.height + playerTwo.gravity < canvas.height) {
    playerTwo.y += playerTwo.gravity * 4;
  }
}

class Game {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.speed = options.speed || 2;
    this.gravity = options.gravity;
  }
}

// first paddle
const playerOne = new Game({
  x: 10,
  y: 200,
  width: 15,
  height: 80,
  color: "#fff",
  gravity: 2
})

// second paddle
const playerTwo = new Game({
  x: 625,
  y: 200,
  width: 15,
  height: 80,
  color: "#fff",
  gravity: 2
})

// ball
const ball = new Game({
  x: 650 / 2,
  y: 400 / 2,
  width: 15,
  height: 15,
  color: "#fff",
  speed: 2,
  gravity: 1
})

// player one score text
const displayScoreOne = () => {
  ctx.font = "18px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(scoreOne, canvas.width / 2 - 60, 30);
}

// player two score text
const displayScoreTwo = () => {
  ctx.font = "18px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(scoreTwo, canvas.width / 2 + 60, 30);
}

// draw element
const drawElement = (elem) => {
  ctx.fillStyle = elem.color;
  ctx.fillRect(elem.x, elem.y, elem.width, elem.height);
}

// make ball bounce
const ballMovement = () => {
  if (ball.y + ball.gravity <= 0 || ball.y + ball.gravity >= canvas.height) {
    ball.gravity = ball.gravity * -1;
    ball.y += ball.gravity;
    ball.x += ball.speed;
  } else {
    ball.y += ball.gravity;
    ball.x += ball.speed;
  }
  ballWallCollision();
}

// detect collision
const ballWallCollision = () => {
  if (
    (ball.y + ball.gravity <= playerTwo.y + playerTwo.height &&
      ball.x + ball.width + ball.speed >= playerTwo.x &&
      ball.y + ball.gravity > playerTwo.y) ||
    (ball.y + ball.gravity > playerOne.y &&
      ball.x + ball.speed <= playerOne.x + playerOne.width)
  ) {
    ball.speed = ball.speed * -1;
  } else if (ball.x + ball.speed < playerOne.x) {
    scoreTwo += 1;
    ball.x = 100 + ball.speed;
    ball.y += ball.gravity;
  } else if (ball.x + ball.speed > playerTwo.x + playerTwo.width) {
    scoreOne += 1;
    ball.x = 100 + ball.speed;
    ball.y += ball.gravity;
  }

  drawElements();
}

// draw elements
const drawElements = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawElement(playerOne);
  drawElement(playerTwo);
  drawElement(ball);
  displayScoreOne();
  displayScoreTwo();
}

function loop() {
  ballMovement();
  window.requestAnimationFrame(loop);
}

// * ADDEVENTLISTENERS
window.addEventListener("keydown", paddleMovement);

loop();