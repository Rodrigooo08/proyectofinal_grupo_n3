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
        // Carga y configura la música de fondo para la pantalla de Game Over
        this.Final = this.sound.add('Final');
        const soundConfig = { volume: 0.3, loop: false };  // Configura el volumen y establece que no se repita
        if (!this.sound.locked) {
            this.Final.play(soundConfig);  // Reproduce el sonido de final de juego
        }
        // Añade la imagen de fondo con el texto "Game Over"
        this.add.image(400, 300, 'GameOver');  // Coloca la imagen de "Game Over" en el centro de la pantalla
        // Crea el texto que muestra el puntaje final
        let texto = this.add.text(400, 550, 'Puntaje: ' + Math.floor(this.puntaje), {
            fontSize: '40px',  // Tamaño de la fuente
            fill: '#ffff'  // Color del texto (blanco)
        }).setOrigin(0.5);  // Centra el texto en las coordenadas (400, 550)
        // Crea un fondo negro semi-transparente alrededor del texto para hacerlo más legible
        let textBounds = texto.getBounds();  // Obtiene las dimensiones del texto
        let graphics = this.add.graphics();  // Crea un objeto gráfico para dibujar sobre la pantalla
        graphics.fillStyle(0x000000, 0.8);  // Define el color y la opacidad (negro y 80% opaco)
        graphics.fillRect(textBounds.x - 10, textBounds.y - 10, textBounds.width + 20, textBounds.height + 20);  // Dibuja un rectángulo alrededor del texto
        texto.setDepth(1);  // Asegura que el texto esté por encima del fondo gráfico
        // Crea el texto que indica al jugador presionar ENTER para reiniciar el juego
        let mensajeReinicio = this.add.text(400, 497, 'Presiona ENTER para volver a jugar', {
            fontSize: '32px', 
            fill: '#ffff',  
            align: 'center' 
        }).setOrigin(0.5);  // Centra el texto en las coordenadas (400, 497)
        // Crea un fondo negro semi-transparente alrededor del texto de reinicio
        let mensajeBounds = mensajeReinicio.getBounds();  // Obtiene las dimensiones del texto
        let graphics2 = this.add.graphics();  // Crea otro objeto gráfico para dibujar sobre la pantalla
        graphics2.fillStyle(0x000000, 0.8);  // Define el color y la opacidad (negro y 80% opaco)
        graphics2.fillRect(mensajeBounds.x - 10, mensajeBounds.y - 10, mensajeBounds.width + 20, mensajeBounds.height + 20);  // Dibuja un rectángulo alrededor del texto
        mensajeReinicio.setDepth(1);  // Asegura que el texto de reinicio esté por encima del fondo gráfico
        // Espera que el jugador presione la tecla ENTER para reiniciar el juego
        this.input.keyboard.once('keydown-ENTER', () => {
            this.Final.stop(); 
            this.scene.start('Escena1');  
            this.scene.launch('GameUI');  
        });
    }
}
export default GameOver;