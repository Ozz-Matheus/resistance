// public/scripts/main.js

import { MainScene } from './scenes/MainScene.js';

import StartScene from './scenes/StartScene.js';

const config = {
  type: Phaser.AUTO,
  width: 512,
  height: 512,
  pixelArt: true,
  parent: 'phaser-game-resistance',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [StartScene, MainScene]
};

new Phaser.Game(config);

