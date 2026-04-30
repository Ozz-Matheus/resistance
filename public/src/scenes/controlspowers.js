// src/scenes/controlspowers.js

import { Texts } from '../utils/translations.js';
import { fontScale, TextStyles } from '../utils/ui.js';

export class ControlsPowers extends Phaser.Scene {
    constructor() {
        super({ key: 'controlspowers' });
    }

    create() {
        const { sm, md } = fontScale(this);
        const { width, height } = this.sys.game.config;

        const bg = this.add.image(0, 0, 'start_screen')
          .setOrigin(0, 0)
          .setScrollFactor(0)
          .setDepth(-10);

        const resizeBg = () => bg.setDisplaySize(this.scale.width, this.scale.height);
        resizeBg();
        this.scale.on('resize', resizeBg);

        this.add.rectangle(0, 0, width, height, 0x000000, 0.85).setOrigin(0);

        let currentY = height * 0.08;
        
        // Estilo de salto de línea automático
        const wrapStyle = { wordWrap: { width: width * 0.95, useAdvancedWrap: true } };

        this.add.text(width / 2, currentY, Texts.controlsTitle, {
            fontSize: `${sm}px`, align: 'center', ...TextStyles.base, ...wrapStyle
        }).setOrigin(0.5, 0);

        currentY += height * 0.20;
        this.add.text(width / 2, currentY, Texts.powerUpsTitle, {
            fontSize: `${sm}px`, align: 'center', ...TextStyles.base, ...wrapStyle
        }).setOrigin(0.5, 0);

        currentY += height * 0.18;
        this.add.text(width / 2, currentY, Texts.powerUpsList, {
            fontSize: `${sm}px`, align: 'center', ...TextStyles.base, ...wrapStyle
        }).setOrigin(0.5, 0);

        currentY += height * 0.25;
        this.add.text(width / 2, currentY, Texts.powerUpsFooter, {
            fontSize: `${sm}px`, align: 'center', ...TextStyles.base, ...wrapStyle
        }).setOrigin(0.5, 0);

        const btnBack = this.add.text(width / 2, height * 0.90, Texts.back, {
            fontSize: `${md}px`, ...TextStyles.success
        }).setOrigin(0.5).setInteractive();

        btnBack.on('pointerdown', () => {
            this.scene.start('mainmenu');
        });
    }
}