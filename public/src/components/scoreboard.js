// src/components/scoreboard.js

import { Settings } from '../settings.js';
import { Texts } from '../utils/translations.js';

export class ScoreBoard {
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
      const { width, height } = this.relatedScene.scale;

      const fs = Math.max(14, Math.round(height * 0.024));
      const top = 8;
      const rowGap = Math.round(fs * 0.5);

      this.labels = {
        points: this.relatedScene.add.text(20, top, Texts.score(Settings.getPoints()), {
          fontSize: `${fs}px`,
          fill: '#fff',
          fontFamily: 'Verdana',
          shadow: { offsetX: 1, offsetY: 1, color: '#2ef', blur: 8, fill: true }
        }).setDepth(1000),

        record: this.relatedScene.add.text(width - 10, top, Texts.record(Settings.getRecord()), {
          fontSize: `${fs}px`,
          fill: '#fff',
          fontFamily: 'Verdana',
          shadow: { offsetX: 1, offsetY: 1, color: '#2ef', blur: 8, fill: true }
        }).setOrigin(1, 0).setDepth(1000),

        // Segunda fila centrada
        level: this.relatedScene.add.text(width / 2, top + fs + rowGap, Texts.level(Settings.getLevel()), {
          fontSize: `${fs}px`,
          fill: '#fff',
          fontFamily: 'Verdana',
          shadow: { offsetX: 1, offsetY: 1, color: '#2ef', blur: 8, fill: true }
        }).setOrigin(0.5, 0).setDepth(1000),
      };

      // Reposiciona/escalado en resize
      this.relatedScene.scale.on('resize', ({ width: w, height: h }) => {

        const fs2 = Math.max(14, Math.round(h * 0.024)); // igual que en create()
        const rowGap2 = Math.round(fs2 * 0.5);           // igual que en create()

        this.labels.points.setFontSize(fs2).setPosition(20, top);
        this.labels.record.setFontSize(fs2).setPosition(w - 10, top).setOrigin(1, 0);
        this.labels.level .setFontSize(fs2).setPosition(w / 2, top + fs2 + rowGap2);
      });
    }


    updatePoints(value) {
        this.labels.points.setText(Texts.score(value));
    }

    updateLevel(value) {
        this.labels.level.setText(Texts.level(value));
    }

    updateRecord(value) {
        this.labels.record.setText(Texts.record(value));
    }
}
