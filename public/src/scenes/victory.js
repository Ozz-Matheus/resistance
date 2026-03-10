// src/scenes/victory.js

import { SoundManager } from '../utils/soundManager.js';
import { Texts } from '../utils/translations.js';
import { Settings } from '../settings.js';
import { fontScale, TextStyles } from '../utils/ui.js';
import { createBackground } from '../utils/background.js';

export class VictoryScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'victory' });
    }

  create() {

    const { title, body, md, sm } = fontScale(this);

    const { width, height } = this.sys.game.config;

    createBackground(this, -10);

    SoundManager.playMusic(this, 'victory-music', { loop: false, volume: 0.6 });

    this.add.text(width / 2, height / 3, Texts.victory, {
      fontSize: `${title}px`,
      fontStyle: 'bold',
      ...TextStyles.success
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2, Texts.score(Settings.getPoints()), {
      fontSize: `${md}px`,
      ...TextStyles.base
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 50, Texts.record(Settings.getRecord()), {
      fontSize: `${sm}px`,
      ...TextStyles.base
    }).setOrigin(0.5);


    if (Settings.getPoints() >= Settings.getRecord()) {
      Settings.setRecord(Settings.getPoints());
      this.add.text(width / 2, height / 3 - 60, Texts.newRecord, {
        fontSize: `${body}px`,
        ...TextStyles.success
      }).setOrigin(0.5);
    }

    // Mostrar form para guardar Puntaje
    const score = Settings.getPoints();
    if (window.showPlayerScoreForm) {
      window.showPlayerScoreForm(score);
    }

    this.input.once('pointerdown', () => {
      this.sound.stopAll();
      this.scene.start('mainmenu');
    });
  }

}
