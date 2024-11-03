import React, { useState } from 'react';

const Inicio = ({ onStart, onSelectDificultad }) => {
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState('facil');

  const manejarCambio = (event) => {
    const nivel = event.target.value;
    setDificultadSeleccionada(nivel);
    onSelectDificultad(nivel);
  }
  return (
    <div className="inicio">
      <select className="form-select-lg mb-3 " value={dificultadSeleccionada} onChange={manejarCambio}>
        <option value="facil">Basico</option>
        <option value="intermedio">Intermedio</option>
        <option value="avanzado">Avanzado</option>
      </select>
      <button className='botonDM' onClick={onStart}>Empezar</button>
    </div>
  );
};

export default Inicio;
