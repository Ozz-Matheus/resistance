
// src/components/virtualgamepad.js

import { hudLayout } from '../utils/hudLayout.js';

export class VirtualGamepad {
  constructor(scene) {
    this.scene = scene;
    this.joystick = null;
    this.joystickPad = null;
    this.joystickPointer = null;
    this.radius = 50;
    this.properties = { inUse: false, left: false, right: false, x: 0 };
    this.center = new Phaser.Math.Vector2(0, 0);
    this._onResize = null;
    this._vvHandler = null;
    this._vvScrollHandler = null;
  }

  setCenter(x, y) {
    this.center.set(x, y);
    if (this.joystick)    this.joystick.setPosition(x, y);
    if (this.joystickPad) this.joystickPad.setPosition(x, y);
  }

  createJoystick() {
    const place = () => {
      const { leftPad, padSize } = hudLayout(this.scene);

      // radio del joystick según tamaño del pad
      this.radius = Math.round(0.4 * padSize);

      // centra y (si ya existen) recoloca sprites
      this.setCenter(leftPad.x, leftPad.y);

      if (!this.joystick) {
        // knob
        this.joystick = this.scene.add
          .sprite(leftPad.x, leftPad.y, 'virtual-gamepad', 2)
          .setInteractive()
          .setOrigin(0.5)
          .setScrollFactor(0)
          .setDepth(1000)
          .setDisplaySize(padSize, padSize);

        // base
        this.joystickPad = this.scene.add
          .sprite(leftPad.x, leftPad.y, 'virtual-gamepad', 3)
          .setOrigin(0.5)
          .setScrollFactor(0)
          .setDepth(1000)
          .setDisplaySize(padSize, padSize);

        // input (solo una vez)
        this.scene.input.on('pointerdown', (p) => {
          if (
            !this.joystickPointer &&
            Phaser.Math.Distance.Between(p.x, p.y, this.center.x, this.center.y) <= this.radius * 2
          ) {
            this.joystickPointer = p;
            this.properties.inUse = true;
          }
        }, this);

        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
      } else {
        this.joystick
          .setPosition(leftPad.x, leftPad.y)
          .setDisplaySize(padSize, padSize);

        this.joystickPad
          .setPosition(this.center.x, this.center.y)
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
        if (this._vvScrollHandler) {
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

    // 👇 nuevo para Chrome iOS
    if (window.visualViewport && !this._vvScrollHandler) {
      this._vvScrollHandler = () => this._onResize && this._onResize();
      window.visualViewport.addEventListener('scroll', this._vvScrollHandler, { passive: true });
    }
  }

  onPointerUp(pointer) {
    if (pointer === this.joystickPointer) {
      this.joystickPointer = null;
      this.properties = { inUse: false, left: false, right: false, x: 0 };
      if (this.joystickPad) this.joystickPad.setPosition(this.center.x, this.center.y);
    }
  }

  onPointerMove(pointer) {
    if (this.joystickPointer && pointer.id === this.joystickPointer.id) {
      const deltaX = Phaser.Math.Clamp(pointer.x - this.center.x, -this.radius, this.radius);
      if (this.joystickPad) {
        this.joystickPad.x = this.center.x + deltaX;
        this.joystickPad.y = this.center.y;
      }
      this.properties.x = Math.floor((deltaX / this.radius) * 100);
      this.properties.left  = this.properties.x < -20;
      this.properties.right = this.properties.x > 20;
    }
  }

  getProperties() {
    return this.properties;
  }
}
