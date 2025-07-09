// src/systems/updateScene.js

export function updateScene(scene) {
  scene.stars.y += 1;
  scene.stars.y %= 512;

  scene.text.setText([
    `bullets: ${scene.bullets.getLength()}`,
    `enemyBullets: ${scene.enemyBullets.getLength()}`
  ]);
}
