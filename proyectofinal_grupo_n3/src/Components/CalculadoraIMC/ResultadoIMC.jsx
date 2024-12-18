import React from "react";

function ResultadoIMC({nombre, apellido, imc, nivelIMC,recomendaciones }){
    
    return (
        <div className="resultado">
          <p>IMC: <span>{imc.toFixed(2)}</span></p>
          <p>Paciente: <span>{nombre} {apellido}</span></p>
          <p>Nivel de peso: <span>{nivelIMC}</span></p>
          <p>Recomendaciones: <span>{recomendaciones}</span></p>
        </div>
      );
}

export default ResultadoIMC;