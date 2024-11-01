import React,{useState} from 'react';
import Inicio from './Inicio.jsx';
import Juego from './Juego.jsx'
import LogoDesafio from './LogoDesafio.jsx';
import Radar from './RadarDB.jsx';

function App(){
    const[juegoIniciado,setJuegoIniciado] = useState(false);

    const inciarJuego = () => {
        setJuegoIniciado(true);
    };

    return(
        <div className="App">
            {!juegoIniciado ? <Inicio onStart={inciarJuego}/>:<Juego/>}
            <LogoDesafio />
            <Radar />
        </div>
        
    );
}

export default App;