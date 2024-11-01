import Layout from './Components/HomePage/Layaut';
import { Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Colaboradores from './Data/Colaboradores.json';
import Home from './Components/HomePage/Home';
import AboutUs from './Components/HomePage/AboutUs';
function App() {
  

  return (
        <div className='container'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="nosotros" element={<AboutUs lista={Colaboradores}/>} />
          </Route>
           {/* <Route path="*" element={<ErrorPage />} />*/}
            </Routes>
       </div>
  )
}

export default App
