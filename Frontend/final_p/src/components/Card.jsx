<<<<<<< HEAD
export default function Card({children, titulo}) {
    return (
        <div className="card">
            {titulo && <h3 className="card-titulo">{titulo}</h3>}
            {children}
        </div>
    );
=======
import  Diagnostico from "../pages/Diagnostico";
import {Link } from 'react-router-dom'

export  function QuestaoCard({ numero, questao, respostaSelecionada, onSelecionar, desabilitada = false }) {
  return (
    <div className="questao-card">
      <span className="questao-card__numero">Questão {numero}</span>
      <p className="questao-card__enunciado">{questao.enunciado}</p>
      <div className="questao-card__opcoes">
        {questao.opcoes.map((opcao, indice) => {
          const selecionada = respostaSelecionada === indice;
          return (
            <label key={`${questao.id}-${indice}`} className={`opcao ${selecionada ? "opcao--selecionada" : ""}`}>
              <input
                type="radio"
                name={`questao-${questao.id}`}
                checked={selecionada}
                disabled={desabilitada}
                onChange={() => onSelecionar(questao.id, indice)}
              />
              {opcao}
            </label>
          );
        })}
      </div>
    </div>
  );
}
export function Card({ title, description, link }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} className="card-link">
        Saiba mais
      </Link>
    </div>
  );
>>>>>>> 03c5ff76da7e9520f9b7df2d228b0b3dbe4eaff2
}