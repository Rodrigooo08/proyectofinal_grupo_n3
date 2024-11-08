import Phaser from 'phaser';

class GameUI extends Phaser.Scene {
    constructor() {
        super({ key: 'GameUI', active: false, visible: true });
    }

    preload() {
        this.load.image('muteButton', 'Image/JuegoNave/Button-Mute.png');
        this.load.image('unmuteButton', 'Image/JuegoNave/Button-sound.png');
        this.load.image('pauseButton', 'Image/JuegoNave/Pausebutton.png');
        this.load.image('resumeButton', 'Image/JuegoNave/Button-Play.png');
    }

    create() {
        // Crear botón de mute
        this.muteButton = this.add.sprite(770, 30, 'muteButton').setInteractive();
        this.muteButton.displayWidth = 60;
        this.muteButton.displayHeight = 60;
        this.muteButton.on('pointerdown', () => {
            let soundMuted = this.sound.mute;
            this.sound.mute = !soundMuted;  // Alternar mute
            if (this.sound.mute) {
                this.muteButton.setTexture('muteButton');
            } else {
                this.muteButton.setTexture('unmuteButton');
            }
        });

        // Crear botón de pausa
        this.pauseButton = this.add.sprite(700, 30, 'pauseButton').setInteractive();
        this.pauseButton.displayWidth = 60;
        this.pauseButton.displayHeight = 60;
        this.pauseButton.on('pointerdown', () => {
            this.pauseScene();
        });

        // Crear botón de reanudación
        this.resumeButton = this.add.sprite(700, 30, 'resumeButton').setInteractive();
        this.resumeButton.displayWidth = 60;
        this.resumeButton.displayHeight = 60;
        this.resumeButton.setVisible(false);
        this.resumeButton.on('pointerdown', () => {
            this.resumeScene();
        });

        // Crear el cartel de pausa (invisible al principio)
        this.pausaText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Pausa', {
            font: '40px Arial',
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setVisible(false); // Inicialmente no visible
    }

    // Método para pausar la escena
    pauseScene() {
        const escenaActiva = this.obtenerEscenaActiva();
        if (escenaActiva) {
            this.scene.pause(escenaActiva);  // Pausar la escena activa
        }
        this.sound.pauseAll();  // Pausar toda la música y los sonidos
        this.pausaText.setVisible(true);  // Mostrar el cartel de pausa
        this.pauseButton.setVisible(false);  // Ocultar el botón de pausa
        this.resumeButton.setVisible(true);  // Mostrar el botón de reanudación
    }

    // Método para reanudar la escena
    resumeScene() {
        const escenaPausada = this.obtenerEscenaPausada();
        if (escenaPausada) {
            this.scene.resume(escenaPausada);  // Reanudar la escena pausada
        }
        this.sound.resumeAll();  // Reanudar toda la música y los sonidos
        this.pausaText.setVisible(false);  // Ocultar el cartel de pausa
        this.pauseButton.setVisible(true);  // Mostrar el botón de pausa
        this.resumeButton.setVisible(false);  // Ocultar el botón de reanudación
    }

    obtenerEscenaActiva() {
        // Filtra las escenas activas que no sean la UI
        const escenaActiva = this.scene.manager.getScenes(true);
        return escenaActiva.find(scene => scene.scene.key !== 'GameUI')?.scene.key;
    }

    obtenerEscenaPausada() {
        // Filtra las escenas activas que no sean la UI
        const escenaPausada = this.scene.manager.getScenes(false);
        return escenaPausada.find(scene => scene.scene.key !== 'GameUI' && scene.scene.isPaused())?.scene.key;
    }
}

export default GameUI;
