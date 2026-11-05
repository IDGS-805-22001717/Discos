import { useState } from "react";

import Encabezado from "./components/encabezados";
import Catalogo from "./components/catalogo";
import Carrito from "./components/carrito";
import MonitorCiclo from "./components/MonitorCiclo";

import { useDiscos } from "./hooks/usediscos";
import { useCarrito } from "./hooks/useCarrito";

import "./App.css";

function App() {
  const [carritoAbierto, setCarritoAbierto] = 
    useState(false);

  const {
    discos,
    cargando,
    error
  } = useDiscos();

  const {
    carrito,
    agregarDisco,
    incrementar,
    decrementar,
    eliminarDisco,
    vaciarCarrito,
    cantidadTotal,
    subtotal
  } = useCarrito();

  return (
    <div className="app">
      <Encabezado
        cantidadTotal={cantidadTotal}
        onAbrirCarrito={() => setCarritoAbierto(true)}
      />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-contenido">
            <span className="hero-etiqueta">
              ★ PARA QUIENES VIVEN LA MÚSICA
            </span>

            <h1>
              El sonido de tu
              <br />
              <span>propia colección</span>
            </h1>

            <p>
              Descubre tus discos que cuentan historias.
              Desde clásicos inmortales hasta sonidos
              que están definiendo una generación.
            </p>

            <a className="boton-principal" href="#catalogo">
              Explorar discos
            </a>

            <div className="hero-datos">
              <div>
                <strong>Vinilos</strong>
                <span>Para escuchar sin prisa</span>
              </div>
              
              <div>
                <strong>Tu música</strong>
                <span>Tu propia colección</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-disco">
              <div className="hero-disco-centro">
                <span>W</span>
              </div>
            </div>

            <span className="hero-nota nota-uno">♫</span>
            <span className="hero-nota nota-dos">♪</span>

            <div className="hero-sello">
              SOUND
              <br />
              MATTERS
            </div>
          </div>
        </section>

        {cargando ? (
          <section className="estado-carga">
            <div className="spinner" />
            <h2>Preparando la colección...</h2>
            <p>Estamos organizando tus discos favoritos.</p>
          </section>
        ) : error ? (
          <section className="estado-carga">
            <h2>No pudimos cargar el catálogo</h2>
            <p>{error}</p>
          </section>
        ) : (
          <Catalogo
            discos={discos}
            onAgregar={agregarDisco}
          />
        )}

        <section className="nosotros" id="nosotros">
          <span className="etiqueta">MÁS QUE MÚSICA</span>
          <h2> Cada disco tiene una historia.</h2>
          <p>
            ViniloVerse es un proyecto educativo que
            celebra la música, la colección de álbumes
            y la experiencia de descubrir nuevos sonidos.
          </p>
        </section>
        <MonitorCiclo />
      </main>

      <footer className="footer">
        <span>© 2026 ViniloVerse - Proyecto educativo</span>
        <span>Hecho para amantes de la música ♫</span>
      </footer>

      <Carrito
        abierto={carritoAbierto}
        onCerrar={() => setCarritoAbierto(false)}
        carrito={carrito}
        incrementar={incrementar}
        decrementar={decrementar}
        eliminarDisco={eliminarDisco}
        vaciarCarrito={vaciarCarrito}
        subtotal={subtotal}
      />
    </div>
  );
}

export default App;