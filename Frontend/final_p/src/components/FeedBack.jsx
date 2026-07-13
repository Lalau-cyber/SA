<<<<<<< HEAD
export default function FeedbackBox ({ texto, resultyado}) {
    const acertou = resultado === 'correto';

    return (
        <div className={`feedback=box ${acerou? 'feedback-correto' : 'feedback-atencao'}`}>
            <strong>{acertou ? '✅ Correto!' : '⚠️ Precisa reforçar'}</strong>
            <p style={{marginTop: '6px'}}>{texto}</p>
        </div>
    );
=======
export default function FeedbackBox({ correto, texto }) {
  return (
    <div className={`feedback ${correto ? "feedback--correto" : "feedback--incorreto"}`}>
      <span className="feedback__titulo">{correto ? "Você acertou" : "Vamos revisar"}</span>
      <p>{texto}</p>
    </div>
  );
>>>>>>> 03c5ff76da7e9520f9b7df2d228b0b3dbe4eaff2
}