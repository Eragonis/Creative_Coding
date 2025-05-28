let axiom = "F";
let currentString = axiom;
let len = 8;
let ang = 45;
let generations = 5;

const rule = {
  F: "F[+F][-F]",
};

function l_system(p) {
  p.setup = function () {
    p.createCanvas(500, 500);
    p.angleMode(p.DEGREES);
    p.background(255);
    generate();
    drawEachGeneration();
  };

  p.draw = function () {
    p.noLoop();
  };

  p.mousePressed = function () {
    generate();
    p.redraw();
  };

  function generate() {
    currentString = axiom;
    stringsByGen = [axiom];

    // Generate strings for each generation based on rules
    for (let i = 0; i < generations; i++) {
      let nextString = "";
      let current = stringsByGen[i];

      // For each character in the current string, apply the rule if exists
      for (let j = 0; j < current.length; j++) {
        let currentChar = current.charAt(j);
        if (rule[currentChar]) {
          nextString += rule[currentChar];
        } else {
          nextString += currentChar;
        }
      }

      stringsByGen.push(nextString);
    }
  }

  function drawEachGeneration() {
    p.background(255);

    // Draw each generation shifted down vertically
    for (let i = 0; i <= generations; i++) {
      p.push();
      p.translate(p.width / 2, 50 + i * 80); // Each generation moves further down
      drawLSystem(stringsByGen[i]);
      p.pop();
    }
  }

  function drawLSystem(instruction) {
    p.stroke(0);
    for (let i = 0; i < instruction.length; i++) {
      let currentChar = instruction.charAt(i);
      if (currentChar === "F") {
        p.line(0, 0, 0, len); // Draw forward line
        p.translate(0, len); // Move forward
      } else if (currentChar === "+") {
        p.rotate(ang); // Rotate right by angle
      } else if (currentChar === "-") {
        p.rotate(-ang); // Rotate left by angle
      } else if (currentChar === "[") {
        p.push(); // Save current drawing state
      } else if (currentChar === "]") {
        p.pop(); // Restore previous drawing state
      }
    }
  }

  let stringsByGen = [];
}

new p5(l_system);
