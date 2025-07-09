// src/scenes/MainScene.js

const Phaser = window.Phaser;
import { preloadAssets } from '../systems/preloadAssets.js';
import { createEntities } from '../systems/createEntities.js';
import { setupCollisions } from '../systems/setupCollisions.js';
import { setupInput } from '../systems/setupInput.js';
import { updateScene } from '../systems/updateScene.js';

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    preloadAssets(this);
  }

  create() {
    createEntities(this);
    setupCollisions(this);
    setupInput(this);
  }

  update() {
    updateScene(this);
  }
}
