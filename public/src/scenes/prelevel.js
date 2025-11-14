// src/scenes/prelevel.js

import { Settings } from '../settings.js';
import { Texts } from '../utils/translations.js';
import { fontScale } from '../utils/ui.js';

export class PreLevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'prelevel' });
  }

  create() {

    const { title } = fontScale(this);

    const { width, height } = this.sys.game.config;

    const levelText = this.add.text(width / 2, height / 2, Texts.level(Settings.getLevel()), {
      fontSize: `${title}px`,
      fontStyle: 'bold',
      fill: '#00b83f',
      fontFamily: 'Verdana',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#006a00',
        blur: 8,
        fill: true
      }
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: levelText,
      alpha: 1,
      yoyo: true,
      duration: 2000,
    });

    this.time.delayedCall(4000, () => {
      this.scene.start('enemyintro');
    });
  }
}
