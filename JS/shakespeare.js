let myData;
const map1 = new Map();

function shakespeare(p) {
  p.preload = function () {
    myData = p.loadStrings("../Text/shakespeare.txt");
  };
  p.setup = function () {
    p.createCanvas(450, 450);
    p.background("#ffffff");

    // TODO mapp looping (jedes wort kontrolieren ob es vor komt und dan wort + 1)

    for (let i = 0; i < myData.length; i++) {
      const words = myData[i].split(" ").filter((word) => word.length > 0); // Filter out empty words
      for (let j = 0; j < words.length - 1; j++) {
        const currentWord = words[j];
        const nextWord = words[j + 1];

        if (!map1.has(currentWord)) {
          map1.set(currentWord, []);
        }
        map1.get(currentWord).push(nextWord);
      }
    }

    console.log(map1); // Print the map to the console

    // Generate a Markov chain-like sequence
    let currentWord = "the"; // Starting word
    let generatedText = currentWord;
    for (let i = 0; i < 10; i++) {
      // Generate 10 words
      const nextWords = map1.get(currentWord);
      if (nextWords && nextWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * nextWords.length);
        const nextWord = nextWords[randomIndex];
        generatedText += " " + nextWord;
        currentWord = nextWord;
      } else {
        break; // Stop if there are no more words in the chain
      }
    }
    console.log(generatedText); // Print the generated text
  };
}

new p5(shakespeare);
