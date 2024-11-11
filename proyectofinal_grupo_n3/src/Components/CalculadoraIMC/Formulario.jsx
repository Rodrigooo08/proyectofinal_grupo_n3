import React from 'react';

function Formulario({ nombre, apellido, peso, altura, setNombre, setApellido, setPeso, setAltura, calcular }) {
  const limitacionTexto = (settext) => (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value) || value === "") { 
      settext(value);
    }
  };
  const limitacionPeso= (e) =>{
    let value = e.target.value;
    if (value === "") {
      setPeso(value);
    } else {
      value = Math.min(parseFloat(value), 300); 
      if (value >= 1 && value <= 300) setPeso(value);
    }
  };
  const limitacionAltura=(e) =>{
    let value = e.target.value;
    if (value === ""){
      setPeso(value);
    } else {
      value = Math.min(parseFloat(value), 2.5);
      if (value >= 0.5 && value <= 2.5) setAltura(value);
    }
  }
  return (
    <div>
      <label className='letras'>Nombre:</label>
      <input className='entradaIMC' type="text" value={nombre} onChange={limitacionTexto(setNombre)} />

        <label className='letras'>Apellido:</label>
      <input className='entradaIMC' type="text" value={apellido} onChange={limitacionTexto(setApellido)}/>

       <label className='letras'>Peso (Kg):</label>
      <input className='entradaIMC' type="number" value={peso} onChange={limitacionPeso} min="1" max="300" title="Ingrese un peso entre 1 y 300 kg"/>

       <label className='letras'>Altura (m):</label>
      <input className='entradaIMC' type="number" value={altura} onChange={limitacionAltura} min="0.5" max="2.5" step="0.01" />

      <button className="boton" onClick={calcular}>Calcular IMC</button>
    </div>
  );
}

export default Formulario;