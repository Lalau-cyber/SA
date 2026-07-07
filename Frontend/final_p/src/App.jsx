import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Entrada from './pages/Entrada';
import Topico from './pages/Topico';
import Trilha from './pages/Trilha';
import Painel from './pages/Painel';
import Diagnostico from './pages/Diagnostico';
import './app.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Entrada />} />
      <Route path="/diagnostico" element={<Diagnostico />} />
      <Route path="/trilha" element={<Trilha />} />
      <Route path="/topico/:id" element={<Topico />} />
      <Route path="/painel" element={<Painel />} />
    </Routes>
  );
}
