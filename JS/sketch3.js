let size = 50;


function sketch3(p) {
    p.setup = function () {
        p.createCanvas(450, 450);
        p.strokeWeight(2);
        generatePattern();
    };

function generatePattern() {
    p.background(255);
    for(let y = 0; y < p.height; y += size) {
        for(let x = 0; x < p.width; x += size) {
            if(p.random() > 0.5) {
                p.line(x,y,x + size, y + size);
            } else {
                p.line(x,y + size, x + size, y);
            }
        };
    };  
}    
    p.mousePressed = function() {
        generatePattern();
    }

}

new p5(sketch3);
