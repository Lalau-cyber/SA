
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
}