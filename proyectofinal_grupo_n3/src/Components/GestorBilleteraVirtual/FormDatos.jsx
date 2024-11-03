import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormDatos({ nombre, billetera, transaccion, setNombre, setBilletera, setTransaccion, agregarUsuarios, usuarios, billeteraMasTransacciones })
{
return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Gestor de transacciones en Billeteras Virtuales</h1>
        </div>
      </div>
      <form className="container">
        <div className="input-group mb-2">
          <label className="input-group-text" htmlFor="nombre">Nombre</label>
          <input type="text"id="nombre"aria-label="First name"className="form-control"
           value={nombre}onChange={(e) => setNombre(e.target.value)}
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
          <input type="number"id="transaccion"aria-label="Número de transacción"className="form-control"
            value={transaccion} onChange={(e) => setTransaccion(e.target.value)}
          />
        </div>
      </form>
      <br />
      <div className="text-center">
        <button type="button" className="btn btn-danger" onClick={agregarUsuarios}>
          <h4>Agregar usuario</h4>
        </button>
        <button type="button" className="btn btn-success" onClick={billeteraMasTransacciones}>
          <h4>Billetera con más transacciones</h4>
        </button>
      </div>
      <br />
      <h4 className="mt-4 text-center">Transacciones por Usuario:</h4>
      <ul className="container">
        {usuarios.map((trans, index) => (
          <li key={index} className=" listagestor table-primary tabla-usuario">
            {trans.nombre} - {trans.billetera} - {trans.transaccion}
          </li>
        ))}
      </ul>
      <form className="container">
        <h4 className="mt-4 text-center">Máximas Transacciones por Usuario:</h4>
        <p id="transaccionMaxima"></p>
      </form>
    </div>
  );
}
export default FormDatos;