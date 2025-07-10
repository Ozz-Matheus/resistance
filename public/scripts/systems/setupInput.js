// src/systems/setupInput.js

export function setupInput(scene) {
  scene.input.on('pointermove', pointer => {
    scene.player.x = pointer.worldX;
  });

}
