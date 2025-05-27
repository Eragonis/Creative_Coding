function sketch_sin_cos(p) {
  let circleX = 200;
  let circleY = 150;
  let circleRadius = 75;

  let graphX = 50;
  let graphY = 300;
  let graphAmplitude = 50;
  let graphPeriod = 300;

  // Position oben rechts, nach links verschoben
  let startX = 260;
  let startY = 40;
  let lineHeight = 20;

  p.setup = function () {
    p.createCanvas(400, 400);
    p.angleMode(p.DEGREES);
  };

  p.draw = function () {
    p.background(0);

    let angle = p.frameCount % 360;

    p.fill(255);
    p.textSize(20);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`angle: ${angle}`, 25, 25);

    // Kreis & Achsen
    p.noFill();
    p.stroke(128);
    p.strokeWeight(3);
    p.circle(circleX, circleY, 2 * circleRadius);
    p.line(circleX, circleY - circleRadius, circleX, circleY + circleRadius);
    p.line(circleX - circleRadius, circleY, circleX + circleRadius, circleY);

    // Punkte auf Kreis berechnen
    let cosX = circleX + circleRadius * p.cos(angle);
    let sinY = circleY - circleRadius * p.sin(angle);
    let sinX = cosX; // für das Dreieck

    // Linien vom Mittelpunkt zum Punkt (P), und von Cosinus-Projektion zum Punkt (P)
    p.stroke("#b494ea");
    p.strokeWeight(2);
    p.line(circleX, circleY, cosX, sinY); // Mittelpunkt zu Punkt P
    p.line(cosX, circleY, cosX, sinY); // Cosinus zu Punkt P

    p.noStroke();

    // Mittelpunkt M (weiß)
    p.fill("white");
    p.circle(circleX, circleY, 10);

    // Cosinus-Projektion C (orange)
    p.fill("orange");
    p.circle(cosX, circleY, 10);

    // Sinus-Punkt im Kreis (grün)
    p.fill("red");
    p.circle(circleX, sinY, 10);

    // Punkt auf Kreis P (lila, Dreieckspunkt)
    p.fill("lime");
    p.circle(cosX, sinY, 10);

    // Dreiecksfläche berechnen (M, C, P)
    let area = Math.abs(
      (circleX * (circleY - sinY) +
        cosX * (sinY - circleY) +
        cosX * (circleY - circleY)) /
        2
    );

    // Dreieck zeichnen
    p.stroke("#b494ea");
    p.strokeWeight(2);
    p.fill("#b494ea55");
    p.beginShape();
    p.vertex(circleX, circleY);
    p.vertex(cosX, circleY);
    p.vertex(cosX, sinY);
    p.endShape(p.CLOSE);

    // Oben rechts: M, C, P, A untereinander mit Positionen ohne Outline, nur Farbe
    p.stroke(0);
    p.textSize(14);
    p.textAlign(p.LEFT, p.CENTER);

    p.fill("white");
    p.text(
      `M: (${circleX.toFixed(1)}, ${circleY.toFixed(1)})`,
      startX + 15,
      startY
    );

    p.fill("orange");
    p.text(
      `C: (${cosX.toFixed(1)}, ${circleY.toFixed(1)})`,
      startX + 15,
      startY + lineHeight
    );

    p.fill("lime");
    p.text(
      `P: (${circleX.toFixed(1)}, ${sinY.toFixed(1)})`,
      startX + 15,
      startY + 2 * lineHeight
    );

    p.fill("#b494ea");
    p.text(`A: ${area.toFixed(2)}`, startX + 15, startY + 3 * lineHeight);

    // --- Sinus / Cosinus Graph ---

    p.stroke("grey");
    p.strokeWeight(3);
    p.line(graphX, graphY, graphX + 300, graphY);
    p.line(graphX, graphY - graphAmplitude, graphX, graphY + graphAmplitude);
    p.line(
      graphX + graphPeriod,
      graphY - graphAmplitude,
      graphX + graphPeriod,
      graphY + graphAmplitude
    );

    p.fill("grey");
    p.strokeWeight(1);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("0", graphX, graphY + graphAmplitude + 20);
    p.text("360", graphX + graphPeriod, graphY + graphAmplitude + 20);
    p.text("1", graphX / 2, graphY - graphAmplitude);
    p.text("0", graphX / 2, graphY);
    p.text("-1", graphX / 2, graphY + graphAmplitude);

    p.fill("orange");
    p.text("cos", graphX + graphPeriod + graphX / 2, graphY - graphAmplitude);
    p.fill("red");
    p.text("sin", graphX + graphPeriod + graphX / 2, graphY);

    // Cosinus-Kurve
    p.noFill();
    p.stroke("orange");
    p.beginShape();
    for (let t = 0; t <= 360; t++) {
      let x = p.map(t, 0, 360, graphX, graphX + graphPeriod);
      let y = graphY - graphAmplitude * p.cos(t);
      p.vertex(x, y);
    }
    p.endShape();

    // Sinus-Kurve (rot)
    p.noFill();
    p.stroke("red");
    p.beginShape();
    for (let t = 0; t <= 360; t++) {
      let x = p.map(t, 0, 360, graphX, graphX + graphPeriod);
      let y = graphY - graphAmplitude * p.sin(t);
      p.vertex(x, y);
    }
    p.endShape();

    // bewegliche Linie auf dem Graphen
    let lineX = p.map(angle, 0, 360, graphX, graphX + graphPeriod);
    p.stroke("grey");
    p.line(lineX, graphY - graphAmplitude, lineX, graphY + graphAmplitude);

    // Punkte auf dem Graphen
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
