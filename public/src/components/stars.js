// src/components/stars.js

/* ------------------------------------------------------------------------------------------ */

export class Stars {

	static NUMBER_OF_BLUE_STARS = 39;
	static NUMBER_OF_RED_STARS = 49;
	static INITIAL_SCALE = 0.01;
	static MAXIMUM_SCALE = 0.21;
	static APPEAR_ABOVE = -15;

	/* --------------------------- */

	constructor(scene) {
		this.relatedScene = scene;
	}


	create() {


		this.stars = {

			bluish: this.relatedScene.physics.add.group({
				key: 'blue-star',
				repeat: Stars.NUMBER_OF_BLUE_STARS
			}),

			reddish: this.relatedScene.physics.add.group({
				key: 'red-star',
				repeat: Stars.NUMBER_OF_RED_STARS
			}),
		};

		Object.keys(this.stars).forEach(starType => {
			this.stars[starType].getChildren().forEach(star => {
				this.initialize(star);
			});
		});

		Object.keys(this.stars).forEach(starType => {
			this.relatedScene.tweens.add({
				targets: this.stars[starType].getChildren(),
				scale: Stars.MAXIMUM_SCALE,
				yoyo:true,
				duration: 99,
				repeat: -1
			});
		});

		//console.log(this.stars);

	}

	update() {

		Object.keys(this.stars).forEach(starType => {
			this.stars[starType].getChildren().forEach(star => {
		            if (star.y > this.relatedScene.sys.game.config.height * 1.1) {
		            star.setY(Stars.APPEAR_ABOVE);
		            star.setX(Phaser.Math.Between(0, this.relatedScene.sys.game.config.width));
		        }
		    });
		});

	}


	initialize(star) {
	    star.setScale(Stars.INITIAL_SCALE + Phaser.Math.FloatBetween(0, 0.12));
	    star.setVelocityY(Phaser.Math.FloatBetween(5, 50));
	    star.setX(Phaser.Math.Between(0, this.relatedScene.sys.game.config.width));
	    star.setY(Phaser.Math.Between(0, this.relatedScene.sys.game.config.height));
	}


}
















