import React from 'react';

const Puntuacion = ({ puntos }) => {
  return (
    <div className='final'>
      <h2>¡Juego terminado!</h2>
      <h3>Puntuación final: {puntos}</h3>
    </div>
  );
};

export default Puntuacion;