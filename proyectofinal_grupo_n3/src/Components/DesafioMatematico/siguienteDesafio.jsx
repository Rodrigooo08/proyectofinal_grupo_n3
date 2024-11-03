function siguienteDesafio(setOperacion, generarOperacion, setRespuesta, setResultado, setBotonHabilitado, intentos, setBotonSiguiente) {
    if (intentos >= 5) {
      return; // Si los intentos son 5 o más, no permitir avanzar
    }  
    setOperacion(generarOperacion());
    setRespuesta('');
    setResultado(null);
    setBotonHabilitado(true);
    setBotonSiguiente(false);
  }

  export default siguienteDesafio;