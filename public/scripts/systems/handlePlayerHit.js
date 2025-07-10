// src/systems/handlePlayerHit.js

export function handlePlayerHit(scene, player, bullet) {
    const { x, y } = bullet.body.center;

    bullet.disableBody(true, true);
    scene.particles.emitParticleAt(x, y);

    scene.playerLives--;

    scene.text.setText([
        scene.bullets.poolInfo(),
        scene.enemyBullets.poolInfo(),
        `Lives: ${scene.playerLives}`
    ]);

    if (scene.playerLives <= 0) {
        scene.scene.pause();
        scene.add.text(150, 250, 'GAME OVER', {
            fontSize: '32px',
            fill: '#fff'
        });
    }
}
