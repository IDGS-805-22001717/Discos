function Encabezado({cantidadTotal, onAbrirCarrito}){
    return(
        <header className="encabezado">
            <a className="marca" href="#inicio">
                <span className="marca-icono">💿</span>
                <span>
                    Vinilo <span className="marca-acento">Verse</span>
                </span>
            </a>

            <nav className="navegacion">
                <a href="#inicio">Inicio</a>
                <a href="#catalogo">Catalogo</a>
                <a href="#nosotros">Nosotros</a>
            </nav>

            <button className="boton-carrito" onClick={onAbrirCarrito}>
                <span>🛒</span>
                <span>Mi carrito</span>
                <span className="carrito-badge">
                    {cantidadTotal}
                </span>
            </button>


        </header>
    )
}

export default Encabezado;