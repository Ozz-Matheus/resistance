// src/components/firebutton.js

import { hudLayout } from '../utils/hudLayout.js';

export class FireButton {

  constructor(scene) {
    this.scene = scene;
    this.button = null;
    this.isDown = false;
  }

  create() {
      const place = () => {
        const { fire, padSize } = hudLayout(this.scene);

        if (!this.button) {
          this.button = this.scene.add
            .sprite(fire.x, fire.y, 'virtual-gamepad', 0)
            .setInteractive()
            .setOrigin(1, 1)
            .setScrollFactor(0)
            .setDepth(1000)
            .setDisplaySize(padSize, padSize);

          this.button.on('pointerdown', () => { this.isDown = true;  this.button.setFrame(1); });
          this.button.on('pointerup',   () => { this.isDown = false; this.button.setFrame(0); });
          this.button.on('pointerout',  () => { this.isDown = false; this.button.setFrame(0); });
        } else {
          this.button
            .setPosition(fire.x, fire.y)
            .setDisplaySize(padSize, padSize);
        }
      };

      place();

      // 1. Escuchamos el resize interno y el evento global que creamos en index.js
      this.scene.scale.on('resize', place);
      this.scene.game.events.on('viewport-changed', place);

      // 2. Apagamos los listeners cuando la escena muere (Evita memory leaks)
      this.scene.events.once('shutdown', () => {
        this.scene.scale.off('resize', place);
        this.scene.game.events.off('viewport-changed', place);
      });
    }

}
