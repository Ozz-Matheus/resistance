// src/scenes/controlspowers.js

import { Texts } from '../utils/translations.js';
import { fontScale, TextStyles } from '../utils/ui.js';
import { createBackground } from '../utils/background.js';

export class ControlsPowers extends Phaser.Scene {
    constructor() {
        super({ key: 'controlspowers' });
    }

    create() {
        const { sm, md } = fontScale(this);

        // 1. Usamos tu fondo dinámico (ya no se deforma)
        createBackground(this, -10);

        // 2. Creamos la capa oscura (overlay)
        const overlay = this.add.rectangle(0, 0, 10, 10, 0x000000, 0.85).setOrigin(0);

        // 3. Creamos los textos (sin posición inicial, la calculamos abajo)
        const titleControls = this.add.text(0, 0, Texts.controlsTitle, {
            fontSize: `${sm}px`, align: 'center', ...TextStyles.base
        }).setOrigin(0.5, 0);

        const titlePowers = this.add.text(0, 0, Texts.powerUpsTitle, {
            fontSize: `${sm}px`, align: 'center', ...TextStyles.base
        }).setOrigin(0.5, 0);

        const listPowers = this.add.text(0, 0, Texts.powerUpsList, {
            fontSize: `${sm}px`, align: 'center', ...TextStyles.base
        }).setOrigin(0.5, 0);

        const footerPowers = this.add.text(0, 0, Texts.powerUpsFooter, {
            fontSize: `${sm}px`, align: 'center', ...TextStyles.base
        }).setOrigin(0.5, 0);

        const btnStart = this.add.text(0, 0, Texts.newGame, {
            fontSize: `${sm}px`, ...TextStyles.success
        }).setOrigin(0.5).setInteractive();

        btnStart.on('pointerdown', () => {
            this.scene.start('prelevel');
        });

        // 4. Función para acomodar todo dinámicamente
        const arrangeUI = () => {
            const w = this.scale.width;
            const h = this.scale.height;

            // Ajustar el overlay al tamaño de la pantalla
            overlay.setSize(w, h);

            // Ajustar el word wrap de los textos
            const wrapStyle = { width: w * 0.95, useAdvancedWrap: true };
            titleControls.setStyle({ wordWrap: wrapStyle });
            titlePowers.setStyle({ wordWrap: wrapStyle });
            listPowers.setStyle({ wordWrap: wrapStyle });
            footerPowers.setStyle({ wordWrap: wrapStyle });

            // Posicionar elementos basándonos en porcentajes de la altura
            let currentY = h * 0.08;
            titleControls.setPosition(w / 2, currentY);

            currentY += h * 0.20;
            titlePowers.setPosition(w / 2, currentY);

            currentY += h * 0.18;
            listPowers.setPosition(w / 2, currentY);

            currentY += h * 0.25;
            footerPowers.setPosition(w / 2, currentY);

            btnStart.setPosition(w / 2, h * 0.90);
        };

        // Ejecutar la primera vez
        arrangeUI();

        // Re-ejecutar si la pantalla cambia de tamaño
        this.scale.on('resize', arrangeUI);

        // Limpiar el evento
        this.events.once('shutdown', () => {
            this.scale.off('resize', arrangeUI);
        });
    }
}