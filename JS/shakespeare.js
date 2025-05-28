let myData;
const map1 = new Map();
let generatedText = "";

function shakespeare(p) {
  // Preload the Shakespeare text file before setup runs
  p.preload = function () {
    myData = p.loadStrings(
      "../Text/shakespeare.txt",
      function () {
        console.log("Text file loaded successfully.");
      },
      function () {
        console.error("Error loading the text file.");
      }
    );
  };

  p.setup = function () {
    p.createCanvas(450, 450);
    p.background("#ffffff");

    // Build the Markov chain map after loading the text
    for (let i = 0; i < myData.length; i++) {
      // Split each line into words, filter out empty strings
      const words = myData[i].split(" ").filter((word) => word.length > 0);

      for (let j = 0; j < words.length - 1; j++) {
        // Convert words to lowercase for consistency
        const currentWord = words[j].toLowerCase();
        const nextWord = words[j + 1].toLowerCase();

        // If the current word is not yet a key in the map, add it
        if (!map1.has(currentWord)) {
          map1.set(currentWord, []);
        }
        // Add the next word to the list of possible following words
        map1.get(currentWord).push(nextWord);
      }
    }

    console.log("Markov map:", map1);
  };

  // Generate new text and display it when mouse is pressed
  p.mousePressed = function () {
    // Get all keys (words) from the map and choose a random start word
    const keys = Array.from(map1.keys());
    let currentWord = keys[Math.floor(Math.random() * keys.length)];
    generatedText = currentWord;

    // Generate up to 500 words for performance
    for (let i = 0; i < 500; i++) {
      const nextWords = map1.get(currentWord);
      if (nextWords && nextWords.length > 0) {
        // Choose a random next word from the possible options
        const randomIndex = Math.floor(Math.random() * nextWords.length);
        const nextWord = nextWords[randomIndex];
        generatedText += " " + nextWord;
        currentWord = nextWord;
      } else {
        // No next words available, stop generating
        break;
      }
    }

    // Clear the canvas and prepare to display text
    p.background(255);
    p.textSize(12);
    p.fill(0);
    p.textAlign(p.LEFT, p.TOP);

    // Wrap the generated text to fit the canvas width
    const words = generatedText.split(" ");
    let lines = [];
    let currentLine = "";
    const maxLineWidth = p.width - 20; // 10px padding on each side
    let currentLineWidth = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const wordWidth = p.textWidth(word + " ");

      if (currentLineWidth + wordWidth <= maxLineWidth) {
        // Add word to current line if it fits
        currentLine += word + " ";
        currentLineWidth += wordWidth;
      } else {
        // Otherwise, push current line and start a new one
        lines.push(currentLine);
        currentLine = word + " ";
        currentLineWidth = wordWidth;
      }
    }

    if (currentLine.length > 0) {
      lines.push(currentLine); // Add the last line
    }

    // Display all lines on the canvas with line spacing
    let y = 10;
    for (let i = 0; i < lines.length; i++) {
      p.text(lines[i], 10, y);
      y += 18; // line height
    }
  };
}

new p5(shakespeare);
