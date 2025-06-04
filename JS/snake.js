let snakeSketch = (p) => {
  let snake = [];
  let food;
  let dx = 10;
  let dy = 0;
  let changingDirection = false;
  let score = 0;
  let gameRunning = false;
  let gameOver = false;
  let scoreDiv;
  let easterEggDiv;
  let bgImg;

  p.preload = () => {
    // Lade dein Hintergrundbild (entweder lokal oder URL)
    bgImg = p.loadImage("../Image/Guts_bruch.webp"); // Pfad anpassen
  };

  p.setup = () => {
    // Score Div oben über Canvas, rechtsbündig
    scoreDiv = p.createDiv("");
    scoreDiv.style("font-size", "20px");
    scoreDiv.style("font-family", "Arial, sans-serif");
    scoreDiv.style("margin-bottom", "0px");
    scoreDiv.style("color", "#b494ea");
    scoreDiv.style("text-align", "right");
    scoreDiv.style("width", p.width + "px");

    // Easter Egg Div unter Score, rechtsbündig mit Abstand
    easterEggDiv = p.createDiv("");
    easterEggDiv.style("font-size", "16px");
    easterEggDiv.style("font-family", "Arial, sans-serif");
    easterEggDiv.style("color", "#b494ea");
    easterEggDiv.style("white-space", "pre-line");
    easterEggDiv.style("margin-top", "20px");
    easterEggDiv.style("text-align", "right");
    easterEggDiv.style("width", p.width + "px");

    p.createCanvas(640, 656);
    p.frameRate(10);
    resetGame();
  };

  p.draw = () => {
    if (!gameRunning) {
      p.background(220);
      p.fill(0);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(20);
      p.text("Click to start", p.width / 2, p.height / 2);
      return;
    }

    if (gameOver) {
      if (bgImg) p.image(bgImg, 0, 0, p.width, p.height);
      else p.background(220);
      drawSnake();
      drawFood();
      return;
    }

    if (bgImg) p.image(bgImg, 0, 0, p.width, p.height);
    else p.background(220);

    moveSnake();
    if (hasGameEnded()) {
      gameOver = true;
      return;
    }

    drawFood();
    drawSnake();
  };

  function resetGame() {
    snake = [
      { x: 200, y: 200 },
      { x: 190, y: 200 },
      { x: 180, y: 200 },
      { x: 170, y: 200 },
      { x: 160, y: 200 },
    ];
    dx = 10;
    dy = 0;
    score = 0;
    gameOver = false;
    changingDirection = false;
    updateScore();
    generateFood();
  }

  function drawSnake() {
    for (let part of snake) {
      p.fill("#a6a6a6");
      p.stroke(0);
      p.rect(part.x, part.y, 10, 10);
    }
  }

  function drawFood() {
    p.fill("#b30000");
    p.stroke(0);
    p.rect(food.x, food.y, 10, 10);
  }

  function moveSnake() {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      //   score++;
      score += 5;
      updateScore();
      generateFood();
    } else {
      snake.pop();
    }

    changingDirection = false;
  }

  function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }

    const head = snake[0];
    return head.x < 0 || head.x >= p.width || head.y < 0 || head.y >= p.height;
  }

  function updateScore() {
    let text = "";
    if (score === 100) {
      text = "The Hundred-Man Slaughterer";
    } else {
      text = "Score: " + score;
      if (score > 500) {
        text += " 𒉭";
      }
      if (score === 1000) {
        text += " — Mato Seihei no Slave";
      }
    }
    scoreDiv.html(text);

    if (score >= 25000) {
      easterEggDiv.html("出雲 天花\n21 years old\n1.63cm tall\n😏 88 cm (F)");
    } else {
      easterEggDiv.html("");
    }
  }

  function generateFood() {
    // Immer Abstand vom Rand, hier 20px = 2 Zellen
    let margin = 20;

    let cols = (p.width - margin * 2) / 10;
    let rows = (p.height - margin * 2) / 10;

    let x = p.floor(p.random(cols)) * 10 + margin;
    let y = p.floor(p.random(rows)) * 10 + margin;

    // Food darf nicht auf Snake liegen
    while (snake.some((part) => part.x === x && part.y === y)) {
      x = p.floor(p.random(cols)) * 10 + margin;
      y = p.floor(p.random(rows)) * 10 + margin;
    }

    food = { x, y };
  }

  p.keyPressed = () => {
    if (changingDirection || gameOver) return;

    const LEFT = 37,
      RIGHT = 39,
      UP = 38,
      DOWN = 40;

    if (p.keyCode === LEFT && dx !== 10) {
      dx = -10;
      dy = 0;
    } else if (p.keyCode === RIGHT && dx !== -10) {
      dx = 10;
      dy = 0;
    } else if (p.keyCode === UP && dy !== 10) {
      dx = 0;
      dy = -10;
    } else if (p.keyCode === DOWN && dy !== -10) {
      dx = 0;
      dy = 10;
    }

    changingDirection = true;
  };

  p.mousePressed = () => {
    if (!gameRunning) {
      gameRunning = true;
      return;
    }

    if (gameOver && p.mouseButton === p.LEFT && p.keyIsDown(32)) {
      resetGame();
      gameOver = false;
      gameRunning = true;
    }
  };
};

new p5(snakeSketch);
