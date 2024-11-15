import React from 'react';

const DialogoVegeta = ({ Resultado, respuestacorrecta }) => {
  console.log(Resultado);
  return (
    <>

      <div className='Dialogo'>
        <img src="../Image/DesafioMatematicoIMG/DialogoVegeta.png" alt="Dialogo para la seleccion de Dificultad" />
        <div >
          <p className='textoImageDialogo'>{Resultado === 'Correcto' ? '¡Bien hecho!' : 'Intenta de nuevo!'}<br/>
         La respuesta correcta es: {respuestacorrecta}</p>
        </div>
      </div>
    </>

  );
};

export default DialogoVegeta;
