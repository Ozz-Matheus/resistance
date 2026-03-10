// src/scenes/gameover.js

import { SoundManager } from '../utils/soundManager.js';
import { Texts } from '../utils/translations.js';
import { Settings } from '../settings.js';
import { fontScale, TextStyles } from '../utils/ui.js';
import { createBackground } from '../utils/background.js';

export class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });
    }

    create() {

        const { title, sm } = fontScale(this);

        const { width, height } = this.sys.game.config;

        createBackground(this, -10);

        SoundManager.playMusic(this, 'gameover-music', { loop: false, volume: 0.6 });

        this.add.text(width / 2, height / 2, Texts.gameOver, {
            fontSize: `${title}px`,
            fontStyle: 'bold',
            ...TextStyles.danger
        }).setOrigin(0.5);

        if (Settings.getPoints() >= Settings.getRecord() * 0.9) {
          this.add.text(width / 2, height / 2 - 60, Texts.almostRecord, {
            fontSize: `${sm}px`,
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
