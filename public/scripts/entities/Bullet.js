// src/entities/Bullet.js

export class Bullet extends Phaser.Physics.Arcade.Image {
  fire (x, y, vx, vy) {
    this.enableBody(true, x, y, true, true);
    this.setVelocity(vx, vy);
  }

  onCreate () {
    this.disableBody(true, true);
    this.body.collideWorldBounds = true;
    this.body.onWorldBounds = true;
  }

  onWorldBounds () {
    this.disableBody(true, true);
  }
}
