import Phaser from 'phaser';
import Escena1 from './Escena1';
class GameUI extends Phaser.Scene{
    constructor(){
        super({key : 'GameUI',active:false,visible:true});
    }
    preload(){
        this.load.image('muteButton','Image/JuegoNave/Button-Mute.png')
        this.load.image('unmuteButton','Image/JuegoNave/Button-sound.png')
        this.load.image('pauseButton', 'Image/JuegoNave/Pausebutton.png')
        this.load.image('resumeButton', 'Image/JuegoNave/Button-Play.png')
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
         // Crea botón de pausa
         this.pauseButton = this.add.sprite(700, 30, 'pauseButton').setInteractive();
         this.pauseButton.displayWidth = 60;
         this.pauseButton.displayHeight = 60;
         this.pauseButton.on('pointerdown', () => {
           
         this.pauseScene();
        });

        // Crea botón de reanudación
        this.resumeButton = this.add.sprite(700, 30, 'resumeButton').setInteractive();
        this.resumeButton.displayWidth = 60;
        this.resumeButton.displayHeight = 60;
        this.resumeButton.setVisible(false); 
        this.resumeButton.on('pointerdown', () => {
        this.resumeScene();
        });
    }

    // Método para pausar la escena
    pauseScene() {
        const escenaActiva = this.obtenerEscenaActiva();
        if(escenaActiva){
            this.scene.pause(escenaActiva);
        }
        //this.scene.pause('Escena1');
        this.pauseButton.setVisible(false); 
        this.resumeButton.setVisible(true); 
    }

    // Método para reanudar la escena
    resumeScene() {
        const escenaPausada = this.obtenerEscenaPausada();
        if(escenaPausada){
            this.scene.resume(escenaPausada);
        }
        //this.scene.resume('Escena1');
        this.pauseButton.setVisible(true); 
        this.resumeButton.setVisible(false); 
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