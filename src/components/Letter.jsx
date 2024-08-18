import { useState } from "react";
import style from "./letter.module.css";

export default function Letter({ letter, phone }) {
  const [classList, setClassList] = useState(style.basic);

  function setClass() {
    setClassList(style.success);
    phone(letter);
  }

  return (
    <p className={classList} onClick={setClass}>
      {letter}
    </p>
  );
}
