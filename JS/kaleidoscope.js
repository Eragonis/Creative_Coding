const kaleidoscope = (p) => {
  let symmetry = 6;
  let angle = 360 / symmetry;
  let spacePressed = false;

  p.setup = () => {
    p.createCanvas(720, 400);
    p.angleMode(p.DEGREES);
    p.background(50);
  };

  p.draw = () => {
    p.translate(p.width / 2, p.height / 2);

    // Wenn Maustaste + Leertaste gleichzeitig gedrückt → Reset
    if (p.mouseIsPressed && spacePressed) {
      p.resetSketch();
      return; // keine weitere Zeichnung machen
    }

    // Zeichnen nur wenn Maus innerhalb des Canvas ist
    if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      let lineStartX = p.mouseX - p.width / 2;
      let lineStartY = p.mouseY - p.height / 2;
      let lineEndX = p.pmouseX - p.width / 2;
      let lineEndY = p.pmouseY - p.height / 2;

      if (p.mouseIsPressed) {
        for (let i = 0; i < symmetry; i++) {
          p.rotate(angle);
          p.stroke(255);
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

  // Reset-Funktion
  p.resetSketch = () => {
    p.push();
    p.resetMatrix(); // Transform zurücksetzen
    p.background(50);
    p.pop();
  };

  // Tastendruck-Überwachung
  p.keyPressed = () => {
    if (p.key === ' ') {
      spacePressed = true;
    }
  };

  p.keyReleased = () => {
    if (p.key === ' ') {
      spacePressed = false;
    }
  };
};

new p5(kaleidoscope);
