import Phaser from 'phaser';
class MenuStart extends Phaser.Scene {  
    constructor() {  
        super("MenuStart"); // Nombre clave de la escena
        this.musicaMenu = null; // Inicia la variable de musica
    }  

    preload() {  
        this.load.image('menu','public/Image/JuegoNave/fondo.jpg');
        this.load.audio('menuMusic','sound/juegoNave/MusicaMenu.mp3');
        // carga imágen y sonido  
    }  

    create() {  
       // Solo cargar música si no está ya creada
       if (!this.musicaMenu) {
        this.musicaMenu = this.sound.add('menuMusic', { volume: 0.25, loop: true });
    }
    // Reproduce la música solo si no está sonando
    if (!this.musicaMenu.isPlaying) {
        this.musicaMenu.play();
    }
     // Agregar el evento para detener la música al cambiar de página
     window.addEventListener('beforeunload', () => {
        if (this.musicaMenu) {
            this.musicaMenu.stop();
        }
    });
         //fondo menu
        this.add.image(400,300,'menu');
        
        // Título del juego  
        this.add.text(400, 100, 'Cosmic Escape', {  
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

        const configButton = this.add.text(400, 350, 'Instrucciones', {  
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
      if(this.musicaMenu){
        this.musicaMenu.stop();
       }
        this.scene.stop('MenuStart'); // Detenemos la escena del menú antes de cambiar
        this.scene.launch('GameUI');
        this.scene.start('Escena4');  // Cambiar a la escena del juego 
        
    }  

    configGame() {  
        console.log("Configurando el juego...");
      if(this.musicaMenu){
        this.musicaMenu.stop();
    }
        this.scene.launch('Ajustes'); // Cambia a la escena de ajustes  
    }  

    exitGame() {  
        console.log("Saliendo del juego...");  
     if (this.musicaMenu){
         this.musicaMenu.stop()
     }

        this.game.destroy(true); // Destruir el juego  
    }  
}  
export default MenuStart;