import Phaser from 'phaser';

class GameUI extends Phaser.Scene {
    constructor() {
        // El constructor configura la escena con una clave única ('GameUI') y un estado inicial de no activo y visible
        super({ key: 'GameUI', active: false, visible: true });
    }
    // Carga los recursos necesarios para los botones y las imágenes de la UI
    preload() {
        this.load.image('muteButton', 'Image/JuegoNave/Button-Mute.png');  
        this.load.image('unmuteButton', 'Image/JuegoNave/Button-sound.png');  
        this.load.image('pauseButton', 'Image/JuegoNave/Pausebutton.png');  
        this.load.image('resumeButton', 'Image/JuegoNave/Button-Play.png'); 
    }
    // Crea los elementos de la UI y los comportamientos interactivos
    create() {
        // Crear el botón de mute, que alterna entre mutear y desmutear el sonido
        this.muteButton = this.add.sprite(770, 30, 'muteButton').setInteractive();  // Hacer que el sprite sea interactivo
        this.muteButton.displayWidth = 60;  // Ajustar el ancho del botón
        this.muteButton.displayHeight = 60;  // Ajustar el alto del botón
        this.muteButton.on('pointerdown', () => {  // Evento cuando el botón es presionado
            let soundMuted = this.sound.mute;  // Obtener el estado actual de mute
            this.sound.mute = !soundMuted;  // Alternar el estado de mute
            // Cambiar la textura del botón según el estado de mute
            if (this.sound.mute) {
                this.muteButton.setTexture('muteButton');
            } else {
                this.muteButton.setTexture('unmuteButton');
            }
        });
        // Crear el botón de pausa
        this.pauseButton = this.add.sprite(700, 30, 'pauseButton').setInteractive();  // Hacer que el sprite sea interactivo
        this.pauseButton.displayWidth = 70;  // Ajustar el tamaño del botón
        this.pauseButton.displayHeight = 70;  // Ajustar el tamaño del botón
        this.pauseButton.on('pointerdown', () => {  // Evento cuando el botón es presionado
            this.pauseScene();  // Llamar al método que pausa la escena
        });
        // Crear el botón de reanudación (inicialmente oculto)
        this.resumeButton = this.add.sprite(700, 30, 'resumeButton').setInteractive();  // Crear el botón de reanudación
        this.resumeButton.displayWidth = 60;  // Ajustar el tamaño del botón
        this.resumeButton.displayHeight = 60;  // Ajustar el tamaño del botón
        this.resumeButton.setVisible(false);  // Hacer que el botón de reanudación sea invisible inicialmente
        this.resumeButton.on('pointerdown', () => {  // Evento cuando el botón es presionado
            this.resumeScene();  // Llamar al método que reanuda la escena
        });
        // Crear un texto que muestra "Pausa" cuando el juego está pausado (inicialmente invisible)
        this.pausaText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Pausa', {
            font: '40px Arial',  // Estilo de la fuente
            fill: '#ff0000',  // Color del texto (rojo)
            stroke: '#000000',  // Color del borde del texto (negro)
            strokeThickness: 6  // Grosor del borde del texto
        }).setOrigin(0.5).setVisible(false);  // Centrar el texto y hacerlo invisible al principio
    }
    // Método para pausar la escena
    pauseScene() {
        const escenaActiva = this.obtenerEscenaActiva();  // Obtener la escena activa
        if (escenaActiva) {
            this.scene.pause(escenaActiva);  // Pausar la escena activa
        }
        this.sound.pauseAll();  // Pausar todos los sonidos y música
        this.pausaText.setVisible(true);  // Mostrar el cartel de "Pausa"
        this.pauseButton.setVisible(false);  // Ocultar el botón de pausa
        this.resumeButton.setVisible(true);  // Mostrar el botón de reanudación
    }
    // Método para reanudar la escena
    resumeScene() {
        const escenaPausada = this.obtenerEscenaPausada();  // Obtener la escena que está pausada
        if (escenaPausada) {
            this.scene.resume(escenaPausada);  // Reanudar la escena pausada
        }
        this.sound.resumeAll();  // Reanudar todos los sonidos y música
        this.pausaText.setVisible(false);  // Ocultar el cartel de "Pausa"
        this.pauseButton.setVisible(true);  // Mostrar el botón de pausa
        this.resumeButton.setVisible(false);  // Ocultar el botón de reanudación
    }
    // Método para obtener la clave de la escena activa que no sea la UI
    obtenerEscenaActiva() {
        const escenaActiva = this.scene.manager.getScenes(true);  // Obtener todas las escenas activas
        // Filtrar para obtener la primera escena activa que no sea la UI (GameUI)
        return escenaActiva.find(scene => scene.scene.key !== 'GameUI')?.scene.key;
    }
    // Método para obtener la clave de la escena pausada que no sea la UI
    obtenerEscenaPausada() {
        const escenaPausada = this.scene.manager.getScenes(false);  // Obtener todas las escenas que no están activas
        // Filtrar para obtener la primera escena pausada que no sea la UI (GameUI)
        return escenaPausada.find(scene => scene.scene.key !== 'GameUI' && scene.scene.isPaused())?.scene.key;
    }
}
export default GameUI;