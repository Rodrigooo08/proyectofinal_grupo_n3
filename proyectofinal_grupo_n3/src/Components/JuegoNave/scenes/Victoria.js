import Phaser from 'phaser';
class Victoria extends Phaser.Scene {
    constructor() {
        super("Victoria");
    }

    preload() {
        this.load.image('Victoria', 'public/Image/JuegoNave/Victoria.png');
       this.load.audio('Final', 'sound/juegoNave/FinalGame.mp3');
    }

    init(data) {
        this.puntaje = data.puntaje;
    }

    create() {
       this.Final = this.sound.add('Final');
        const soundConfig = { volume: 0.3, loop: false };
        if (!this.sound.locked) {
            this.Final.play(soundConfig);
        }

        // Ajustar la imagen
        let victoriaImage = this.add.image(this.scale.width / 2, this.scale.height / 2, 'Victoria');
        
        victoriaImage.setDisplaySize(800, 600);

        let texto = this.add.text(400, 550, 'Puntaje: ' + this.puntaje, {
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
        });
    }
}

export default Victoria;
