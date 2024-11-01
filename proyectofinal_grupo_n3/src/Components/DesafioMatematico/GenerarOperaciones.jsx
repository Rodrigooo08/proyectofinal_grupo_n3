function generarOperacion() {
    const tipo = Math.random() > 0.5 ? 'suma' : 'resta';
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    return tipo === 'suma'
    ? { pregunta: `${num1} + ${num2}`, respuesta: num1 + num2 }
    : { pregunta: `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`, respuesta: Math.abs(num1 - num2) };
  }
  export default generarOperacion;
