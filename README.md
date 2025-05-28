# Creative_Coding

<!-- prettier-ignore -->
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

- anotherone

```
let img;
let anotherImage;

function sketch_image(p) {
    p.preload = function() {
        // Bilder immer die selbe grösse!!! sonst das nicht gehen ↓
        img = p.loadImage("../Image/Kurome.png");
        anotherImage = p.loadImage("../Image/Akame.png");

    }

    p.setup = function () {
        p.createCanvas(500, 700);
        p.pixelDensity(1);
    }

    p.draw = function() {
        p.background(71);
        // p.image(img, 0, 0, 500, 700);
        // p.image(anotherImage, 0, 0, 500, 700);
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
```

## test user settings Json

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "telemetry.telemetryLevel": "off",
  "extensions.autoCheckUpdates": false,
  "extensions.autoUpdate": false,
  "update.mode": "none",
  "update.showReleaseNotes": false,
  "git.optimisticUpdate": false,
  "doki.statusbar.name": "夜刀神 十香",
  "workbench.tree.indent": 15,
  "workbench.colorCustomizations": {
    "tree.indentGuidesStroke": "#b494ea"
  },
  "editor.cursorBlinking": "smooth",
  "terminal.integrated.cursorStyle": "line",
  "editor.rulers": [80],
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "explorer.autoReveal": "focusNoScroll",
  "editor.stickyScroll.enabled": false,
  "github.copilot.enable": {
    "*": false,
    "plaintext": false,
    "markdown": false,
    "scminput": false
  },
  "files.autoSave": "afterDelay",

  // changing the comment color
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": ["comment.line.double-slash.js"],
        "settings": {
          "foreground": "#b494ea"
        }
      }
    ]
  }
}

```

## Netlify Status Badge

[![Netlify Status](https://api.netlify.com/api/v1/badges/cae83ece-902e-4dbc-a1a9-1b11b2a259aa/deploy-status)](https://app.netlify.com/projects/eragonis-cc/deploys)
