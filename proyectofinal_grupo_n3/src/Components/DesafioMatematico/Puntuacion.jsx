import React from 'react';

const Puntuacion = ({ puntos,reset }) => {
  return (
    <div className='final'>
      <h2>¡Juego terminado!</h2>
      <h3>Puntuación final: {puntos}</h3>
      <button className='botonDM' onClick={reset}>Reiniciar Juego</button>
    </div>
  );
};

export default Puntuacion;