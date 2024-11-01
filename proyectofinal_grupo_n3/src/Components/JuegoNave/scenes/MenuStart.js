import Phaser from 'phaser';
class MenuStart extends Phaser.Scene {  
    constructor() {  
        super("MenuStart"); // Nombre clave de la escena
    }  

    preload() {  
        this.load.image('menu','public/Image/JuegoNave/fondo.jpg');
       // this.load.audio('menuMusic','public/resource/sound/MusicaMenu.mp3');
        // carga imágen y sonido  
    }  

    create() {  
        //sonido menu
      /*  this.musicaMenu = this.sound.add('menuMusic');
        const soundConfig={volume:1,loop:true};
            if(!this.sound.locked){
                this.musicaMenu.play(soundConfig);
            } else {
                this.input.once('pointerdown', () => {
                    this.musicaMenu.play(soundConfig);
                });
                
            }*/
            
    
         //fondo menu
        this.add.image(400,300,'menu');
        
        // Título del juego  
        this.add.text(400, 100, 'Esquivando Meteoros', {  
            fontSize: '64px',  
            fill: '#ffffff' , 
            fontFamily: 'orbitron',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);  

        // Botones del menú  
        const playButton = this.add.text(400, 250, 'Jugar', {  
            fontSize: '42px',  
            fill: "#ffffff",
            fontFamily:"Times New Roman"
            
        }).setOrigin(0.5).setInteractive();  

        const configButton = this.add.text(400, 350, 'Ajustes', {  
            fontSize: '42px',  
            fill: "#ffffff",
            fontFamily:"Times New Roman"
            
        }).setOrigin(0.5).setInteractive();  

        const exitButton = this.add.text(400, 450, 'Salir', {  
            fontSize: '42px',  
            fill: '#ffffff',  
            fontFamily:"times new roman"
        }).setOrigin(0.5).setInteractive();  

        // Eventos para los botones  
        playButton.on('pointerdown', () => this.startGame());
        configButton.on('pointerdown', () => this.configGame());  
        exitButton.on('pointerdown', () => this.exitGame());  

        // Cambiar color al pasar el mouse  
        playButton.on('pointerover', () => playButton.setStyle({ fill: '#ff0',fontSize :'50px',backgroundColor:'#68d7c9' }));  
        playButton.on('pointerout', () => playButton.setStyle({ fill: '#ffffff',fontSize :'42px' }));  
       
        configButton.on('pointerover', () => configButton.setStyle({ fill: '#ff0',fontSize :'50px',backgroundColor:'#68d7c9' }));  
        configButton.on('pointerout', () => configButton.setStyle({ fill: '#ffffff',fontSize :'42px' }));  
        
        exitButton.on('pointerover', () => exitButton.setStyle({ fill: '#ff0', fontSize :'50px',backgroundColor:'#68d7c9' }));  
        exitButton.on('pointerout', () => exitButton.setStyle({ fill: '#ffffff', fontSize :'42px' }));  
    }  

    startGame() {  
        console.log("Iniciando el juego...");
     /* if(this.musicaMenu != null){
        this.musicaMenu.stop();}*/
        this.scene.start('Escena1'); // Cambia a la escena 1  
    }  

    configGame() {  
        console.log("Configurando el juego...");
     /* if(this.musicaMenu != null){
        this.musicaMenu.stop();}*/
        this.scene.start('Ajustes'); // Cambia a la escena de ajustes  
    }  

    exitGame() {  
        console.log("Saliendo del juego...");  
     // this.musicaMenu.stop();
        this.game.destroy(true); // Destruir el juego  
    }  
}  
export default MenuStart;