import React,{useState} from 'react';
import generarOperacion from './GenerarOperaciones';
import verificarRespuesta from './verificarRespuesta';
import siguienteDesafio from './siguienteDesafio';
import CardDesafio from './TarjetaOperaciones';
import Puntuacion from './Puntuacion';

const Juego = () => {
    const [operacion, setOperacion] = useState(generarOperacion());
    const [respuesta, setRespuesta] = useState('');
    const [resultado, setResultado] = useState(null);
    const [intentos, setIntentos] = useState(0);
    const [puntos, setPuntos] = useState(0);
    const [botonHabilitado, setBotonHabilitado] = useState(true);
    
    const manejarVerificacion = () =>{
        verificarRespuesta(respuesta, operacion,setResultado, setPuntos, puntos);
        setBotonHabilitado(false);
    };
    
    const manejarSiguienteDesafio = () => {
        siguienteDesafio(setOperacion, generarOperacion, setRespuesta, setResultado,setBotonHabilitado, intentos);
        setIntentos(intentos + 1);
    };
    
    if (intentos === 5){
        return <Puntuacion puntos={puntos}/>
    }
    return (
        <div className="juego">
            <CardDesafio
                operacion={operacion}
                respuesta={respuesta}
                setRespuesta={setRespuesta}
                verificarRespuesta={manejarVerificacion}
                siguienteDesafio={manejarSiguienteDesafio}
                intentos={intentos}
                puntos={puntos}
                resultado={resultado}
                botonHabilitado={botonHabilitado}
            />
        </div>
    );
}

export default Juego;