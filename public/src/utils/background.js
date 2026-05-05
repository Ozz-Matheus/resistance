// src/utils/background.js

export function createBackground(scene, depth = -10) {
  // Lo instanciamos en el centro de la pantalla
  const bg = scene.add
    .image(scene.scale.width / 2, scene.scale.height / 2, 'background')
    .setOrigin(0.5, 0.5)
    .setScrollFactor(0)
    .setDepth(depth);

  const resizeBg = () => {
    // Calculamos la escala necesaria para ancho y alto
    const scaleX = scene.scale.width / bg.width;
    const scaleY = scene.scale.height / bg.height;
    
    // Tomamos la escala mayor para cubrir toda la pantalla sin deformar
    const scale = Math.max(scaleX, scaleY);
    
    bg.setScale(scale);
    bg.setPosition(scene.scale.width / 2, scene.scale.height / 2);
  };

  resizeBg();

  scene.scale.on('resize', resizeBg);

  scene.events.once('shutdown', () => {
    scene.scale.off('resize', resizeBg);
  });

  return bg;
}