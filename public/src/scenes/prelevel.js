// src/scenes/prelevel.js

import { Settings } from '../settings.js';
import { Texts } from '../utils/translations.js';
import { fontScale, TextStyles } from '../utils/ui.js';

export class PreLevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'prelevel' });
  }

  create() {
    // Reproducir el sonido al cargar la pantalla
    this.sound.play('prelevel-sound', { volume: 0.8 });
    
    const { sm, md } = fontScale(this);
    const { width, height } = this.sys.game.config;

    const currentLevel = Settings.getLevel();
    const levelTextContent = Texts.preLevel[currentLevel] || `Nivel ${currentLevel}`;

    const levelText = this.add.text(width / 2, height / 2, levelTextContent, {
      fontSize: `${md}px`,
      align: 'center',
      wordWrap: { width: width * 0.95, useAdvancedWrap: true },
      ...TextStyles.success
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: levelText,
      alpha: 1,
      duration: 1500
    });

    const continueText = this.add.text(width / 2, height * 0.85, Texts.continue, {
      fontSize: `${sm}px`, 
      wordWrap: { width: width * 0.95, useAdvancedWrap: true },
      ...TextStyles.success
    }).setOrigin(0.5).setAlpha(0.5);

    this.tweens.add({ targets: continueText, alpha: 1, duration: 800, yoyo: true, repeat: -1 });

    this.input.once('pointerdown', () => {
      this.scene.start('enemyintro');
    });

  }
}