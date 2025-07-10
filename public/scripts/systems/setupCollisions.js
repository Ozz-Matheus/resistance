// src/systems/setupCollisions.js

import { handlePlayerHit } from './handlePlayerHit.js';

export function setupCollisions(scene) {
  scene.physics.add.overlap(scene.enemy, scene.bullets, (enemy, bullet) => {
    const { x, y } = bullet.body.center;
    bullet.disableBody(true, true);
    scene.particles.emitParticleAt(x, y);

    enemy.state -= 1;

    if (enemy.state <= 0) {
      enemy.setFrame(3);
      enemy.body.checkCollision.none = true;
      scene.enemyTween.stop();
      scene.enemyFiring.remove();

      scene.scene.pause();
      scene.add.text(150, 250, 'YOU WIN', {
        fontSize: '32px',
        fill: '#0f0'
      });
    }

  });

  scene.physics.add.overlap(scene.player, scene.enemyBullets, (player, bullet) => {
    handlePlayerHit(scene, player, bullet);
  });

  scene.physics.world.on('worldbounds', body => {
    if (body.gameObject) body.gameObject.disableBody(true, true);
  });
}
