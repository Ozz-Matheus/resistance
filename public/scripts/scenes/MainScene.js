// public/scripts/scenes/MainScene.js

const Phaser = window.Phaser;
import { preloadAssets } from '../systems/preloadAssets.js';
import { createEntities } from '../systems/createEntities.js';
import { setupCollisions } from '../systems/setupCollisions.js';
import { setupInput } from '../systems/setupInput.js';
import { setupWorldBounds } from '../systems/setupWorldBounds.js';
import { updateScene } from '../systems/updateScene.js';
import { scoreManager } from '../systems/scoreManager.js';

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.debug = false;
  }

  preload() {
    preloadAssets(this);
  }

  create() {
    createEntities(this);
    setupCollisions(this);
    setupInput(this);
    setupWorldBounds(this);

    this.scoreManager = new scoreManager(this);
    this.scoreManager.showTimeUI();

  }

  update() {
    updateScene(this);

    if (this.scoreManager) {
      this.scoreManager.updateTimeUI();
    }

  }
}
