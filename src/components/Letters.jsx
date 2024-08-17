import style from "./letters.module.css";
import Letter from "./Letter";

export default function Letters() {
  const abc = new Array(26).fill(65).map((e, i) => String.fromCharCode(e + i));

  return (
    <div className={style.container}>
      {abc.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </div>
  );
}
