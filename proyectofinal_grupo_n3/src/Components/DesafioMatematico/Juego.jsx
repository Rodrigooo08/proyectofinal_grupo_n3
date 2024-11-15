import React, { useState } from 'react';
import generarOperacion from './GenerarOperaciones';
import verificarRespuesta from './verificarRespuesta';
import siguienteDesafio from './siguienteDesafio';
import CardDesafio from './TarjetaOperaciones';
import Puntuacion from './Puntuacion';
import DialogoVegeta from './DialogoVegeta';

const Juego = ({ dificultad, onReset }) => {
    const [operacion, setOperacion] = useState(generarOperacion(dificultad));
    const [respuesta, setRespuesta] = useState('');
    const [resultado, setResultado] = useState(null);
    const [intentos, setIntentos] = useState(0);
    const [puntos, setPuntos] = useState(0);
    const [botonHabilitado, setBotonHabilitado] = useState(true);
    const [botonSiguiente, setBotonSiguiente] = useState(false);
    const [dialogoVisible, setDialogoVisible] = useState(false);

    const manejarVerificacion = () => {
        verificarRespuesta(respuesta, operacion, setResultado, setPuntos, puntos);
        setBotonHabilitado(false);
        setBotonSiguiente(true);
        setDialogoVisible(true);
    };

    const manejarSiguienteDesafio = () => {
        siguienteDesafio(setOperacion, () => generarOperacion(dificultad), setRespuesta, setResultado, setBotonHabilitado, intentos, setBotonSiguiente, setDialogoVisible);
        setIntentos(intentos + 1);
        setDialogoVisible(false);
    };

    if (intentos === 5) {
        return <Puntuacion puntos={puntos} reset={onReset} />
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
                botonSiguiente={botonSiguiente}
            />
            {dialogoVisible && (
                <div className='Dialogoconteiner'>
                    <DialogoVegeta
                        resultado={resultado}
                    />
                </div>
            )}
        </div>
    );
}

export default Juego;