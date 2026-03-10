// src/components/livesdisplay.js

import { Settings } from '../settings.js';

export class LivesDisplay {

  static ICON_WIDTH = 28;
  static ICON_HEIGHT = 28;
  static ICON_SPACING = 8;
  static ICON_SCALE = 0.20;

  constructor(scene) {
    this.relatedScene = scene;
  }

  create() {
    this.livesGroup = this.relatedScene.add.group();

    const startX = 20;
    const y = 36;
    const hudScale = Math.max(0.12, Math.min(0.24, this.relatedScene.scale.height / 3200));

    // Inicialmente obtenemos las vidas del Registry (o de Settings como valor por defecto)
    const initialLives = this.relatedScene.registry.get('lives') ?? Settings.getLives();

    for (let i = 0; i < initialLives; i++) {
      const x = startX + i * (LivesDisplay.ICON_WIDTH + LivesDisplay.ICON_SPACING);
      const icon = this.relatedScene.add.image(x, y, 'player')
        .setScale(hudScale)
        .setOrigin(0, 0)
        .setAlpha(0.8)
        .setDepth(9999);
      this.livesGroup.add(icon);
    }

    // Escuchar cambios en las vidas a nivel global ---
    this.relatedScene.registry.events.on('changedata-lives', (parent, value) => {
      this.updateLives(value);
    });

    // Limpiar el evento cuando la escena se destruya
    this.relatedScene.events.once('shutdown', () => {
      this.relatedScene.registry.events.off('changedata-lives');
    });
  }

  updateLives(currentLives) {
    const remainingLives = this.livesGroup.getChildren();

    remainingLives.forEach((life, index) => {
      life.setVisible(index < currentLives);
    });
  }

  reset() {
    this.livesGroup.clear(true, true);
    this.create();
  }
}
