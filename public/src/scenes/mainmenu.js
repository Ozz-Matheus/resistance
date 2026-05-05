// src/scenes/mainmenu.js

import { Texts } from '../utils/translations.js';
import { Settings } from '../settings.js';
import { fontScale, TextStyles } from '../utils/ui.js';
import { createBackground } from '../utils/background.js'; // Importamos tu fondo dinámico

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainmenu' });
    }

    create() {
        const { md, sm } = fontScale(this);
        const { width, height } = this.sys.game.config;

        // 1. Cargamos el fondo con comportamiento "cover"
        createBackground(this, -10);

        // 2. Colocamos el logo independiente (texto + esfera con fondo transparente)
        const logo = this.add.image(width / 2, height * 0.35, 'logo')
            .setOrigin(0.5)
            .setDepth(0);

        // 3. Función para mantener el logo centrado y escalado uniformemente
        const resizeLogoAndButtons = () => {
            const currentWidth = this.scale.width;
            const currentHeight = this.scale.height;

            // Centrar logo en X y colocarlo al 35% de la altura
            logo.setPosition(currentWidth / 2, currentHeight * 0.35);

            // Escalar el logo uniformemente (sin deformar)
            // Hacemos que ocupe como máximo el 80% del ancho de la pantalla
            // y ponemos un tope máximo de escala (ej. 1) para que no se pixele en PC
            const targetWidth = currentWidth * 0.8;
            const scale = Math.min(1, targetWidth / logo.width);
            logo.setScale(scale);
            
            // Re-posicionar botones por si cambia el alto de la pantalla
            btnStart.setPosition(currentWidth / 2, currentHeight * 0.65);
            btnControls.setPosition(currentWidth / 2, currentHeight * 0.77);
        };

        // Botón Jugar
        const btnStart = this.add.text(width / 2, height * 0.65, Texts.newGame, {
            fontSize: `${md}px`,
            ...TextStyles.success
        }).setOrigin(0.5).setInteractive();

        btnStart.on('pointerdown', () => {
            Settings.resetGameState();
            this.sound.stopAll();
            this.scene.start('prelevel');
        });

        // Botón Ver Controles
        const btnControls = this.add.text(width / 2, height * 0.77, Texts.viewControls, {
            fontSize: `${sm}px`,
            ...TextStyles.base
        }).setOrigin(0.5).setInteractive();

        btnControls.on('pointerdown', () => {
            this.scene.start('controlspowers');
        });

        // Llamamos al resize inicial y lo atamos al evento de Phaser
        resizeLogoAndButtons();
        this.scale.on('resize', resizeLogoAndButtons);

        // Limpieza de eventos
        this.events.once('shutdown', () => {
            this.scale.off('resize', resizeLogoAndButtons);
        });
    }
}