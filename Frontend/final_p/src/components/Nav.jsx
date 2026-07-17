import { Link, useLocation } from "react-router-dom";
import { useEstudante } from "../context/EstudanteContext";

const ITENS_NAV = [
  { rota: "/diagnostico", rotulo: "Diagnóstico" },
  { rota: "/trilha", rotulo: "Trilha" },
  { rota: "/painel", rotulo: "Painel" },
];

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { estudante } = useEstudante();

  return (
    <>
      <header className="cabecalho">
        <div className="cabecalho__conteudo">
          <Link to="/" className="marca">TrilhaAdaptativa</Link>
          <nav className="nav">
            {ITENS_NAV.map((item) => (
              <Link
                key={item.rota}
                to={item.rota}
                className={`nav__link ${pathname === item.rota ? "nav__link--ativo" : ""}`}
              >
                {item.rotulo}
              </Link>
            ))}
            {estudante && <span className="nav__estudante" style={{ marginLeft: '15px', fontWeight: 'bold' }}>{estudante.nome}</span>}
          </nav>
        </div>
      </header>
      <main>
        <div className="container" style={{ paddingTop: '20px' }}>
          {children}
        </div>
      </main>
    </>
  );
}