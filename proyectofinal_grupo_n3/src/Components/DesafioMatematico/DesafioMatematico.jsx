import React,{useState} from 'react';
import Inicio from './Inicio.jsx';
import Juego from './Juego.jsx'
import LogoDesafio from './LogoDesafio.jsx';
import Radar from './RadarDB.jsx';
import '../../Style/DesafioMatematicoStyle.css'

function DesafioMatematico(){
    const[juegoIniciado,setJuegoIniciado] = useState(false);

    const inciarJuego = () => {
        setJuegoIniciado(true);
    };

    return(
        <div className="FondoDM">
            {!juegoIniciado ? <Inicio onStart={inciarJuego}/>:<Juego/>}
            <LogoDesafio />
            <Radar />
        </div>
        
    );
}

export default DesafioMatematico;