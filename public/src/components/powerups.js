// src/components/powerups.js
export class PowerUps {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    this.group = this.scene.physics.add.group({
      key: 'powerup-icon',
      repeat: 5,
      setXY: { x: -9999, y: 9999 },
    });

    this.group.children.iterate((p) => {
      p.setActive(false).setVisible(false).disableBody(true, true);
      p.setScale(0.6);
    });
  }

  spawn(x, y) {
    const powerup = this.group.getChildren().find(p => !p.active && !p.visible);
    if (powerup) {
      powerup.setPosition(x, y);
      powerup.setActive(true).setVisible(true);
      powerup.enableBody(true, x, y, true, true);
      powerup.setVelocityY(100);
    }
  }

  get() {
    return this.group;
  }
}
