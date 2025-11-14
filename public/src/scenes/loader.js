// src/scenes/loader.js

/* ------------------------------------------------------------------------------------------ */

export function loader (scene) {

/* ------------------------------------------------------------------------------------------ */

/* IMAGES */

/* ------------------------------------------------------------------------------------------ */


scene.load.image('background','./src/images/background.png');
scene.load.image('blue-star','./src/images/blue-star.png');
scene.load.image('red-star','./src/images/red-star.png');

scene.load.image('player', './src/images/player.png');
scene.load.spritesheet('lasers', './src/images/lasers.png', {frameWidth: 32, frameHeight: 65});
scene.load.spritesheet('main-enemies', './src/images/main-enemies.png', {frameWidth: 135, frameHeight: 95});
scene.load.spritesheet('secondary-enemies', './src/images/secondary-enemies.png', { frameWidth: 135, frameHeight: 95 });
scene.load.spritesheet('explosion', './src/images/explosion.png', {frameWidth: 32, frameHeight: 32});
scene.load.spritesheet('flames', './src/images/flames.png', {frameWidth: 18, frameHeight: 39});
scene.load.image('particle', './src/images/particle.png');
scene.load.image('powerup-icon', './src/images/powerup-icon.png');


scene.load.spritesheet('virtual-gamepad', './src/images/gamepad_spritesheet.png', {
  frameWidth: 100,
  frameHeight: 100
});

scene.load.spritesheet('fullscreen-button', './src/images/fullscreen-button.png', {
  frameWidth: 64,
  frameHeight: 64
});


/* ------------------------------------------------------------------------------------------ */

/* AUDIO */

/* ------------------------------------------------------------------------------------------ */

scene.load.audio('bg-music', './src/audio/bg-music.ogg');
scene.load.audio('bullet-sound', './src/audio/bullet.mp3');
scene.load.audio('explosion-sound', './src/audio/explosion.wav');
scene.load.audio('die-throw', './src/audio/die-throw.ogg');
scene.load.audio('victory-music', './src/audio/victory-music.mp3');
scene.load.audio('gameover-music', './src/audio/gameover-music.ogg');
scene.load.audio('level-passed', './src/audio/level-passed.mp3');
}