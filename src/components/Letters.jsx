import style from "./letters.module.css";
import Letter from "./Letter";

export default function Letters({ phoneBackApp }) {
  const abc = new Array(26).fill(65).map((e, i) => String.fromCharCode(e + i));

  function getLetter(letter) {
    phoneBackApp(letter);
  }

  return (
    <div className={style.container}>
      <p>Pick a Letter!</p>
      {abc.map((letter) => (
        <Letter key={letter} letter={letter} phone={getLetter} />
      ))}
    </div>
  );
}
