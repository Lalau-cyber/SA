export default function FeedbackBox ({ texto, resultado}) {
    const acertou = resultado === 'correto';

    return (
        <div className={`feedback=box ${acertou? 'feedback-correto' : 'feedback-atencao'}`}>
            <strong>{acertou ? '✅ Correto!' : '⚠️ Precisa reforçar'}</strong>
            <p style={{marginTop: '6px'}}>{texto}</p>
        </div>
    );
}