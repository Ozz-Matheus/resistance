// src/components/firebutton.js

import { hudLayout } from '../utils/hudLayout.js';

export class FireButton {

  constructor(scene) {
    this.scene = scene;
    this.button = null;
    this.isDown = false;
    this._onResize = null;
    this._vvHandler = null;
    this._vvScrollHandler = null;
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

    if (!this._onResize) {
      this._onResize = () => place();
      this.scene.scale.on('resize', this._onResize);

      this.scene.events.once('shutdown', () => {
        this.scene.scale.off('resize', this._onResize);

        if (this._vvHandler) {
          window.visualViewport?.removeEventListener('resize', this._vvHandler);
          this._vvHandler = null;
        }
        if (this._vvScrollHandler) { // 👈 remover scroll también
          window.visualViewport?.removeEventListener('scroll', this._vvScrollHandler);
          this._vvScrollHandler = null;
        }

        this._onResize = null;
      });
    }

    if (window.visualViewport && !this._vvHandler) {
      this._vvHandler = () => this._onResize && this._onResize();
      window.visualViewport.addEventListener('resize', this._vvHandler, { passive: true });
    }

    // 👇 nuevo: recolocar cuando aparece/desaparece la barra por scroll (Chrome iOS)
    if (window.visualViewport && !this._vvScrollHandler) {
      this._vvScrollHandler = () => this._onResize && this._onResize();
      window.visualViewport.addEventListener('scroll', this._vvScrollHandler, { passive: true });
    }
  }


}
