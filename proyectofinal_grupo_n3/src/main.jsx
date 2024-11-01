import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DesafioMatematico from './Components/DesafioMatematico/DesafioMatematico'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter/>
    <DesafioMatematico />
    <BrowserRouter/>
  </StrictMode>,
  
)
