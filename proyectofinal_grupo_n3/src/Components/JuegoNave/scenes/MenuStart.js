import Phaser from 'phaser';

class MenuStart extends Phaser.Scene {
    constructor() {
        super("MenuStart"); // Clave única para identificar la escena
        this.musicaMenu = null; // Variable para almacenar la música del menú
    }
    // Método de precarga, donde cargamos imágenes y sonidos necesarios
    preload() {
        this.load.image('menu', '/Image/JuegoNave/fondo.jpg');
        this.load.audio('menuMusic', 'sound/juegoNave/MusicaMenu.mp3');
    }
    // Método de creación de la escena, donde añadimos todos los elementos gráficos y configuramos los eventos
    create() {
        // Solo creamos la música si aún no está cargada
        if (!this.musicaMenu) {
            // Agregar la música al juego con un volumen reducido y en bucle
            this.musicaMenu = this.sound.add('menuMusic', { volume: 0.25, loop: true });
        }
        // Si la música no está sonando, la iniciamos
        if (!this.musicaMenu.isPlaying) {
            this.musicaMenu.play();
        }
        // Agregar un evento para detener la música al abandonar la página
        window.addEventListener('beforeunload', () => {
            if (this.musicaMenu) {
                this.musicaMenu.stop();
            }
        });
        // Añadir la imagen de fondo del menú, centrada en el escenario
        this.add.image(400, 300, 'menu');
        // Añadir el título del juego al centro de la pantalla
        this.add.text(400, 100, 'Cosmic Escape', {
            fontSize: '64px',  
            fill: '#ffffff',  
            fontFamily: 'orbitron',  
            stroke: '#000000', 
            strokeThickness: 6  
        }).setOrigin(0.5);  // Centrar el texto
        // Crear el botón "Jugar"
        const playButton = this.add.text(400, 250, 'Jugar', {
            fontSize: '42px',  
            fill: "#ffffff",  
            fontFamily: "Times New Roman"  
        }).setOrigin(0.5).setInteractive();  // Hacer que el texto sea interactivo (clickeable)
        // Crear el botón "Instrucciones"
        const configButton = this.add.text(400, 350, 'Instrucciones', {
            fontSize: '42px', 
            fill: "#ffffff",
            fontFamily: "Times New Roman"
        }).setOrigin(0.5).setInteractive();
        // Crear el botón "Salir"
        const exitButton = this.add.text(400, 450, 'Salir', {
            fontSize: '42px', 
            fill: '#ffffff',  
            fontFamily: "Times New Roman"
        }).setOrigin(0.5).setInteractive();

        // Eventos para los botones
        playButton.on('pointerdown', () => this.startGame());  // Al hacer clic en "Jugar", inicia el juego
        configButton.on('pointerdown', () => this.configGame());  // Al hacer clic en "Instrucciones", va a ajustes
        exitButton.on('pointerdown', () => this.exitGame());  // Al hacer clic en "Salir", cierra el juego
        // Cambiar el estilo de los botones cuando el mouse pasa por encima
        playButton.on('pointerover', () => playButton.setStyle({ fill: '#ff0', fontSize: '50px' }));
        playButton.on('pointerout', () => playButton.setStyle({ fill: '#ffffff', fontSize: '42px' }));
        // boton de intrucciones
        configButton.on('pointerover', () => configButton.setStyle({ fill: '#ff0', fontSize: '50px' }));
        configButton.on('pointerout', () => configButton.setStyle({ fill: '#ffffff', fontSize: '42px' }));
        //boton de salir
        exitButton.on('pointerover', () => exitButton.setStyle({ fill: '#ff0', fontSize: '50px' }));
        exitButton.on('pointerout', () => exitButton.setStyle({ fill: '#ffffff', fontSize: '42px' }));
    }

    // Método para iniciar el juego, al hacer clic en el botón "Jugar"
    startGame() {
        console.log("Iniciando el juego...");
        // Detener la música del menú
        if (this.musicaMenu) {
            this.musicaMenu.stop();
        }
        // Detener la escena del menú antes de cambiar a la escena del juego
        this.scene.stop('MenuStart');
        // Lanzar la UI del juego y luego iniciar la escena del juego
        this.scene.launch('GameUI');
        this.scene.start('Escena1');
    }
    // Método para ir a la escena de configuraciones (instrucciones)
    configGame() {
        console.log("Configurando el juego...");
        // Detener la música del menú
        if (this.musicaMenu) {
            this.musicaMenu.stop();
        }
        // Lanzar la escena de ajustes
        this.scene.launch('Ajustes');
    }
    // Método para salir del juego (cerrar la ventana)
    exitGame() {
        console.log("Saliendo del juego...");
        // Detener la música del menú
        if (this.musicaMenu) {
            this.musicaMenu.stop();
        }
        // Redirigir a la página principal (cerrar el juego o navegar fuera)
        window.location.href = '/';
    }
}
export default MenuStart;
