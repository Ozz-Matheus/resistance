// src/components/player.js

import { hudLayout } from '../utils/hudLayout.js';

export class Player {
  static SPEED_ON_THE_X_AXIS = 520;
  static ACCELERATION_ON_THE_X_AXIS = 500;
  static SPEED_ON_THE_Y_AXIS = 0;

  constructor(scene) {
    this.relatedScene = scene;
    this._onResize = null;
    this._vvHandler = null;
    this._vvScrollHandler = null;
  }

  create() {
    const W = this.relatedScene.scale.width;
    const H = this.relatedScene.scale.height;

    // lo creamos alto y luego ajustamos con reposition()
    this.player = this.relatedScene.physics.add.sprite(
      Math.floor(W / 2),
      Math.floor(H * 0.82),
      'player'
    );
    this.player.setScale(0.4, 0.4);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.2);

    this.controls = this.relatedScene.input.keyboard.createCursorKeys();

    // posición segura inicial (encima de los pads)
    this.reposition();

    // listeners para cambios de viewport/toolbar
    if (!this._onResize) {
      this._onResize = () => this.reposition();
      this.relatedScene.scale.on('resize', this._onResize);

      this.relatedScene.events.once('shutdown', () => {
        this.relatedScene.scale.off('resize', this._onResize);
        window.visualViewport?.removeEventListener('resize', this._vvHandler);
        window.visualViewport?.removeEventListener('scroll', this._vvScrollHandler);
        this._onResize = this._vvHandler = this._vvScrollHandler = null;
      });
    }
    if (window.visualViewport && !this._vvHandler) {
      this._vvHandler = () => this.reposition();
      window.visualViewport.addEventListener('resize', this._vvHandler, { passive: true });
    }
    if (window.visualViewport && !this._vvScrollHandler) {
      this._vvScrollHandler = () => this.reposition();
      window.visualViewport.addEventListener('scroll', this._vvScrollHandler, { passive: true });
    }
  }

  // coloca el centro del player siempre por encima del borde superior de los pads
  reposition() {
    const W = this.relatedScene.scale.width;
    const H = this.relatedScene.scale.height;
    const { leftPad, padSize } = hudLayout(this.relatedScene);

    const topOfControls = leftPad.y - padSize / 2;
    const halfShip = (this.player?.displayHeight ?? 0) / 2;
    const gap = Math.max(10, Math.round(padSize * 0.18));

    // cálculo
    let safeY = Math.round(topOfControls - gap - halfShip);
    const minY = Math.floor(H * 0.80);
    const maxY = H - halfShip - 2;
    safeY = Phaser.Math.Clamp(safeY, minY, maxY);

    if (this.player) {
      const x = Math.floor(W / 2);
      this.player.setX(x).setY(safeY);
      this.player.setData('posIni', [x, safeY]);
      this.player.setData('vel-x', Player.SPEED_ON_THE_X_AXIS);
      this.player.setData('acel-x', Player.ACCELERATION_ON_THE_X_AXIS);
      this.player.setData('vel-y', Player.SPEED_ON_THE_Y_AXIS);
    }
  }

  update() {
    if (this.controls.left.isDown || this.relatedScene.dpadLeft?.isDown) {
      this.player.setVelocityX(-this.player.getData('vel-x'));
    } else if (this.controls.right.isDown || this.relatedScene.dpadRight?.isDown) {
      this.player.setVelocityX(this.player.getData('vel-x'));
    } else {
      this.player.setVelocityX(0);
    }
  }

  get() { return this.player; }
}
