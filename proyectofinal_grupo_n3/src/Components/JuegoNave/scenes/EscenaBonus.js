import Phaser from 'phaser';

class EscenaBonus extends Phaser.Scene {
    constructor() {
        super("EscenaBonus");  // Nombre de la escena
        this.textoPuntaje = '';  // Variable para mostrar el puntaje
        this.textoHeramientas = '';  // Variable para mostrar la cantidad de herramientas recolectadas
        this.herramientaRecolectadas = 0;  // Contador de herramientas recolectadas
    }
    // Inicialización de datos, se pasan cuando se inicia la escena
    init(data) {
        this.puntaje = data.puntaje;  
        this.balasRecolectadas = data.balasRecolectadas;  
        this.musicaFondo = data.musicaFondo; 
    }

    // Función para generar herramientas (objetos que el jugador puede recoger)
    generarHerramientas() {
        const x = Phaser.Math.Between(0, 800);  // Genera una posición aleatoria en el eje X
        const herramientas = [
            { nombre: 'herramienta1', valor: 50 }, 
            { nombre: 'herramienta2', valor: 25 }, 
            { nombre: 'herramienta3', valor: 100}
        ];

        // Elige una herramienta aleatoria
        const herramienta = herramientas[Phaser.Math.Between(0, herramientas.length - 1)];
        // Crea la herramienta en la escena
        const herramientaG = this.grupoHerramientas.create(x, 0, herramienta.nombre);
        herramientaG.setData('valor', herramienta.valor);  // Asigna un valor a la herramienta
        const velocidadY = Phaser.Math.Between(175, 300);  // Velocidad de caída aleatoria
        herramientaG.setVelocityY(velocidadY); 
    }

