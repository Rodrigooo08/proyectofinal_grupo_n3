import Phaser from 'phaser';
import Escena1 from "./scenes/Escena1.js";
import GameUI from './scenes/GameUI.js';    
import Escena2 from "./scenes/Escena2.js";
import EscenaBonus from "./scenes/EscenaBonus.js";
import GameOver from "./scenes/GameOver.js";
import Victoria from "./scenes/Victoria.js";
import MenuStart from "./scenes/MenuStart.js";
import Escena3 from "./scenes/Escena3.js";
import Escena4 from "./scenes/Escena4.js";
import Ajustes from "./scenes/Ajustes.js";
import "../../Style/JuegoNaveStyle.css";
import { useEffect } from 'react';

function Juego() {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container',
            scene: [MenuStart,Ajustes, Escena1, Escena2, EscenaBonus, Escena3, Escena4,GameUI,Victoria, GameOver],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scale:{
                
                autoCenter: Phaser.Scale.CENTER_BOTH,
            }
        }
        let game = new Phaser.Game(config);
    // Detener música antes de cambiar de página o desmontar el componente
    const stopMusic = () => {
        if (game.scene) {
            const menuScene = game.scene.getScene('MenuStart');
            if (menuScene && menuScene.musicaMenu) {
                menuScene.musicaMenu.stop();
            }
        }
    };

    // Detener música al cambiar de página
    window.addEventListener('beforeunload', stopMusic);

    // Limpiar efectos al desmontar el componente
    return () => {
        stopMusic();
        window.removeEventListener('beforeunload', stopMusic);
        game.destroy(true); // Destruir el juego
    };
}, []);

    return (
        <div id='JuegoNave'> 
            <h1 id="Titulo">Cosmic Escape🚀</h1>
            <div id="game-container"></div>
        </div>
    )
}
export default Juego;
