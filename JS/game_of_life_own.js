let cellSize = 20;
let columnCount;
let rowCount;
let currentCells = [];
let nextCells = [];
let colors = ["#ff0000", "#00ff00", "#b494ea"]; // Rot, Grün, Lila
let selectedColor = 0; // Standardfarbe: Rot
let runButton;

function game_of_life(p) {
  p.setup = function () {
    p.frameRate(10);
    p.createCanvas(800, 800); // Größeres Canvas (800x800)

    columnCount = p.floor(p.width / cellSize);
    rowCount = p.floor(p.height / cellSize);

    for (let column = 0; column < columnCount; column++) {
      currentCells[column] = [];
    }

    for (let column = 0; column < columnCount; column++) {
      nextCells[column] = [];
    }

    // Setup des Run-Buttons
    runButton = p.createButton("Start Simulation");
    runButton.position(p.width + 10, 50); // Button rechts vom Canvas platzieren
    runButton.mousePressed(function () {
      p.loop(); // Simulation starten
    });

    // Tastenbelegung für Farbauswahl
    p.keyPressed = function () {
      if (p.key === "1") {
        selectedColor = 0; // Rot
      } else if (p.key === "2") {
        selectedColor = 1; // Grün
      } else if (p.key === "3") {
        selectedColor = 2; // Lila
      }
    };

    p.noLoop();
    p.describe(
      "Grid of squares where you can choose between 3 colors to place cells. Then, click 'Run' to start the simulation."
    );
  };

  p.draw = function () {
    p.background(255); // Hintergrund weiß, damit die Zellen sichtbar sind

    generate();
    for (let column = 0; column < columnCount; column++) {
      for (let row = 0; row < rowCount; row++) {
        let cell = currentCells[column][row];
        if (cell) {
          p.fill(cell); // Zellen mit der gewählten Farbe
        } else {
          p.fill(255); // Leere Zellen (weiß)
        }
        p.stroke(0);
        p.rect(column * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  };

  // Zellen mit gewählter Farbe platzieren
  p.mousePressed = function () {
    let column = p.floor(p.mouseX / cellSize);
    let row = p.floor(p.mouseY / cellSize);
    if (column >= 0 && column < columnCount && row >= 0 && row < rowCount) {
      currentCells[column][row] = colors[selectedColor]; // Zelle mit der gewählten Farbe setzen
    }
    p.loop();
  };

  function generate() {
    for (let column = 0; column < columnCount; column++) {
      for (let row = 0; row < rowCount; row++) {
        let left = (column - 1 + columnCount) % columnCount;
        let right = (column + 1) % columnCount;
        let above = (row - 1 + rowCount) % rowCount;
        let below = (row + 1) % rowCount;

        let neighbors = [
          currentCells[left][above],
          currentCells[column][above],
          currentCells[right][above],
          currentCells[left][row],
          currentCells[right][row],
          currentCells[left][below],
          currentCells[column][below],
          currentCells[right][below],
        ];

        // Regeln: Wenn eine Farbe eine andere berührt, überlebt nur die dominierende Farbe
        let dominantColor = getDominantColor(neighbors);

        // Zelle wird mit der dominanten Farbe aus den Nachbarn gesetzt
        if (dominantColor) {
          nextCells[column][row] = dominantColor;
        } else {
          nextCells[column][row] = currentCells[column][row];
        }
      }
    }

    let temp = currentCells;
    currentCells = nextCells;
    nextCells = temp;
  }

  // Bestimmen der dominierenden Farbe basierend auf den Nachbarn
  function getDominantColor(neighbors) {
    let counts = { "#ff0000": 0, "#00ff00": 0, "#b494ea": 0 };

    neighbors.forEach((color) => {
      if (color) counts[color]++;
    });

    // Finde die dominierende Farbe (die mit den meisten Vorkommen)
    let dominantColor = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
    return dominantColor;
  }
}

new p5(game_of_life);
