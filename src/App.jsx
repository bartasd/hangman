import style from "./App.module.css";
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

  function lifesOut() {
    setLife((old) => (old - 1 > 0 ? old - 1 : 0));
  }

  function restartGame() {
    setLife(6);
    getWord();
  }

  async function getDefinition(word) {
    try {
      const request = new Request(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const response = await fetch(request);

      if (response.ok) {
        const data = await response.json();
        const defn = data[0].meanings[0].definitions[0].definition;
        setDefinition(defn);
      } else {
        getWord(); // pracekint ar nesidaro dvigubas f-ijos iskvietimas...
      }
    } catch (error) {
      getWord();
    }
  }

  async function getWord() {
    try {
      const request = new Request(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      const response = await fetch(request);

      if (response.ok) {
        const data = await response.json();
        setWord(data[0].toUpperCase());
        setVisualWord("_".repeat(data[0].length));
        getDefinition(data[0]);
      } else {
        console.error("Error fetching the word:", response.status);
      }
    } catch (error) {
      console.error("Error fetching the word:", error);
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
      setVisualWord(tempWord);
    }
  }

  return (
    <div className={style.container}>
      <img className={style.bkg} src={bkg} alt="#" />
      <div className={style.glass}>
        <h1 className={style.title}>HANGMAN</h1>
        <div className={style.game}>
          {life !== 0 ? (
            <Letters
              phoneBackApp={getPushedLetter}
              word={word}
              takeOutLife={lifesOut}
            />
          ) : (
            <Restart restartGame={restartGame} />
          )}
          <Hangman definition={definition} life={life} />
        </div>
        <div className={style.footer}>
          {[...visualWord].map((letter) => {
            return <span>{letter}</span>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
