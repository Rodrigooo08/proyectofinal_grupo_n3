function verificarRespuesta(respuesta, operacion, setResultado, setPuntos, puntos) {
    if (respuesta == operacion.respuesta) {
      setResultado('Correcto');
      setPuntos(puntos + 1);
    } else {
      setResultado('Incorrecto');
    }
  }

  export default verificarRespuesta;