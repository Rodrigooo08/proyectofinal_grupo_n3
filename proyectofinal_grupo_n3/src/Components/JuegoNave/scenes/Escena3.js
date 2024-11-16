import Phaser from 'phaser';
class Escena3 extends Phaser.Scene {
    constructor() {
        super("Escena3");
        this.jugador = null;
        this.cursors = null;
        this.textoPuntaje = '';
    }
    // Método de inicialización que asigna valores a las propiedades del objeto
    init(data) {
        this.puntaje = data.puntaje;// Asigna el valor de 'puntaje' desde el objeto 'data' a la propiedad 'puntaje' del objeto actual.
        this.balasRecolectadas = data.balasRecolectadas;// Asigna el valor de 'balasRecolectadas'
        this.musicaFondo = data.musicaFondo;// Asigna el valor de 'musicaFondo'
    }
    //Metodo de contador del tiempo
    actualizarContador() {
        this.tiempoTranscurrido += 1;
        this.contadorTexto.setText('Tiempo: ' + this.tiempoTranscurrido);
    }
    //Metodo de Jugador para disparar 
    dispararBala() {
        if (this.balasRecolectadas == 0) {
            this.textoBalas.setText('Sin Municion');
        }
        if (this.balasRecolectadas > 0) {
            let bala = this.balas.get(this.jugador.x, this.jugador.y, 'bala');
            if (bala) {
                bala.setActive(true);
                bala.setVisible(true);
                bala.body.reset(this.jugador.x, this.jugador.y);
                bala.body.enable = true;
                bala.setVelocityY(-400);
                const sonidoDisparo = this.sound.add('disparoFx');
                sonidoDisparo.setVolume(0.3);
                sonidoDisparo.play();

            }
            this.balasRecolectadas--;
            this.textoBalas.setText('Balas: ' + this.balasRecolectadas);
        }
    }
    //Metodo para destruir meteorito al salir de la pantalla
    destruirAsteroide(bala, asteroide) {
        asteroide.disableBody(true, true);
        bala.disableBody(true, true);
    }
    //Metodo para generar meteoros de manera aleatoria
    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800);
        const tipoMeteoros = ['meteoro3', 'meteoro4', 'meteoro5'];
        // Meteoro Aleatorios
        const tipoMeteoro = tipoMeteoros[Phaser.Math.Between(0, tipoMeteoros.length - 1)];
        const meteoro = this.grupoMeteoros.create(x, 0, tipoMeteoro);
        // Velocidad de meteoros aleatoria
        const velocidadY = Phaser.Math.Between(120, 160);
        meteoro.setVelocityY(velocidadY);
    }
    preload() {
        this.load.image('cielo3', 'public/Image/JuegoNave/Espacio.png'),
            this.load.spritesheet('nave', 'public/Image/JuegoNave/nave.png', { frameWidth: 75, frameHeight: 80 }),
            this.load.image('meteoro3', 'public/Image/JuegoNave/Basurita_espacial2.png')
        this.load.image('meteoro4', 'public/Image/JuegoNave/Basurita_espacial.png')
        this.load.audio('disparoFx', '/sound/juegoNave/Laser.mp3')
        this.load.image('meteoro5', 'public/Image/JuegoNave/Basurita_espacial3.png')
    }
    create() {
        // Inicia la música de fondo
        this.musicaFondo.play();
        //fondo escena
        this.add.image(400, 300, 'cielo3').setDisplaySize(this.scale.width, this.scale.height);
        this.jugador = this.physics.add.sprite(400, 550, 'nave');
        this.jugador.setCollideWorldBounds(true);
        //controles
        this.cursors = this.input.keyboard.createCursorKeys();
        this.barraEspaciadora = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //meteoros
        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarMeteoros, callbackScope: this, loop: true });
        //puntaje
        this.textoPuntaje = this.add.text(16, 46, 'Puntaje: 0', { fontSize: '32px', fill: '#CB80AB' });
        //collider
        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null, this);
        //balas
        this.balas = this.physics.add.group();
        this.physics.add.overlap(this.balas, this.grupoMeteoros, this.destruirAsteroide, null, this);
        this.textoBalas = this.add.text(16, 75, 'Balas: ' + this.balasRecolectadas, { fontSize: '32px', fill: '#F5EFFF' });
        this.tiempoTranscurrido = 0;
        this.contadorTexto = this.add.text(16, 16, 'Tiempo: 0', { fontSize: '32px', fill: '#CB80AB' });
        // Temporizador 
        this.temporizador = this.time.addEvent({
            delay: 1000, callback: this.actualizarContador, callbackScope: this, loop: true
        });
        // animacion de la nave (player)
        this.anims.create({
            key: 'izquierda',
            frames: [{ key: 'nave', frame: 2 }],
            frameRate: 20,

        });
        this.anims.create({
            key: 'normal',
            frames: [{ key: 'nave', frame: 1 }],
            frameRate: 20,

        });
        this.anims.create({
            key: 'derecha',
            frames: [{ key: 'nave', frame: 0 }],
            frameRate: 20,

        });

    }
    update() {
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
            this.jugador.anims.play('izquierda', true)
        } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
            this.jugador.anims.play('derecha', true)
        } else if (this.cursors.up.isDown) { //mover hacia adelante
            this.jugador.setVelocityY(-300);
        } else if (this.cursors.down.isDown) { //mover hacia atras
            this.jugador.setVelocityY(300);
        } else {
            this.jugador.anims.play('normal', true);
        }
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
        } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
        } else if (this.cursors.up.isDown) { //mover hacia adelante
            this.jugador.setVelocityY(-300);
        } else if (this.cursors.down.isDown) { //mover hacia atras
            this.jugador.setVelocityY(300);
        }
        if (Phaser.Input.Keyboard.JustDown(this.barraEspaciadora)) {
            this.dispararBala();
        }
        this.puntaje += 1 / 5;
        this.textoPuntaje.setText('Puntaje: ' + Math.floor(this.puntaje));

        //condicion para detener de escena
        if (this.tiempoTranscurrido >= 20) {
            this.scene.stop('Escena3');
            this.scene.start('Escena4', { puntaje: this.puntaje, musicaFondo: this.musicaFondo });
        }
    }
    // metodo para llamar ala escena GameOver
    gameOver(jugador, meteoro) {
        if (this.musicaFondo != null) {
            this.musicaFondo.stop();
        }
        this.scene.start('GameOver', { puntaje: this.puntaje });
    }
}
export default Escena3;