// src/scenes/levelpassed.js

import { SoundManager } from '../utils/soundManager.js';
import { Texts } from '../utils/translations.js';
import { loader } from './loader.js';
import { Settings } from '../settings.js';
import { Stars } from '../components/stars.js';
import { fontScale, TextStyles } from '../utils/ui.js';
import { createBackground } from '../utils/background.js';

export class LevelPassedScene extends Phaser.Scene {
  constructor() {
    super({ key: 'levelpassed' });
  }

  init() {
    this.stars = new Stars(this);
  }

  create() {
    const { md } = fontScale(this);
    const { width, height } = this.sys.game.config;

    createBackground(this, -10);
    SoundManager.playMusic(this, 'level-passed', { loop: false, volume: 0.6 });

    this.stars.create();

    const currentLevel = Settings.getLevel();
    const passMsg = Texts.levelPassedMsg[currentLevel] || "Nivel superado";

    const heading = this.add.text(width / 2, height / 2, passMsg, {
      fontSize: `${md}px`,
      align: 'center',
      wordWrap: { width: width * 0.95, useAdvancedWrap: true },
      ...TextStyles.success
    }).setOrigin(0.5).setAlpha(0);

    Settings.setLevel(currentLevel + 1);

    this.tweens.add({
      targets: heading,
      alpha: 1,
      duration: 1500,
      hold: 3000,
      yoyo: true
    });

    this.time.delayedCall(6000, () => {
      this.sound.stopAll();
      this.scene.start('prelevel');
    });
  }

  update() {
    this.stars.update();
  }
}