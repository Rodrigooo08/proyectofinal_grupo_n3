import React,{ useRef,  useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fade } from "react-awesome-reveal";
import '../../Style/GestorBilleteraVirtual.css'

function FormDatos({ nombre, billetera, transaccion, setNombre, setBilletera, setTransaccion, agregarUsuarios, usuarios, billeteraMasTransacciones }) {
  const audioRef = useRef(null);
  const limiteNombre = (setNombre) => (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value) || value === "") {
      setNombre(value);
    }
  };
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.play();
        audioRef.current.volume = 0.5;
    }
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; 
        }
    };
}, []);
  const limiteNumTransaccion = (setTransaccion) => (e) => {
    let value = e.target.value;
    if (value === "0" || isNaN(value) || parseInt(value, 10) < 0 || parseInt(value, 10) > 1000 || value.includes(".")) {
      if (value.includes(".")) {
        value = value.slice(0, value.indexOf('.'));
      }
      alert("Por favor, ingrese un número válido.");
      value = ""
      setTransaccion(value);

    } else {
      setTransaccion(value);
    }
  };

  return (
    <Fade>
      <div className="containerForm">
      <audio
                    ref={audioRef}
                    loop
                    muted={false}
                    autoPlay
                > 
                 <source src="/sound/GestorBilletera/GestorBilletera.mp3" type="audio/mp3" />
                </audio>
        <div className="row">
          <div className="col-12">
            <h1 className="textTitulo">Gestor de transacciones en Billeteras Virtuales</h1>
          </div>
        </div>
        <form className="containerForm">
          <div className="input-group mb-2">
            <label className="input-group-text" htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" aria-label="First name" className="form-control"
              value={nombre} onChange={limiteNombre(setNombre)}
            />
          </div>
          <div className="input-group mb-2">
            <label className="input-group-text" htmlFor="billetera">Billeteras</label>
            <select className="form-select" id="billetera"
              value={billetera} onChange={(e) => setBilletera(e.target.value)}
            >
              <option value="">Selecciona una billetera</option>
              <option value="paypal">PayPal</option>
              <option value="mercado_pago">Mercado Pago</option>
              <option value="personal_pay">PersonalPay</option>
              <option value="crypto">Criptomonedas</option>
              <option value="uala">Uala</option>
            </select>
          </div>
          <div className="input-group mb-2">
            <label className="input-group-text" htmlFor="transaccion">Número de transacción</label>
            <input type="number" id="transaccion" aria-label="Número de transacción" className="form-control"
              min="1"
              max="1000"
              step="1"
              value={transaccion} onChange={limiteNumTransaccion(setTransaccion)}
            />
          </div>
        </form>
        <br />
        <div className="text-center">
          <button type="button" className="btnB" onClick={agregarUsuarios}>
            <h4>Agregar usuario</h4>
          </button>
          <button type="button" className="btnB" onClick={billeteraMasTransacciones}>
            <h4>Billetera con más transacciones</h4>
          </button>
        </div>
        <br />
        <h4 className="mt-4 text-center">Transacciones por Usuario:</h4>
        <ul className="containerForm">
          {usuarios.map((trans, index) => (
            <li key={index} className=" listagestor table-primary tabla-usuario">
              {trans.nombre} - {trans.billetera} - {trans.transaccion}
            </li>
          ))}
        </ul>

      </div>
    </Fade>
  );
}
export default FormDatos;