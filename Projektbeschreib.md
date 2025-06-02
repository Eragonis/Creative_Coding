# Sinus Cosinus mit Fläche

## Was macht das Projekt

- Es wird ein kreis angezeigt mit 4 Punkten:
  - <span style="color:#ffffff">M</span> Position vom mitelpunkt.
  - <span style="color:#ffa500">C</span> Position vom Cosinus.
  - <span style="color:#ff0000">S</span> Position vom Sinus.
  - <span style="color:#00ff00">P</span> Position vom Punkt.
- Oben Rechs werden dan die Punkte und auch noch de Fläche genauer dargestellt.
- unterhalb vom kreis giebt es ein diagram das zeigt wie der Sinus und Cosinus verlaufen.

---

## Code

- Einen Einheitskreis (mit Radius 75 Pixel).
- Den aktuellen Winkel (0–359 Grad, wechselt jede Sekunde).
- Den Punkt auf dem Kreis bei diesem Winkel.
- Die Werte von Sinus und Kosinus als Linien und Koordinaten.
- Ein kleines rechtwinkliges Dreieck, das Sinus und Cosinus bildlich zeigt.
- Eine Sinus- und Kosinuskurve unter dem Kreis.
- Eine laufende Linie, die den aktuellen Winkel auch in den Kurven zeigt.
- Die Fläche des Dreiecks M–C–P (als Pixel² und cm²).

### Nun Genauer

- Über P5js wird zuerst die ganzen variabel angegeben:
  ```
  let
  ```
- Dann kommt die setup funktion die kurz sagt wie gros das canvas ist und wandelt die radius anzeige das die <i>degrees</i> sind von angles.
- der gösste teil ist dan im draw fuktion (von p5js).
- Da wird die hintergrund farbe bestimt und wie der kreis aufgebaut ist.
- die ganzen farben grösen linien, ob es aus gefült werden soll oder nicht.
- Weiter unten bei zeile 44 wird die position von sinus und Kosinus berechnet-
- danach werden linien von M zu P und von C zu P gezeicnet (für später die flächen berechnung)
- Dann werden die ganzen punkte generiert mit farbe füllung und x,y position
- danach komt die umwandlung von pixel in cm für die flächen berechnung
- nun Kommt das dreieck für die fläche ganz gezeichnet das es sich immer anpast.
- Nun wird oben rechs die Kordinaten und das deklariert und angezeigt.
- nun wird das diagram unterhalb vom kreis generiert das anzeigt wie sich sinus und kosinus verhalten.

---

## Fazit

- Es hört sich sehr einfach an, aber so einfach ist es nicht.
  - Mit hilfe von Tutorials ist es aber sehr gut machbar

---

# Englisch

# Sine Cosine with Area

## What does the project do?

- A circle is displayed with 4 points:
- <span style="color:#ffffff">M</span> Position of the center.
- <span style="color:#ffa500">C</span> Position of the cosine.
- <span style="color:#ff0000">S</span> Position of the sine.
- <span style="color:#00ff00">P</span> Position of the point.
- The points and the area are displayed in more detail at the top right.
- Below the circle there is a diagram showing how the sine and cosine curves.

---

## Code

- A unit circle (with a radius of 75 pixels).
- The current angle (0–359 degrees, changes every second).
- The point on the circle at this angle.
- The sine and cosine values ​​as lines and coordinates.
- A small right-angled triangle that visually displays sine and cosine.
- A sine and cosine curve under the circle.
- A running line that also shows the current angle in the curves.
- The area of ​​the triangle M–C–P (as pixels² and cm²).

### Now in more detail

- The entire variable is first specified via P5js:

```
let
```

- Then comes the setup function, which briefly states how large the canvas is and converts the radius display, which is the <i>degrees</i>, from angles.
- The largest part is then in the draw function (of P5js).
- This is where the background color and how the circle is constructed are determined.
- The entire color, size lines, and whether it should be filled or not.
- Further down, at line 44, the position of sine and cosine is calculated.
- Then, lines are drawn from M to P and from C to P (for later area calculation).
- Then, all the points are generated with color, fill, and x, y position.
- Next, the pixels are converted to cm for area calculation.
- Now, the triangle for the area is drawn in its entirety so that it always adjusts.
- Now, the coordinates and other information are declared and displayed at the top right.
- Now, the diagram below the circle is generated, showing how sine and cosine behave.

---

## Conclusion

- It sounds very simple, but it's not that easy.
- With the help of tutorials, however, it's very doable.
