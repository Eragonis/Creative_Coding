function sketch2(p) {
    p.setup = function () {
        p.createCanvas(450, 450);
        p.strokeWeight(2);

        for(let y = 0; y < p.height; y += 55) {
            for(let x = 0; x < p.width; x += 55) {
                let rd = p.random(255);
                p.fill(rd,rd,rd);
                p.circle(x,y,p.random(50));
            };
        };
    };
 
}

new p5(sketch2);