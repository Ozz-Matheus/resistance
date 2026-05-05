// src/scenes/game.js

import { loader } from './loader.js';
import { Stars } from '../components/stars.js';
import { Player } from '../components/player.js';
import { Bullets } from '../components/bullets.js';
import { Enemies } from '../components/enemies.js';
import { Explosions } from '../components/explosions.js';
import { Attacks } from '../components/attacks.js';
import { Particles } from '../components/particles.js';
import { Settings } from '../settings.js';
import { Texts } from '../utils/translations.js';
import { ScoreBoard } from '../components/scoreboard.js';
import { LivesDisplay } from '../components/livesdisplay.js';
import { FireButton } from '../components/firebutton.js';
import { VirtualGamepad } from '../components/virtualgamepad.js';
import { FullscreenButton } from '../components/fullscreenbutton.js';
import { PowerUps } from '../components/powerups.js';
import { createBackground } from '../utils/background.js';

/* ------------------------------------------------------------------------------------------ */

export class Game extends Phaser.Scene {

    // Probabilidad de soltar un power-up (porcentaje)
    static DROP_RATE_POWERUP_PERCENTAGE = 2;

    constructor() {
        super({ key: 'game' });
    }

    init() {

        this.input.addPointer(3);

        this.stars = new Stars(this);
        this.player = new Player(this);
        this.bullets = new Bullets(this);
        this.enemies = new Enemies(this);
        this.attacks = new Attacks(this);
        this.explosions = new Explosions(this);
        this.particles = new Particles(this);
        this.livesDisplay = new LivesDisplay(this);
        this.scoreboard = new ScoreBoard(this);

        this.virtualGamepad = new VirtualGamepad(this);

        this.fireButton = new FireButton(this);

        this.fullscreen = new FullscreenButton(this);

        this.powerups = new PowerUps(this);

    }

    preload() {
        loader(this);
    }

    create(){

        this.fullscreen.create();

        this.livesDisplay.create();

        this.scoreboard.create();

        this.scoreboard.updateLevel(Settings.getLevel());

        this.registry.set('level', Settings.getLevel());

        this.registry.set('points', Settings.getPoints());

        this.registry.set('lives', Settings.getLives());

        this.bullet_sound = this.sound.add('bullet-sound');
        this.explosion_sound = this.sound.add('explosion-sound');
        this.die_throw = this.sound.add('die-throw');

        createBackground(this, -10);

        this.stars.create();
        this.player.create();
        this.bullets.create();
        this.enemies.create();
        this.attacks.create();
        this.explosions.create();
        this.particles.create();

        this.physics.add.overlap(this.enemies.get(), this.bullets.get(), this.handleBulletHitsEnemy, null, this);

        this.physics.add.overlap(
          this.attacks.get(),
          this.player.get(),
          this.onAttackHitPlayer,
          (player, attack) => player.alpha >= 1 && !player.getData('isImmune'),
          this
        );

        this.physics.add.overlap(
          this.enemies.get(),
          this.player.get(),
          this.onEnemyHitPlayer,
          (player, enemy) => player.alpha >= 1 && !player.getData('isImmune'),
          this
        );

        this.virtualGamepad.createJoystick();

        this.fireButton.create();

        this.powerups.create();

        this.physics.add.overlap(this.powerups.get(), this.player.get(), this.handlePowerUpPickup, null, this);



    }

    update(time, delta) {
        this.handlePlayerShooting();
        this.handleEnemyShooting();

        this.stars.update();
        this.player.update();
        this.bullets.update();

        // Pasamos el delta time a la clase de enemigos
        this.enemies.update(time, delta);

        this.attacks.update();

        const props = this.virtualGamepad.getProperties();
        if (props.left) {
          this.player.get().setVelocityX(-Player.SPEED_ON_THE_X_AXIS);
        } else if (props.right) {
          this.player.get().setVelocityX(Player.SPEED_ON_THE_X_AXIS);
        }
    }




    handlePlayerShooting() {
        if (!this.player.get().active || !this.player.get().visible) return;

        if (this.player.controls.space.isDown || this.fireButton?.isDown) {
            if (this.time.now > this.bullets.rhythm.flag) {
                //console.log('bullet');

                let bulletsFired = 0;
                const maxBullets = this.bullets.activeLimit;

                this.bullets.get().getChildren().forEach(bullet => {
                  if (!bullet.active && !bullet.visible && bulletsFired < maxBullets) {
                    bulletsFired++;

                    const offset = 15 * (bulletsFired - Math.ceil(maxBullets / 2)); // para espaciar
                    bullet.setActive(true).setVisible(true).enableBody(true, true);
                    bullet.setX(this.player.get().x + offset);
                    bullet.setY(this.player.get().y - Math.floor(this.player.get().body.height / 2));
                    bullet.setVelocityY(Bullets.SPEED_ON_THE_Y_AXIS);
                    bullet.setAlpha(0.9);
                    this.bullet_sound.play();
                  }
                });

                this.bullets.rhythm.flag = this.time.now + this.bullets.rhythm.bullets;
            }
        }
    }


