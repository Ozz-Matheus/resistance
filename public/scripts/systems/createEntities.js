// src/systems/createEntities.js

export function createEntities(scene) {
  scene.stars = scene.add.blitter(0, 0, 'starfield');
  scene.stars.create(0, 0);
  scene.stars.create(0, -512);

  scene.bullets = scene.physics.add.group({
    classType: Phaser.Physics.Arcade.Image,
    maxSize: 10,
    runChildUpdate: true
  });

  scene.enemyBullets = scene.physics.add.group({
    classType: Phaser.Physics.Arcade.Image,
    maxSize: 10,
    runChildUpdate: true
  });

  scene.enemy = scene.physics.add.sprite(256, 128, 'enemy', 1);
  scene.enemy.setBodySize(160, 64);
  scene.enemy.state = 5;

  scene.enemyTween = scene.tweens.add({
    targets: scene.enemy.body.velocity,
    props: {
      x: { from: 150, to: -150, duration: 4000 },
      y: { from: 50, to: -50, duration: 2000 }
    },
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1
  });

  scene.enemyFiring = scene.time.addEvent({
    delay: 750,
    loop: true,
    callback: () => {
      const b = scene.enemyBullets.get(scene.enemy.x, scene.enemy.y + 32);
      if (b) b.setActive(true).setVisible(true).setVelocity(0, 150);
    }
  });

  scene.player = scene.physics.add.image(256, 448, 'ship');

  scene.text = scene.add.text(0, 480, '', {
    font: '16px monospace',
    fill: 'aqua'
  });

  scene.particles = scene.add.particles(0, 0, 'bullet', {
    alpha: { start: 1, end: 0 },
    blendMode: 'SCREEN',
    lifespan: 500,
    scale: { start: 1, end: 5 },
    frequency: -1
  });
}