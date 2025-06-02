function sketch_sin_cos(p) {
  // Circle parameters for the main unit circle
  let circleX = 200; // X position of the circle center
  let circleY = 150; // Y position of the circle center
  let circleRadius = 75; // Radius of the circle

  // Parameters for the sine/cosine graph below the circle
  let graphX = 50; // X position of graph origin (left)
  let graphY = 300; // Y position of graph origin (middle line)
  let graphAmplitude = 50; // Amplitude (height) of sine and cosine waves
  let graphPeriod = 300; // Length (width) of one full period in pixels

  // Position for displaying values (top-right corner, shifted left)
  let startX = 260;
  let startY = 40;
  let lineHeight = 20;

  p.setup = function () {
    p.createCanvas(400, 400);
    p.angleMode(p.DEGREES); // Use degrees instead of radians for angles
  };

  p.draw = function () {
    p.background(0);

    // Current angle in degrees, cycling from 0 to 359 based on frame count
    let angle = p.frameCount % 360;

    // Display the current angle value
    p.fill(255);
    p.textSize(20);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`angle: ${angle}`, 25, 25);

    // Draw the unit circle and its axes (horizontal and vertical)
    p.noFill();
    p.stroke(128);
    p.strokeWeight(3);
    p.circle(circleX, circleY, 2 * circleRadius);
    p.line(circleX, circleY - circleRadius, circleX, circleY + circleRadius);
    p.line(circleX - circleRadius, circleY, circleX + circleRadius, circleY);

    // Calculate positions of points on the circle for cosine and sine
    let cosX = circleX + circleRadius * p.cos(angle); // X of point on circle using cosine
    let sinY = circleY - circleRadius * p.sin(angle); // Y of point on circle using sine (inverted Y axis)
    let sinX = cosX; // For drawing the triangle

    // Draw lines from center (M) to point P, and from cosine projection (C) to P
    p.stroke("#b494ea");
    p.strokeWeight(2);
    p.line(circleX, circleY, cosX, sinY); // Line M to P
    p.line(cosX, circleY, cosX, sinY); // Line C to P

    p.noStroke();

    // Draw the center point M (white)
    p.fill("white");
    p.circle(circleX, circleY, 10);

    // Draw cosine projection point C (orange)
    p.fill("orange");
    p.circle(cosX, circleY, 10);

    // Draw sine point on circle (red)
    p.fill("red");
    p.circle(circleX, sinY, 10);

    // Draw point P on the circle (lime)
    p.fill("lime");
    p.circle(cosX, sinY, 10);

    // Calculate the area of the triangle formed by points M, C, P using the shoelace formula
    let area = Math.abs(
      (circleX * (circleY - sinY) +
        cosX * (sinY - circleY) +
        cosX * (circleY - circleY)) /
        2
    );

    // Convert area from pixels squared to square centimeters (assuming 37.8 pixels per cm at 96 DPI)
    let pixelsPerCm = 37.8;
    let areaInCm2 = area / (pixelsPerCm * pixelsPerCm);

    // Draw the triangle (M, C, P) with semi-transparent fill
    p.stroke("#b494ea");
    p.strokeWeight(2);
    p.fill("#b494ea55");
    p.beginShape();
    p.vertex(circleX, circleY);
    p.vertex(cosX, circleY);
    p.vertex(cosX, sinY);
    p.endShape(p.CLOSE);

    // Display coordinates and area values in the top-right corner
    p.stroke(0);
    p.textSize(14);
    p.textAlign(p.LEFT, p.CENTER);

    p.fill("white");
    p.text(
      `M: (${circleX.toFixed(1)}, ${circleY.toFixed(1)})`,
      startX + 20,
      startY
    );

    p.fill("orange");
    p.text(
      `C: (${cosX.toFixed(1)}, ${circleY.toFixed(1)})`,
      startX + 20,
      startY + lineHeight
    );

    p.fill("red");
    p.text(
      `S: (${circleX.toFixed(1)}, ${sinY.toFixed(1)})`,
      startX + 20,
      startY + 2 * lineHeight
    );

    p.fill("lime");
    p.text(
      `P: (${cosX.toFixed(1)}, ${sinY.toFixed(1)})`,
      startX + 20,
      startY + 3 * lineHeight
    );

    p.fill("#b494ea");
    p.text(`A: ${area.toFixed(2)} px²`, startX + 20, startY + 4 * lineHeight);
    p.text(
      `A: ${areaInCm2.toFixed(4)} cm²`,
      startX + 20,
      startY + 5 * lineHeight
    );

    // --- Draw sine and cosine graph below the circle ---

    p.stroke("grey");
    p.strokeWeight(3);

    // Draw x-axis of graph
    p.line(graphX, graphY, graphX + 300, graphY);

    // Draw y-axis (amplitude lines)
    p.line(graphX, graphY - graphAmplitude, graphX, graphY + graphAmplitude);

    // Draw vertical line for one full period (360 degrees)
    p.line(
      graphX + graphPeriod,
      graphY - graphAmplitude,
      graphX + graphPeriod,
      graphY + graphAmplitude
    );

    // Draw axis labels
    p.fill("grey");
    p.strokeWeight(1);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("0", graphX, graphY + graphAmplitude + 20);
    p.text("360", graphX + graphPeriod, graphY + graphAmplitude + 20);
    p.text("1", graphX / 2, graphY - graphAmplitude);
    p.text("0", graphX / 2, graphY);
    p.text("-1", graphX / 2, graphY + graphAmplitude);

    // Labels for cosine and sine curves
    p.fill("orange");
    p.text("cos", graphX + graphPeriod + graphX / 2, graphY - graphAmplitude);

    p.fill("red");
    p.text("sin", graphX + graphPeriod + graphX / 2, graphY);

    // Draw the cosine curve
    p.noFill();
    p.stroke("orange");
    p.beginShape();
    for (let t = 0; t <= 360; t++) {
      let x = p.map(t, 0, 360, graphX, graphX + graphPeriod);
      let y = graphY - graphAmplitude * p.cos(t);
      p.vertex(x, y);
    }
    p.endShape();

    // Draw the sine curve
    p.noFill();
    p.stroke("red");
    p.beginShape();
    for (let t = 0; t <= 360; t++) {
      let x = p.map(t, 0, 360, graphX, graphX + graphPeriod);
      let y = graphY - graphAmplitude * p.sin(t);
      p.vertex(x, y);
    }
    p.endShape();

    // Draw moving vertical line that corresponds to the current angle on the graph
    let lineX = p.map(angle, 0, 360, graphX, graphX + graphPeriod);
    p.stroke("grey");
    p.line(lineX, graphY - graphAmplitude, lineX, graphY + graphAmplitude);

    // Draw circles on the sine and cosine curves at the current angle position
    let orangeY = graphY - graphAmplitude * p.cos(angle);
    let redY = graphY - graphAmplitude * p.sin(angle);

    p.noStroke();

    p.fill("orange");
    p.circle(lineX, orangeY, 10);

    p.fill("red");
    p.circle(lineX, redY, 10);
  };
}

new p5(sketch_sin_cos);