    handleBulletHitsEnemy(enemies, bullets) {

        // Desactivamos la bala siempre
        bullets.setActive(false).setVisible(false).disableBody(true, true);

        // Si es el Boss, le restamos vida
        if (enemies.getData('type') === 'boss') {
            let hp = enemies.getData('hp') - 1;
            enemies.setData('hp', hp);

            // Cambiar el frame de daño según la vida restante (asumiendo 80 HP iniciales)
            if (hp <= 20) {
                enemies.setFrame(3);
            } else if (hp <= 40) {
                enemies.setFrame(2);
            } else if (hp <= 60) {
                enemies.setFrame(1);
            }

            // Efecto de daño visual rápido
            enemies.setTint(0xff0000);
            this.time.delayedCall(100, () => enemies.clearTint());
            this.explosions.spawn(bullets.x, bullets.y, this.explosion_sound);

            if (hp > 0) return;
        }

        // Si no es Boss, o si el Boss llegó a 0 de vida, aplicamos la muerte normal
        this.explosions.spawn(enemies.x, enemies.y, this.explosion_sound);

        const score = enemies.getData('score') ?? 100;
        this.registry.set('points', this.registry.get('points') + score);

        enemies.setActive(false).setVisible(false).disableBody(true, true);
        this.particles.spawn(enemies.x, enemies.y);

        if (Phaser.Math.Between(0, 100) < Game.DROP_RATE_POWERUP_PERCENTAGE) {
          const currentLevel = this.registry.get('level') || 1;
          this.powerups.spawn(enemies.x, enemies.y, currentLevel);
        }

        // Validación de fin de nivel
        if (this.enemies.get().countActive(true) === 0) {
          this.time.delayedCall(1000, () => {
            if (Settings.isLastLevel()) {
              Settings.setPoints(this.registry.get('points'));
              this.scene.start('victory');
            } else {
              Settings.setPoints(this.registry.get('points'));
              this.scene.start('levelpassed');
            }
           });
        }
    }

    handleEnemyShooting() {
        // 1. Verificamos si es momento de disparar. Si no, salimos de inmediato para ahorrar CPU.
        if (this.time.now < this.attacks.rhythm.flag || Phaser.Math.Between(0, 999) >= 20) {
            return;
        }

        // 2. Filtramos para obtener solo los enemigos que siguen vivos (activos)
        const activeEnemies = this.enemies.get().getChildren().filter(e => e.active);
        if (activeEnemies.length === 0) return;

        // Elegimos un enemigo al azar para que realice el disparo
        const randomEnemy = Phaser.Utils.Array.GetRandom(activeEnemies);

        const isBoss = randomEnemy.getData('type') === 'boss';

        // El Boss dispara 4, los normales 1
        const bulletsToFire = isBoss ? 4 : 1;
        let bulletsFired = 0;

        this.attacks.get().getChildren().forEach(attack => {
            if (!attack.active && bulletsFired < bulletsToFire) {
                bulletsFired++;

                // Si es el Boss, calculamos un desfase: -40, 0, +40 px
                const offsetX = isBoss ? 40 * (bulletsFired - 2) : 0;

                this.configureEnemyAttack(attack, randomEnemy, offsetX);
            }
        });

        if (bulletsFired > 0) {
            this.tweens.add({
                targets: randomEnemy,
                angle: 360,
                duration: 300,
                yoyo: true
            });

            this.die_throw.play();
            this.attacks.rhythm.flag = this.time.now + this.attacks.rhythm.attacks;
        }
    }

    configureEnemyAttack(attack, enemy, offsetX = 0){

        attack.setActive(true).setVisible(true);
        // Sumamos el offsetX a la posición del enemigo
        attack.enableBody(true, enemy.x + offsetX, enemy.y, true, true);
        attack.setScale(0.8);

        const level = this.registry.get('level') || 1;
        const speed = this.attacks.getAttackSpeedByLevel(level);
        attack.setVelocityY(speed);

        //console.log(speed);
    }

