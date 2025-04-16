let axiom = "F";

let rule = {
  a: "F",
  b: "FF+[+F-F-F]-[F+F+F]",
};

let drawRule;

const len = 4;
const ang = 22.5;

function l_system(p) {
  p.setup = function () {
    p.createCanvas(450, 450);
    p.background(255);
    //Translate the center
    p.translate(225, 250);
  };
  p.draw = function () {

    
    p.noLoop();

  }

  p.mousePressed = function () {
    createLindenmayerSystem();
  };

  // TODO Fix problem

  function createLindenmayerSystem() {
    //  prettier-ignore

    drawRule = {
    "F": () => {
      p.stroke("#b494ea");
      p.line(225, 225, 225, -len);
    },
    "f": () => p.line(225, 225,-len, -len + -len),
    "+": () => p.rotate(PI/180 * -ang),
    "-": () => p.rotate(PI/180 * -ang),
    "[": p.push,
    "]": p.pop,
  };
  }
}

new p5(l_system);
