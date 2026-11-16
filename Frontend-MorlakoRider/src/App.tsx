import { useMemo, useState } from 'react'
import { categories, products, type Category, type Product } from './data/products'

const WHATSAPP = 'https://wa.me/593984510834'

const faqs = [
  { q: '¿Hacen envíos fuera de Cuenca?', a: 'Sí. Confirmamos el costo de envío por WhatsApp según tu ciudad. (Texto de muestra.)' },
  { q: '¿Qué formas de pago aceptan?', a: 'Efectivo, transferencia y pago al recibir en Cuenca. (Texto de muestra.)' },
  { q: '¿Cómo sé qué talla de casco necesito?', a: 'Mide el contorno de tu cabeza a un dedo por encima de las cejas y compara con la tabla de tallas. (Texto de muestra.)' },
  { q: '¿Puedo cambiar un producto?', a: 'Sí, dentro de los primeros días si no lo has usado. (Texto de muestra.)' },
]

function App() {
  const [category, setCategory] = useState<Category>('Todos')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [broken, setBroken] = useState<Record<string, boolean>>({})

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<'destacados' | 'menor' | 'mayor'>('destacados')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = products.filter(
      (p) =>
        (category === 'Todos' || p.category === category) &&
        (q === '' || `${p.name} ${p.note} ${p.category}`.toLowerCase().includes(q)),
    )
    if (sort === 'menor') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'mayor') return [...list].sort((a, b) => b.price - a.price)
    return list
  }, [category, query, sort])

  // Ritmo del mosaico en una grilla de 4 columnas: (2,2) · (2,1,1) · (1,1,2)
  const spans = [2, 2, 2, 1, 1, 1, 1, 2]
  const showPromo = category === 'Todos' && query.trim() === '' && sort === 'destacados'
  const items: (Product | 'promo')[] = showPromo
    ? [...visible.slice(0, 7), 'promo', ...visible.slice(7)]
    : visible

  const lines = products.filter((p) => cart[p.id] > 0)
  const total = lines.reduce((sum, p) => sum + p.price * cart[p.id], 0)
  const count = Object.values(cart).reduce((a, b) => a + b, 0)

  const message = lines
    .map((p) => `${cart[p.id]} x ${p.name} ($${p.price * cart[p.id]})`)
    .join('%0A')
  const orderHref = lines.length
    ? `${WHATSAPP}?text=${encodeURIComponent('Hola, quiero pedir:')}%0A${message}%0ATotal: $${total}`
    : WHATSAPP

  const change = (id: string, delta: number) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + delta) }))

  return (
    <>
      <header className="bar">
        <a href="#inicio" className="brand" aria-label="Morlako Rider, inicio">
          <img src="/logo.png" alt="Morlako Rider" width="44" height="44" />
          <span>Morlako Rider</span>
        </a>
        <nav aria-label="Principal">
          <a href="#catalogo">Catálogo</a>
          <a href="#tallas">Tallas</a>
          <a href="#preguntas">Preguntas</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="btn btn-small" href={WHATSAPP}>WhatsApp</a>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-text">
            <h1>Cascos para trabajar en moto</h1>
            <p className="lead">
              Cascos y accesorios para repartidores, mensajeros y mototaxis en Cuenca. Eliges lo que necesitas, nos escribes
              y lo llevamos.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#catalogo">Ver catálogo</a>
              <a className="btn btn-ghost" href={WHATSAPP}>Preguntar por WhatsApp</a>
            </div>
          </div>
          <figure className="hero-photo">
            <img src="/img/cuenca-amanecer.jpg" alt="Calle empedrada del centro histórico de Cuenca al amanecer" />
            <figcaption>Centro histórico de Cuenca. Foto de Martín Vasco, CC BY-SA 4.0.</figcaption>
          </figure>
        </section>

        <section id="catalogo" className="catalog">
          <div className="section-head">
            <h2>Catálogo</h2>
            <p>Precios en dólares. Pides por WhatsApp o armas tu pedido aquí mismo.</p>
          </div>

          <div className="filters" role="group" aria-label="Filtrar por categoría">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={c === category ? 'chip chip-on' : 'chip'}
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="tools">
            <label className="field">
              <span>Buscar</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Casco, guantes, soporte…"
              />
            </label>
            <label className="field">
              <span>Ordenar</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
                <option value="destacados">Destacados</option>
                <option value="menor">Precio: menor a mayor</option>
                <option value="mayor">Precio: mayor a menor</option>
              </select>
            </label>
            <p className="count" aria-live="polite">
              {visible.length} {visible.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>

          {visible.length === 0 && (
            <p className="empty">
              No encontramos eso. <a href={WHATSAPP}>Pregúntanos por WhatsApp</a> y lo buscamos.
            </p>
          )}

          <div className="tiles">
            {items.map((item, i) => {
              const span = spans[i % spans.length]
              if (item === 'promo') {
                return (
                  <article key="promo" className={`tile tile-promo span-${span}`}>
                    <img src="/img/cuenca-noche.jpg" alt="Calle Larga de Cuenca de noche" loading="lazy" />
                    <div className="promo-text">
                      <h3>Llegamos a donde trabajas</h3>
                      <p>Entregas en Cuenca, de día y de noche.</p>
                    </div>
                  </article>
                )
              }
              const p = item
              return (
                <article key={p.id} className={`tile span-${span} reveal`}>
                  <div className="tile-media">
                    {p.image && !broken[p.id] ? (
                      <img
                        src={p.image}
                        alt={`${p.name}, vista de perfil`}
                        loading="lazy"
                        onError={() => setBroken((b) => ({ ...b, [p.id]: true }))}
                      />
                    ) : (
                      <span className="tile-empty">Foto próximamente</span>
                    )}
                  </div>
                  <div className="tile-info">
                    <div className="tile-text">
                      <h3>{p.name}</h3>
                      <p className="price">${p.price}</p>
                      <p className="note">{p.note}</p>
                    </div>
                    <div className="stepper" role="group" aria-label={`Cantidad de ${p.name}`}>
                      <button type="button" onClick={() => change(p.id, -1)} aria-label="Quitar uno">−</button>
                      <span aria-live="polite">{cart[p.id] ?? 0}</span>
                      <button type="button" onClick={() => change(p.id, 1)} aria-label="Agregar uno">+</button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <aside className="cart reveal" aria-label="Tu pedido">
            <h2>Tu pedido</h2>
            {lines.length === 0 ? (
              <p>Aún no has elegido nada. Usa + en un producto.</p>
            ) : (
              <ul>
                {lines.map((p) => (
                  <li key={p.id}>
                    <span>{cart[p.id]} × {p.name}</span>
                    <span>${p.price * cart[p.id]}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="cart-total">
              <span>Total ({count} {count === 1 ? 'producto' : 'productos'})</span>
              <strong>${total}</strong>
            </p>
            <a className="btn" href={orderHref}>Enviar pedido por WhatsApp</a>
          </aside>
        </section>

        <section id="tallas" className="sizes reveal">
          <h2>Cómo elegir tu casco</h2>
          <ol>
            <li>Mide el contorno de tu cabeza con una cinta, a un dedo por encima de las cejas.</li>
            <li>Compara con la tabla de tallas del modelo que te interesa.</li>
            <li>Si quedas entre dos tallas, escoge la menor y prueba con el forro puesto. (Texto de muestra.)</li>
          </ol>
          <figure className="sizes-photo reveal">
            <img src="/img/cuenca-rio.jpg" alt="Río Tomebamba visto desde el puente peatonal de Cuenca" loading="lazy" />
            <figcaption>Río Tomebamba, Cuenca. Foto de Ymblanter, CC BY-SA 4.0, vía Wikimedia Commons.</figcaption>
          </figure>
        </section>

        <section id="preguntas" className="faq reveal">
          <h2>Preguntas frecuentes</h2>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.q} className="reveal">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <figure className="faq-photo">
            <img src="/img/cuenca-valdivieso.jpg" alt="Edificio Valdivieso de Cuenca de noche bajo la lluvia" loading="lazy" />
            <figcaption>Edificio Valdivieso, Cuenca. Foto de Martín Vasco, CC BY-SA 4.0, vía Wikimedia Commons.</figcaption>
          </figure>
        </section>
      </main>

      <footer id="contacto" className="footer">
        <p className="wordmark" aria-hidden="true">MORLAKO RIDER</p>
        <div className="footer-row reveal">
          <div>
            <a href={WHATSAPP}>098 451 0834</a>
            <a href="https://instagram.com/morlakorider">@morlakorider</a>
          </div>
          <p className="credits">
            Fotos de Cuenca: Martín Vasco, Ymblanter (CC BY-SA 4.0) y Jen (CC BY-SA 3.0), vía Wikimedia Commons.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
