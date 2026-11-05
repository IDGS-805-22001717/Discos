function moneda(valor) {
    return valor.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN"
    });
}

function Carrito({
    abierto,
    onCerrar,
    carrito,
    incrementar,
    decrementar,
    eliminarDisco,
    vaciarCarrito,
    subtotal
}) {
    if (!abierto) return null;

    return (
        <div className="carrito-overlay" onClick={onCerrar}>
            <aside className="carrito-panel" onClick={e => e.stopPropagation()}>
                <div className="carrito-encabezado">
                    <div>
                        <p className="etiqueta">TU COLECCION</p>
                        <h2>Mi carrito</h2>
                    </div>
                    <button className="boton-cerrar" onClick={onCerrar} aria-label="Cerrar carrito">
                        X
                    </button>
                </div>

                {carrito.length === 0 ? (
                    <div className="carrito-vacio">
                        <span></span>
                        <h3>Tu carrito esta vacio</h3>
                        <p>Agrega tus discos favoritos para comenzar</p>
                        <button className="boton-principal" onClick={onCerrar}>
                            Explorar catalogo
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="carrito-items">
                            {carrito.map(item => (
                                <article className="carrito-item" key={item.id}>
                                    <div className="carrito-portada" style={{ backgroundColor: item.color }}>
                                        {item.emoji}
                                    </div>

                                    <div className="carrito-item-info">
                                        <h3>{item.titulo}</h3>
                                        <p>{item.artista}</p>
                                        <strong>{moneda(item.precio)}</strong>
                                    </div>

                                    <div className="cantidad-control">
                                        <button onClick={() => decrementar(item.id)} aria-label={`Disminuir ${item.titulo}`}>
                                            -
                                        </button>
                                        <span>{item.cantidad}</span>
                                        <button onClick={() => incrementar(item.id)} aria-label={`Aumentar ${item.titulo}`}>
                                            +
                                        </button>
                                    </div>

                                    <button className="boton-eliminar" onClick={() => eliminarDisco(item.id)}>
                                        Eliminar
                                    </button>

                                    <strong className="importe-item">
                                        {moneda(item.precio * item.cantidad)}
                                    </strong>
                                </article>
                            ))}
                        </div>

                        <div className="carrito-resumen">
                            <div className="resumen-linea">
                                <span>Subtotal</span>
                                <strong>{moneda(subtotal)}</strong>
                            </div>

                            <button
                                className="boton-principal"
                                onClick={() =>
                                    window.alert("Demo educativa: aqui se integraria el proceso de pago.")
                                }
                            >
                                Continuar Compra
                            </button>

                            <button className="boton-vaciar" onClick={vaciarCarrito}>
                                Vaciar Carrito
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}

export default Carrito;