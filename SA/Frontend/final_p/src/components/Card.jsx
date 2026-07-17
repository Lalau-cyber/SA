<<<<<<< HEAD
export default function Card({children, titulo}) {
    return (
        <div className="card">
            {titulo && <h3 className="card-titulo">{titulo}</h3>}
            {children}
        </div>
    );
}
=======
export function Card({ children, titulo }) {
  return (
    <div className="card">
      {titulo && <h3 className="card-titulo">{titulo}</h3>}
      {children}
    </div>
  );
}

export function QuestaoCard({ numero, questao, respostaSelecionada, onSelecionar, desabilitada = false }) {
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
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
