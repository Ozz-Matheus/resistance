// src/components/attacks.js


import { Settings } from '../settings.js';


/* ------------------------------------------------------------------------------------------ */

export class Attacks {

	static MAXIMUM_NUMBER_OF_ATTACKS = 10;

    constructor(scene) {
        this.relatedScene = scene;
    }

    create(){


        this.attacks = this.relatedScene.physics.add.group({
            key: 'flames',
            setXY: { x: -9999, y: 9999, stepX: 150 },
            repeat: Attacks.MAXIMUM_NUMBER_OF_ATTACKS
        });


        const level = this.relatedScene.registry.get('level') || 1;

        // Disminuye el tiempo entre disparos a mayor nivel
        let fireRate = 2500 - level * 300;
        if (fireRate < 800) fireRate = 800;

        // Guardamos el ritmo en el objeto
        this.rhythm = {
          attacks: fireRate,
          flag: 0
        };


        this.relatedScene.anims.create({
            key: 'attack-animation',
            frames: this.relatedScene.anims.generateFrameNumbers('flames', { frames: [0, 1, 2, 3] }),
            frameRate: 10,
            repeat: -1
        });


        this.attacks.getChildren().forEach(attack => {
            attack.setScale(0.8);
            attack.setActive(false).setVisible(false).disableBody(true, true);
            attack.play('attack-animation');
            //console.log(attack.body.width, attack.body.height);
        });

    	//console.log(this.attacks);

    }

    update() {

        this.attacks.children.iterate(attack => {
            if (attack.y > this.relatedScene.sys.game.config.height) {

                attack.setActive(false).setVisible(false).disableBody(true, true);
            }
        });
    }

    get() {
        return this.attacks;
    }

    getAttackSpeedByLevel(level) {
      const baseSpeed = 200;
      const extraSpeed = (level - 1) * 100;
      return baseSpeed + extraSpeed;
    }
}