    // Función llamada cuando el jugador recoge una herramienta
    recolectarHerramientas(jugador, herramientaG) {
        const valorHerramienta = herramientaG.getData('valor');  // Obtiene el valor de la herramienta
        this.sound.play('Puntos');  // Reproduce el sonido al recoger la herramienta
        herramientaG.disableBody(true, true);  // Desactiva la herramienta (la hace desaparecer)
        this.puntaje += valorHerramienta;  // Suma el valor de la herramienta al puntaje
        this.textoPuntaje.setText('Puntaje: ' + this.puntaje);  // Actualiza el texto del puntaje

        // Muestra un texto flotante que indica el valor de la herramienta recogida
        const textoSumado = this.add.text(jugador.x, jugador.y - 50, `+${valorHerramienta}`, {
            fontSize: '32px',
            fill: '#CB80AB',
            fontStyle: 'bold'
        });
        // Elimina el texto flotante después de 500 ms
        this.time.addEvent({
            delay: 500, 
            callback: () => textoSumado.destroy() 
        });
        // Actualiza el contador de herramientas recolectadas
        this.herramientaRecolectadas += 1;
        this.textoHeramientas.setText('Herramientas Recolectadas: ' + this.herramientaRecolectadas);
    }
    // Función para sumar puntaje (opcionalmente utilizada en otras partes del código)
    sumarPuntaje(valor) {
        this.puntaje += valor;  // Suma el valor dado al puntaje total
        this.textoPuntaje.setText('Puntaje: ' + this.puntaje);  // Actualiza el texto del puntaje
    }
    // Función para actualizar el contador de tiempo en la pantalla
    actualizarContador() {
        this.tiempoTranscurrido += 1;  // Incrementa el tiempo transcurrido
        this.contadorTexto.setText('Tiempo: ' + this.tiempoTranscurrido);  // Actualiza el texto de tiempo
    }
    // Carga de recursos para la escena (imágenes, sonidos, etc.)
    preload() {
        this.load.image('bgBonus', 'public/Image/JuegoNave/FondoEspacialBonus.png');  
        this.load.spritesheet('nave', 'public/Image/JuegoNave/nave2.png', { frameWidth: 75, frameHeight: 80 });  
        this.load.image('herramienta2', 'public/Image/JuegoNave/herramientas2_32x32.png');  
        this.load.image('herramienta1', 'public/Image/JuegoNave/herramientas_32x32.png');
        this.load.image('herramienta3', 'public/Image/JuegoNave/herramienta3_32x32.png');
        this.load.audio('MusicaBonus', '/sound/juegoNave/Bonus.mp3');  
        this.load.audio('Puntos', '/sound/juegoNave/Puntos.mp3'); 
    }
    create() {
        // Reproduce la música de fondo (si no está bloqueada)
        this.MusicaBonus = this.sound.add('MusicaBonus');
        const soundConfig = { volume: 0.3, loop: true };  // Configuración del volumen y el bucle de la música
        if (!this.sound.locked) {
            this.MusicaBonus.play(soundConfig);  // Reproduce la música
        }
        // Agrega el fondo de la escena
        this.add.image(400, 400, 'bgBonus');
        // Crea el jugador (la nave)
        this.jugador = this.physics.add.sprite(400, 550, 'nave');
        this.jugador.setCollideWorldBounds(true);  // Impide que el jugador salga de la pantalla
        // Configura los controles del jugador (flechas del teclado)
        this.cursors = this.input.keyboard.createCursorKeys();
        // Inicializa el texto del puntaje
        this.textoPuntaje = this.add.text(16, 46, 'Puntaje: 0', { fontSize: '32px', fill: '#CB80AB' });
        // Inicializa el contador de tiempo
        this.tiempoTranscurrido = 0;
        this.contadorTexto = this.add.text(16, 16, 'Tiempo: 0', { fontSize: '32px', fill: '#CB80AB' });
        // Crea un grupo para las herramientas y configura el evento de creación de herramientas
        this.grupoHerramientas = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarHerramientas, callbackScope: this, loop: true });
        // Configura la colisión entre el jugador y las herramientas
        this.physics.add.overlap(this.jugador, this.grupoHerramientas, this.recolectarHerramientas, null, this);
        // Configura el temporizador que actualiza el contador de tiempo
        this.temporizador = this.time.addEvent({
            delay: 1000, callback: this.actualizarContador, callbackScope: this, loop: true
        });
        // Inicializa el contador de herramientas recolectadas
        this.herramientaRecolectadas = 0;
        this.textoHeramientas = this.add.text(16, 75, 'Herramientas Recolectadas: 0', { fontSize: '32px', fill: '#F5EFFF' });
        // Animaciones para la nave (jugador)
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
    // Actualiza la lógica del juego en cada frame
    update() {
        // Detiene la velocidad del jugador en ambos ejes X e Y
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        // Movimiento del jugador con las flechas
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300);  // Mueve a la izquierda
            this.jugador.anims.play('izquierda', true);  // Reproduce la animación de mover a la izquierda
        } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300);  // Mueve a la derecha
            this.jugador.anims.play('derecha', true);  // Reproduce la animación de mover a la derecha
        } else if (this.cursors.up.isDown) {  // Mueve hacia arriba
            this.jugador.setVelocityY(-300);
        } else if (this.cursors.down.isDown) {  // Mueve hacia abajo
            this.jugador.setVelocityY(300);
        } else {
            this.jugador.anims.play('normal', true);  // Si no se mueve, reproduce la animación normal
        }
        // Incrementa el puntaje gradualmente (por cada frame)
        this.puntaje += 1 / 5;
        this.textoPuntaje.setText('Puntaje: ' + Math.floor(this.puntaje));  // Muestra el puntaje
        // Si el tiempo transcurrido llega a 20 segundos, cambia a otra escena
        if (this.tiempoTranscurrido >= 20) {
            if (this.MusicaBonus != null) {
                this.MusicaBonus.stop();  // Detiene la música de fondo
            }
            this.scene.start('Escena3', { puntaje: this.puntaje, balasRecolectadas: this.balasRecolectadas, musicaFondo: this.musicaFondo });
        }
    }
}
export default EscenaBonus;
