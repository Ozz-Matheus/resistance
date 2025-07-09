// src/systems/setupCollisions.js

export function setupCollisions(scene) {
  scene.physics.add.overlap(scene.enemy, scene.bullets, (enemy, bullet) => {
    const { x, y } = bullet.body.center;
    bullet.disableBody(true, true);
    scene.particles.emitParticleAt(x, y);

    enemy.state--;
    if (enemy.state <= 0) {
      enemy.setFrame(3);
      enemy.body.checkCollision.none = true;
      scene.enemyTween.stop();
      scene.enemyFiring.remove();
    }
  });

  scene.physics.add.overlap(scene.player, scene.enemyBullets, (player, bullet) => {
    const { x, y } = bullet.body.center;
    bullet.disableBody(true, true);
    scene.particles.emitParticleAt(x, y);
  });

  scene.physics.world.on('worldbounds', body => {
    if (body.gameObject) body.gameObject.disableBody(true, true);
  });
}
