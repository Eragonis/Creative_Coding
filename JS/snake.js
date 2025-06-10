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
    scoreDiv.style("font-size", "15px");
    scoreDiv.style("font-family", "Arial, sans-serif");
    scoreDiv.style("margin-bottom", "0px");
    scoreDiv.style("color", "#b494ea");
    scoreDiv.style("text-align", "right");
    scoreDiv.style("width", p.width + "px");
    scoreDiv.style("white-space", "pre-line"); // Wichtig für Zeilenumbrüche

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
    // Initialer Zustand der Schlange
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
      // Punkte erhöhen
      score += 10;
      updateScore();
      generateFood();
    } else {
      snake.pop();
    }

    changingDirection = false;
  }

  function hasGameEnded() {
    // Prüfen ob sich Schlange selbst trifft
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }

    const head = snake[0];
    // Prüfen ob Wand getroffen
    return head.x < 0 || head.x >= p.width || head.y < 0 || head.y >= p.height;
  }

  function updateScore() {
    // Standardanzeige
    let text = `Score: ${score}`;
    if (score === 100) {
      text = "The Hundred-Man Slaughterer";
    }
    if (score > 500) text += " 𒉭";

    // Zusätzliche Texte bei bestimmten Punkteständen (mit Zeilenumbrüchen)
    if (score === 1000) {
      text += `<br> Mato Seihei no Slave`;
    }
    if (score === 2000) {
      text += `<br> 好<br>き<br>好<br>き<br>大<br>好<br>き<br>結<br>婚<br>し<br>よ<br>う<br>マ<br>イ<br>ハ<br>ニ<br>ー`;
    }
    if (score === 5000) {
      text += `<br> あ<br>な<br>た<br>は<br>私<br>の<br>友<br>達<br>だ<br>か<br>ら<br>、<br>私<br>は<br>い<br>つ<br>も<br>あ<br>な<br>た<br>を<br>救<br>う<br>た<br>め<br>に<br>そ<br>こ<br>に<br>い<br>ま<br>す<br>。<br> ア<br>カ<br>メ`;
    }
    if (score === 10000) {
      text += `<br> 俺<br>は<br>人<br>間<br>だ<br>、<br>本<br>物<br>だ<br>、骨<br>の<br>髄<br>ま<br>で<br>本<br>物<br>だ<br>。<br>私<br>を<br>ク<br>ソ<br>モ<br>ン<br>ス<br>タ<br>と<br>緒<br>に<br>し<br>な<br>い<br>で<br>く<br>だ<br>さ<br>い<br>。<br> ガ<br>ッ<br>ツ`;
    }
    if (score === 20000) {
      text += `<br> 急<br>い<br>で<br>い<br>る<br>場<br>合<br>は<br>迂<br>回<br>し<br>て<br>く<br>だ<br>さ<br>い`;
    }

    scoreDiv.html(text);

    // Easter Egg bei sehr hohem Score
    if (score >= 25000) {
      easterEggDiv.html(
        "出雲 天花<br>21 years old<br>1.63cm tall<br>😏 88 cm (F)"
      );
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

    // Richtungsänderung
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

    // Spiel neustarten wenn Game Over + Leertaste gedrückt
    if (gameOver && p.mouseButton === p.LEFT && p.keyIsDown(32)) {
      resetGame();
      gameOver = false;
      gameRunning = true;
    }
  };
};

new p5(snakeSketch);
