import React, { useRef, useState, useEffect } from 'react';
import Inicio from './Inicio.jsx';
import Juego from './Juego.jsx'
import { Fade } from "react-awesome-reveal";
import '../../Style/DesafioMatematicoStyle.css'

function DesafioMatematico() {
    const [juegoIniciado, setJuegoIniciado] = useState(false);
    const [dificultad, setDificultad] = useState('facil');
    const audioRef = useRef(null);

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
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
            audioRef.current.volume = 0.5;
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0; 
            }
        };
    }, []);
    return (
        <Fade>
            <div className="FondoDM">
            <audio
                    ref={audioRef}
                    loop
                    muted={false}
                    autoPlay
                > 
                 <source src="/sound/DesafioMatematico/MusicaDesafio.mp3" type="audio/mp3" />
                </audio>
                {!juegoIniciado ? (<Inicio onStart={inciarJuego} onSelectDificultad={seleccionarDificultad} />) :
                    (<Juego dificultad={dificultad} onReset={resetJuego} />)}
            </div>
        </Fade>
    );
}

export default DesafioMatematico;