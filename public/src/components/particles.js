// src/components/particles.js

export class Particles {

  static PARTICLE_COUNT = 15;
  static LIFETIME = 1200;

  constructor(scene) {
    this.relatedScene = scene;
  }

  create() {
    this.particles = this.relatedScene.physics.add.group({
      key: 'particle',
      setXY: { x: -5000, y: -5000, stepX: 100 },
      repeat: Particles.PARTICLE_COUNT
    });

    this.particles.children.iterate(p => {
      p.setActive(false)
       .setVisible(false)
       .setAlpha(1)
       .setScale(Phaser.Math.FloatBetween(0.3, 0.9));
    });
  }

  spawn(x, y) {
    let count = 0;

    this.particles.getChildren().forEach(p => {
      if (!p.active && !p.visible && count < Particles.PARTICLE_COUNT) {
        count++;

        p.setX(x);
        p.setY(y);
        p.setVelocity(
          Phaser.Math.Between(-200, 200),
          Phaser.Math.Between(-150, 150)
        );
        p.setActive(true);
        p.setVisible(true);
        p.setAlpha(1.0);

        this.relatedScene.time.delayedCall(Particles.LIFETIME, () => {
          p.setActive(false).setVisible(false);
        });
      }
    });
  }

  get() {
    return this.particles;
  }
}
