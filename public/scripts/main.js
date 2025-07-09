// src/main.js

import { MainScene } from './scenes/MainScene.js';

const config = {
  type: Phaser.AUTO,
  width: 512,
  height: 512,
  pixelArt: true,
  parent: 'phaser-example',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [MainScene]
};

new Phaser.Game(config);

