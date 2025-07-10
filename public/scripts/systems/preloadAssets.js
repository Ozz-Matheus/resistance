// public/scripts/systems/preloadAssets.js

export function preloadAssets(scene) {
  scene.load.image('bullet', 'assets/sprites/bullets/bullet.png');
  scene.load.image('enemyBullet', 'assets/sprites/bullets/boom.png');
  scene.load.image('ship', 'assets/sprites/spaceship-hero.png?01');
  scene.load.image('starfield', 'assets/skies/starfield.png?01');
  scene.load.spritesheet('enemy', 'assets/sprites/spaceship-boss.png', {
    frameWidth: 192,
    frameHeight: 160
  });
}
