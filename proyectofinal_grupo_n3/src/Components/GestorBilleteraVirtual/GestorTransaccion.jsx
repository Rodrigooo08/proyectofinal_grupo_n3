import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormDatos from './FormDatos';
import Swal from 'sweetalert2';
import MaximaUsuario from './MaximaUsuario';
import '../../style/GestorBilleteraVirtual.css'

function GestorTransacciones() {
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
    const transaccionLimitada = Math.min(parseInt(transaccion, 10), 1000);

    const nuevaTransaccion = { nombre, billetera, transaccion: transaccionLimitada };
    setUsuarios([...usuarios, nuevaTransaccion]);
    setNombre('');
    setBilletera('');
    setTransaccion('');
    cargaAlerta();
    ocultarListas();
    listaUsuarios();


  };

  function listaUsuarios() {

    const contenedorLista = document.getElementById('contenedorLista');
    contenedorLista.innerHTML = '';

    //Muestra de registro de Usuario fue cambiado, de div a li para que se muestre en pantalla en forma de lista
    usuarios.forEach(cuenta => {
      const li = document.createElement('li');
      li.classList.add('user-list-item');
      li.textContent = `${cuenta.nombre}, ${cuenta.billetera}, ${cuenta.transaccion}`;
      contenedorLista.appendChild(li);
    });

  }

  function billeteraMasTransacciones() {
    const transaccionMaxima = document.getElementById('transaccionMaxima');
    if (listaMaximaTransaccionesVisible) {
      transaccionMaxima.innerHTML = '';
      setListaMaximaTransaccionesVisible(false);
      return;
    }
    if (usuarios.length === 0) return;
    const transaccionesPorUsuario = {};
    usuarios.forEach(function (transaccion) {
      const transaccionLimitada = Math.min(transaccion.transaccion, 1000);
      if (!transaccionesPorUsuario[transaccion.nombre]) {
        transaccionesPorUsuario[transaccion.nombre] = {};
      }
      //en caso de que las billeteras esten repetidas para un mismo usuario se suma el numero de transacciones
      if (transaccionesPorUsuario[transaccion.nombre][transaccion.billetera]) {
        transaccionesPorUsuario[transaccion.nombre][transaccion.billetera] += transaccionLimitada;
      } else {
        transaccionesPorUsuario[transaccion.nombre][transaccion.billetera] = transaccionLimitada;
      }
    });
    //muestra del resultado maximo por cada uno de los usuarios
    let resultado = '';
    Object.entries(transaccionesPorUsuario).forEach(([nombre, billetera]) => {
      const billeteraConMasTransacciones = Object.entries(billetera).reduce((prev, current) => (prev[1] > current[1] ? prev : current));
      resultado += `${nombre}: ${billeteraConMasTransacciones[0]} ${billeteraConMasTransacciones[1]} transacciones <br>`;
      console.log(resultado);
    });

    transaccionMaxima.innerHTML = resultado;
    setTransaccionMaxima(resultado);
    setListaMaximaTransaccionesVisible(true);
    cargaUsuariosMaximos(resultado);

  }

  function ocultarListas() {

    //oculta lista de billetera con mas Transacciones
    transaccionMaxima.innerHTML = '';
    setListaMaximaTransaccionesVisible(false);
  }
  function cargaAlerta() {
    Swal.fire({
      text: "Se ha cargado correctamente",
      icon: "success",
    });
  }
  function cargaUsuariosMaximos(resultado) {
    Swal.fire({
      title: 'Maxima Transacciones por Usuario',
      html: resultado,
      showConfirmButton: true
    });

  }


  return (
    <>
      <div className='Formulario'>
        <FormDatos
          nombre={nombre}
          billetera={billetera}
          transaccion={transaccion}
          setNombre={setNombre}
          setBilletera={setBilletera}
          setTransaccion={setTransaccion}
          agregarUsuarios={agregarUsuarios}
          usuarios={usuarios}
          billeteraMasTransacciones={billeteraMasTransacciones}
          GestorTransacciones={GestorTransacciones}
        />
        <MaximaUsuario
          transaccionMaxima={transaccionMaxima} 
          listaMaximaTransaccionesVisible={listaMaximaTransaccionesVisible}
        />
      </div>

    </>
  )
}
export default GestorTransacciones;
