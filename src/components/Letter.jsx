import { useState } from "react";
import style from "./letter.module.css";

export default function Letter({ letter }) {
  const [classList, setClassList] = useState(style.basic);

  function setClass() {
    setClassList(style.success);
  }

  return (
    <p className={classList} onClick={setClass}>
      {letter}
    </p>
  );
}
