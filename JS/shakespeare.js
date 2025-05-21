let myData;
const map1 = new Map();
let generatedText = "";

function shakespeare(p) {
  p.preload = function () {
    myData = p.loadStrings(
      "../Text/shakespeare.txt",
      function () {
        console.log("Textdatei erfolgreich geladen.");
      },
      function () {
        console.error("Fehler beim Laden der Textdatei.");
      }
    );
  };

  p.setup = function () {
    p.createCanvas(450, 450);
    p.background("#ffffff");

    // Map für Markov-Kette aufbauen
    for (let i = 0; i < myData.length; i++) {
      const words = myData[i].split(" ").filter((word) => word.length > 0); // Filtere leere Wörter
      for (let j = 0; j < words.length - 1; j++) {
        const currentWord = words[j].toLowerCase(); // Kleinbuchstaben für einheitliche Wörter
        const nextWord = words[j + 1].toLowerCase();

        if (!map1.has(currentWord)) {
          map1.set(currentWord, []);
        }
        map1.get(currentWord).push(nextWord);
      }
    }

    console.log(map1); // Ausgeben der Map im Konsolenprotokoll
  };

  p.mousePressed = function () {
    // Generiere einen neuen Markov-Ketten-Text bei jedem Mausklick
    let currentWord = "the"; // Starte mit einem häufigen Wort wie "the"
    generatedText = currentWord;
    for (let i = 0; i < 1000; i++) {
      // Generiere maximal 1000 Wörter
      const nextWords = map1.get(currentWord);
      if (nextWords && nextWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * nextWords.length);
        const nextWord = nextWords[randomIndex];
        generatedText += " " + nextWord;
        currentWord = nextWord;
      } else {
        break; // Stoppe, wenn keine weiteren Wörter vorhanden sind
      }
    }

    // Text auf der Leinwand anzeigen
    p.background(255); // Bildschirm löschen
    p.textSize(12); // Textgröße einstellen
    p.fill(0); // Textfarbe schwarz
    p.textAlign(p.LEFT, p.TOP);

    // Text umbrechen, um auf der Leinwand zu passen
    let words = generatedText.split(" ");
    let lines = [];
    let currentLine = "";

    // Bestimme, wie viele Wörter pro Zeile passen (angepasst an die Canvas-Größe)
    const maxLineLength = p.width - 20; // Abzüglich 10px Puffer auf jeder Seite
    let currentLineWidth = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      // Berechne die Breite des aktuellen Wortes
      let wordWidth = p.textWidth(word + " ");
      if (currentLineWidth + wordWidth <= maxLineLength) {
        currentLine += word + " ";
        currentLineWidth += wordWidth;
      } else {
        lines.push(currentLine);
        currentLine = word + " ";
        currentLineWidth = wordWidth;
      }
    }
    if (currentLine) {
      lines.push(currentLine); // Die letzte Zeile hinzufügen
    }

    // Zeilen auf der Leinwand anzeigen
    let y = 10;
    for (let i = 0; i < lines.length; i++) {
      p.text(lines[i], 10, y);
      y += 18; // Zeilenabstand
    }
  };
}

new p5(shakespeare);
