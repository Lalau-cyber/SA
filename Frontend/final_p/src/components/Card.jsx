export default function Card({children, titulo}) {
    return (
        <div className="card">
            {titulo && <h3 className="card-titulo">{titulo}</h3>}
            {children}
        </div>
    );
}