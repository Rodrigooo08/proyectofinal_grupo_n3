import Phaser from 'phaser';
class EscenaBonus extends Phaser.Scene{
    constructor(){
        super("EscenaBonus");
        // this.jugador=null;
        // this.cursors=null;
        this.textoPuntaje='';
        this.textoHeramientas='';
        this.herramientaRecolectadas=0;
    }
    init(data){
        this.puntaje = data.puntaje;
        this.balasRecolectadas=data.balasRecolectadas;
        this.musicaFondo= data.musicaFondo;
    }

    generarHerramientas() {
        const x = Phaser.Math.Between(0, 800); 
        const herramientas = ['herramienta1','herramienta2','herramienta3'];
        // crea array de las herramientas
        const herramienta = herramientas[Phaser.Math.Between(0, herramientas.length -1)];
        const herramientaG = this.grupoHerramientas.create(x,0,herramienta);
        // Velocidad aleatoria
        const velocidadY = Phaser.Math.Between(175,300);
        herramientaG.setVelocityY(velocidadY);
    }


    recolectarHerramientas(jugador,herramientaG){
        //const valorHeramienta = this.obtenerValorHeramienta(herramientaG);
        herramientaG.disableBody(true, true);
        this.herramientaRecolectadas=this.herramientaRecolectadas+1;
        this.sumarPuntaje(this.herramientaRecolectadas); //aumenta puntaje
        this.textoHeramientas.setText('Herramientas Recolectadas: ' + this.herramientaRecolectadas);     
    }

    // obtenerValorHeramienta(herramientaG) {
    //     if (herramientaG.type === 'herramienta1') {
    //         return 20; 
    //     } else if (herramientaG.type === 'herramienta2') {
    //         return 30;
    //     } else if (herramientaG.type === 'herramienta3') {
    //         return 40; 
    //     }
    //     return 0;
    // }
    
    // sumarPuntaje(valor) {
    //     this.puntaje += valor; 
    //     this.textoPuntaje.setText('Puntaje: ' + this.puntaje);
    // }
    sumarPuntaje(herramientaG) {
        this.puntaje += herramientaG * 20; 
        this.textoPuntaje.setText('Puntaje: ' + this.puntaje);
    }

   
    actualizarContador() {
        this.tiempoTranscurrido += 1; 
        this.contadorTexto.setText('Tiempo: ' + this.tiempoTranscurrido); 
    }

    preload(){
         this.load.image('bgBonus','public/resource/image/BG_bonus.png'),
         this.load.spritesheet('nave','public/resource/image/nave2.png', {frameWidth:75,frameHeight:80}),
         this.load.image('herramienta2','public/resource/image/herramientas2_32x32.png'),
         this.load.image('herramienta1','public/resource/image/herramientas_32x32.png'),
         this.load.image('herramienta3','public/resource/image/herramienta3_32x32.png'),
         this.load.audio('MusicaBonus','public/resource/sound/Bonus.mp3')
    }

  
    create(){
        this.MusicaBonus = this.sound.add('MusicaBonus');
        const soundConfig={volume:1,loop:true};
        if(!this.sound.locked){
            this.MusicaBonus.play(soundConfig);
        }
        //fondo escena
        this.add.image(400,300,'bgBonus');
        //jugador
        this.jugador = this.physics.add.sprite(400,550,'nave');
        this.jugador.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
       
        //puntaje
        this.textoPuntaje=this.add.text(16,16,'Puntaje: 0',{fontSize:'32px',fill:'#CB80AB'})
       
        //Tiempo
        this.tiempoTranscurrido = 0;
        this.contadorTexto = this.add.text(580, 16, 'Tiempo: 0', { fontSize: '32px', fill: '#CB80AB' });

        //herramientas
        this.grupoHerramientas = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarHerramientas, callbackScope: this, loop: true });
        this.physics.add.overlap(this.jugador, this.grupoHerramientas, this.recolectarHerramientas, null, this);
        //collider
        this.physics.add.collider(this.jugador,this.grupoHerramientas,this.recolectarHerramienta,null,this);
        
        // Temporizador 
        this.temporizador = this.time.addEvent({ delay: 1000, callback: this.actualizarContador,callbackScope: this, loop: true 
        });
        //Texto Herramientas
        this.herramientaRecolectadas=0; 
        this.textoHeramientas = this.add.text(16,50,'Herramientas Recoletadas: 0',{ fontSize: '32px', fill: '#F5EFFF' });
       
       
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

        if (this.tiempoTranscurrido >= 20) {
            //this.scene.stop('EscenaBonus'); 
            if(this.MusicaBonus != null){
                this.MusicaBonus.stop();}
            this.scene.start('Escena3',{puntaje:this.puntaje,balasRecolectadas: this.balasRecolectadas,musicaFondo:this.musicaFondo})
            // this.scene.start('EscenaBonus', { puntaje: this.puntaje }); 
        }
    }
   
}
export default EscenaBonus;