import { useMemo, useState } from "react";
import DiscoCard from "./DiscoCard";

function Catalogo({ discos, onAgregar }) {
  const [busqueda, setBusqueda] = useState("");
  const [genero, setGenero] = useState("Todos");
  const [orden, setOrden] = useState("destacados");

  const generos = ["Todos", ...new Set(discos.map((disco) => disco.genero))];

  const discosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    let resultado = discos.filter((disco) => {
      const coincideTexto =
        disco.titulo.toLowerCase().includes(texto) ||
        disco.artista.toLowerCase().includes(texto);

      const coincideGenero = genero === "Todos" || disco.genero === genero;

      return coincideTexto && coincideGenero;
    });

    if (orden === "menor") {
      resultado = [...resultado].sort((a, b) => a.precio - b.precio);
    }

    if (orden === "mayor") {
      resultado = [...resultado].sort((a, b) => b.precio - a.precio);
    }

    if (orden === "titulo") {
      resultado = [...resultado].sort((a, b) =>
        a.titulo.localeCompare(b.titulo),
      );
    }

    return resultado;
  }, [discos, busqueda, genero, orden]);

  return (
    <section className="catalogo" id="catalogo">
      <div className="catalogo-encabezado">
        <div>
          <p className="etiqueta">LA COLECCIÓN</p>
          <h2>Encuentra tu próximo disco</h2>
          <p>Clásicos, nuevas propuestas y joyas musicales.</p>
        </div>

        <span className="contador-resultado">
          {discosFiltrados.length} discos
        </span>
      </div>

      <div className="filtros">
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar álbum o artista..."
          aria-label="Buscar álbum o artista"
        />

        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          aria-label="Filtrar por género"
        >
          {/* CORREGIDO: Se agregó el "return" explícito */}
          {generos.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          aria-label="Ordenar discos"
        >
          <option value="destacados">Destacados</option>
          <option value="menor">Precio: menor a mayor</option>
          <option value="mayor">Precio: mayor a menor</option>
          <option value="titulo">De Título: A-Z</option>
        </select>
      </div>

      {discosFiltrados.length === 0 ? (
        <div className="sin-resultado">
          <span>🔍</span>
          <h3>No encontramos discos</h3>
          <p>Prueba con otro artista o género musical</p>
        </div>
      ) : (
        <div className="disco-grid">
          {discosFiltrados.map((disco) => (
            // CORREGIDO: Se cambió "discos={disco}" por "disco={disco}"
            <DiscoCard key={disco.id} disco={disco} onAgregar={onAgregar} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Catalogo;