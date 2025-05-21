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
    p.createP(axiom);
    turtle();
    let button = p.createButton("generate");
    button.mousePressed(generate);
  };

  function turtle() {
    p.background(51);
    p.translate(p.width / 2, p.height);
    p.stroke("#b494ea");
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i);

      if (current == "F") {
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
      } else if (current == "+") {
        p.rotate(angle);
      } else if (current == "-") {
        p.rotate(-angle);
      } else if (current == "[") {
        p.push();
      } else if (current == "]") {
        p.pop();
      }
    }
  }

  p.draw = function () {};

  function generate() {
    len *= 0.5;
    var nextSentence = "";
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i);
      let found = false;
      for (let j = 0; j < rules.length; j++) {
        if (current == rules[j].a) {
          found = true;
          nextSentence += rules[j].b;
          break;
        }
      }
      if (!found) {
        nextSentence += current;
      }
    }
    sentence = nextSentence;
    p.createP(sentence);
    turtle();
  }
}
new p5(l_System_A_AB);
