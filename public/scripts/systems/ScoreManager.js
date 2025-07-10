// public/scripts/systems/scoreManager.js

export class scoreManager {
  constructor(scene) {
    this.scene = scene;
    this.startTime = null;
    this.timeText = null;
    this.isFinalized = false;
  }

  startTimer() {
    if (this.startTime === null) {
      this.startTime = this.scene.time.now;
    }
  }

  getElapsedSeconds() {
    if (this.startTime === null) return 0;
    return Math.floor((this.scene.time.now - this.startTime) / 1000);
  }

  showTimeUI() {
    this.timeText = this.scene.add.text(10, 10, 'Tiempo: 0s', {
      fontSize: '16px',
      fill: '#fff'
    });
  }

  updateTimeUI() {
    if (this.timeText && !this.isFinalized) {
      const elapsed = this.getElapsedSeconds();
      this.timeText.setText(`Tiempo: ${elapsed}s`);
    }
  }

  finalize() {
    this.isFinalized = true;
  }
}
