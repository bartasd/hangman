import { useState } from "react";
import style from "./letter.module.scss";

export default function Letter({ letter, phone, word, die }) {
  const [currentStyle, setCurrentStyle] = useState(style.basic);

  function phoneBack() {
    phone(letter);
    styleBorder();
  }

  function styleBorder() {
    currentStyle === style.basic &&
      setCurrentStyle((old) => {
        if (!word.includes(letter)) {
          die();
          return style.failure;
        }
        return style.success;
      });
  }

  return (
    <p className={currentStyle} onClick={phoneBack}>
      {letter}
    </p>
  );
}
