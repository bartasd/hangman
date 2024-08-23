import style from "./spinner.module.scss";

export default function Spinner() {
  const st = (l) => `${style.pl__dot} ${style[`pl__dot--${l}`]}`;

  return (
    <div className={style.container}>
      <div className={style.pl}>
        <div className={st("a")}></div>
        <div className={st("b")}></div>
        <div className={st("c")}></div>
        <div className={st("d")}></div>
      </div>
    </div>
  );
}
