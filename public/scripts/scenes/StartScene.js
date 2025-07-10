// public/scripts/scenes/StartScene.js

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.image('start-bg', 'assets/start-screen.png?1');
    }

    create() {
        const { width, height } = this.sys.game.canvas;

        this.add.image(width / 2, height / 2, 'start-bg').setOrigin(0.5);

        const text = this.add.text(width / 2, height * 0.8, 'Toca para iniciar', {
            fontSize: '32px',
            fill: '#fff'
        });
        text.setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('MainScene');
        });
    }
}
