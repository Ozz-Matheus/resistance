// src/scenes/levelpassed.js

import { SoundManager } from '../utils/soundManager.js';
import { Texts } from '../utils/translations.js';
import { loader } from './loader.js';
import { Settings } from '../settings.js';
import { Stars } from '../components/stars.js';
import { fontScale } from '../utils/ui.js';
import { createBackground } from '../utils/background.js';

export class LevelPassedScene extends Phaser.Scene {
  constructor() {
    super({ key: 'levelpassed' });
  }

  init() {
    this.stars = new Stars(this);
  }

  create() {

    const { body } = fontScale(this);

    const { width, height } = this.sys.game.config;

    createBackground(this, -10);

    SoundManager.playMusic(this, 'level-passed', { loop: false, volume: 0.6 });

    this.stars.create();

    const heading = this.add.text(width / 2, height / 3, Texts.levelPassed, {
      fontSize: `${body}px`,
      fontStyle: 'bold',
      fill: '#00b83f',
      fontFamily: 'Verdana',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#006a00',
        blur: 6,
        fill: true
      }
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: heading,
      alpha: 1,
      yoyo: true,
      duration: 1500
    });

    // Subir de nivel
    Settings.setLevel(Settings.getLevel() + 1);

    this.time.delayedCall(3500, () => {
      this.sound.stopAll();
      this.scene.start('prelevel');
    });
  }

  update() {
    this.stars.update();
  }
}
