// src/scenes/mainmenu.js

import { Texts } from '../utils/translations.js';
import { Settings } from '../settings.js';
import { fontScale, TextStyles } from '../utils/ui.js';

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainmenu' });
    }

    create() {
        const { md, sm } = fontScale(this);
        const { width, height } = this.sys.game.config;

        const bg = this.add.image(0, 0, 'start_screen')
          .setOrigin(0, 0)
          .setScrollFactor(0)
          .setDepth(-10);

        const resizeBg = () => bg.setDisplaySize(this.scale.width, this.scale.height);
        resizeBg();
        this.scale.on('resize', resizeBg);

        // Botón Jugar
        const btnStart = this.add.text(width / 2, height * 0.6, Texts.newGame, {
            fontSize: `${md}px`,
            ...TextStyles.success
        }).setOrigin(0.5).setInteractive();

        btnStart.on('pointerdown', () => {
            Settings.resetGameState();
            this.sound.stopAll();
            this.scene.start('prelevel');
        });

        // Botón Ver Controles
        const btnControls = this.add.text(width / 2, height * 0.72, Texts.viewControls, {
            fontSize: `${sm}px`,
            ...TextStyles.base
        }).setOrigin(0.5).setInteractive();

        btnControls.on('pointerdown', () => {
            this.scene.start('controlspowers');
        });
    }
}