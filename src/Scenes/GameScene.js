import "phaser";
export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // this.load.image("logo", "/src/assets/logo.png");
    this.load.image("logo", "./assets/zenva_logo.png");
  }

  create() {
    this.add.image(400, 300, "logo");
  }
}
