import Phaser from 'phaser';
class Escena4 extends Phaser.Scene {
    constructor() {
        super("Escena4");
        this.vidasRestantes = 0;
        this.textoVidas = '';
    }
    init(data) {
        this.puntaje = data.puntaje;
        this.musicaFondo = data.musicaFondo;
    }
    dispararBala() {
        let bala = this.balas.get(this.jugador.x, this.jugador.y, 'bala');
        if (bala) {
            bala.setActive(true);
            bala.setVisible(true);
            bala.body.reset(this.jugador.x, this.jugador.y);
            bala.body.enable = true;
            bala.setVelocityX(400);
            const sonidoDisparo = this.sound.add('disparoFx');
            sonidoDisparo.setVolume(0.3);
            sonidoDisparo.play();
        }
    }
    generarMeteoros() {
        const y = Phaser.Math.Between(10, 600); // Posición aleatoria en el eje Y
        const meteoro = this.grupoMeteoros.create(800, y, 'meteoro');
        meteoro.setVelocityX(-300); // Velocidad de movimiento horizontal
}
 generarMeteorosVertical(){
    if(this.vidaJefe <= 35){
        const x = Phaser.Math.Between(50,750);
        const meteoroVertical = this.grupoMeteorosVertical.create(x,0,'meteoro');
        meteoroVertical.setVelocityY(200);
        meteoroVertical.setTint(0xFF6600);
       }
 }
    generarEnemigos() {
        const y = Phaser.Math.Between(50, 580);
        const enemigo = this.grupoEnemigos.create(800, y, 'enemigo').play('movimiento');
        enemigo.setVelocityX(-200);
    }
    destruirEnemigo(bala, enemigo) {
        enemigo.disableBody(true, true);
        bala.disableBody(true, true);
    }
    disparar() {
        // Iterar sobre todos los enemigos en el grupo
        this.grupoEnemigos.children.iterate(function (enemigo) {
            if (enemigo.active) {
                const proyectil = this.proyectiles.get();
                if (proyectil) {
                    proyectil.setActive(true);
                    proyectil.setVisible(true);
                    proyectil.body.reset(enemigo.x, enemigo.y);
                    proyectil.body.enable = true;
                    proyectil.setVelocityX(-400);
                    proyectil.play('disparar'); // Cambiar a la animación de disparo
                }
            }
        }, this);
    }
    dispararJefe() {
        const proyectilJefe = this.proyectilesJefe.get(this.jefeFinal.x, this.jefeFinal.y+55, 'proyectilJefe');
        if (proyectilJefe) {
            proyectilJefe.setActive(true);
            proyectilJefe.setVisible(true);
            proyectilJefe.body.reset(this.jefeFinal.x, this.jefeFinal.y+55);
            proyectilJefe.body.enable = true;   
        const angle = 180; // Esto hace que el proyectil dispare hacia la izquierda 
        proyectilJefe.setAngle(angle); 

        // Establecer la velocidad del proyectil
        this.physics.velocityFromAngle(angle, 300, proyectilJefe.body.velocity); 
            proyectilJefe.play('dispararJefe');  

            const sonidoDisparoJefe = this.sound.add('Fireball');
            sonidoDisparoJefe.setVolume(0.4);
            sonidoDisparoJefe.play();
        }
    }
    reducirVidaJugador(jugador, proyectil) {
        proyectil.disableBody(true, true);
        this.vidasRestantes--;
        if (this.vidasRestantes >= 0) {
            this.textoVidas.setText(': ' + this.vidasRestantes);
        }
        if (this.vidasRestantes <= 0) {
            this.gameOver(jugador);
        }
    }
    destruirAsteroide(bala, meteoro) {
        meteoro.disableBody(true, true);
        bala.disableBody(true, true);
    }
    reducirVida(jugador, meteoro) {
        meteoro.disableBody(true, true);
        this.vidasRestantes--;
        if (this.vidasRestantes >= 0) {
            this.textoVidas.setText(': ' + this.vidasRestantes);
        }
        if (this.vidasRestantes <= 0) {
            this.gameOver(jugador);
        }
    }
    reducirVidaJefe(jefeFinal, bala) {
        bala.disableBody(true, true); // Desactiva la bala
        this.vidaJefe--; // Reduce la vida del jefe
        // Actualiza la barra de vida
        const porcentajeVida = this.vidaJefe / 70;
        let color;
        if (porcentajeVida > 0.5) {
            color = 0x00ff00;
        } else if (porcentajeVida > 0.2) {
            color = 0xffff00;
        } else {
            color = 0xff0000;
        }
        // Efecto parpadeo
        this.barraVidaRelleno.clear(); // Limpia el relleno 
        this.barraVidaRelleno.fillStyle(0x555555, 1); // Cambia el color segun el porcentaje de vida del jefe
        this.barraVidaRelleno.fillRect(200, 550, porcentajeVida * 400, 20);
        //
        this.time.delayedCall(50, () => {
            this.barraVidaRelleno.clear();
            this.barraVidaRelleno.fillStyle(color, 1);
            this.barraVidaRelleno.fillRect(200, 550, porcentajeVida * 400, 20);
        });
        jefeFinal.setTint(0xff0000);
        this.time.delayedCall(1000, () => {
            jefeFinal.clearTint();
        });
        if (this.vidaJefe <= 0) {
            jefeFinal.disableBody(true, true);
            this.Victoria();
        }
    }
    generarVidaExtra() {
        const y = Phaser.Math.Between(30, 550);
        const vidasExtras = this.vidasExtras.create(800, y, 'vidaExtra');
        vidasExtras.setVelocityX(-300);
        vidasExtras.anims.play('vidaExtra');
        vidasExtras.setScale(0.5);

    }
    recogerVida(jugador, vidaExtra) {
        // Aumentar las vidas del jugador
        this.vidasRestantes++;

        // Actualizar el texto de vidas restantes
        this.textoVidas.setText(': ' + this.vidasRestantes);

        // Desactivar la vida extra (desaparece después de ser recogida)
        vidaExtra.disableBody(true, true);
    }
    Victoria() {

        if (this.audioEscena4 != null) {
            this.audioEscena4.stop();
        }
        this.scene.stop('GameUI');
        this.scene.start('Victoria', { puntaje: this.puntaje });
    }
    gameOver(jugador, meteoro) {
        // this.scene.start('GameOver');
        if (this.audioEscena4 != null) {
            this.audioEscena4.stop();
        }
        this.scene.stop('GameUI');
        this.scene.start('GameOver', { puntaje: this.puntaje });
    }
    preload() {
        this.load.image('cielo4', 'public/Image/JuegoNave/EspacioHorizontal.png'),
            this.load.spritesheet('naveVer', 'public/Image/JuegoNave/naveVer.png', { frameWidth: 82, frameHeight: 77 }),
            this.load.image('bala', 'public/Image/JuegoNave/bala.png'),
            this.load.image('meteoro', 'public/Image/JuegoNave/asteroide.png')
        this.load.spritesheet('jefeFinal', 'public/Image/JuegoNave/Jefe Final.png', { frameWidth: 304, frameHeight: 235 }),
            this.load.spritesheet('vida', 'public/Image/JuegoNave/spritesheet_cascotime_32x32.png', { frameWidth: 32, frameHeight: 32 });
        this.load.audio('audioEscena4', '/sound/juegoNave/Boss_theme.mp3');
        this.load.spritesheet('enemigo', 'public/Image/JuegoNave/Sprite enemigo.png', { frameWidth: 46.5, frameHeight: 41 }),
            this.load.spritesheet('proyectil', 'public/Image/JuegoNave/spritesheet_bala.png', { frameWidth: 39.4, frameHeight: 28 });
        this.load.audio('disparoFx', '/sound/juegoNave/Laser.mp3')
        this.load.spritesheet('proyectilJefe', '/Image/JuegoNave/fuegitos.png', { frameWidth: 52, frameHeight: 52 });
        this.load.audio('Fireball', '/sound/juegoNave/fireball.mp3')
        this.load.spritesheet('VidaExtra', '/Image/JuegoNave/VidaExtra.png', { frameWidth: 165.2, frameHeight: 167.5 });
    }
    create() {

        //this.add.image(400,300,'cielo').setDisplaySize(this.scale.width, this.scale.height);
        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'cielo4'); //(x,y,width,height) para marcar la posicion de la imagen y tamaño a ocupar
        //audioo
        this.audioEscena4 = this.sound.add('audioEscena4');
        const soundConfig = { volume: 0.5, loop: true };
        if (!this.sound.locked) {
            this.audioEscena4.play(soundConfig);
        }
        //jugador
        this.jugador = this.physics.add.sprite(10, 300, 'naveVer');
        this.jugador.angle = 90;
        this.jugador.setCollideWorldBounds(true);
        // Crea grupo de proyectiles del jefe
        this.proyectilesJefe = this.physics.add.group({
            defaultKey: 'proyectilJefe',
            maxSize: 50
        });
        //Vidas Extras
        this.vidasExtras = this.physics.add.group();
        this.time.addEvent({
            delay: 4000,  // Cada 4 segundos
            callback: this.generarVidaExtra,
            callbackScope: this,
            loop: true
        });
          //animacion del sprite de la vida
          this.anims.create({
            key: 'vidaExtra',
            frames: this.anims.generateFrameNumbers('VidaExtra', { start: 0, end: 11 }),
            frameRate: 15,
            repeat: -1,
        });
        // Enemigo
        this.anims.create({
            key: 'movimiento',
            frames: this.anims.generateFrameNumbers('enemigo', { start: 0, end: 28 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'disparar',
            frames: this.anims.generateFrameNumbers('proyectil', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1 // No repetir, solo una vez
        });
        //DisparoJefe final
        this.anims.create({
            key: 'dispararJefe',
            frames: this.anims.generateFrameNumbers('proyectilJefe', { start: 0, end: 1}),
            frameRate: 5,
            repeat: -1 // No repetir, solo una vez
        });
        // Inicializar grupo de enemigos
        this.grupoEnemigos = this.physics.add.group();
        // Generar enemigos periódicamente
        this.time.addEvent({
            delay: 1500,
            callback: this.generarEnemigos,
            callbackScope: this,
            loop: true
        });
        // Grupo de proyectiles
        this.proyectiles = this.physics.add.group({
            defaultKey: 'proyectil',
            maxSize: 10
        });
        this.time.addEvent({
            delay: 3300,
            callback: this.disparar,
            callbackScope: this,
            loop: true
        });

        // Jefe Final
        //Vidas Jefe
        this.vidaJefe = 70;
        this.anims.create({
            key: 'jefeAnimado',
            frames: this.anims.generateFrameNumbers('jefeFinal', { start: 1, end: 46 }), // Cambia el rango según la cantidad de fotogramas que tenga tu GIF
            frameRate: 10, // Ajusta la velocidad de la animación
            repeat: -1 // Hace que la animación se repitra indefinidamente
        });
        // Crear los gráficos para la barra de vida
        this.barraVidaFondo = this.add.graphics();
        this.barraVidaFondo.fillStyle(0x555555, 1);  // Color de fondo (gris oscuro)
        this.barraVidaFondo.fillRect(200, 550, 400, 20); // Dibuja el fondo de la barra

        this.barraVidaRelleno = this.add.graphics();
        this.barraVidaRelleno.fillStyle(0x00ff00, 1);  // Color del relleno (verde)
        this.barraVidaRelleno.fillRect(200, 550, 400, 20); // Dibuja el relleno inicial (totalmente lleno)
        //Crea el sprite del jefe final
        this.jefeFinal = this.physics.add.sprite(800, 400, 'jefeFinal').play('jefeAnimado');
        // this.jefeFinal.setCollideWorldBounds(true);
        // Agrega lógica para que el Jefe final se mueva
        this.jefeFinal.setVelocityX(-100); // Mover hacia la derecha
        this.jefeFinal.setVelocityY(-100) // mover hacia arriba 
        //meteoros
        this.grupoMeteorosVertical = this.physics.add.group();
        this.time.addEvent({ delay: 1500, callback: this.generarMeteorosVertical, callbackScope: this, loop: true });
        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({ delay: 500, callback: this.generarMeteoros, callbackScope: this, loop: true });
        //balas
        this.balas = this.physics.add.group();
        this.physics.add.overlap(this.balas, this.grupoMeteoros, this.destruirAsteroide, null, this);
        this.physics.add.overlap(this.balas, this.jefeFinal, this.reducirVidaJefe, null, this);
        this.physics.add.overlap(this.balas, this.grupoEnemigos, this.destruirEnemigo, null, this);
        //vidas
        this.vidasRestantes = 5;
        this.textoVidas = this.add.text(39, 20, ': ' + this.vidasRestantes, { fontSize: '32px', fill: '#F5EFFF' });
        //collider
        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.reducirVida, null, this);
        //Deteccion de colision entre los meteoros verticales y el jugador
        this.physics.add.collider(this.jugador, this.grupoMeteorosVertical, this.reducirVida, null, this);
        // Detección de colisión entre los proyectiles del jefe y el jugador
        this.physics.add.collider(this.jugador, this.proyectilesJefe, this.reducirVidaJugador, null, this);
        this.physics.add.collider(this.jugador, this.proyectiles, this.reducirVidaJugador, null, this);
        this.physics.add.collider(this.jugador, this.vidasExtras, this.recogerVida, null, this); // Detectar colisión entre el jugador y las vidas extras
        // Disparo del jefe
        this.time.addEvent({
            delay: 2000,  // El jefe disparará cada 2 segundos
            callback: this.dispararJefe,
            callbackScope: this,
            loop: true
        });
        //controles
        this.cursors = this.input.keyboard.createCursorKeys();
        this.barraEspaciadora = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //puntaje
        this.textoPuntaje = this.add.text(280, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#CB80AB' });
        //manejo sprite de jugador
        this.anims.create({
            key: 'izquierda',
            frames: [{ key: 'naveVer', frame: 0 }],
            frameRate: 20,

        });
        this.anims.create({
            key: 'normal',
            frames: [{ key: 'naveVer', frame: 1 }],
            frameRate: 20,

        });
        this.anims.create({
            key: 'derecha',
            frames: [{ key: 'naveVer', frame: 2 }],
            frameRate: 20,

        });
        //animacion del sprite de la vida
        this.anims.create({
            key: 'v',
            frames: this.anims.generateFrameNumbers('vida', { start: 0, end: 2 }),
            frameRate: 4,
            repeat: -1,
        });
        //
        this.cascoVida = this.physics.add.sprite(38, 30, 'vida');
        this.cascoVida.anims.play('v');
        this.cascoVida.setScale(2);
    }
    update() {

        this.textoVidaJefe = this.add.text(400, 570, 'Vida Jefe Final', {
            fontSize: '22px',
            fill: '#FFFFFF', // Blanco
            fontFamily: 'Times New Roman'
        });
        // Centrar el texto debajo de la barra de vida
        this.textoVidaJefe.setOrigin(0.5, 0); // Centra el texto horizontalmente en el eje X
        //desplazamiento del fondo
        const backgroundSpeed = 2;//velocidad de desplazamiento
        this.fondo.tilePositionX += backgroundSpeed;    

        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
        } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
        } else if (this.cursors.up.isDown) { //mover hacia adelante
            this.jugador.setVelocityY(-300);
            this.jugador.anims.play('izquierda', true)
        } else if (this.cursors.down.isDown) { //mover hacia atras
            this.jugador.setVelocityY(300);
            this.jugador.anims.play('derecha', true)
        } else {
            this.jugador.anims.play('normal', true);
        }
        if (Phaser.Input.Keyboard.JustDown(this.barraEspaciadora)) {
            this.dispararBala();
        }
        this.puntaje +=1 /5;
        this.textoPuntaje.setText('Puntaje: ' + Math.floor(this.puntaje));
        //Direccion del jefe Final en X
        if (this.jefeFinal.x < 400) {
            this.jefeFinal.setVelocityX(100);
        } else if (this.jefeFinal.x >= 680) {
            this.jefeFinal.setVelocityX(-100)
        }
        //Direccion del jefe Final en Y 
        if (this.jefeFinal.y >= 500) {
            this.jefeFinal.setVelocityY(-100);
        } else if (this.jefeFinal.y <= 90) {
            this.jefeFinal.setVelocityY(100);
        }
        // Desactivación de enemigos fuera de pantalla
        this.grupoEnemigos.children.iterate(function (enemigo) {
            if (enemigo.x < 0) {
                enemigo.setActive(false);
                enemigo.setVisible(false);
            }
        });

        // Limpieza de proyectiles
        this.proyectiles.children.iterate(function (proyectil) {
            if (proyectil.active && (proyectil.x > 800 || proyectil.x < 0)) {
                proyectil.setActive(false);
                proyectil.setVisible(false);
            }
        });
    }
}
export default Escena4;