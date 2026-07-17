<<<<<<< HEAD
export default function Botao({children, onClick, type = "button", variante = 'primary', disabled = false}) {
    const classeVariante = variante ==='primary' ? 'btn-primary' : 'btn-secondary';
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`btn ${classeVariante}`}>
            {children}
        </button>
=======
export default  function Botao({children, variante = "primario", onClick, tipo = "button", desabilitado = false}){
    return (
    <button
        type={tipo}
        onClick={onClick}
        disabled={desabilitado}
        className={`botao botao--${variante}`}
    >
        {children}
    </button>

>>>>>>> 42f5151dac8e2923ee4297590c814b9ca5bc0d6e
    );
}