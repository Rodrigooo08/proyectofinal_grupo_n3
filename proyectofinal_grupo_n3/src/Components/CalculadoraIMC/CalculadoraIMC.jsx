import React, { useState , useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Formulario from './Formulario';
import ResultadoIMC from './ResultadoIMC';
import '../../style/CalculadoraIMCStyle.css'

function CalculadoraIMC() {
  const audioRef = useRef(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [nivelIMC, setNivelIMC] = useState('');
  const [imagenResultado, setImagenResultado] = useState('');
  const [recomendaciones, setRecomendaciones] = useState([]);

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
    //setNivelIMC(determinarNivel(imcCalculado));
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
  
  const recomendacionCalculada = (nivel) => {
    const recomendacionesRandom = {
      "Bajo peso": [
        "Incrementa el consumo de alimentos ricos en proteínas y carbohidratos saludables.",
        "Añade frutos secos y aguacates a tu dieta diaria.",
        "Realiza ejercicios de fuerza para ganar masa muscular.",
        "Consulta a un nutricionista para un plan personalizado."
      ],
      "Peso saludable": [
        "Tienes un buen peso! sigue asi, recuerda hidratarte y moderar tu consumo de azucar.",
        "Evita el consumo excesivo de alimentos procesados.",
        "Realiza actividad física regular para mantener tu peso ideal.",
        "Hidrátate bien, al menos 2 litros de agua al día."
      ],
      "Sobrepeso": [
        "Reduce el consumo de alimentos ultraprocesados y azúcares.",
        "Prefiere opciones integrales como arroz integral y pan de grano entero.",
        "Incluye más vegetales en tus comidas.",
        "Aumenta tu actividad física diaria, como caminar o andar en bicicleta."
      ],
      "Obesidad": [
        "Elimina las bebidas azucaradas y reemplázalas con agua o infusiones.",
        "Inicia un plan de alimentación saludable con ayuda de un experto.",
        "Comienza con ejercicios de baja intensidad, como caminatas diarias.",
        "Prioriza porciones más pequeñas y mastica lentamente al comer."
      ]
    };
    const recomendacionNivel= recomendacionesRandom[nivel] || [];
    return recomendacionNivel[Math.floor(Math.random() * recomendacionNivel.length)];
   };
   setRecomendaciones(recomendacionCalculada (nivel));
  };


  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.play();
        audioRef.current.volume = 0.5;
    }
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; 
        }
    };
}, []);
  return (
    <>
      <div className="ContainerForm">
        <div className="ImagFormContainer">
        <audio
                    ref={audioRef}
                    loop
                    muted={false}
                    autoPlay
                > 
                 <source src="/sound/IMC/MusicaIMC.mp3" type="audio/mp3" />
                </audio>
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
            {imc && <ResultadoIMC nombre={nombre} apellido={apellido} imc={imc} nivelIMC={nivelIMC} recomendaciones={recomendaciones} />}
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