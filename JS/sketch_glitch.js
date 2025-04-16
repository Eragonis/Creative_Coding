let imgGlitch;
let size = 50;
let shouldGlitch = true;

let red;
let green;
let blue;
let alpha;

function sketch_glitch(p) {
  p.preload = function () {
    imgGlitch = p.loadImage("../Image/Esdeath.png");
  };

  p.setup = function () {
    p.createCanvas(850, 680);
    p.pixelDensity(1);
    p.image(imgGlitch, 0, 0);
    // glitch();
    p.loadPixels();
    imgGlitch.loadPixels();
    for (let i = 0; i < imgGlitch.pixels.length; i += 4) {
       red = imgGlitch.pixels[i + 0];
       green = imgGlitch.pixels[i + 1];
       blue = imgGlitch.pixels[i + 2];
       alpha = imgGlitch.pixels[i + 3];

      p.pixels[i + 0] = red;
      p.pixels[i + 1] = green;
      p.pixels[i + 2] = blue;
      p.pixels[i + 3] = alpha;
    }

    imgGlitch.updatePixels();
    p.updatePixels();
  };

  p.mousePressed = function () {
    glitch();
  };

  // TODO Glitch function pixel change

  function glitch() {
    imgGlitch.loadPixels();

    shouldGlitch = !shouldGlitch;
    if (shouldGlitch) {
      p.image(imgGlitch, 0, 0);
    } else {
      p.loadPixels();

      // let changePixels = [index + 0, index + 1,  index + 2,  index + 3]

      for (let y = p.height / 2 + 85; y < p.height / 2 + 110; y++) {
        for (let x = p.width / 2 - 150; x < p.width / 2; x++) {
          const index = (x + y * p.width) * 4;

          p.pixels[index + 0] = imgGlitch.pixels[index + 0];
          p.pixels[index + 1] = imgGlitch.pixels[index + 1];
          p.pixels[index + 2] = imgGlitch.pixels[index + 2];
          p.pixels[index + 3] = imgGlitch.pixels[index + 3];

          p.pixels[index + 0] = 180;
          p.pixels[index + 1] = 0;
          p.pixels[index + 2] = 324;
          p.pixels[index + 3] = 50;
        }
      }

      for (let y = p.height / 2 + 120; y < p.height / 2 + 145; y++) {
        for (let x = p.width / 2 - 20; x < p.width / 2 + 130; x++) {
          const index = (x + y * p.width) * 4;

          p.pixels[index + 0] = imgGlitch.pixels[index + 0];
          p.pixels[index + 1] = imgGlitch.pixels[index + 1];
          p.pixels[index + 2] = imgGlitch.pixels[index + 2];
          p.pixels[index + 3] = imgGlitch.pixels[index + 3];

          p.pixels[index + 0] = 180;
          p.pixels[index + 1] = 0;
          p.pixels[index + 2] = 324;
          p.pixels[index + 3] = 50;
        }
      }

      for (let y = p.height / 2 + 150; y < p.height / 2 + 175; y++) {
        for (let x = p.width / 2 - 200; x < p.width / 2 - 50; x++) {
          const index = (x + y * p.width) * 4;

          p.pixels[index + 0] = imgGlitch.pixels[index + 0];
          p.pixels[index + 1] = imgGlitch.pixels[index + 1];
          p.pixels[index + 2] = imgGlitch.pixels[index + 2];
          p.pixels[index + 3] = imgGlitch.pixels[index + 3];

          p.pixels[index + 0] = 180;
          p.pixels[index + 1] = 0;
          p.pixels[index + 2] = 324;
          p.pixels[index + 3] = 50;
        }
      }

      for (let y = p.height / 2 + 180; y < p.height / 2 + 205; y++) {
        for (let x = p.width / 2 - 40; x < p.width / 2 + 110; x++) {
          const index = (x + y * p.width) * 4;

          p.pixels[index + 0] = imgGlitch.pixels[index + 0];
          p.pixels[index + 1] = imgGlitch.pixels[index + 1];
          p.pixels[index + 2] = imgGlitch.pixels[index + 2];
          p.pixels[index + 3] = imgGlitch.pixels[index + 3];

          p.pixels[index + 0] = red;
          p.pixels[index + 1] = green;
          p.pixels[index + 2] = blue;
          p.pixels[index + 3] = alpha;
        }
      }

      p.updatePixels();
    }
  }
}

new p5(sketch_glitch);
