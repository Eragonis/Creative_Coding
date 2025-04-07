let imgGlitch
let size = 50;

function sketch_glitch(p) {   
    p.preload = function() {
        imgGlitch = p.loadImage("../Image/Esdeath.png");
    }
    
    p.setup = function () {
        p.createCanvas(850, 680);
        p.pixelDensity(1);

        
        p.loadPixels();
        imgGlitch.loadPixels();
        for (let i = 0; i < imgGlitch.pixels.length; i += 4) {
            let red = imgGlitch.pixels[i + 0];
            let green = imgGlitch.pixels[i + 1];
            let blue = imgGlitch.pixels[i + 2];
            let alpha = imgGlitch.pixels[i + 3];
            
            p.pixels[i + 0] = red;
            p.pixels[i + 1] = green;
            p.pixels[i + 2] = blue;
            p.pixels[i + 3] = alpha;
        }
    
        imgGlitch.updatePixels()
        p.updatePixels();
    }

    function glitch(p) {
        p.background(255);
        for (let y = p.height / 2; y < p.height / 2 + 50; y += size) {
            for (let x = p.width / 2; x < p.width / 2 + 125; x += size) {
                const index = (x + y * width) * 4;
                p.pixels[index + 0] = 0;
                p.pixels[index + 1] = 0;
                p.pixels[index + 2] = 0;
            
            }
        }
        p.updatePixels();

    }
    p.mousePressed = function(p) {
        glitch(p);
    }

    
}

new p5(sketch_glitch);
