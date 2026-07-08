
import { Routes, Route } from 'react-router-dom';
import Entrada from './pages/Entrada.jsx';
import Diagnostico from './pages/Diagnostico.jsx';
import Trilhas from './pages/Trilhas.jsx';
import Topico from './pages/Topico.jsx';
import Painel from './pages/Painel.jsx';
import Layout from './components/Nav.jsx';
import './App.css';

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
