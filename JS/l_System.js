// Variables: A B
// axiom: A
// Rules: (A → AB), (B → A)

// Variables: F+-[]
// axiom: F
// Rules: F → FF+[+F-F-F]-[-F+F+F]

let angle;
let axiom = "F";
let sentence = axiom;
let len = 100;

// Define rules for L-system
let rules = [];
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]",
};

function l_System_A_AB(p) {
  p.setup = function () {
    p.createCanvas(400, 400);
    angle = p.radians(25);
    p.background(51);
    p.createP(axiom); // Display initial axiom as paragraph on page
    turtle(); // Draw initial sentence
    let button = p.createButton("generate"); // Create a button to generate next generation
    button.mousePressed(generate); // Attach event to button to call generate()
  };

  // Draw the L-system using turtle graphics approach
  function turtle() {
    p.background(51);
    p.translate(p.width / 2, p.height); // Start from bottom center of canvas
    p.stroke("#b494ea"); // Set stroke color

    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i);

      if (current == "F") {
        p.line(0, 0, 0, -len); // Draw forward line
        p.translate(0, -len); // Move forward
      } else if (current == "+") {
        p.rotate(angle); // Rotate right by angle
      } else if (current == "-") {
        p.rotate(-angle); // Rotate left by angle
      } else if (current == "[") {
        p.push(); // Save current drawing state
      } else if (current == "]") {
        p.pop(); // Restore previous drawing state
      }
    }
  }

  p.draw = function () {
    // No continuous drawing needed
  };

  // Generate the next generation string based on rules
  function generate() {
    len *= 0.5; // Reduce length for next generation for better fit
    var nextSentence = "";
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i);
      let found = false;

      // Apply rules if current character matches
      for (let j = 0; j < rules.length; j++) {
        if (current == rules[j].a) {
          found = true;
          nextSentence += rules[j].b;
          break;
        }
      }

      // If no rule applies, keep the current character
      if (!found) {
        nextSentence += current;
      }
    }
    sentence = nextSentence;
    p.createP(sentence); // Display new sentence string as paragraph
    turtle(); // Draw new generation
  }
}

new p5(l_System_A_AB);
