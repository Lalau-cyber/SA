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

    );
}