import React from 'react';
import { Fade } from "react-awesome-reveal";

function Formulario({ nombre, apellido, peso, altura, setNombre, setApellido, setPeso, setAltura, calcular }) {
  return (
    <Fade>
      <div>
        <label className='letras'>Nombre:</label>
        <input className='entradaIMC' type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label className='letras'>Apellido:</label>
        <input className='entradaIMC' type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />

        <label className='letras'>Peso (Kg):</label>
        <input className='entradaIMC' type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />

        <label className='letras'>Altura (m):</label>
        <input className='entradaIMC' type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />

        <button className="boton" onClick={calcular}>Calcular IMC</button>
      </div>
    </Fade>
  );
}

export default Formulario;