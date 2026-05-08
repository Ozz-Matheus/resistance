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
        const { md, sm } = fontScale(this);
        const { width, height } = this.sys.game.config;

        createBackground(this, -10);
        SoundManager.playMusic(this, 'gameover-music', { loop: false, volume: 0.6 });

        const currentLevel = Settings.getLevel();
        const gameOverMsg = Texts.gameOverMsg[currentLevel] || "Fin del juego";

        this.add.text(width / 2, height * 0.38, gameOverMsg, {
            fontSize: `${md}px`,
            align: 'center',
            wordWrap: { width: width * 0.95, useAdvancedWrap: true },
            ...TextStyles.danger
        }).setOrigin(0.5);

        if (Settings.getPoints() >= Settings.getRecord() * 0.9) {
          this.add.text(width / 2, height * 0.15, Texts.almostRecord, {
            fontSize: `${sm}px`,
            ...TextStyles.success
          }).setOrigin(0.5);
        }

        this.add.text(width / 2, height * 0.68, Texts.score(Settings.getPoints()), {
            fontSize: `${sm}px`,
            ...TextStyles.base
        }).setOrigin(0.5);

        
        this.add.text(width / 2, height * 0.85, Texts.retry, {
            fontSize: `${md}px`,
            ...TextStyles.success
        }).setOrigin(0.5);

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