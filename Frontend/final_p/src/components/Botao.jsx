export default function Botao({children, onClick, type = "button", variante = 'primary'}) {
    const classeVariante = variante ==='primary' ? 'btn-primary' : 'btn-secondary';
    return (
        <button type={type} onClick={onClick}  className={`btn ${classeVariante}`}>
            {children}
        </button>
    );
}