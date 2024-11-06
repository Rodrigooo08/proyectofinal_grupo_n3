import Phaser from 'phaser';
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
         // Crear botón de pausa
         this.pauseButton = this.add.sprite(700, 30, 'pauseButton').setInteractive();
         this.pauseButton.displayWidth = 60;
         this.pauseButton.displayHeight = 60;
    }
}
export default GameUI;