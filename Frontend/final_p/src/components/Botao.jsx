export default  function Botao({children, variante = "primario", onClick, tipo = "button", disabilitado = false}){
    return (
    <button
        type={tipo}
        onClick={onClick}
        disabled={disabilitado}
        className={`botao botao--${variante}`}
    >
        {children}
    </button>
    );
}