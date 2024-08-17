import style from "./App.module.css";
import bkg from "./img/wallpaper.jpeg";

function App() {
  return (
    <div className={style.container}>
      <img className={style.bkg} src={bkg} />
      <div className={style.glass}>
        <h1 className={style.title}>HANGMAN</h1>
        <div className={style.game}>
          {/* <Tab />
          <Hangman /> */}
        </div>
        <div className={style.footer}>HANGMAN</div>
      </div>
    </div>
  );
}

export default App;
