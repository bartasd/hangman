import style from "./hangman.module.scss";
import hm0 from "../img/hangman-0.svg";
import hm1 from "../img/hangman-1.svg";
import hm2 from "../img/hangman-2.svg";
import hm3 from "../img/hangman-3.svg";
import hm4 from "../img/hangman-4.svg";
import hm5 from "../img/hangman-5.svg";
import hm6 from "../img/hangman-6.svg";
import { useState, useEffect } from "react";

export default function Hangman({ life, definition }) {
  const [selectedHangman, setSelectedHangman] = useState(hm0);

  useEffect(() => {
    setSelectedHangman([hm6, hm5, hm4, hm3, hm2, hm1, hm0][life]);
  }, [life]);

  return (
    <div className={style.container}>
      <p>DESCRIPTION:</p>
      <p>{definition}</p>
      <img src={selectedHangman} alt="#" />
    </div>
  );
}
