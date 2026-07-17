export default function QuestaoCard({ questao, indice, respostaSelecionada, onSelecionar }) {
  return (
    <div className="questao-card">
      <p className="questao-card__enunciado">
        {indice + 1}. {questao.enunciado}
      </p>
      <div className="questao-card__opcoes">
        {questao.opcoes.map((opcao, i) => (
          <label
            key={i}
            className={`opcao ${respostaSelecionada === i ? "opcao--selecionada" : ""}`}
          >
            <input
              type="radio"
              name={`questao-${questao.id}`}
              checked={respostaSelecionada === i}
              onChange={() => onSelecionar(questao.id, i)}
            />
            {opcao}
          </label>
        ))}
      </div>
    </div>
  );
}