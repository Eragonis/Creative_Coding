let cellSize = 20;
let columnCount;
let rowCount;
let currentCells = [];
let nextCells = [];

function game_of_life(p) {
  p.setup = function () {
    p.frameRate(10);
    p.createCanvas(750, 750);

    // * Calculate columns and rows
    columnCount = p.floor(p.width / cellSize);
    rowCount = p.floor(p.height / cellSize);

    //? Set each column in currentCells to an empty array
    //? This allows cells to be added to this array
    //? The index of the cell will be its row number
    for (let column = 0; column < columnCount; column++) {
      currentCells[column] = [];
    }

    //* Repeat the same process for nextCells
    for (let column = 0; column < columnCount; column++) {
      nextCells[column] = [];
    }

    p.noLoop();
    p.describe(
      "Grid of squares that switch between white and black, demonstrating a simulation of John Conway's Game of Life. When clicked, the simulation resets."
    );
  };

  p.draw = function () {
    generate();
    for (let column = 0; column < columnCount; column++) {
      for (let row = 0; row < rowCount; row++) {
        //* Get cell value (0 or 1)
        let cell = currentCells[column][row];

        //* Convert cell value to get black (0) for alive or white (255) for dead
        p.fill((1 - cell) * 255);
        p.stroke(0);
        p.rect(column * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  };

  //* Reset board when mouse is pressed
  p.mousePressed = function () {
    randomizeBoard();
    p.loop();
  };

  //* Fill board randomly
  function randomizeBoard() {
    for (let column = 0; column < columnCount; column++) {
      for (let row = 0; row < rowCount; row++) {
        //* Randomly select value of either 0 (dead) or 1 (alive)
        currentCells[column][row] = p.random([0, 1]);
      }
    }
  }

  //* Create a new generation
  function generate() {
    //* Loop through every spot in our 2D array and count living neighbors
    for (let column = 0; column < columnCount; column++) {
      for (let row = 0; row < rowCount; row++) {
        //? Column left of current cell
        //? If column is at left edge, use modulus to wrap to right edge
        let left = (column - 1 + columnCount) % columnCount;

        //? Column right of current cell
        //? If column is at right edge, use modulus to wrap to left edge
        let right = (column + 1) % columnCount;

        //? Row above current cell
        //? If row is at top edge, use modulus to wrap to bottom edge
        let above = (row - 1 + rowCount) % rowCount;

        //? Row below current cell
        //? If row is at bottom edge, use modulus to wrap to top edge
        let below = (row + 1) % rowCount;

        //* Count living neighbours surrounding current cell
        let neighbours =
          currentCells[left][above] +
          currentCells[column][above] +
          currentCells[right][above] +
          currentCells[left][row] +
          currentCells[right][row] +
          currentCells[left][below] +
          currentCells[column][below] +
          currentCells[right][below];

        //! Rules of Life
        //! 1. Any live cell with fewer than two live neighbours dies
        //! 2. Any live cell with more than three live neighbours dies
        if (neighbours < 2 || neighbours > 3) {
          nextCells[column][row] = 0;
          //! 4. Any dead cell with exactly three live neighbours will come to life.
        } else if (neighbours === 3) {
          nextCells[column][row] = 1;
          //! 3. Any live cell with two or three live neighbours lives, unchanged, to the next generation.
        } else nextCells[column][row] = currentCells[column][row];
      }
    }

    //* Swap the current and next array for next generation
    let temp = currentCells;
    currentCells = nextCells;
    nextCells = temp;
  }
}

new p5(game_of_life);

//! MY TEST IF SOMETHING IS WRONG!!
//   p.setup = function () {
//     p.createCanvas(800, 800);
//     grid = new gritSquare(0, 0, 20, 20);
//   };

//   p.draw = function () {
//     p.background(220);
//     grid.show();
//     grid.roll();
//     for (let y = 1; y < p.height - 1; y++) {
//       for (let x = 1; x < p.width - 1; x++) {}
//     }
//   };

//   class gritSquare {
//     constructor(x, y, l, w) {
//       this.x = x;
//       this.y = y;
//       this.l = l;
//       this.w = w;
//       this.brightness = 0;

//       this.show = function () {
//         for (this.x = 0; this.x < p.width; this.x = this.x + this.l) {
//           for (this.y = 0; this.y < 800; this.y = this.y + this.l) {
//             p.fill(this.brightness, 100);
//             p.rect(this.x, this.y, this.l, this.l);
//           }
//         }
//       };

//       this.roll = function () {
//         let d = p.dist(
//           p.mouseX,
//           p.mouseY,
//           this.x + this.l / 2,
//           this.y + this.l / 2
//         );
//         if (d < this.l / 2) {
//           this.brightness = 255;
//         }
//       };
//     }
//   }
