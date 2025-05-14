let imgGlitch;
let isGlitching = false;
let originalPixels;

function sketch_glitch(p) {
  p.preload = function () {
    imgGlitch = p.loadImage("../Image/Esdeath.png"); // Pfad anpassen
  };

  p.setup = function () {
    p.createCanvas(850, 680);
    p.pixelDensity(1);
    p.image(imgGlitch, 0, 0);

    p.loadPixels();
    imgGlitch.loadPixels();

    // Originalbild speichern
    originalPixels = new Uint8ClampedArray(imgGlitch.pixels);
    p.updatePixels();
  };

  p.draw = function () {
    if (isGlitching) {
      subtleHorizontalGlitch(); // Weniger, subtilere Glitches
    }
  };

  p.mousePressed = function () {
    isGlitching = !isGlitching;

    if (!isGlitching) {
      // Zurück zum Originalbild
      p.loadPixels();
      for (let i = 0; i < originalPixels.length; i++) {
        p.pixels[i] = originalPixels[i];
      }
      p.updatePixels();
    }
  };

  function subtleHorizontalGlitch() {
    imgGlitch.loadPixels();
    p.loadPixels();

    let numLines = 1; // Weniger Zeilen für weniger Störung

    for (let i = 0; i < numLines; i++) {
      let y = p.int(p.random(p.height)); // Zufällige Y-Position
      let lineHeight = p.int(p.random(5, 10)); // Kleinere Höhe der Störung
      let offset = p.int(p.random(-10, 10)); // Kleine horizontale Verschiebung

      for (let dy = 0; dy < lineHeight; dy++) {
        let currentY = y + dy;
        if (currentY >= p.height) continue;

        for (let x = 0; x < p.width; x++) {
          let sx = x;
          let dx = x + offset;

          // Stelle sicher, dass der verschobene Bereich im Bild bleibt
          if (dx < 0 || dx >= p.width) continue;

          let srcIndex = (sx + currentY * p.width) * 4;
          let dstIndex = (dx + currentY * p.width) * 4;

          p.pixels[dstIndex + 0] = imgGlitch.pixels[srcIndex + 0]; // R
          p.pixels[dstIndex + 1] = imgGlitch.pixels[srcIndex + 1]; // G
          p.pixels[dstIndex + 2] = imgGlitch.pixels[srcIndex + 2]; // B
          p.pixels[dstIndex + 3] = imgGlitch.pixels[srcIndex + 3]; // A
        }
      }
    }

    p.updatePixels();
  }
}

new p5(sketch_glitch);
