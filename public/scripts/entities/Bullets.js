// src/entities/Bullets.js

import { Bullet } from './Bullet.js';

export class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(world, scene, config) {
    super(world, scene, {
      ...config,
      classType: Bullet,
      createCallback: (bullet) => bullet.onCreate()
    });
  }

  fire (x, y, vx, vy) {
    const bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.fire(x, y, vx, vy);
    }
  }

  poolInfo () {
    return `${this.name} total=${this.getLength()} active=${this.countActive(true)} inactive=${this.countActive(false)}`;
  }
}
