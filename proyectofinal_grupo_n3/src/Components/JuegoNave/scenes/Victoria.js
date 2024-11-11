import Phaser from 'phaser';
class Victoria extends Phaser.Scene {
    constructor() {
        super("Victoria");  // El nombre de la escena, que es "Victoria"
    }
    // Carga los recursos necesarios para la escena
    preload() {
        this.load.image('Victoria', 'public/Image/JuegoNave/Victoria.png');  // Carga la imagen de "Victoria"
        this.load.audio('Final', 'sound/juegoNave/FinalGame.mp3');  // Carga el sonido que se reproduce al ganar
    }
    // Inicializa los datos pasados desde la escena anterior (como el puntaje)
    init(data) {
        this.puntaje = data.puntaje;  // Recupera el puntaje de la escena anterior
    }
    // Crea los elementos en la escena (se ejecuta después de preload)
    create() {
        // Carga y configura la música de fondo para la pantalla de victoria
        this.Final = this.sound.add('Final');  // Añade el sonido 'Final' a la escena
        const soundConfig = { volume: 0.3, loop: false };  // Configura el volumen y establece que no se repita
        if (!this.sound.locked) {
            this.Final.play(soundConfig);  // Reproduce el sonido de victoria
        }
        // Ajusta la imagen de victoria para que ocupe el centro de la pantalla
        let victoriaImage = this.add.image(this.scale.width / 2, this.scale.height / 2, 'Victoria');
        victoriaImage.setDisplaySize(800, 600);  // Ajusta el tamaño de la imagen a 800x600 píxeles
        // Crea el texto que muestra el puntaje final en el centro de la pantalla
        let texto = this.add.text(400, 550, 'Puntaje: ' + Math.floor(this.puntaje), {
            fontSize: '40px',
            fill: '#ffff'
        }).setOrigin(0.5);  // Centra el texto en las coordenadas (400, 550)

        // Crea un fondo negro semi-transparente alrededor del texto para hacerlo más legible
        let textBounds = texto.getBounds();  // Obtiene las dimensiones del texto
        let graphics = this.add.graphics();  // Crea un objeto gráfico para dibujar sobre la pantalla
        graphics.fillStyle(0x000000, 0.8);  // Define el color y la opacidad (negro y 80% opaco)
        graphics.fillRect(textBounds.x - 10, textBounds.y - 10, textBounds.width + 20, textBounds.height + 20);  // Dibuja un rectángulo alrededor del texto
        texto.setDepth(1);  // Asegura que el texto esté por encima del fondo gráfico
        // Espera que el jugador presione la tecla ENTER para reiniciar el juego
        this.input.keyboard.once('keydown-ENTER', () => {
            this.Final.stop();
            this.scene.start('Escena1');
            this.scene.launch('GameUI');
        });
    }
}
export default Victoria;
