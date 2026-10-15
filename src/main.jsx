import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const pasosIniciales = [
  { id: 1, texto: 'Máquina virtual creada en OCI', listo: true },
  { id: 2, texto: 'Docker instalado en Ubuntu', listo: true },
  { id: 3, texto: 'Aplicación React contenerizada', listo: true },
  { id: 4, texto: 'Puerto 80 publicado', listo: true },
]

function App() {
  const [contador, setContador] = useState(0)
  const [pasos, setPasos] = useState(pasosIniciales)
  const completados = useMemo(
    () => pasos.filter((paso) => paso.listo).length,
    [pasos],
  )

  const alternarPaso = (id) => {
    setPasos((actuales) =>
      actuales.map((paso) =>
        paso.id === id ? { ...paso, listo: !paso.listo } : paso,
      ),
    )
  }

  return (
    <main className="pagina">
      <nav className="navegacion" aria-label="Navegación principal">
        <a className="marca" href="#inicio">
          <span className="marca-icono">R</span>
          <span>Cloud Lab</span>
        </a>
        <div className="enlaces">
          <a href="#arquitectura">Arquitectura</a>
          <a href="#demo">Demo</a>
        </div>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-texto">
          <p className="etiqueta">PROYECTO SISTEMAS III</p>
          <h1>React desplegado con <span>Docker</span> en OCI</h1>
          <p className="descripcion">
            Una aplicación web compilada en Node, servida por Nginx y ejecutada
            dentro de una máquina virtual de Oracle Cloud Infrastructure.
          </p>
          <a className="boton" href="#arquitectura">Ver despliegue</a>
        </div>

        <div className="terminal" aria-label="Estado del despliegue">
          <div className="terminal-barra"><i></i><i></i><i></i></div>
          <pre><code><b>$</b> docker ps{`\n\n`}<span>STATUS</span>  Up and running{`\n`}<span>PORTS</span>   0.0.0.0:80-&gt;80/tcp{`\n\n`}<em>✓ Despliegue completado</em></code></pre>
        </div>
      </section>

      <section className="seccion" id="arquitectura">
        <p className="etiqueta">ARQUITECTURA</p>
        <h2>Del código hasta la nube</h2>
        <div className="flujo">
          {['React + Vite', 'Imagen Docker', 'VM en OCI', 'Navegador'].map((item, indice) => (
            <React.Fragment key={item}>
              <article>
                <span>{String(indice + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
              </article>
              {indice < 3 && <b className="flecha">→</b>}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="seccion demo" id="demo">
        <div>
          <p className="etiqueta">REACT EN ACCIÓN</p>
          <h2>Interfaz interactiva</h2>
          <p className="texto-secundario">
            Estos controles utilizan estado de React y funcionan sin recargar la página.
          </p>
          <div className="contador">
            <button onClick={() => setContador((valor) => valor - 1)} aria-label="Restar">−</button>
            <output>{contador}</output>
            <button onClick={() => setContador((valor) => valor + 1)} aria-label="Sumar">+</button>
          </div>
        </div>

        <article className="lista">
          <header>
            <span>Progreso del despliegue</span>
            <strong>{completados}/{pasos.length}</strong>
          </header>
          {pasos.map((paso) => (
            <button key={paso.id} onClick={() => alternarPaso(paso.id)}>
              <span className={paso.listo ? 'check activo' : 'check'}>
                {paso.listo ? '✓' : ''}
              </span>
              <span>{paso.texto}</span>
            </button>
          ))}
        </article>
      </section>

      <footer>
        <span>React + Docker + OCI</span>
        <span>Práctica de despliegue · 2026</span>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
