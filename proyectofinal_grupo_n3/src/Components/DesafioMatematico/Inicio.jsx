import React from 'react';

const Inicio = ({ onStart }) => {
  return (
    <div className="inicio">
      
      <button className='botonDM' onClick={onStart}>Empezar</button>
    </div>
  );
};

export default Inicio;
