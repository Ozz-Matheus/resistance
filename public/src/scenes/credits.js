// src/scenes/credits.js

import { Texts } from '../utils/translations.js';
import { fontScale, TextStyles } from '../utils/ui.js';
import { createBackground } from '../utils/background.js';

export class CreditsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'credits' });
    }

    create() {
        const { md, sm } = fontScale(this);
        const { width, height } = this.sys.game.config;

        createBackground(this, -10);

        // Texto de créditos centrado, inicia justo abajo de la pantalla visible
        const creditsText = this.add.text(width / 2, height + 50, `${Texts.creditsTitle}\n\n${Texts.creditsText}`, {
            fontSize: `${sm}px`,
            align: 'center',
            lineSpacing: 10,
            ...TextStyles.base
        }).setOrigin(0.5, 0);

        // Botón Jugar de nuevo fijo abajo (aparece sutilmente con un fade-in)
        const btnPlayAgain = this.add.text(width / 2, height * 0.90, Texts.playAgain, {
            fontSize: `${md}px`,
            ...TextStyles.success
        }).setOrigin(0.5).setDepth(1000).setAlpha(0);

        // Animación: El texto sube y se repite en bucle infinito
        const scrollDuration = 38000; // 38 segundos de duración por vuelta
        this.tweens.add({
            targets: creditsText,
            y: -creditsText.displayHeight - 50,
            duration: scrollDuration,
            repeat: -1 // <-- Bucle infinito: al terminar el ciclo, reinicia desde la posición base
        });

        // Hacemos aparecer el botón "Jugar de nuevo" tras 3 segundos para indicar que se puede salir
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: btnPlayAgain,
                alpha: 1,
                duration: 1000
            });
        });

        // Al hacer clic o tocar cualquier parte de la pantalla, rompe el bucle y regresa al menú principal
        this.input.once('pointerdown', () => {
            this.exitScene();
        });
    }

    exitScene() {
        this.sound.stopAll();
        this.scene.start('mainmenu');
    }
}