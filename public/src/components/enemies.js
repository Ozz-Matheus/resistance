 // src/components/enemies.js

import { Settings } from '../settings.js';
import { hudLayout } from '../utils/hudLayout.js';

/* ------------------------------------------------------------------------------------------ */

export class Enemies {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
      const level = this.relatedScene.registry.get('level') || 1;
      const enemyKey = `enemies-${level}`;
      const [mainCount, secondaryCount] = (level === 1 || level === 5) ? [24, 24] : [36, 36];

      this.enemies = this.relatedScene.physics.add.group();

      // Crear main-enemies
      for (let i = 0; i < mainCount; i++) {
        const enemy = this.enemies.create(0, 0, enemyKey);
        enemy.setData('type', 'main');
      }

      // Crear secondary-enemies usando la misma textura del nivel
      for (let i = 0; i < secondaryCount; i++) {
        const enemy = this.enemies.create(0, 0, enemyKey);
        enemy.setData('type', 'secondary');
      }

      // Animación dinámica basada en el nivel actual
      const anims = this.relatedScene.anims;
      const animKey = `enemy-anim-${level}`;

      if (!anims.exists(animKey)) {
        anims.create({
          key: animKey,
          frames: anims.generateFrameNumbers(enemyKey, { frames: [0, 1, 2] }),
          frameRate: 5,
          repeat: -1,
        });
      }

      // Escala y animación
      this.enemies.getChildren().forEach(enemy => {
        enemy.setScale(0.38).setAngle(350).setDepth(2);
        enemy.setData('score', enemy.getData('type') === 'main' ? 100 : 250);
        enemy.play(animKey);
      });

      // Centrar y subir un poco (12 cols) usando el ancho REAL del sprite
      const W = this.relatedScene.scale.width;
      const cols = 12;

      const sample = this.enemies.getChildren()[0];
      const dw = Math.ceil(sample.displayWidth);                 // ancho real (con escala)
      const cellW = Math.max(32, Math.floor((W - dw) / (cols - 1)));
      const totalSpan = dw + (cols - 1) * cellW;
      const startX = Math.round((W - totalSpan) / 2 + dw / 2);



      // Posición base
      let gridTop = Math.max(32, Math.round(this.relatedScene.scale.height * 0.06));

      // Si es nivel 5, empujamos a los enemigos normales 120px hacia abajo
      if (level === 5) {
          gridTop += 120;
      }

      Phaser.Actions.GridAlign(this.enemies.getChildren(), {
        width: cols,
        cellWidth: cellW,
        cellHeight: 64,
        x: -64,
        y: gridTop, // Usamos la nueva variable aquí
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

      // ---  CÁLCULO DINÁMICO ---
      const { leftPad, padSize } = hudLayout(this.relatedScene);
      // Calculamos dónde empieza el HUD (borde superior del pad)
      const topOfControls = leftPad.y - (padSize / 2);

      // El objetivo de descenso ahora respeta los controles, no el borde de la pantalla
      let descentTargetY = topOfControls - (100 - level * 10);

      // Límite de seguridad por si acaso
      const H = this.relatedScene.scale.height;
      if (descentTargetY > H - 10) descentTargetY = H - 10;
      // ------------------------------

      const enemies = this.enemies.getChildren();

      let descendingEnemies = enemies.filter(e => e.getData('type') !== 'boss');

      if (level === 1) {
        descendingEnemies = descendingEnemies.slice(24); // solo los secundarios descienden en nivel 1
      }

      // --- CÓDIGO NUEVO PARA EL BOSS ---

      if (level === 5) {
        // Obtenemos el top original para posicionar al Boss
        const top = Math.max(32, Math.round(this.relatedScene.scale.height * 0.06));

        // top + 50 lo despegará de los textos de Puntos/Nivel
        const boss = this.enemies.create(W / 2, top + 50, 'boss-5');
        boss.setData('type', 'boss');
        boss.setData('score', 1500);
        boss.setData('hp', 60);
        boss.setScale(0.8);
        boss.setDepth(2);
      }

      // ---------------------------------

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

    update(time, delta) {
        // Un frame a 60fps dura ~16.6ms. Usamos esto como base para crear un multiplicador.
        const speedMultiplier = delta / 16.66;

        this.formation.ACCELERATION_ON_THE_X_AXIS += (this.formation.SPEED_ON_THE_X_AXIS * speedMultiplier);

        if ((this.formation.ACCELERATION_ON_THE_X_AXIS >= this.formation.JOURNEY && this.formation.SPEED_ON_THE_X_AXIS > 0) ||
            (this.formation.ACCELERATION_ON_THE_X_AXIS <= -this.formation.JOURNEY / 2 && this.formation.SPEED_ON_THE_X_AXIS < 0)) {
            this.formation.SPEED_ON_THE_X_AXIS = -this.formation.SPEED_ON_THE_X_AXIS;
        }

        Phaser.Actions.IncX(this.enemies.getChildren(), this.formation.SPEED_ON_THE_X_AXIS * speedMultiplier);
    }

    get() {
        return this.enemies;
    }

}