import React, { useState } from 'react';
import Inicio from './Inicio.jsx';
import Juego from './Juego.jsx'
import { Fade } from "react-awesome-reveal";

import Radar from './RadarDB.jsx';

import '../../Style/DesafioMatematicoStyle.css'

function DesafioMatematico() {
    const [juegoIniciado, setJuegoIniciado] = useState(false);
    const [dificultad, setDificultad] = useState('facil');

    const inciarJuego = () => {
        setJuegoIniciado(true);
    };
    const seleccionarDificultad = (nivel) => {
        setDificultad(nivel);
    }
    const resetJuego = () => {
        setJuegoIniciado(false);
        setDificultad('facil')
    }

    return (
        <Fade>
            <div className="FondoDM">
                {!juegoIniciado ? (<Inicio onStart={inciarJuego} onSelectDificultad={seleccionarDificultad} />) :
                    (<Juego dificultad={dificultad} onReset={resetJuego} />)}
            </div>
        </Fade>
    );
}

export default DesafioMatematico;