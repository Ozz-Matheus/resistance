// src/systems/updateScene.js

export function updateScene(scene) {
  scene.stars.y += 1;
  scene.stars.y %= 512;

  // Muestra información del pool
  if (scene.debug && scene.text) {
    scene.text.setText([
      scene.bullets.poolInfo(),
      scene.enemyBullets.poolInfo()
    ]);
  }
}
