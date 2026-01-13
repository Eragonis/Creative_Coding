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
  "todohighlight.isCaseSensitive": true,
  "todohighlight.keywords": [
    {
      "text": "VIDEO",
      "color": "#333",
      "backgroundColor": "#3498db"
    },
    {
      "text": "FIXME",
      "color": "#333",
      "backgroundColor": "#e67e22"
    },
    {
      "text": "LEC",
      "color": "#333",
      "backgroundColor": "#f1c40f"
    },
    {
      "text": "BUG",
      "color": "#333",
      "backgroundColor": "#e74c3c"
    },
    {
      "text": "TODO",
      "color": "#333",
      "backgroundColor": "#2ecc71"
    }
  ],
  "editor.linkedEditing": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,

  // Those are used for the explorer intendation and colors
  "workbench.tree.indent": 15,
  "workbench.colorCustomizations": {
    "tree.indentGuidesStroke": "#b494ea"
  },
  "workbench.tree.renderIndentGuides": "always",

  // last line
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,

  //   Terminal
  "terminal.integrated.cursorStyle": "line",
  "git.confirmSync": false,
  "git.autofetch": true,
  "cSpell.enabled": false,
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "cSpell.overrides": [],
  "cSpell.customDictionaries": {},
  "cSpell.patterns": [],
  "workbench.colorTheme": "dfd05a73-c189-4622-87c7-573fbb3a46b9",
  "doki.statusbar.name": "夜刀神十香",
  "doki.sticker.css": "z-index:100;background-position:97% 96%",
  "github.copilot.enable": {
    "*": false,
    "plaintext": false,
    "markdown": false,
    "scminput": false,
    "html": true
  },
  "files.autoSave": "afterDelay",
  "doki.background.path": "C:\\Users\\stark\\OneDrive\\Bilder\\akame_swimm.webp",
  "doki.sticker.path": "/media/degi/T7/image/tohka_sticker_2.png",
  // "doki.sticker.path": "C:\\Users\\stark\\OneDrive\\Bilder\tohka_sticker_2.png",
  "doki.wallpaper.path": "C:\\Users\\stark\\OneDrive\\Desktop\\BFO\\Script\\src\\kurumi.jpg",

  "workbench.iconTheme": "material-icon-theme",
  "remote.defaultExtensionsIfInstalledLocally": [
    "GitHub.copilot",
    "GitHub.copilot-chat",
    "GitHub.vscode-pull-request-github"
  ],

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
  },
  "doki.wallpaper.enabled": true,
  "vsicons.dontShowNewVersionMessage": true,
  "github.copilot.nextEditSuggestions.enabled": true,
  "editor.pasteAs.preferences": [

  ]
}

```

## Netlify Status Badge

[![Netlify Status](https://api.netlify.com/api/v1/badges/cae83ece-902e-4dbc-a1a9-1b11b2a259aa/deploy-status)](https://app.netlify.com/projects/eragonis-cc/deploys)
