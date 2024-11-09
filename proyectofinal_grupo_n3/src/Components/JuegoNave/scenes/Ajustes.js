import Phaser from 'phaser';
class Ajustes extends Phaser.Scene{
    constructor(){
        super("Ajustes");
    }

    preload(){
        this.load.image('fondoAjustes','public/Image/JuegoNave/fondo.jpg');
        this.load.image('botonFlechas','public/Image/JuegoNave/flechas.png');
        this.load.image('botonBarraEspaciadora','public/Image/JuegoNave/barraEspaciadora.png');


    }

    create(){
        this.add.image(400,300,'fondoAjustes');
        this.add.image(550, 200, 'botonFlechas');
        this.add.image(550, 400, 'botonBarraEspaciadora');



        const selectKeys = this.add.text(400, 50, 'Configuracion del teclado', {  
            fontSize: '42px',  
            fill: '#ffffff',  
            fontFamily:"times new roman"
        }).setOrigin(0.5).setInteractive();  

        selectKeys.on('pointerout', () => selectKeys.setStyle({ fill: '#ffffff', fontSize :'42px' }));


        const returnButton = this.add.text(100, 550, 'Volver', {  
            fontSize: '42px',  
            fill: '#ffffff',  
            fontFamily:"times new roman"
        }).setOrigin(0.5).setInteractive();  

        returnButton.on('pointerdown', () => this.volverMenu());  
        returnButton.on('pointerover', () => returnButton.setStyle({ fill: '#ff0', fontSize :'50px'}));  
        returnButton.on('pointerout', () => returnButton.setStyle({ fill: '#ffffff', fontSize :'42px' }));


        this.add.text(100, 200, 'Movimiento', {  
            fontSize: '30px',  
            fill: '#ffffff',  
            fontFamily:"times new roman"
        }).setOrigin(0.5).setInteractive();  



        this.add.text(100, 400, 'Disparo', {  
            fontSize: '30px',  
            fill: '#ffffff',  
            fontFamily:"times new roman"
        }).setOrigin(0.5).setInteractive();  

    }

    volverMenu(){
        this.scene.start('MenuStart');
    }
}
export default Ajustes;