// src/index.js

import { Game } from './scenes/game.js';
import { MainMenu } from './scenes/mainmenu.js';
import { GameOver } from './scenes/gameover.js';
import { VictoryScreen } from './scenes/victory.js';
import { PreLevelScene } from './scenes/prelevel.js';
import { EnemyIntroScene } from './scenes/enemyintro.js';
import { LevelPassedScene } from './scenes/levelpassed.js';
import { StartScene } from './scenes/start.js';

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;
const DPR = Math.min(window.devicePixelRatio || 1, 2); // límite por rendimiento

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  resolution: DPR,
  scene: [
    StartScene,
    MainMenu,
    PreLevelScene,
    EnemyIntroScene,
    Game,
    GameOver,
    VictoryScreen,
    LevelPassedScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    expandParent: true,
    //parent: null,
  }
};

const game = new Phaser.Game(config);
window.addEventListener('resize', () => game.scale.refresh());
