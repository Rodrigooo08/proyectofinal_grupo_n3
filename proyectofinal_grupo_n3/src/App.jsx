import Layout from './Components/HomePage/Layaut';
import { Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Colaboradores from './Data/Colaboradores.json';
import Home from './Components/HomePage/Home';
import AboutUs from './Components/HomePage/AboutUs';
import CalculadoraIMC from './Components/CalculadoraIMC/CalculadoraIMC';
import DesafioMatematico from './Components/DesafioMatematico/DesafioMatematico';
import ErrorPage from './Components/HomePage/ErrorPage';
import  JuegoNave from './Components/JuegoNave/Juego';
import  GestorTransacciones from './Components/GestorBilleteraVirtual/GestorTransaccion';
import '../src/Style/HomeStyle.css';
function App() {
  

  return (
        <div className='container'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="nosotros" element={<AboutUs lista={Colaboradores}/>} />
            <Route path="calculadoraIMC" element={<CalculadoraIMC />} />
            <Route path="juegonave" element={<JuegoNave />} />
            <Route path="desafiomatematico" element={<DesafioMatematico />} />
            <Route path="gestorbilleteras" element={<GestorTransacciones />} />
          </Route>
            <Route path="*" element={<ErrorPage />} />
            </Routes>
       </div>
  )
}

export default App
