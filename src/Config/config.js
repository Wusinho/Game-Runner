import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: document.getElementById("canvas"),
  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 2 },
      debug: true,
    },
  },
};
