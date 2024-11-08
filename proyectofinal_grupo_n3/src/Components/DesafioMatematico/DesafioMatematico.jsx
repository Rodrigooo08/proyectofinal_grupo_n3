import React,{useState} from 'react';
import Inicio from './Inicio.jsx';
import Juego from './Juego.jsx'
import LogoDesafio from './LogoDesafio.jsx';
import Radar from './RadarDB.jsx';
import DialogoVegeta from './DialogoVegeta.jsx';
import '../../Style/DesafioMatematicoStyle.css'

function DesafioMatematico(){
    const[juegoIniciado,setJuegoIniciado] = useState(false);
    const[dificultad, setDificultad] = useState('facil');

    const inciarJuego = () => {
        setJuegoIniciado(true);
    };
    const seleccionarDificultad = (nivel)=>{
        setDificultad(nivel);
    }

    return(
        <div className="FondoDM">
            {!juegoIniciado ? <Inicio onStart={inciarJuego} onSelectDificultad={seleccionarDificultad}/>:<Juego dificultad={dificultad}/>}
            <LogoDesafio />
            <Radar />
            {!juegoIniciado && <DialogoVegeta />}
        </div>
        
    );
}

export default DesafioMatematico;