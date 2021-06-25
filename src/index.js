import "./main.scss";

import { setLocalObject,getLocal,setDefaultName } from "./Modules/editMethod";
import displayScoreboard from "./Modules/displayScoreboard"
import getData from "./Modules/getData"
import Phaser from "phaser";
import Model from "./Model";
import config from "./Config/config";
import GameScene from "./Scenes/GameScene";
import BootScene from "./Scenes/BootScene";
import PreloaderScene from "./Scenes/PreloaderScene";
import TitleScene from "./Scenes/TitleScene";
import OptionsScene from "./Scenes/OptionsScene";
import CreditsScene from "./Scenes/CreditScene";
import gameOver from "./Scenes/gameOver";
import Score from "./Score";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Boot", BootScene);
    this.scene.add("GameOver", gameOver);
    this.scene.add("Preloader", PreloaderScene);
    this.scene.add("Title", TitleScene);
    this.scene.add("Options", OptionsScene);
    this.scene.add("Credits", CreditsScene);
    this.scene.add("Game", GameScene);
    this.scene.start("Boot");
    const model = new Model();
    const score = new Score();
    this.globals = { model, score, bgMusic: null };
  }
}

const getScoreBox = document.getElementById("playerGreeting");
const getForm = document.getElementById("form");


new Game();
setDefaultName()
getScoreBox.innerText = `Hello ${getLocal().user}`


getForm.addEventListener("submit", (e) => {
  const name = document.getElementById("add-name");
  if (name) {
    const nameValue = name.value;
    const newScore = new Score(nameValue);
    setLocalObject(newScore);
    getScoreBox.innerText = `Hello ${getLocal().user}`
    name.value = "";
  }

  e.preventDefault();
});





