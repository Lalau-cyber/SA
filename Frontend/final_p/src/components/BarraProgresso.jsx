export default function BarraProgresso({ concluidos, total, rotulo = "Progresso na trilha" }) {
  const percentual = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  return (
    <div className="barra-progresso">
      <div className="barra-progresso__legenda">
        <span>{rotulo}</span>
        <span>{concluidos}/{total} · {percentual}%</span>
      </div>
      <div className="barra-progresso__trilho">
        <div
          className="barra-progresso__preenchimento"
          style={{ width: `${percentual}%` }}
        />
      </div>
    </div>
  );
}
