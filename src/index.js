import bootstrap from "bootstrap";
import "./main.scss";

import editMethod from "./Scenes/editMethod";
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
import { get } from "jquery";

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

window.game = new Game();

localStorage.setItem("default", JSON.stringify(new Score()));

const getForm = document.getElementById("form");

getForm.addEventListener("submit", (e) => {
  const name = document.getElementById("add-name");
  if (name) {
    const nameValue = name.value;
    editMethod("default", nameValue, "name");
    name.value = "";
  }

  e.preventDefault();
});
