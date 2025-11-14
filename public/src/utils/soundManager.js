// src/utils/soundManager.js

export class SoundManager {
  static music = null;

  static playMusic(scene, key, options = { loop: true, volume: 0.5 }) {

    SoundManager.stopAll(scene);

    SoundManager.music = scene.sound.add(key, options);
    SoundManager.music.play();
  }

  static stopAll(scene) {
    scene.sound.stopAll();
  }

  static playSound(scene, key, options = { volume: 1 }) {
    const sound = scene.sound.add(key, options);
    sound.play();
  }
}
