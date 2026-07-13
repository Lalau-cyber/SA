export default function Loading ({ texto = "Carregando..."}) {
    return (
        <div className="loading-wrapper">
            <div className="loading-spinner">
                <p className="loading-texto"> {texto} </p>
            </div>
        </div>
    );
}