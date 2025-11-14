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

    for (let i = 0; i < Settings.getLives(); i++) {
      const x = startX + i * (LivesDisplay.ICON_WIDTH + LivesDisplay.ICON_SPACING);
      const icon = this.relatedScene.add.image(x, y, 'player')
        .setScale(hudScale)
        .setOrigin(0, 0)
        .setAlpha(0.8)
        .setDepth(9999);

      this.livesGroup.add(icon);
    }
  }

  removeOneLife() {
    const remainingLives = this.livesGroup.getChildren();
    const currentLives = Settings.getLives();

    remainingLives.forEach((life, index) => {
      life.setVisible(index < currentLives);
    });
  }

  reset() {
    this.livesGroup.clear(true, true);
    this.create();
  }
}
