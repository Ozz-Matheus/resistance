// src/scenes/mainmenu.js

import { Texts } from '../utils/translations.js';
import { Settings } from '../settings.js';
import { fontScale } from '../utils/ui.js';

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainmenu' });
    }

    create() {

        const { title, body } = fontScale(this);

        const { width, height } = this.sys.game.config;

        const bg = this.add.image(0, 0, 'start_screen')
          .setOrigin(0, 0)
          .setScrollFactor(0)
          .setDepth(-10);

        const resizeBg = () => {
          bg.setDisplaySize(this.scale.width, this.scale.height);
        };
        resizeBg();

        this.scale.on('resize', resizeBg);

        this.add.text(width / 2, height / 2 + 140, Texts.newGame, {
            fontSize: `${body}px`,
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

        this.input.once('pointerdown', () => {
            Settings.resetGameState();
            this.sound.stopAll();
            this.scene.start('prelevel');
        });
    }
}
