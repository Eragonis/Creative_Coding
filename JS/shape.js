function shape(p) {
  const amountOfFormPoints = 5; // Number of points that define the shape
  const stepSize = 2; // Maximum random movement per frame for each point
  const initRadius = 150; // Initial radius from center to each point
  const mouseAttraction = 0.01; // How strongly the shape's center follows the mouse
  let centerX, centerY; // Current center position of the shape
  let x = []; // Array to store x-coordinates of points
  let y = []; // Array to store y-coordinates of points

  p.setup = function () {
    p.createCanvas(800, 800);

    // Initialize center in the middle of the canvas
    centerX = p.width / 2;
    centerY = p.height / 2;

    // Calculate the angle between points on the circle
    const angle = p.radians(360 / amountOfFormPoints);

    // Calculate initial x and y positions of each point evenly spaced on a circle
    for (let i = 0; i < amountOfFormPoints; i++) {
      x.push(p.cos(angle * i) * initRadius);
      y.push(p.sin(angle * i) * initRadius);
    }

    // Set stroke color with some transparency
    p.stroke(0, 75);
    p.strokeWeight(0.5);

    // White background and no fill for shapes
    p.background(255);
    p.noFill();
  };

  p.draw = function () {
    // Move the center towards the mouse position with some smoothing
    centerX += (p.mouseX - centerX) * mouseAttraction;
    centerY += (p.mouseY - centerY) * mouseAttraction;

    // Randomly move each point around within the stepSize range to create organic movement
    for (let i = 0; i < amountOfFormPoints; i++) {
      x[i] += p.random(-stepSize, stepSize);
      y[i] += p.random(-stepSize, stepSize);

      // Draw a small ellipse at each point position
      p.ellipse(x[i] + centerX, y[i] + centerY, 5, 5);
    }

    // Start drawing the curved shape
    p.beginShape();

    // Duplicate the first point at the beginning for smooth curve
    p.curveVertex(x[0] + centerX, y[0] + centerY);

    // Draw curve vertices for all points
    for (let i = 0; i < amountOfFormPoints; i++) {
      p.curveVertex(x[i] + centerX, y[i] + centerY);
    }

    // Duplicate the first point at the end for smooth closing
    p.curveVertex(x[0] + centerX, y[0] + centerY);

    // Also duplicate the last point for better curve smoothing
    p.curveVertex(
      x[amountOfFormPoints - 1] + centerX,
      y[amountOfFormPoints - 1] + centerY
    );

    // Finish drawing the shape
    p.endShape();
  };

  // Clear the canvas when mouse is pressed
  p.mousePressed = function () {
    p.background(255);
  };
}

new p5(shape);
