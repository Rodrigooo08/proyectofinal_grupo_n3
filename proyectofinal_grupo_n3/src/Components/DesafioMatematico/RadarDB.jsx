import React from 'react';

const RadarDB = ({juego}) => {
  return (
    <div className="imagenTarjeta">
      <img src="../public/image/DesafioMatematicoIMG/Radar.png" alt="Logo para la tarjetaOperaciones" />
      {juego}
    </div>
  );
};

export default RadarDB;
