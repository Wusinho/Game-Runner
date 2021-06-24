import Phaser from "phaser";
import config from "../Config/config";

const getScoreBox = document.getElementById("scoreBox");

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
  scoreText: "",
};
export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("sky", "./assets/sky.png");
    this.load.image("platform", "./assets/platform.png");
    this.load.image("floor", "./assets/platform2.png");
    this.load.image("star", "./assets/star.png");
    this.load.image("bomb", "./assets/bomb.png");
    // this.load.image("player", "./assets/dude.png");
    // this.load.image("dude", "./assets/dude.png");
    this.load.spritesheet("player", "./assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, "sky");

    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback: function (platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function (platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.playerJumps = 200;
    this.scoreText = "";

    this.addPlatform(config.width, config.width / 2);

    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      config.height / 2,
      "player"
    );
    this.player.setGravityY(gameOptions.playerGravity);

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup);

    this.input.on("pointerdown", this.jump, this);

    this.star = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });
    console.log(this.star.children.entries.length);

    this.star.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setGravity(-5, 100);
      child.setBounce(1);
      child.setCollideWorldBounds(true);
      child.setVelocity(Phaser.Math.Between(-200, 200), 100);
    });

    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.star, this.platformGroup);

    this.physics.add.overlap(this.player, this.star, collectStar, null, this);
    this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);
  }

  jump() {
    if (
      this.player.body.touching.down ||
      (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;
    }
  }

  update() {
    //gameOver
    if (this.player.y > config.height) {
      gameOptions.scoreText = 0;
      getScoreBox.innerText = 0;
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
  }
}

function collectStar() {
  this.star.disableBody(true, true);

  const valueBefore = gameOptions.score;
  gameOptions.score += 10;
  const valueAfter = gameOptions.score;
  gameOptions.scoreText = gameOptions.score;
  getScoreBox.innerText = gameOptions.score;

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

function hitBomb(player, bomb) {
  this.physics.pause();

  gameOver = true;
  if (gameOver) {
    gameOptions.scoreText = 0;
    getScoreBox.innerText = 0;

    this.scene.start("game-over", "game-over");
  }
}
