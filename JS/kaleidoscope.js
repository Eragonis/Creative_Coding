const kaleidoscope = (p) => {
  let symmetry = 6;
  let angle = 360 / symmetry;
  let spacePressed = false;

  p.setup = () => {
    p.createCanvas(800, 650);
    p.angleMode(p.DEGREES);
    p.background(50);
  };

  p.draw = () => {
    p.translate(p.width / 2, p.height / 2);

    // If mouse button and spacebar are pressed simultaneously → Reset
    if (p.mouseIsPressed && spacePressed) {
      p.resetSketch();
      return; // do not draw anything else
    }

    // Draw only when mouse is inside the canvas
    if (
      p.mouseX > 0 &&
      p.mouseX < p.width &&
      p.mouseY > 0 &&
      p.mouseY < p.height
    ) {
      let lineStartX = p.mouseX - p.width / 2;
      let lineStartY = p.mouseY - p.height / 2;
      let lineEndX = p.pmouseX - p.width / 2;
      let lineEndY = p.pmouseY - p.height / 2;

      if (p.mouseIsPressed) {
        for (let i = 0; i < symmetry; i++) {
          p.rotate(angle);
          p.stroke("#955dc9");
          p.strokeWeight(3);
          p.line(lineStartX, lineStartY, lineEndX, lineEndY);

          p.push();
          p.scale(1, -1);
          p.line(lineStartX, lineStartY, lineEndX, lineEndY);
          p.pop();
        }
      }
    }
  };

  // Reset function
  p.resetSketch = () => {
    p.push();
    p.resetMatrix(); // Reset transformations
    p.background(50);
    p.pop();
  };

  // Key press monitoring
  p.keyPressed = () => {
    if (p.key === " ") {
      spacePressed = true;
    }
  };

  p.keyReleased = () => {
    if (p.key === " ") {
      spacePressed = false;
    }
  };
};

new p5(kaleidoscope);
