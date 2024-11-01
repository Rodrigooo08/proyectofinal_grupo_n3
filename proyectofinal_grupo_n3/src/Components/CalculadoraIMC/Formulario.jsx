import React from 'react';

function Formulario({ nombre, apellido, peso, altura, setNombre, setApellido, setPeso, setAltura, calcular }) {
  return (
    <div>
      <label className='letras'>Nombre:</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label className='letras'>Apellido:</label>
      <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />

       <label className='letras'>Peso (Kg):</label>
      <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />

       <label className='letras'>Altura (m):</label>
      <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />

      <button onClick={calcular}>Calcular IMC</button>
    </div>
  );
}

export default Formulario;