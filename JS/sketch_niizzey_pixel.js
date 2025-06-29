let sketch_image = function (p) {
  let img1, img2;
  let particles = [];
  let state = "idle"; // idle, explode, gather, explodeBack, gatherBack
  let imgsLoaded = false;

  p.preload = function () {
    img1 = p.loadImage("../Image/niizzey.png");
    img2 = p.loadImage("../Image/niizzey_maid.png");
  };

  p.setup = function () {
    p.createCanvas(500, 534);
    p.pixelDensity(1);
    p.noStroke();
  };

  p.draw = function () {
    p.background(30);

    if (!img1 || !img2) return;

    if (!imgsLoaded) {
      if (img1.pixels.length === 0) img1.loadPixels();
      if (img2.pixels.length === 0) img2.loadPixels();

      if (img1.pixels.length && img2.pixels.length) {
        imgsLoaded = true;
        console.log("Bilder geladen");
      } else {
        return; // noch nicht bereit
      }
    }

    if (state === "idle") {
      p.image(img1, 0, 0);
      return;
    }

    if (particles.length === 0) {
      console.log("Keine Partikel zum Zeichnen");
      return;
    }

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].show();
    }
  };

  p.mousePressed = function () {
    if (!imgsLoaded) {
      console.log("Bilder noch nicht geladen");
      return;
    }

    console.log("Maus geklickt, aktueller State:", state);

    if (state === "idle") {
      state = "explode";
      particles = [];
      createParticlesFromImage(img1, "explode");
      for (let part of particles) part.setRandomDirection();
      console.log("Starte Explode, Partikelanzahl:", particles.length);

      setTimeout(() => {
        startGatherParticles();
        state = "gather";
        console.log("Starte Gather");
      }, 2000);
    } else if (state === "gather") {
      state = "explodeBack";
      particles = [];
      createParticlesFromImage(img2, "explodeBack");
      for (let part of particles) part.setRandomDirection();
      console.log("Starte ExplodeBack, Partikelanzahl:", particles.length);

      setTimeout(() => {
        startGatherBackParticles();
        state = "gatherBack";
        console.log("Starte GatherBack");
      }, 2000);
    } else if (state === "gatherBack") {
      setTimeout(() => {
        particles = [];
        state = "idle";
        console.log("Zurück zu Idle");
      }, 2000);
    }
  };

  function createParticlesFromImage(img, mode = "explode") {
    for (let x = 0; x < img.width; x += 2) {
      // kleinerer Schritt
      for (let y = 0; y < img.height; y += 2) {
        let index = 4 * (x + y * img.width);
        let col = p.color(
          img.pixels[index],
          img.pixels[index + 1],
          img.pixels[index + 2],
          img.pixels[index + 3]
        );
        particles.push(new PixelParticle(p, x, y, col, mode));
      }
    }
  }

  function startGatherParticles() {
    particles = [];
    createParticlesFromImage(img2, "gather");
  }

  function startGatherBackParticles() {
    particles = [];
    createParticlesFromImage(img1, "gatherBack");
  }

  class PixelParticle {
    constructor(p, x, y, col, mode = "explode") {
      this.p = p;
      this.mode = mode;
      this.col = col;

      if (mode === "explode" || mode === "explodeBack") {
        this.pos = p.createVector(x, y);
        this.vel = p.createVector(0, 0);
      } else if (mode === "gather" || mode === "gatherBack") {
        this.target = p.createVector(x, y);
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        this.vel = p.createVector(0, 0);
      }
    }

    setRandomDirection() {
      let angle = this.p.random(this.p.TWO_PI);
      let speed = this.p.random(5, 10);
      this.vel = this.p.constructor.Vector.fromAngle(angle).mult(speed);
    }

    update() {
      if (this.mode === "explode" || this.mode === "explodeBack") {
        this.pos.add(this.vel);
        this.vel.mult(0.95);

        // Partikel innerhalb Canvas halten (optional)
        this.pos.x = this.p.constrain(this.pos.x, 0, this.p.width);
        this.pos.y = this.p.constrain(this.pos.y, 0, this.p.height);
      } else if (this.mode === "gather" || this.mode === "gatherBack") {
        let force = this.p.constructor.Vector.sub(this.target, this.pos);
        force.mult(0.05);
        this.vel.add(force);
        this.vel.mult(0.85);
        this.pos.add(this.vel);
      }
    }

    show() {
      this.p.noStroke();
      this.p.fill(this.col);
      this.p.ellipse(this.pos.x, this.pos.y, 2, 2);
    }
  }
};

new p5(sketch_image);
