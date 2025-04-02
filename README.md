# Creative_Coding
|who     |what		 |when	    |
|--------|---------------|----------|
|Eragonis|Creative Coding|2025.31.03|
---
## Image nice collor
```
function sketch_image(p) {
    p.preload = function() {
        img = p.loadImage("../Image/Kurome.png")
    }

    p.setup = function () {
        p.createCanvas(450, 550);
        p.pixelDensity(1);
    }

    p.draw = function() {
        p.background(71);
        p.image(img, 0, 0, 450, 550);
        img.loadPixels();
        for(let i = 0; i < img.pixels.length; i += 4) {
            let red = img.pixels[i + 0];
            let green = img.pixels[i + 1];
            let blue = img.pixels[i + 2];
            let alpha = img.pixels[i + 3];
            img.pixels[i + 0] = 180;
            img.pixels[i + 1] = green;
            img.pixels[i + 2] = 324;
            img.pixels[i + 3] = alpha;
        }

        img.updatePixels();
    }
}

new p5(sketch_image);
```
