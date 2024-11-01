import React,{useState} from 'react';

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
      listaUsuarios();
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
    };
  
    // const cargaAlerta = () => {
    //   Swal.fire({
    //     text: "Se ha cargado correctamente",
    //     icon: "success",
    //   });
    // };
  
    const ocultarListas = () => {
      setTransaccionMaxima('');
      setListaMaximaTransaccionesVisible(false);
    };
}
export default GestorTransacciones;
