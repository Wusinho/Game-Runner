import Phaser from "phaser";
import Button from "../Objects/Button";

export default class gameOver extends Phaser.Scene {
  constructor() {
    super("game-over");
  }
  preload() {}

  create() {
    const text = this.add.text(400, 250, "GameOver");
    text.setOrigin(0.5, 0.5);

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
