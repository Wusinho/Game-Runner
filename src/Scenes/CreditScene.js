import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    const text = this.add.text(400, 150, 'Instructions');
    const texto = this.add.text(400, 270, 'Jump using left click on your mouse, you can do it 2 times');
    const score = this.add.text(400, 290, 'You get points when you get the coins');
    const creditsName = this.add.text(400, 330, 'Evade the bombs and do not fall from the platforms');
    text.setOrigin(0.5, 0.5);
    texto.setOrigin(0.5, 0.5);
    score.setOrigin(0.5, 0.5);
    creditsName.setOrigin(0.5, 0.5);

    this.menuButton = new Button(
      this,
      400,
      500,
      'blueButton1',
      'blueButton2',
      'Menu',
      'Title',
    );
  }
}
