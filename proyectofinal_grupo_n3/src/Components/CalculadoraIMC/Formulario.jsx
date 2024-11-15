import { Fade } from "react-awesome-reveal";
import React, { useState } from 'react';

function Formulario({ nombre, apellido, peso, altura, setNombre, setApellido, setPeso, setAltura, calcular }) {
  const [botonEnCalcular, setBotonEnCalcular] = useState(true);
  const precionarBoton = () => {
    if (botonEnCalcular) {
      calcular();
      setBotonEnCalcular(false);
    } else {
      window.location.href = '/calculadoraIMC';
    }
  }
  const limitacionTexto = (settext) => (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value) || value === "") {
      settext(value);
    }
  };
  const limitacionPeso = (e) => {
    const value = e.target.value;
    if (value === "" || (parseFloat(value) >= 1 && parseFloat(value) <= 300)) {
      setPeso(value);
    }
  };
  const limitacionAltura = (e) => {
    const value = e.target.value;
    if (value === "" || (parseFloat(value) >= 0.5 && parseFloat(value) <= 2.5)) {
      setAltura(value);
    }
  };
  return (
    <Fade>
          <label className='letras'>Nombre:</label>
          <input className='entradaIMC' type="text" value={nombre} onChange={limitacionTexto(setNombre)} />

          <label className='letras'>Apellido:</label>
          <input className='entradaIMC' type="text" value={apellido} onChange={limitacionTexto(setApellido)} />

          <label className='letras'>Peso (Kg):</label>
          <input className='entradaIMC' type="number" value={peso} onChange={limitacionPeso} title="Ingrese un peso entre 1 y 300 kg" />

          <label className='letras'>Altura (m):</label>
          <input className='entradaIMC' type="number" value={altura} onChange={limitacionAltura}  />

          <button className="boton" onClick={precionarBoton}>{botonEnCalcular ? "Calcular IMC" : "Limpiar Formulario"}</button>
    </Fade>
  );
}

export default Formulario;