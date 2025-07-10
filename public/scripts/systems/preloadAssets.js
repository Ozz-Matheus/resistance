// public/scripts/systems/preloadAssets.js

export function preloadAssets(scene) {
  scene.load.image('bullet', 'assets/sprites/bullets/bullet.png?001');
  scene.load.image('enemyBullet', 'assets/sprites/bullets/boom.png?001');
  scene.load.image('ship', 'assets/sprites/spaceship-hero.png?001');
  scene.load.image('starfield', 'assets/skies/starfield.png?001');
  scene.load.spritesheet('enemy', 'assets/sprites/spaceship-boss.png?001', {
    frameWidth: 192,
    frameHeight: 160
  });
}
