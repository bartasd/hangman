import style from "./App.module.scss";
import bkg from "./img/wallpaper.jpeg";
import Letters from "./components/Letters";
import Hangman from "./components/Hangman";
import { useState, useEffect } from "react";
import Restart from "./components/Restart";

function App() {
  const [word, setWord] = useState("");
  const [visualWord, setVisualWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [life, setLife] = useState(6);
  const [uncoveredLetters, setUncoveredLetters] = useState("");
  const [action, setAction] = useState("lost");

  const handleKeyboard = (event) => {
    console.log("Key pressed:", event.key);
  };

  function lifesOut() {
    setLife((old) => {
      const newLife = old - 1;
      if (newLife === 0) {
        revealWord();
      }
      return newLife;
    });
  }

  function revealWord() {
    const ul = [];
    [...word].forEach((l) => {
      if (!visualWord.includes(l)) {
        ul.push(l);
      }
    });
    setUncoveredLetters((old) => ul.join(""));
    setVisualWord((old) => word);
  }

  function restartGame() {
    setLife(6);
    setAction("lost");
    getWord();
    setUncoveredLetters("");
  }

  async function getDefinition(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
      const request = new Request(url);
      const response = await fetch(request);

      if (response.ok) {
        const data = await response.json();
        const defn = data[0].meanings[0].definitions[0].definition;
        setDefinition(defn);
      } else {
        getWord(); // pracekint ar nesidaro dvigubas f-ijos iskvietimas...
      }
    } catch (error) {
      console.error(
        "Unexpected error: definition API service ain't working..."
      );
      alert("Hangman encountered an unexpected error. Please try again later.");
    }
  }

  async function getWord() {
    const url = "https://random-word-api.herokuapp.com/word?number=1";
    let tryTimes = 0;

    // if word fails to fetch - try again - up to 3 times;...
    while (tryTimes < 3) {
      try {
        tryTimes++;
        const request = new Request(url);
        const response = await fetch(request);

        if (response.ok) {
          const data = await response.json();
          setWord(data[0].toUpperCase());
          console.log("Word is: ", data[0]);
          setVisualWord("_".repeat(data[0].length));
          getDefinition(data[0]);
          break;
        } else {
          console.log("Failed to fetch word. Status:", response.status);
          if (tryTimes === 3) {
            throw new Error("Failed to fetch word after 3 attempts");
          }
        }
      } catch (error) {
        if (tryTimes === 3) {
          console.error("Unexpected error:", error);
          alert(
            "Hangman encountered an unexpected error. Please try again later."
          );
        } else {
          console.error("Attempt failed with error:", error);
        }
      }
    }
  }

  useEffect(() => {
    getWord();
    // eslint-disable-next-line
  }, []);

  function getPushedLetter(letter) {
    if (word.includes(letter)) {
      const indexesOfLetter = [...word]
        .map((e, i) => [e, i])
        .filter((l) => l[0] === letter)
        .map((e) => e[1]);
      const tempWord = [...visualWord]
        .map((e, i) => (indexesOfLetter.includes(i) ? letter : e))
        .join("");
      if (!tempWord.includes("_")) {
        setAction("won");
      }
      setVisualWord(tempWord);
    }
  }

  return (
    <div className={style.container} tabIndex="0" onKeyDown={handleKeyboard}>
      <img className={style.bkg} src={bkg} alt="#" />
      <div className={style.glass}>
        <h1 className={style.title}>HANGMAN</h1>
        <div className={style.game}>
          {life !== 0 && action !== "won" ? (
            <Letters
              phoneBackApp={getPushedLetter}
              word={word}
              takeOutLife={lifesOut}
            />
          ) : (
            <Restart action={action} restartGame={restartGame} />
          )}
          <Hangman definition={definition} life={life} />
        </div>
        <div className={style.footer}>
          {[...visualWord].map((letter) => {
            const included = uncoveredLetters.includes(letter);
            const st = included ? "red" : "";
            return <span style={{ color: st }}>{letter}</span>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
