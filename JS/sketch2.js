function sketch2(p) {
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
    };
    p.draw = function () {
        p.background(0, 0, 0, 2);
        for (let i = 0; i <= innerWidth; i+=10){
            p.circle(p.random(p.width), p.random(p.height), 5)
        }
    };
}

new p5(sketch2);