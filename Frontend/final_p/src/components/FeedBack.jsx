export default function FeedbackBox({ correto, texto }) {
  return (
    <div className={`feedback ${correto ? "feedback--correto" : "feedback--incorreto"}`}>
      <span className="feedback__titulo">{correto ? "Você acertou" : "Vamos revisar"}</span>
      <p>{texto}</p>
    </div>
  );
}