    onAttackHitPlayer(attack, player) {

      if (player.getData('isImmune')) return;

      // Desactivar ataque enemigo
      attack.setActive(false).setVisible(false).disableBody(true, true);
      this.damagePlayer(player);
    }

    onEnemyHitPlayer(player, enemy) {

      if (player.getData('isImmune')) return;

      const type = enemy.getData('type');
      const score = enemy.getData('score') ?? 100;

      //console.log('[COLISIÓN] Enemigo tipo:', type);
      //console.log('[COLISIÓN] Enemigo puntaje:', score);

      this.registry.set('points', this.registry.get('points') + score);

      this.particles.spawn(enemy.x, enemy.y);
      this.explosions.spawn(enemy.x, enemy.y, this.explosion_sound);

      enemy.setActive(false).setVisible(false).disableBody(true, true);

      this.damagePlayer(player);

      // Si ya no quedan enemigos y SIGUE con vidas, pasar de nivel
      if (Settings.getLives() > 0 && this.enemies.get().countActive(true) === 0) {
        this.time.delayedCall(1000, () => {
          if (Settings.isLastLevel()) {
            Settings.setPoints(this.registry.get('points'));
            this.scene.start('victory');
          } else {
            Settings.setPoints(this.registry.get('points'));
            this.scene.start('levelpassed');
          }
        });
      }

    }

    damagePlayer(player) {

      // Reducir vidas en el Registry
      const currentLives = this.registry.get('lives') - 1;
      this.registry.set('lives', currentLives);
      Settings.setLives(currentLives); // Mantenemos Settings actualizado para gameover/victory

      // Quitar el Power UP
      this.bullets.resetPowerUp();

      // Ocultar jugador
      player.setActive(false).setVisible(false).disableBody(true, true);

     // Efecto visual
      this.particles.spawn(player.x, player.y);
      this.explosions.spawn(player.x, player.y, this.explosion_sound);

      // Verificar si ya no tiene vidas
      if (currentLives <= 0) {
        Settings.setPoints(this.registry.get('points'));
        this.time.delayedCall(1000, () => this.scene.start('gameover'));
        return;
      }

      // Revivir jugador tras pausa e invulnerabilidad
      this.time.delayedCall(1500, () => {
        const player = this.player.get();
        const [x, y] = player.getData('posIni');

        player.setActive(true).setVisible(true).setAlpha(0.1);
        player.enableBody(true, x, y, true, true);

        // Fade-in gradual
        this.tweens.add({
          targets: player,
          alpha: 1,
          duration: 1500,
        });
      });
    }

  handlePowerUpPickup(player, powerup) {
      powerup.setActive(false).setVisible(false).disableBody(true, true);

      const level = this.registry.get('level') || 1;

      switch(level) {
          case 1:
              // N1 - 3 disparos (Modificas tu componente bullets.js para permitir 3)
              this.bullets.activeLimit = 3;
              break;

          case 2:
              // N2 - Inmunidad 10 segundos
              player.setData('isImmune', true);
              player.setTint(0xffff00); // Feedback visual
              this.time.delayedCall(10000, () => {
                  player.setData('isImmune', false);
                  player.clearTint();
              });
              break;

          case 3:
              // N3 - Ralentiza naves y disparos 10 Segundos
              this.enemies.formation.SPEED_ON_THE_X_AXIS *= 0.5; // Ralentiza enemigos
              this.attacks.rhythm.attacks *= 2; // Disparan más lento

              this.time.delayedCall(10000, () => {
                  this.enemies.formation.SPEED_ON_THE_X_AXIS *= 2; // Vuelve a la normalidad
                  this.attacks.rhythm.attacks /= 2;
              });
              break;

          case 4:
              // N4 - Agregar una vida extra
              let currentLives = this.registry.get('lives');
              if (currentLives < 4) { // Opcional: limitar a un máximo de 4
                  currentLives++;
                  this.registry.set('lives', currentLives);
                  Settings.setLives(currentLives);
                  // El componente LivesDisplay se actualiza automáticamente por el evento 'changedata-lives'
              }
              break;

          case 5:
              // N5 - Velocidad X2 y parpadeo
              const originalSpeed = player.getData('vel-x');
              player.setData('vel-x', originalSpeed * 2);

              // Efecto parpadeo
              const blink = this.tweens.add({
                  targets: player,
                  alpha: 0.2,
                  yoyo: true,
                  repeat: -1,
                  duration: 200
              });

              this.time.delayedCall(10000, () => {
                  player.setData('vel-x', originalSpeed);
                  blink.stop();
                  player.setAlpha(1);
              });
              break;
      }
  }

}