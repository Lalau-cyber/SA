<<<<<<< HEAD
export default function Loading ({ texto = "Carregando..."}) {
    return (
        <div className="loading-wrapper">
            <div className="loading-spinner">
                <p className="loading-texto"> {texto} </p>
            </div>
        </div>
    );
=======
export default function Loading() {
    return(
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando...</p>
        </div>
    )
>>>>>>> 03c5ff76da7e9520f9b7df2d228b0b3dbe4eaff2
}