let cellSize = 20;
let columnCount;
let rowCount;
let currentCells = [];
let nextCells = [];
let colors = ["#ff0000", "#ffff00", "#b494ea"]; // Red, Yellow, Purple
let selectedColor = 0; // Default color: Red
let runButton;
let simulationRunning = false;

function game_of_life(p) {
  p.setup = function () {
    p.frameRate(10);
    p.createCanvas(800, 800);

    columnCount = p.floor(p.width / cellSize);
    rowCount = p.floor(p.height / cellSize);

    for (let column = 0; column < columnCount; column++) {
      currentCells[column] = [];
      nextCells[column] = [];
      for (let row = 0; row < rowCount; row++) {
        currentCells[column][row] = null;
        nextCells[column][row] = null;
      }
    }

    runButton = p.createButton("Start Simulation");
    runButton.position(p.width + 10, 50);
    runButton.mousePressed(function () {
      simulationRunning = true;
      p.loop(); // Start the simulation
    });

    p.noLoop();

    // Keyboard input for color selection
    p.keyPressed = function () {
      if (p.key === "1") {
        selectedColor = 0;
      } else if (p.key === "2") {
        selectedColor = 1;
      } else if (p.key === "3") {
        selectedColor = 2;
      }
    };
  };

  p.draw = function () {
    p.background(255);

    if (simulationRunning) {
      generate();
    }

    for (let column = 0; column < columnCount; column++) {
      for (let row = 0; row < rowCount; row++) {
        let cell = currentCells[column][row];
        p.fill(cell ? cell : 255);
        p.stroke(0);
        p.rect(column * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  };

  p.mousePressed = function () {
    let column = p.floor(p.mouseX / cellSize);
    let row = p.floor(p.mouseY / cellSize);
    if (column >= 0 && column < columnCount && row >= 0 && row < rowCount) {
      if (p.keyIsDown(32)) {
        // Spacebar + click → Reset
        for (let c = 0; c < columnCount; c++) {
          for (let r = 0; r < rowCount; r++) {
            currentCells[c][r] = null;
          }
        }
        simulationRunning = false;
        p.noLoop();
      } else if (!simulationRunning) {
        // Normal cell placement
        currentCells[column][row] = colors[selectedColor];
        p.redraw(); // Update canvas
      }
    }
  };

  function generate() {
    for (let column = 0; column < columnCount; column++) {
      for (let row = 0; row < rowCount; row++) {
        let neighbors = getNeighbors(column, row);
        let liveNeighbors = neighbors.filter((n) => n !== null);
        let currentCell = currentCells[column][row];

        if (currentCell) {
          // Survival only with 2 or 3 neighbors
          nextCells[column][row] =
            liveNeighbors.length === 2 || liveNeighbors.length === 3
              ? currentCell
              : null;
        } else {
          // Birth with exactly 3 neighbors (with dominant color)
          if (liveNeighbors.length === 3) {
            nextCells[column][row] = getDominantColor(liveNeighbors);
          } else {
            nextCells[column][row] = null;
          }
        }
      }
    }

    // Swap grids
    let temp = currentCells;
    currentCells = nextCells;
    nextCells = temp;
  }

  function getNeighbors(x, y) {
    let neighbors = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        let nx = (x + dx + columnCount) % columnCount;
        let ny = (y + dy + rowCount) % rowCount;
        neighbors.push(currentCells[nx][ny]);
      }
    }
    return neighbors;
  }

  function getDominantColor(cells) {
    let counts = { "#ff0000": 0, "#ffff00": 0, "#b494ea": 0 };
    cells.forEach((c) => {
      if (c) counts[c]++;
    });

    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  }
}

new p5(game_of_life);
