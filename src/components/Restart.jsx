import style from "./restart.module.css";
import Button from "./Button";

export default function Restart({ action, restartGame }) {
  return (
    <div className={style.container}>
      <h2 className={style.message}>
        You{" "}
        {action === "won" ? "have won! Play again?" : "just lost! Try again..."}
      </h2>
      <Button text="Restart Game!" callback={restartGame} />
    </div>
  );
}
