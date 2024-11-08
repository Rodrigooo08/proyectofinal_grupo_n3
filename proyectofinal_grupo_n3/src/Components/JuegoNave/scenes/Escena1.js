import Phaser from 'phaser';
class Escena1 extends Phaser.Scene{
    constructor(){
        super("Escena1");
        this.jugador=null;
        this.cursors=null;
        this.puntaje = 0;
        this.textoPuntaje='';
        
    }
    actualizarContador() {
        this.tiempoTranscurrido += 1; 
        this.contadorTexto.setText('Tiempo: ' + this.tiempoTranscurrido); 
    }
    preload(){
        this.load.image('cielo','public/Image/JuegoNave/Espacio.jpg'),
        this.load.spritesheet('nave','public/Image/JuegoNave/nave2.png', {frameWidth:75,frameHeight:80}),
        this.load.image('meteoro','public/Image/JuegoNave/asteroide.png')
        this.load.image('cielo','public/Image/JuegoNave/Espacio.jpg'),
        this.load.spritesheet('nave','public/Image/JuegoNave/nave2.png', {frameWidth:75,frameHeight:80}),
        this.load.image('meteoro','public/Image/JuegoNave/asteroide.png')
        this.load.audio('musicaFondo','/sound/juegoNave/Star Wars.mp3')
    }
    create(){
       
       this.musicaFondo = this.sound.add('musicaFondo');
        const soundConfig={volume:0.1,loop:true};
        if(!this.sound.locked){
            this.musicaFondo.play(soundConfig);
        }
        //fondo escena
        this.add.image(400,300,'cielo');
        //jugador
        this.jugador = this.physics.add.sprite(400,550,'nave');
        this.jugador.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        //meteoros
        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarMeteoros, callbackScope: this, loop: true });
        //puntaje
        this.puntaje=0;
        this.textoPuntaje=this.add.text(16,46,'Puntaje: 0',{fontSize:'32px',fill:'#CB80AB'})
        //collider
        this.physics.add.collider(this.jugador,this.grupoMeteoros,this.gameOver,null,this);
        this.tiempoTranscurrido = 0;
        this.contadorTexto = this.add.text(16, 16, 'Tiempo: 0', { fontSize: '32px', fill: '#CB80AB' });
        // Temporizador 
        this.temporizador = this.time.addEvent({ delay: 1000, callback: this.actualizarContador,callbackScope: this, loop: true 
        });

        this.anims.create({
            key: 'izquierda',
            frames: [{key:'nave',frame:2}], 
            frameRate: 20,
    
        });
        this.anims.create({
            key: 'normal',
            frames: [{key:'nave',frame:1}], 
            frameRate: 20,
    
        });
        this.anims.create({
            key: 'derecha',
            frames: [{key:'nave',frame:0}], 
            frameRate: 20,
    
        });

      
                        
    }
    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800); 
        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro');
        meteoro.setVelocityY(200); 
    }
    update(){
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
            this.jugador.anims.play('izquierda',true)
            } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
            this.jugador.anims.play('derecha',true)
            } else if (this.cursors.up.isDown){ //mover hacia adelante
                this.jugador.setVelocityY(-300);
            } else if (this.cursors.down.isDown){ //mover hacia atras
                this.jugador.setVelocityY(300);
            } else{
                this.jugador.anims.play('normal', true);
            }
            
            
        this.puntaje +=1;
        this.textoPuntaje.setText('Puntaje: '+this.puntaje);
        //Verifica el cambio de escena segun el puntaje
        if (this.tiempoTranscurrido >= 20) {
            this.scene.stop('Escena1'); 
            this.scene.start('Escena2', { puntaje: this.puntaje,musicaFondo:this.musicaFondo });
        }

    
    }
  
    gameOver(jugador,meteoro){
        // this.scene.start('GameOver');
       if(this.musicaFondo != null){
            this.musicaFondo.stop();}
        this.scene.start('GameOver',{puntaje: this.puntaje,musicaFondo:this.musicaFondo});
    }
}
export default Escena1;