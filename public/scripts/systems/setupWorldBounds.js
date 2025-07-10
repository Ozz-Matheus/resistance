// public/scripts/systems/setupWorldBounds.js

export function setupWorldBounds(scene) {
  scene.physics.world.on('worldbounds', (body) => {
    if (body.gameObject && typeof body.gameObject.onWorldBounds === 'function') {
      body.gameObject.onWorldBounds();
    }
  });
}
