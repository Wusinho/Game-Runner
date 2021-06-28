import Phaser from "phaser";
import Button from "../Objects/Button";
import { getLocal } from "../Modules/editMethod";



export default class gameOver extends Phaser.Scene {
  constructor() {
    super("game-over");
  }
  preload() {}

  create() {
    const text = this.add.text(400, 250, "GameOver");
    const texto = this.add.text(400, 270, `Thanks for playing ${getLocal().user}`);
    const score = this.add.text(400, 290, `Your score is: ${getLocal().score}`);
    const creditsName = this.add.text(400, 330, `Credits: HEBER LAZO`);
    text.setOrigin(0.5, 0.5);
    texto.setOrigin(0.5, 0.5);
    score.setOrigin(0.5, 0.5);
    creditsName.setOrigin(0.5, 0.5);
    
    this.menuButton = new Button(
      this,
      400,
      500,
      "blueButton1",
      "blueButton2",
      "Menu",
      "Title"
    );
  }
}
