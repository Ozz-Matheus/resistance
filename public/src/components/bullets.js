// src/components/bullets.js

/* ------------------------------------------------------------------------------------------ */

export class Bullets {

	static MAXIMUM_NUMBER_OF_BULLETS = 1;
	static SPEED_ON_THE_Y_AXIS = -500;

    constructor(scene) {
        this.relatedScene = scene;
    }

    create(){


        this.bullets = this.relatedScene.physics.add.group({
            key: 'lasers',
            setXY: { x: -9999, y: 9999, stepX: 150 },
            repeat: Bullets.MAXIMUM_NUMBER_OF_BULLETS
        });

        this.relatedScene.anims.create({
            key: 'bullet-animation',
            frames: this.relatedScene.anims.generateFrameNumbers('lasers', { frames: [0, 1] }),
            frameRate: 15,
            repeat: -1
        });


        this.bullets.getChildren().forEach(bullet => {
            bullet.setScale(0.5, 1);
            bullet.setActive(false).setVisible(false).disableBody(true, true);
            bullet.play('bullet-animation');
            //console.log(bullet.body.width, bullet.body.height);
        });


        this.rhythm = {
            bullets: 200,
            flag: 0
        };


    	//console.log(this.bullets);

    }

    update() {

        this.bullets.children.iterate(bullet => {
            if (bullet.y < 0) {

                bullet.setActive(false).setVisible(false).setX(-9999);
            }
        });
    }

    recreate() {
      this.bullets.clear(true, true); // elimina las balas existentes

      this.bullets = this.relatedScene.physics.add.group({
        key: 'lasers',
        setXY: { x: -9999, y: 9999, stepX: 150 },
        repeat: Bullets.MAXIMUM_NUMBER_OF_BULLETS
      });

      this.relatedScene.anims.create({
        key: 'bullet-animation',
        frames: this.relatedScene.anims.generateFrameNumbers('lasers', { frames: [0, 1] }),
        frameRate: 15,
        repeat: -1
      });

      this.bullets.getChildren().forEach(bullet => {
        bullet.setScale(0.5, 1);
        bullet.setActive(false).setVisible(false).disableBody(true, true);
        bullet.play('bullet-animation');
      });

      //console.log(`[Recreate] MAX BULLETS: ${Bullets.MAXIMUM_NUMBER_OF_BULLETS}`);
    }

    get() {
        return this.bullets;
    }

}