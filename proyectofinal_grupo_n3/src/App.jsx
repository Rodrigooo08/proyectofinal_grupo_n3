import Layout from './Components/Layout'
import { Routes,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Colaboradores from './Data/Colaboradores.json'
function App() {
  

  return (
        <div className='container'>
        <Routes>
          <Route path='/' element={<Layout />}/>
            <Route index element={<Home />} />
            <Route path="nosotros" element={<Nosotros lista={Colaboradores}/>} />
            <Route path="*" element={<ErrorPage />} />
            </Routes>
       </div>
  )
}

export default App
