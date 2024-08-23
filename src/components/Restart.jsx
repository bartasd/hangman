import style from "./restart.module.scss";
import Button from "./Button";

export default function Restart({ action, restartGame }) {
  return (
    <div className={style.container}>
      <p className={style.message}>
        You{" "}
        {action === "won"
          ? "have won! \nPlay again?"
          : "just lost! \nTry again..."}
      </p>

      <Button text="Restart Game!" callback={restartGame} />
    </div>
  );
}
