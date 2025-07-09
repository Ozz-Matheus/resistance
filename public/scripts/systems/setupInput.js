// src/systems/setupInput.js

export function setupInput(scene) {
  scene.input.on('pointermove', pointer => {
    scene.player.x = pointer.worldX;
  });

  scene.input.on('pointerdown', () => {
    scene.bullets.fire(scene.player.x, scene.player.y, 0, -300);
  });
}
