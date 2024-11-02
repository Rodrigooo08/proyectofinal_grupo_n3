import Phaser from 'phaser';
import Escena1 from "./scenes/Escena1.js"
import Escena2 from "./scenes/Escena2.js"
import EscenaBonus from "./scenes/EscenaBonus.js"
import GameOver from "./scenes/GameOver.js";
import Victoria from "./scenes/Victoria.js";
import MenuStart from "./scenes/MenuStart.js";
import Escena3 from "./scenes/Escena3.js";
import Escena4 from "./scenes/Escena4.js";
import Ajustes from "./scenes/Ajustes.js";
import { useEffect } from 'react';

function Juego() {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container',
            scene: [MenuStart, Escena1, Escena2, EscenaBonus, Escena3, Escena4, GameOver, Ajustes, Victoria],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
        }
        let game = new Phaser.Game(config);
    });
    return (
        <div id="Conteiner">
            <h1 id="Titulo">Esquivando Meteoros🚀</h1>
            <div id="game-container"></div>
        </div>
    )
}
export default Juego;
