import style from "./button.module.scss";
import React, { useState, useEffect } from "react";

export default function Button({ text, callback }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const changeGrad = () => {
      const ww = 3;
      const w = Math.abs(i) <= ww ? Math.abs(i) : ww;
      const x = 100 + w;
      const a = Math.abs(i) % x;
      const b = (a + w) % x;
      const c = (b + w) % x;

      const bkg = `linear-gradient(
            135deg,
            rgba(2, 0, 36, 1) ${a}%,
            rgba(9, 9, 121, 1) ${b}%,
            rgba(0, 212, 255, 1) ${c}%
          )`;

      const grad = document.getElementById("grad");
      const text = document.getElementById("text");
      if (grad && text) {
        grad.style.background = bkg;
        text.style.background = bkg;
        text.style.backgroundClip = "text";
      }

      setI((prevI) => {
        let newI = prevI + 1;
        if (newI === x) {
          return -ww;
        }
        return newI;
      });
    };

    const intervalId = setInterval(changeGrad, 30);

    return () => clearInterval(intervalId);
  }, [i]);

  return (
    <div onClick={callback} className={style.gradient} id="grad">
      <div className={style.overlay}>
        <p className={style.text} id="text">
          {text}
        </p>
      </div>
    </div>
  );
}
