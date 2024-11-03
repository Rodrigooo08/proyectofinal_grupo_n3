function generarOperacion(dificultad) {
  let tipo, num1, num2;

  switch (dificultad) {
    case 'facil':
      tipo = Math.random() > 0.5 ? 'suma' : 'resta';
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;

      return tipo === 'suma'
        ? { pregunta: `${num1} + ${num2}`, respuesta: num1 + num2 }
        : { pregunta: `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`, respuesta: Math.abs(num1 - num2) };

    case 'intermedio':
      tipo = Math.random() > 0.5 ? 'multiplicacion' : 'division';
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      return tipo === 'multiplicacion'
        ? { pregunta: `${num1} × ${num2}`, respuesta: num1 * num2 }
        : { pregunta: `${num1 * num2} ÷ ${num2}`, respuesta: num1 };


    case 'avanzado':

    default:
      return { pregunta: 'ERROR', respuesta: 'ERROR' };
  }
}
export default generarOperacion;
