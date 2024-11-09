import Phaser from 'phaser';
class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        this.load.image('GameOver', 'public/Image/juegoNave/GameOverS2.png');
        this.load.audio('Final', 'sound/juegoNave/Final.mp3')
    }

    init(data) {
        this.puntaje = data.puntaje;
    }

    create() {
        this.Final = this.sound.add('Final');
        const soundConfig = { volume: 0.3, loop: true };
        if (!this.sound.locked) {
            this.Final.play(soundConfig);
        }
        this.add.image(390, 250, 'GameOver');

        let texto = this.add.text(400, 550, 'Puntaje: ' + Math.floor(this.puntaje), {
            fontSize: '40px',
            fill: '#ffff'
        }).setOrigin(0.5);

        let textBounds = texto.getBounds();

        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.8);
        graphics.fillRect(textBounds.x - 10, textBounds.y - 10, textBounds.width + 20, textBounds.height + 20);

        texto.setDepth(1);

        this.input.keyboard.once('keydown-ENTER', () => {
            this.Final.stop();
            this.scene.start('Escena1');
            this.scene.launch('GameUI');
        });
    }
}
export default GameOver;
