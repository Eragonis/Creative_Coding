let axiom = "F";
let currentString = axiom;
let len = 5;  // Längere Linien
let ang = 22.5;  // Winkel
let generations = 5;  // Anzahl der Iterationen

const rule = {
  F: "FF+[+F-F-F]-[-F+F+F]",
};

function l_system(p) {
  p.setup = function () {
    p.createCanvas(450, 450);
    p.background(255);
    p.angleMode(p.DEGREES);
    p.translate(p.width / 2, p.height);  // Startposition in der Mitte
    generate();  // L-System generieren
    drawLSystem();  // L-System zeichnen
  };

  p.draw = function () {
    p.noLoop();  // Nur einmal zeichnen
  };

  p.mousePressed = function () {
    generate();  // Neue Generation erzeugen
    p.redraw();  // Canvas neu zeichnen
  };

  function generate() {
    currentString = axiom;  // Starte mit dem Axiom
    for (let i = 0; i < generations; i++) {
      let nextString = "";
      for (let j = 0; j < currentString.length; j++) {
        let currentChar = currentString.charAt(j);
        if (rule[currentChar]) {
          nextString += rule[currentChar];  // Ersetze mit der Regel
        } else {
          nextString += currentChar;  // Wenn keine Regel existiert, behalte das Zeichen
        }
      }
      currentString = nextString;  // Setze die neue Zeichenkette
    }
  }

  function drawLSystem() {
    p.stroke(0);
    p.beginShape();
    for (let i = 0; i < currentString.length; i++) {
      let currentChar = currentString.charAt(i);
      if (currentChar === "F") {
        p.line(0, 0, 0, -len);  // Zeichne Linie
        p.translate(0, -len);  // Verschiebe die "Turtle"-Position
      } else if (currentChar === "+") {
        p.rotate(ang);  // Drehung nach rechts
      } else if (currentChar === "-") {
        p.rotate(-ang);  // Drehung nach links
      } else if (currentChar === "[") {
        p.push();  // Speicher die aktuelle Position und Ausrichtung
      } else if (currentChar === "]") {
        p.pop();  // Wiederherstellen der letzten Position und Ausrichtung
      }
    }
    p.endShape();
  }
}

new p5(l_system);
