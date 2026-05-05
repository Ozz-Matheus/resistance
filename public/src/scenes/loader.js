// src/scenes/loader.js

/* ------------------------------------------------------------------------------------------ */

export function loader (scene) {

/* ------------------------------------------------------------------------------------------ */

/* IMAGES */

/* ------------------------------------------------------------------------------------------ */


scene.load.image('start_screen','./src/images/start_screen.png');
scene.load.image('background','./src/images/background.png');
scene.load.image('blue-star','./src/images/blue-star.png');
scene.load.image('red-star','./src/images/red-star.png');

scene.load.image('player', './src/images/player.png');
scene.load.spritesheet('lasers', './src/images/lasers.png', {frameWidth: 32, frameHeight: 65});

scene.load.spritesheet('explosion', './src/images/explosion.png', {frameWidth: 32, frameHeight: 32});
scene.load.spritesheet('flames', './src/images/flames.png', {frameWidth: 18, frameHeight: 39});
scene.load.image('particle', './src/images/particle.png');


// Enemigos por nivel
scene.load.spritesheet('enemies-1', './src/images/enemies-yellow.png', {frameWidth: 135, frameHeight: 95});
scene.load.spritesheet('enemies-2', './src/images/enemies-orange.png', {frameWidth: 135, frameHeight: 95});
scene.load.spritesheet('enemies-3', './src/images/enemies-red.png', {frameWidth: 135, frameHeight: 95});
scene.load.spritesheet('enemies-4', './src/images/enemies-blue.png', {frameWidth: 135, frameHeight: 95});
scene.load.spritesheet('enemies-5', './src/images/enemies-white.png', {frameWidth: 135, frameHeight: 95});
scene.load.spritesheet('boss-5', './src/images/boss-black.png', {frameWidth: 192, frameHeight: 160});

// Power ups por nivel (opcional si diseño te da iconos distintos)
scene.load.image('powerup-1', './src/images/powerup-shots.png');
scene.load.image('powerup-2', './src/images/powerup-shield.png');
scene.load.image('powerup-3', './src/images/powerup-slow.png');
scene.load.image('powerup-4', './src/images/powerup-live.png');
scene.load.image('powerup-5', './src/images/powerup-speed.png');

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