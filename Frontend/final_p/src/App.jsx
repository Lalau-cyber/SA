<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Entrada from './pages/Entrada';
import Topico from './pages/Topico';
import Trilha from './pages/Trilha';
import Painel from './pages/Painel';
import Diagnostico from './pages/Diagnostico';
import './app.css';
=======

import { Routes, Route } from 'react-router-dom';
import Entrada from './pages/Entrada.jsx';
import Diagnostico from './pages/Diagnostico.jsx';
import Trilhas from './pages/Trilhas.jsx';
import Topico from './pages/Topico.jsx';
import Painel from './pages/Painel.jsx';
import Layout from './components/Nav.jsx';
import './App.css';
>>>>>>> 03c5ff76da7e9520f9b7df2d228b0b3dbe4eaff2

export default function App() {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={<Entrada />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
          <Route path="/trilha" element={<Trilhas />} />
          <Route path="/topico/:id" element={<Topico />} />
          <Route path="/painel" element={<Painel />} />
        </Routes>
      </Layout>
  );
}
