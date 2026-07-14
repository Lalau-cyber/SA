import { Routes, Route } from 'react-router-dom';
import Topico from './pages/Topico';
import Trilha from './pages/Trilha';
import Painel from './pages/Painel';
import Diagnostico from './pages/Diagnostico';
import {Login, Home} from './pages/Entrada.jsx'
import Layout from './components/Nav.jsx';
import './App.css';

export default function App() {
  return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            
            <Route path="/diagnostico" element={<Layout><Diagnostico/></Layout>} />
            <Route path="/trilha" element={<Layout><Trilha/></Layout>} />
            <Route path="/topico/:id" element={<Layout><Topico/></Layout>} />
            <Route path="/painel" element={<Layout><Painel/></Layout>} />
        </Routes>
   
  );
}
