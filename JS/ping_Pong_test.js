function ping_Pong_test(p) {
  let paddleLeftX = 20;
  let paddleLeftY = 200;

  let paddleRightX = 380;
  let paddleRightY = 200;

  let paddleSpeed = 4;
  let paddleHeight = 80;
  let paddleWidth = 10;

  let leftScore = 0;
  let rightScore = 0;

  let ballPosX = 200;
  let ballPosY = 200;
  let ballSpeedX = 0;
  let ballSpeedY = 0;
  let ballSize = 10;

  p.setup = function () {
    p.createCanvas(400, 400); // p. beachten

    p.rectMode(p.CENTER);
    p.fill(255);
    p.noStroke();
    p.textSize(40);
    p.textAlign(p.CENTER);

    p.noLoop();
    p.describe(
      'Two narrow white rectangles and a white square representing the paddles and ball in a game of ping pong. The player scores are displayed in the upper corners, and initially text reads "Click to start"'
    );
  };

  p.draw = function () {
    p.background(0);

    // Paddles zeichnen
    p.rect(paddleLeftX, paddleLeftY, paddleWidth, paddleHeight);
    p.rect(paddleRightX, paddleRightY, paddleWidth, paddleHeight);

    // Ball zeichnen
    p.square(ballPosX, ballPosY, ballSize);

    // Punktestand anzeigen
    p.text(leftScore, p.width * 0.25, p.height * 0.1);
    p.text(rightScore, p.width * 0.75, p.height * 0.1);

    // Ball bewegen
    ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;

    // Kollision linkes Paddle
    let leftCollisionLeft = paddleLeftX - paddleWidth / 2 - ballSize / 2;
    let leftCollisionRight = paddleLeftX + paddleWidth / 2 + ballSize / 2;
    let leftCollisionTop = paddleLeftY - paddleHeight / 2 - ballSize / 2;
    let leftCollisionBottom = paddleLeftY + paddleHeight / 2 + ballSize / 2;

    if (
      ballPosX >= leftCollisionLeft &&
      ballPosX <= leftCollisionRight &&
      ballPosY >= leftCollisionTop &&
      ballPosY <= leftCollisionBottom
    ) {
      ballSpeedX = -ballSpeedX;
      ballSpeedY = (ballPosY - paddleLeftY) / 5;
    }

    // Kollision rechtes Paddle
    let rightCollisionLeft = paddleRightX - paddleWidth / 2 - ballSize / 2;
    let rightCollisionRight = paddleRightX + paddleWidth / 2 + ballSize / 2;
    let rightCollisionTop = paddleRightY - paddleHeight / 2 - ballSize / 2;
    let rightCollisionBottom = paddleRightY + paddleHeight / 2 + ballSize / 2;

    if (
      ballPosX >= rightCollisionLeft &&
      ballPosX <= rightCollisionRight &&
      ballPosY >= rightCollisionTop &&
      ballPosY <= rightCollisionBottom
    ) {
      ballSpeedX = -ballSpeedX;
      ballSpeedY = (ballPosY - paddleRightY) / 5;
    }

    // Punkte & Ball zurücksetzen
    if (ballPosX < 0) {
      rightScore++;
      p.resetBall();
    } else if (ballPosX > p.width) {
      leftScore++;
      p.resetBall();
    }

    // Wände oben & unten
    if (ballPosY < 0 || ballPosY > p.height) {
      ballSpeedY = -ballSpeedY;
    }

    // Steuerung linkes Paddle (W & S)
    let leftMove = 0;
    if (p.keyIsDown(87)) leftMove -= paddleSpeed;
    if (p.keyIsDown(83)) leftMove += paddleSpeed;
    paddleLeftY = p.constrain(
      paddleLeftY + leftMove,
      paddleHeight / 2,
      p.height - paddleHeight / 2
    );

    // Steuerung rechtes Paddle (Pfeiltasten)
    let rightMove = 0;
    if (p.keyIsDown(p.UP_ARROW)) rightMove -= paddleSpeed;
    if (p.keyIsDown(p.DOWN_ARROW)) rightMove += paddleSpeed;
    paddleRightY = p.constrain(
      paddleRightY + rightMove,
      paddleHeight / 2,
      p.height - paddleHeight / 2
    );

    // Text bei Pausierung
    if (!p.isLooping()) {
      p.text("Click to start", p.width / 2, p.height / 2 - 20);
    }
  };

  // Ball zurücksetzen
  p.resetBall = function () {
    ballPosX = p.width / 2;
    ballPosY = p.height / 2;
    ballSpeedX = p.random([-3, 3]);
    ballSpeedY = p.random([-2, 2]);
  };

  // Spiel starten durch Mausklick
  p.mousePressed = function () {
    if (!p.isLooping()) {
      p.resetBall();
      p.loop();
    }
  };
}

new p5(ping_Pong_test);
