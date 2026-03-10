// src/scenes/enemyintro.js

import { Texts } from '../utils/translations.js';
import { fontScale, TextStyles } from '../utils/ui.js';

export class EnemyIntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'enemyintro' });
  }

  create() {

    const { md } = fontScale(this);

    const { width, height } = this.sys.game.config;

    this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);

    const message = this.add.text(width / 2, height / 1.4, Texts.loading, {
      fontSize: `${md}px`,
      ...TextStyles.success
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: message,
      alpha: 1,
      yoyo: true,
      duration: 2000
    });

    this.time.delayedCall(5000, () => {
      this.scene.start('game');
    });

  }
}
