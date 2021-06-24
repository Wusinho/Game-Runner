import Phaser from "phaser";
import config from "../Config/config";

// var gamer;
// var platforms;
// var stars;
// var cursors;
// var score = 0;
// var scoreText;
// var gameOver = false;
// var bombs;
// var floor;
let gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [100, 350],
  platformSizeRange: [50, 250],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2,
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

    this.starGroup = this.add.group({
      removeCallback: function (star) {
        star.scene.starPool.add(star);
      },
    });

    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function (platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.starPool = this.add.group({
      removeCallback: function (star) {
        star.scene.starGroup.add(star);
      },
    });

    this.playerJumps = 1;
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

    this.star = this.physics.add.sprite(200, 450, "star");
    // this.star;
    // .setGravity(-5, 100)
    // .setCollideWorldBounds(true)
    // .setBounce(1)
    // .setVelocity(Phaser.Math.Between(-200, 200), 20);
    // this.physics.add.collider(this.stars, platforms);

    this.physics.add.overlap(this.player, this.star, collectStar, null, this);
    this.scoreText = this.add.text(10, 10, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });
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

  collectStar() {
    this.star.disableBody(true, true);
    gameOptions.score += 10;
    gameOptions.scoreText.setText("Score: " + gameOptions.score);

    // if (stars.countActive(true) === 0) {
    //   stars.children.iterate(function (child) {
    //     child.enableBody(true, child.x, 0, true, true);
    //   });

    //   var x =
    //     player.x < 400
    //       ? Phaser.Math.Between(400, 800)
    //       : Phaser.Math.Between(0, 400);

    //   var bomb = bombs.create(x, 16, "bomb");
    //   bomb.setBounce(1);
    //   bomb.setCollideWorldBounds(true);
    //   bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    //   bomb.allowGravity = false;
    // }
  }

  addStars(platformWidth, posX) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, config.height * 0.8, "star");
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

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText("Score: " + score);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  gameOver = true;
  if (gameOver) {
    this.scene.start("game-over", "game-over");
  }
}

// function addPlatform(X, Y, plat, scale) {
//   if (scale) {
//     return plat.create(X, Y, "ground").setScale(scale).refreshBody();
//   } else {
//     return plat.create(X, Y, "ground");
//   }
// }

// function randomNum() {
//   return Math.floor(Math.random() * (600 - 100)) + 100; // You can remove the Math.floor if you don't want it to be an integer
// }
