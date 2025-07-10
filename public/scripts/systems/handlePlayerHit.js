// public/scripts/systems/handlePlayerHit.js

import { showEndMessage } from './showEndMessage.js';

export function handlePlayerHit(scene, player, bullet) {

    if (scene.isGameOver) return;

    const { x, y } = bullet.body.center;

    bullet.disableBody(true, true);
    scene.particles.emitParticleAt(x, y);

    scene.playerLives--;

    if (scene.debug && scene.text) {
        scene.text.setText([
            scene.bullets.poolInfo(),
            scene.enemyBullets.poolInfo(),
            `Lives: ${scene.playerLives}`
        ]);
    }
    if (scene.playerLives <= 0) {

        scene.playerActive = false;
        scene.player.setTint(0xff0000);
        scene.player.setAlpha(0.4);
        scene.enemyFiring.remove();
        scene.isGameOver = true;

        showEndMessage(scene, 'HAS PERDIDO');
    }
}
