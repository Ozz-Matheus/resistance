// src/utils/background.js

export function createBackground(scene, depth = -10) {
  const bg = scene.add
    .image(0, 0, 'background')
    .setOrigin(0, 0)
    .setScrollFactor(0)
    .setDepth(depth);

  const resizeBg = () => {
    bg.setDisplaySize(scene.scale.width, scene.scale.height);
  };

  resizeBg();

  scene.scale.on('resize', resizeBg);

  scene.events.once('shutdown', () => {
    scene.scale.off('resize', resizeBg);
  });

  return bg;
}
