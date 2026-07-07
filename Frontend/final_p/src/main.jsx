import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { EstudanteProvider } from './context/EstudanteContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
      <EstudanteProvider>
        <App />
      </EstudanteProvider>
    </BrowserRouter>
  </StrictMode>
);
