// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Ball properties
const ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height - 30;
var ballSpeedX = 2;
var ballSpeedY = -2;

// Bat properties
const batHeight = 15;
const batWidth = 80;
var batX = (canvas.width - batWidth) / 2;

// To show the score
var score = 0;

// Event listener for mouse movement
canvas.addEventListener("mousemove", moveBat, false);

// Move the bat based on mouse position
function moveBat(event) {
  var relativeX = event.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    batX = relativeX - batWidth / 2;
  }
}

// Draw the ball
const drawBall = () => {
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "#e62236";
  context.fill();
  context.closePath();
};

// Draw the bat
const drawBat = () => {
  context.beginPath();
  context.rect(batX, canvas.height - batHeight, batWidth, batHeight);
  context.fillStyle = "#22e674";
  context.fill();
  context.closePath();
};

// Draw the score
const drawScore = () => {
  context.font = "16px Arial";
  context.fillStyle = "#f7f5f5";
  context.fillText(`Score : ${score} `, 8, 20);
};

// Main draw function
const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawBat();
  drawScore();

  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce off the walls
  //Condition for ball hit the  right or left wall of the canvas
  if (
    ballX + ballSpeedX > canvas.width - ballRadius ||
    ballX + ballSpeedX < ballRadius
  ) {
    ballSpeedX = -ballSpeedX;
  }
  //Condition for ball hit to top  wall of the canvas
  if (ballY + ballSpeedY < ballRadius) {
    ballSpeedY = -ballSpeedY;
  }
  //Condition for ball hit to bottom wall of the canvas
  else if (ballY + ballSpeedY > canvas.height - ballRadius) {
    // Check if ball hits the bat
    if (ballX > batX && ballX < batX + batWidth) {
      ballSpeedY = -ballSpeedY;
      score++;
    } else {
      alert(`Game Over. Your score is : ${score}`);
      document.location.reload();
      clearInterval(interval);
    }
  }
};

// Call the draw function every 10 milliseconds
//To create game loop  and the animation is started
const interval = setInterval(draw, 10);
