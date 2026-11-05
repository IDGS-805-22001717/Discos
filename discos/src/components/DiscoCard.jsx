function DiscoCard({ disco, onAgregar }) {
  if (!disco) return null;
  const precio = (disco.precio ?? 0).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  return (
    <article className="disco-card">
      <div className="discoportada" style={{ backgroundColor: disco.color }}>
        <span className="disco-emoji">{disco.emoji}</span>

        <span className="disco-anio">{disco.anio}</span>
      </div>

      <div className="disco-info">
        <span className="disco-genero">{disco.genero}</span>
        <h3>{disco.titulo}</h3>
        <p className="disco-artista">{disco.artista}</p>
        <p className="disco-descripcion">{disco.descripcion}</p>
        <div className="disco-pie">
          <strong>{precio}</strong>
          <button className="boton-agregar" onClick={() => onAgregar(disco)}>
            + Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

export default DiscoCard;
