// src/components/scoreboard.js

import { Settings } from '../settings.js';
import { Texts } from '../utils/translations.js';
import { TextStyles } from '../utils/ui.js';

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
          ...TextStyles.hud
        }).setDepth(1000),

        record: this.relatedScene.add.text(width - 10, top, Texts.record(Settings.getRecord()), {
          fontSize: `${fs}px`,
          ...TextStyles.hud
        }).setOrigin(1, 0).setDepth(1000),

        // Segunda fila centrada
        level: this.relatedScene.add.text(width / 2, top + fs + rowGap, Texts.level(Settings.getLevel()), {
          fontSize: `${fs}px`,
          ...TextStyles.hud
        }).setOrigin(0.5, 0).setDepth(1000),
      };

      // Extraemos la función para poder eliminarla después
      const handleResize = ({ width: w, height: h }) => {
        const fs2 = Math.max(14, Math.round(h * 0.024));
        const rowGap2 = Math.round(fs2 * 0.5);

        this.labels.points.setFontSize(fs2).setPosition(20, top);
        this.labels.record.setFontSize(fs2).setPosition(w - 10, top).setOrigin(1, 0);
        this.labels.level.setFontSize(fs2).setPosition(w / 2, top + fs2 + rowGap2);
      };

      this.relatedScene.scale.on('resize', handleResize);

      this.relatedScene.events.once('shutdown', () => {
        this.relatedScene.scale.off('resize', handleResize);
      });

      // Escuchar cambios en los puntos a nivel global
      this.relatedScene.registry.events.on('changedata-points', (parent, value) => {
        this.updatePoints(value);
      });

      // Limpiar el evento cuando la escena se destruya para evitar fugas de memoria
      this.relatedScene.events.once('shutdown', () => {
        this.relatedScene.registry.events.off('changedata-points');
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
