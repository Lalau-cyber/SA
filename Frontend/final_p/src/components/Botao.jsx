<<<<<<< HEAD
export default function Botao({children, onClick, type = "button", variante = 'primary'}) {
    const classeVariante = variante ==='primary' ? 'btn-primary' : 'btn-secondary';
    return (
        <button type={type} onClick={onClick}  className={`btn ${classeVariante}`}>
            {children}
        </button>
=======
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
>>>>>>> 03c5ff76da7e9520f9b7df2d228b0b3dbe4eaff2
    );
}