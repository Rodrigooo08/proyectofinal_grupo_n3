function siguienteDesafio(setOperacion, generarOperacion, setRespuesta, setResultado, setBotonHabilitado, intentos) {
    if (intentos >= 5) {
      return; // Si los intentos son 5 o más, no permitir avanzar
    }  
    setOperacion(generarOperacion());
    setRespuesta('');
    setResultado(null);
    setBotonHabilitado(true);
  }

  export default siguienteDesafio;