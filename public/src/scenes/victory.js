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
        const { title, md, sm } = fontScale(this);
        const { width, height } = this.sys.game.config;

        createBackground(this, -10);
        SoundManager.playMusic(this, 'victory-music', { loop: false, volume: 0.6 });

        // 1. Título
        this.add.text(width / 2, height * 0.10, Texts.victoryTitle, {
          fontSize: `${title}px`,
          fontStyle: 'bold',
          ...TextStyles.success
        }).setOrigin(0.5);

        // 2. Descripción (Origen en 0 para que crezca hacia abajo limpiamente)
        const descText = this.add.text(width / 2, height * 0.20, Texts.victoryDesc, {
          fontSize: `${md}px`,
          align: 'center',
          wordWrap: { width: width * 0.90, useAdvancedWrap: true },
          ...TextStyles.base
        }).setOrigin(0.5, 0);

        // Punto de partida dinámico basado en la altura real de la descripción
        let currentY = descText.y + descText.displayHeight + height * 0.04;

        const points = Settings.getPoints();
        const record = Settings.getRecord();

        // 3. ¡Nuevo Récord! (Solo consume espacio vertical si se cumple la condición)
        if (points >= record) {
          Settings.setRecord(points);
          this.add.text(width / 2, currentY, Texts.newRecord, {
            fontSize: `${sm}px`,
            ...TextStyles.success
          }).setOrigin(0.5);
          
          currentY += height * 0.06; // Desplazamos el eje Y solo si apareció el texto
        }

        // 4. Puntos
        this.add.text(width / 2, currentY, Texts.score(points), {
          fontSize: `${sm}px`,
          ...TextStyles.base
        }).setOrigin(0.5);
        currentY += height * 0.06;

        // 5. Récord
        this.add.text(width / 2, currentY, Texts.record(record), {
          fontSize: `${sm}px`,
          ...TextStyles.base
        }).setOrigin(0.5);

        // 6. Botón Jugar de Nuevo (Se mantiene fijo en la zona inferior)
        this.add.text(width / 2, height * 0.85, Texts.playAgain, {
          fontSize: `${md}px`,
          ...TextStyles.success
        }).setOrigin(0.5);

        if (window.showPlayerScoreForm) {
          window.showPlayerScoreForm(points);
        }

        this.input.once('pointerdown', () => {
          this.sound.stopAll();
          this.scene.start('mainmenu');
        });
      }

}