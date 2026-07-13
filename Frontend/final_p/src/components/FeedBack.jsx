export default function FeedbackBox ({ texto, resultyado}) {
    const acertou = resultado === 'correto';

    return (
        <div className={`feedback=box ${acerou? 'feedback-correto' : 'feedback-atencao'}`}>
            <strong>{acertou ? '✅ Correto!' : '⚠️ Precisa reforçar'}</strong>
            <p style={{marginTop: '6px'}}>{texto}</p>
        </div>
    );
}