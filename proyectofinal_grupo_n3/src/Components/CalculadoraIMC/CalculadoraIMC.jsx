import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Formulario from './Formulario';
import ResultadoIMC from './ResultadoIMC';
import '../../style/CalculadoraIMCStyle.css'

function CalculadoraIMC() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [nivelIMC, setNivelIMC] = useState('');
  const [imagenResultado, setImagenResultado] = useState('');

  const calcularIMC = (peso, altura) => peso / (altura * altura);

  const determinarNivel = (resultado) => {
    if (resultado < 18.5) return 'Bajo peso';
    if (resultado >= 18.5 && resultado <= 24.9) return 'Peso saludable';
    if (resultado >= 25 && resultado <= 29.9) return 'Sobrepeso';
    return 'Obesidad';
  };

  const manejarCalculo = () => {
    if (!nombre || !apellido || !peso || !altura || altura <= 0) {
      alert('Por favor, ingrese todos los datos correctamente.');
      return;
    }

    const imcCalculado = calcularIMC(parseFloat(peso), parseFloat(altura));
    setImc(imcCalculado);
    const nivel = determinarNivel(imcCalculado);
    setNivelIMC(nivel);

    if (nivel === 'Bajo peso') {
      setImagenResultado("Image/CalculadoraIMC/bajo_peso.png"); // Cambia la ruta por la correcta
  } else if (nivel === 'Peso saludable') {
      setImagenResultado("Image/CalculadoraIMC/peso_saludable.png");
  } else if (nivel === 'Sobrepeso') {
      setImagenResultado("Image/CalculadoraIMC/sobrepeso.png");
  } else if (nivel === 'Obesidad') {
      setImagenResultado("Image/CalculadoraIMC/obesidad.png");
  }
  };

  return (
    <>
      <div className="ContainerForm">
        <div className="ImagFormContainer">
          <img src="Image/CalculadoraIMC/DoctorIMC.png" alt="Imagen ilustrativa" className="imagen-formulario" />
        </div>
        <div className="formularioIMC">
          <div className="Calculadora">
            <h1 className='text-center'>Calculadora del Índice de Masa Corporal</h1>
            <Formulario
              nombre={nombre}
              apellido={apellido}
              peso={peso}
              altura={altura}
              setNombre={setNombre}
              setApellido={setApellido}
              setPeso={setPeso}
              setAltura={setAltura}
              calcular={manejarCalculo}
            />
            {imc && <ResultadoIMC nombre={nombre} apellido={apellido} imc={imc} nivelIMC={nivelIMC} />}
          </div>
        </div>
        {imagenResultado && (
          <div className="ImagenResultadoContainer">
            <img src={imagenResultado} alt="Resultado de IMC" className="imagen-resultado" />
          </div>
        )}
      </div>
      </>
      );
}

      export default CalculadoraIMC;