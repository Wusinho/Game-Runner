import Phaser from "phaser";
import config from "../Config/config";
import { editMethod,getStringLocal,getApi } from "../Modules/editMethod";
import leaderboard from "../Modules/apiScore"
import displayScoreboard from "../Modules/displayScoreboard"


const getTable = document.getElementById('table');

var gameOver = false;

let gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [100, 350],
  platformSizeRange: [50, 250],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 200,
  score: 0,
  coinPercent: 90,
};
export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("sky", "./assets/sky.png");
    this.load.image("platform", "./assets/platform.png");
    this.load.image("star", "./assets/star.png");
    this.load.image("bomb", "./assets/bomb.png");
    this.load.spritesheet("player", "./assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, "sky");
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.platformGroup = this.add.group({
      removeCallback: function (platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      removeCallback: function (platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.starGroup = this.add.group({
      removeCallback: (star) => {
        star.scene.starPool.add(star);
      },
    });

    this.starPool = this.add.group({
      removeCallback: (star) => {
        star.scene.starGroup.add(star);
      },
    });

    this.playerJumps = 200;

    this.addPlatform(config.width, config.width / 2);

    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      config.height / 2,
      "player"
    );

    this.player.setGravityY(gameOptions.playerGravity);

    this.physics.add.collider(this.player, this.platformGroup);

    // this.input.on("pointerdown", this.jump, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.bombs = this.physics.add.group();

    this.physics.add.overlap(
      this.player,
      this.starGroup,
      this.collectStar,
      null,
      this
    );
    this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);
    this.physics.add.collider(this.bombs, this.platformGroup);
    this.physics.add.collider(this.bombs, this.bombs);

    this.scoreText = this.add.text(16, 16, `score: ${gameOptions.score}`, {
      fontSize: '52px',
      fill: '#f9f9f9',
    });

    this.scoreText.setDepth(4);



  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.starGroup.killAndHide(star);
    this.starGroup.remove(star);

    const valueBefore = gameOptions.score;
    gameOptions.score += 10;
    this.scoreText.setText(`score: ${gameOptions.score}`);
    const valueAfter = gameOptions.score;

    if (valueBefore < valueAfter) {
      var x =
        this.player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      this.bomb = this.bombs.create(x, 16, "bomb");
      this.bomb
        .setBounce(1)
        .setCollideWorldBounds(true)
        .setVelocity(Phaser.Math.Between(-200, 200), 100);
      this.bomb.allowGravity = false;
    }
  }

  jump() {
  
    // const touchDowm = this.player.body.touching.down;
    // const { playerJumps } = this;
    // if (
    //   !this.dying &&
    //   (touchDowm || (playerJumps > 0 && playerJumps < gameOptions.jumps))
    // ) {
    //   // this.jumpSound.play();
    //   if (this.player.body.touching.down) {
    //     this.playerJumps = 0;
    //   }
    //   this.player.setVelocityY(gameOptions.jumpForce * -1);
    //   this.playerJumps += 1;
    //   // this.player.anims.play("jump");
    // }
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-600);
      this.player.x = this.player.x - 200;
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(600);
      this.player.x = this.player.x + 200;

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    if (this.cursors.space.isDown) {
      this.player.setVelocityY(-330);
    }

    //gameOver
    if (this.player.y > config.height) {

      editMethod("default", gameOptions.score, "score");

      sendAndGet()
      
      gameOptions.score = 0;
      this.scene.start("game-over", "game-over");
    }
    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = config.width;
    this.platformGroup.getChildren().forEach(function (platform) {
      let platformDistance =
        config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      var nextPlatformWidth = Phaser.Math.Between(
        gameOptions.platformSizeRange[0],
        gameOptions.platformSizeRange[1]
      );
      this.addPlatform(nextPlatformWidth, config.width + nextPlatformWidth / 2);
    }
  }

  addPlatform(platformWidth, posX) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, config.height * 0.8, "platform");
      platform.setImmovable(true);
      platform.setVelocityX(gameOptions.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0],
      gameOptions.spawnRange[1]
    );
    if (Phaser.Math.Between(1, 50) <= gameOptions.coinPercent) {
      if (this.starPool.getLength()) {
        const star = this.starPool.getFirst();
        // star.x = posX;
        // star.alpha = 1;
        // star.active = true;
        // star.visible = true;
        this.starPool.remove(star);
      } else {
        const star = this.physics.add.sprite(posX, 96, "star");
        star.setGravity(-5, 100);
        star.setBounce(1);
        star.setCollideWorldBounds(true);
        star.setVelocity(Phaser.Math.Between(-200, 200), 100);

        this.starGroup.add(star);
      }
    }
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  gameOver = true;
  if (gameOver) {
    editMethod("default", gameOptions.score, "score");
  
    sendAndGet()
    gameOptions.score = 0;

    this.scene.start("game-over", "game-over");
  }
}

function sendAndGet(){
  leaderboard.addScore(getStringLocal())
  displayScoreboard()
    
}