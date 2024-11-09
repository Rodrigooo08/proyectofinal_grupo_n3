function generarOperacion(dificultad) {
  let tipo, num1, num2, num3, num4, x;

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
      tipo = Math.floor(Math.random() * 3); 

      if (tipo === 0) { // Operaciones con decimales
          num1 = (Math.random() * 10).toFixed(1);
          num2 = (Math.random() * 10).toFixed(1);
          const operacionDecimal = Math.floor(Math.random() * 4);

          switch (operacionDecimal) {
              case 0:
                  return { pregunta: `${num1} + ${num2}`, respuesta: (parseFloat(num1) + parseFloat(num2)).toFixed(1) };
              case 1:
                  return { pregunta: `${num1} - ${num2}`, respuesta: (parseFloat(num1) - parseFloat(num2)).toFixed(1) };
              case 2: 
                  return { pregunta: `${num1} × ${num2}`, respuesta: (parseFloat(num1) * parseFloat(num2)).toFixed(2) };
              case 3: 
                  if (parseFloat(num2) === 0) num2 = (Math.random() * 9 + 1).toFixed(1);
                  return { pregunta: `${num1} ÷ ${num2}`, respuesta: (parseFloat(num1) / parseFloat(num2)).toFixed(2) };
          }
      } else if (tipo === 1) { // Operaciones con fracciones
          num1 = Math.floor(Math.random() * 10) + 1;
          num2 = Math.floor(Math.random() * 10) + 1;
          num3 = Math.floor(Math.random() * 10) + 1;
          num4 = Math.floor(Math.random() * 10) + 1;
          const operacionFraccion = Math.floor(Math.random() * 4);

          switch (operacionFraccion) {
              case 0: { 
                  const denominadorComun = num2 * num4;
                  const numeradorResultado = (num1 * num4) + (num3 * num2);
                  const divisor = mcd(numeradorResultado, denominadorComun);
                  return {
                      pregunta: `${num1}/${num2} + ${num3}/${num4}`,
                      respuesta: `${numeradorResultado / divisor}/${denominadorComun / divisor}`
                  };
              }
              case 1: { 
                  const denominadorComun = num2 * num4;
                  const numeradorResultado = (num1 * num4) - (num3 * num2);
                  const divisor = mcd(numeradorResultado, denominadorComun);
                  return {
                      pregunta: `${num1}/${num2} - ${num3}/${num4}`,
                      respuesta: `${numeradorResultado / divisor}/${denominadorComun / divisor}`
                  };
              }
              case 2: { 
                  const numeradorResultado = num1 * num3;
                  const denominadorResultado = num2 * num4;
                  const divisor = mcd(numeradorResultado, denominadorResultado);
                  return {
                      pregunta: `${num1}/${num2} × ${num3}/${num4}`,
                      respuesta: `${numeradorResultado / divisor}/${denominadorResultado / divisor}`
                  };
              }
              case 3: { 
                  const numeradorResultado = num1 * num4;
                  const denominadorResultado = num2 * num3;
                  const divisor = mcd(numeradorResultado, denominadorResultado);
                  return {
                      pregunta: `${num1}/${num2} ÷ ${num3}/${num4}`,
                      respuesta: `${numeradorResultado / divisor}/${denominadorResultado / divisor}`
                  };
              }
          }
      }else { 
          num1 = Math.floor(Math.random() * 10) + 1;
          x = Math.floor(Math.random() * 10) + 1;
          const operacionEcuacion = Math.floor(Math.random() * 4);

          switch (operacionEcuacion) {
              case 0: 
                  return { pregunta: `X + ${num1} = ${num1 + x}, valor de X`, respuesta: x };
              case 1: 
                  return { pregunta: `X - ${num1} = ${x - num1}, valor de X`, respuesta: x };
              case 2: 
                  return { pregunta: `${num1} * X = ${num1 * x}, valor de X`, respuesta: x };
              case 3: 
                  if (x === 0) x = Math.floor(Math.random() * 9) + 1;
                  return { pregunta: `${x * num1} ÷ X = ${num1}, valor de X`, respuesta: x };
          }
      }
      break;

    default:
      return { pregunta: 'ERROR', respuesta: 'ERROR' };
  }
}
//máximo común divisor
function mcd(a, b) {
  return b === 0 ? a : mcd(b, a % b);
}
export default generarOperacion;
