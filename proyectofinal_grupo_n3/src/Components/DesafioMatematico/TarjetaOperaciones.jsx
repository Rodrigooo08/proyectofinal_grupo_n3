import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
  // Importa los estilos personalizados


const CardDesafio = ({
  operacion,
  respuesta,
  setRespuesta,
  verificarRespuesta,
  siguienteDesafio,
  intentos,
  puntos,
  resultado,
  botonHabilitado,
  botonSiguiente
}) => {
  return (
    <div className="card-container">
      <div className="card card-desafio">
        <div className="card-body">
          <h5 className="card-title text-center">Desafío Matemático</h5>
          <p className="card-text text-center display-6">
          {operacion.pregunta} =
          </p>
          
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Escribe tu respuesta"
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-primary"onClick={verificarRespuesta}disabled={!botonHabilitado}>Verificar Respuesta</button>
            <button className="btn btn-secondary"onClick={siguienteDesafio}disabled={!botonSiguiente}>Cambiar Desafio</button> 
          </div>

          <div>
            <p className="text-center mt-3">Respuesta: {resultado}</p>
            <p className="text-center mt-3">Puntuacion: {puntos}</p>
            <p className="text-center mt-3">Desafio{intentos} de 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDesafio;
