// src/scenes/victory.js

import { SoundManager } from '../utils/soundManager.js';
import { Texts } from '../utils/translations.js';
import { Settings } from '../settings.js';
import { fontScale } from '../utils/ui.js';
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
      fill: '#00b83f',
      fontFamily: 'Verdana',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#006a00',
        blur: 6,
        fill: true
      }
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2, Texts.score(Settings.getPoints()), {
      fontSize: `${md}px`,
      fill: '#ffffff',
      fontFamily: 'Verdana',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#b7b7b7',
        blur: 4,
        fill: true
      }
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 50, Texts.record(Settings.getRecord()), {
      fontSize: `${sm}px`,
      fill: '#ffffff',
      fontFamily: 'Verdana',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#b7b7b7',
        blur: 4,
        fill: true
      }
    }).setOrigin(0.5);


    if (Settings.getPoints() >= Settings.getRecord()) {
      Settings.setRecord(Settings.getPoints());
      this.add.text(width / 2, height / 3 - 60, Texts.newRecord, {
        fontSize: `${body}px`,
        fill: '#00b83f',
        fontFamily: 'Verdana',
        shadow: {
          offsetX: 1,
          offsetY: 1,
          color: '#006a00',
          blur: 6,
          fill: true
        }
      }).setOrigin(0.5);
    }

    this.input.once('pointerdown', () => {
      this.sound.stopAll();
      this.scene.start('mainmenu');
    });
  }

}
