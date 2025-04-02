let img;
let anotherImage;

function sketch_image(p) {
    p.preload = function() {
        // Bilder immer die selbe grösse!!! sonst das nicht gehen ↓
        img = p.loadImage("../Image/Kurome.png");
        anotherImage = p.loadImage("../Image/Akame.png");

    }

    p.setup = function () {
        p.createCanvas(500, 674);
        p.pixelDensity(1);
    }

    p.draw = function() {
        p.background(71);
        // p.image(img, 0, 0, 500, 674);
        // p.image(anotherImage, 0, 0, 500, 674);
        p.loadPixels();
        img.loadPixels();
        anotherImage.loadPixels();
        for(let i = 0; i < img.pixels.length; i += 8) {
            let redIm1 = img.pixels[i + 0];
            let greenIm1 = img.pixels[i + 1];
            let blueIm1 = img.pixels[i + 2];
            let alphaIm1 = img.pixels[i + 3];
            
            let redIm2 = anotherImage.pixels[i + 4];
            let greenIm2 = anotherImage.pixels[i + 5];
            let blueIm2 = anotherImage.pixels[i + 6];
            let alphaIm2 = anotherImage.pixels[i + 7];
            
           p.pixels[i + 0] = 180;
           p.pixels[i + 1] = greenIm1;
           p.pixels[i + 2] = 324;
           p.pixels[i + 3] = alphaIm1;

           p.pixels[i + 4] = 180;
           p.pixels[i + 5] = greenIm2;
           p.pixels[i + 6] = 324;
           p.pixels[i + 7] = alphaIm2;
        }

        // img.updatePixels();

        // anotherImage.updatePixels();
        p.updatePixels();
    }
}

new p5(sketch_image);
