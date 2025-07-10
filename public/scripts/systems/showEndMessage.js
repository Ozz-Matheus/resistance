// src/systems/showEndMessage.js

export function showEndMessage(scene, message) {
  const centerX = scene.scale.width / 2;
  const centerY = scene.scale.height / 2;

  // Mensaje de fin
  scene.add.text(centerX, centerY - 40, message, {
    fontSize: '32px',
    fill: '#fff'
  }).setOrigin(0.5);

  // Botón de reinicio
  const button = scene.add.text(centerX, centerY + 20, 'Reiniciar', {
    fontSize: '18px',
    backgroundColor: '#d4d4d4',
    padding: { x: 12, y: 8 },
    color: '#000',
    align: 'center'
  }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      scene.input.removeAllListeners();
      scene.scene.start('MainScene');
    });
}

