function sketch1(p) {
    p.setup = function () {
        p.createCanvas(450, 450);
        p.background(0);
    };
    p.draw = function () {
        p.background(0);
        for (let i = 0; i < 20; i++){
            p.square(p.random(255), p.random(255), p.random(20,255))
        }
    };
}

new p5(sketch1);