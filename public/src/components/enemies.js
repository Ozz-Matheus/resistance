// src/components/enemies.js

import { Settings } from '../settings.js';


/* ------------------------------------------------------------------------------------------ */

export class Enemies {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
      const level = this.relatedScene.registry.get('level') || 1;
      const [mainCount, secondaryCount] = level === 1 ? [24, 24] : [36, 36];

      this.enemies = this.relatedScene.physics.add.group();

      // Crear main-enemies
      for (let i = 0; i < mainCount; i++) {
        const enemy = this.enemies.create(0, 0, 'main-enemies');
        enemy.setData('type', 'main');
      }

      // Crear secondary-enemies
      for (let i = 0; i < secondaryCount; i++) {
        const enemy = this.enemies.create(0, 0, 'secondary-enemies');
        enemy.setData('type', 'secondary');
      }

      // Animaciones (protegidas para no duplicar)
      const anims = this.relatedScene.anims;
      if (!anims.exists('main-enemies-animation')) {
        anims.create({
          key: 'main-enemies-animation',
          frames: anims.generateFrameNumbers('main-enemies', { frames: [0, 1, 2] }),
          frameRate: 5,
          repeat: -1,
        });
      }
      if (!anims.exists('secondary-enemies-animation')) {
        anims.create({
          key: 'secondary-enemies-animation',
          frames: anims.generateFrameNumbers('secondary-enemies', { frames: [0, 1, 2] }),
          frameRate: 5,
          repeat: -1,
        });
      }

      // Escala y animación ANTES del grid (para calcular tamaños reales)
      this.enemies.getChildren().forEach(enemy => {
        enemy.setScale(0.38).setAngle(350).setDepth(2);
        enemy.setData('score', enemy.getData('type') === 'main' ? 100 : 250);
        enemy.play(enemy.getData('type') === 'main' ? 'main-enemies-animation' : 'secondary-enemies-animation');
      });

      // Centrar y subir un poco (12 cols) usando el ancho REAL del sprite
      const W = this.relatedScene.scale.width;
      const cols = 12;

      const sample = this.enemies.getChildren()[0];
      const dw = Math.ceil(sample.displayWidth);                 // ancho real (con escala)
      const cellW = Math.max(32, Math.floor((W - dw) / (cols - 1)));
      const totalSpan = dw + (cols - 1) * cellW;
      const startX = Math.round((W - totalSpan) / 2 + dw / 2);

      // más arriba en móviles (sin pegar al HUD)
      const top = Math.max(32, Math.round(this.relatedScene.scale.height * 0.06));

      Phaser.Actions.GridAlign(this.enemies.getChildren(), {
        width: cols,
        cellWidth: cellW,
        cellHeight: 64,
        x: -64,
        y: top,
      });

      // Movimiento horizontal en formación
      this.formation = {
        ACCELERATION_ON_THE_X_AXIS: 0,
        SPEED_ON_THE_X_AXIS: 1,
        JOURNEY: 60,
      };

      // Descenso periódico (frecuencia según nivel)
      let frequency = 7000 - level * 500;
      if (frequency < 2500) frequency = 2500;

      const H = this.relatedScene.scale.height;
      let descentTargetY = H - (100 - level * 10);
      if (descentTargetY > H - 10) descentTargetY = H - 10;

      const enemies = this.enemies.getChildren();
      let descendingEnemies = enemies;
      if (level === 1) {
        descendingEnemies = enemies.slice(24); // solo los secundarios descienden en nivel 1
      }

      this.relatedScene.tweens.add({
        targets: descendingEnemies,
        y: descentTargetY,
        ease: 'Sine.easeInOut',
        duration: 1000,
        yoyo: true,
        delay: 5000,
        repeat: -1,
        repeatDelay: frequency,
      });
    }

    update() {

        this.formation.ACCELERATION_ON_THE_X_AXIS += this.formation.SPEED_ON_THE_X_AXIS;

        if ((this.formation.ACCELERATION_ON_THE_X_AXIS >= this.formation.JOURNEY && this.formation.SPEED_ON_THE_X_AXIS > 0) || (this.formation.ACCELERATION_ON_THE_X_AXIS <= -this.formation.JOURNEY / 2 && this.formation.SPEED_ON_THE_X_AXIS < 0)) {
            this.formation.SPEED_ON_THE_X_AXIS = -this.formation.SPEED_ON_THE_X_AXIS;
        }

        Phaser.Actions.IncX(this.enemies.getChildren(), this.formation.SPEED_ON_THE_X_AXIS);
    }


    get() {
        return this.enemies;
    }

}