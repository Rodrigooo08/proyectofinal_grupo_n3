import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import FormDatos from './FormDatos';
import '../../style/GestorBilleteraVirtual.css'

// function GestorTransacciones(){
const GestorTransacciones = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [billetera, setBilletera] = useState('');
    const [transaccion, setTransaccion] = useState('');
    const [listaMaximaTransaccionesVisible, setListaMaximaTransaccionesVisible] = useState(false);
    const [transaccionMaxima, setTransaccionMaxima] = useState('');
  
    const agregarUsuarios = () => {
      if (!nombre || !billetera || isNaN(parseInt(transaccion, 10))) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
      }
  
      const nuevaTransaccion = { nombre, billetera, transaccion: parseInt(transaccion, 10) };
      setUsuarios([...usuarios, nuevaTransaccion]);
      setNombre('');
      setBilletera('');
      setTransaccion('');
      cargaAlerta();
      //listaUsuarios();
      ocultarListas();

    };
  
    // const listaUsuarios = () => {
    //   // No es necesario hacer nada aquí, ya que la lista se actualiza automáticamente con el estado
    // };
  
    const billeteraMasTransacciones = () => {
      if (listaMaximaTransaccionesVisible) {
        setTransaccionMaxima('');
        setListaMaximaTransaccionesVisible(false);
        return;
      }
      
      if (usuarios.length === 0) return;
  
      const transaccionesPorUsuario = {};
      usuarios.forEach(({ nombre, billetera, transaccion }) => {
        if (!transaccionesPorUsuario[nombre]) {
          transaccionesPorUsuario[nombre] = {};
        }
        transaccionesPorUsuario[nombre][billetera] = (transaccionesPorUsuario[nombre][billetera] || 0) + transaccion;
      });
  
      let resultado = '';
      Object.entries(transaccionesPorUsuario).forEach(([nombre, billetera]) => {
        const billeteraConMasTransacciones = Object.entries(billetera).reduce((prev, current) => (prev[1] > current[1] ? prev : current));
        resultado += `${nombre}: ${billeteraConMasTransacciones[0]} ${billeteraConMasTransacciones[1]} transacciones <br>`;
      });
  
      setTransaccionMaxima(resultado);
      setListaMaximaTransaccionesVisible(true);
    }
  
    const ocultarListas = () => {
      setTransaccionMaxima('');
      setListaMaximaTransaccionesVisible(false);
    };
    return (
      <>
      {/* <div className='Formulario'>
      <h1 className="text-center">Gestor de transacciones en Billeteras Virtuales</h1>
      <FormDatos 
      setUsuarios ={setUsuarios}
      setNombre ={setNombre}
      setBilletera = {setBilletera}
      setTransaccion ={setTransaccion}
      setListaMaximaTransaccionesVisible ={setListaMaximaTransaccionesVisible}
      setTransaccionMaxima={setTransaccionMaxima}
      GestorTransacciones={GestorTransacciones}
      agregarUsuarios={agregarUsuarios}
      billeteraMasTransacciones ={billeteraMasTransacciones}
      transaccionMaxima ={transaccionMaxima}
       />
</div> */}

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
        {transaccion.map((trans, index) => (
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

      </>
    )
}
//}
export default GestorTransacciones;
