// src/systems/setupInput.js

export function setupInput(scene) {

  scene.input.on('pointermove', pointer => {

    if (scene.playerActive) {

      scene.player.x = pointer.worldX;

    }

  });

}
