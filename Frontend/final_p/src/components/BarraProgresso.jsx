<<<<<<< HEAD

export default function BarraProgresso({ concluidos, total}) {
    const percentual = total > 0 ? Math.round((concluidos/total ) * 100) : 0

    return(
        <div className="barra-progresso-wrapper">
            <div className="barra-progresso-fundo">
                <div
                    className="barra-progresso-preenchimento"
                    style={{ width: `${percentual}%` }}
                />
            </div>
            <p className="barra-progresso-texto">
                {concluidos} de {total} tópicos concluídos ({percentual}%)
            </p>
        </div>
    );
=======
export default function BarraProgresso({ concluidos, total, rotulo = "Progresso na trilha" }) {
  const percentual = total > 0 ? Math.round((concluidos / total) * 100) : 0;
  return (
    <div className="barra-progresso">
      <div className="barra-progresso__legenda">
        <span>{rotulo}</span>
        <span>{concluidos}/{total} · {percentual}%</span>
      </div>
      <div className="barra-progresso__trilho">
        <div className="barra-progresso__preenchimento" style={{ width: `${percentual}%` }} />
      </div>
    </div>
  );
>>>>>>> 03c5ff76da7e9520f9b7df2d228b0b3dbe4eaff2
}