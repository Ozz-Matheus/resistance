// src/systems/setupInput.js

export function setupInput(scene) {
  scene.input.on('pointermove', pointer => {
    scene.player.x = pointer.worldX;
  });

  scene.input.on('pointerdown', () => {
    const b = scene.bullets.get(scene.player.x, scene.player.y);
    if (b) b.setActive(true).setVisible(true).setVelocity(0, -300);
  });
}
