import React from 'react';

function Formulario({ nombre, apellido, peso, altura, setNombre, setApellido, setPeso, setAltura, calcular }) {
  const validacionTexto = (settext) => (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value) || value === "") { // Solo permite letras y espacios
      settext(value);
    }
  };
  return (
    <div>
      <label className='letras'>Nombre:</label>
      <input className='entradaIMC' type="text" value={nombre} onChange={validacionTexto(setNombre)} />

        <label className='letras'>Apellido:</label>
      <input className='entradaIMC' type="text" value={apellido} onChange={validacionTexto(setApellido)}/>

       <label className='letras'>Peso (Kg):</label>
      <input className='entradaIMC' type="number" value={peso} onChange={(e) => setPeso(e.target.value)}/>

       <label className='letras'>Altura (m):</label>
      <input className='entradaIMC' type="number" value={altura} onChange={(e) => setAltura(e.target.value)}/>

      <button className="boton" onClick={calcular}>Calcular IMC</button>
    </div>
  );
}

export default Formulario;