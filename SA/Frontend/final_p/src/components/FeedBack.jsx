<<<<<<< HEAD
export default function FeedbackBox({ correto, texto }) {
  return (
    <div className={`feedback ${correto ? "feedback--correto" : "feedback--incorreto"}`}>
      <span className="feedback__titulo">{correto ? "Você acertou" : "Vamos revisar"}</span>
      <p>{texto}</p>
    </div>
  );
=======
export default function FeedbackBox ({ texto, resultado}) {
    const acertou = resultado === 'correto';

    return (
        <div className={`feedback=box ${acertou? 'feedback-correto' : 'feedback-atencao'}`}>
            <strong>{acertou ? '✅ Correto!' : '⚠️ Precisa reforçar'}</strong>
            <p style={{marginTop: '6px'}}>{texto}</p>
        </div>
    );
>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
}