import { useEffect, useState } from 'react'
import { ProductImage } from '../components/Photo'
import { money } from '../constants'
import { CATEGORIES, PRODUCTS, type Category } from '../data/products'

type Filter = Category | 'todos'

/** /tienda: todos los productos, con filtro por categoría (?cat=cascos). */
function Shop() {
  // el filtro se lee de la URL después de montar, así el HTML prerenderizado (todos) hidrata igual
  const [cat, setCat] = useState<Filter>('todos')
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('cat')
    if (q && CATEGORIES.some((c) => c.id === q)) setCat(q as Category)
  }, [])

  const choose = (c: Filter) => {
    setCat(c)
    const url = c === 'todos' ? '/tienda/' : `/tienda/?cat=${c}`
    history.replaceState(null, '', url)
  }

  const list = cat === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)
  const title = cat === 'todos' ? 'Tienda' : CATEGORIES.find((c) => c.id === cat)!.label

  return (
    <main id="top" className="shop">
      <div className="page">
        <div className="wrap">
          <nav className="crumbs" aria-label="Ruta"><a href="/">Inicio</a><span aria-hidden="true">/</span><span>Tienda</span></nav>
          <div className="page__head">
            <h1>{title}</h1>
            <p>Cascos, chaquetas y guantes para moto. Elige tu talla, paga con tarjeta o transferencia y recíbelo en Cuenca.</p>
          </div>

          <div className="chips" role="group" aria-label="Categorías">
            {[{ id: 'todos' as Filter, label: 'Todos' }, ...CATEGORIES].map((c) => (
              <button
                key={c.id}
                type="button"
                className="chip"
                aria-pressed={cat === c.id}
                onClick={() => choose(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <p className="shop__count">{list.length} {list.length === 1 ? 'producto' : 'productos'}</p>

          <ul className="products">
            {list.map((p) => (
              <li key={p.slug}>
                <a className="product-card" href={`/producto/${p.slug}/`}>
                  <div className="product-card__media" style={{ background: p.bg }}>
                    <ProductImage product={p} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 420px" />
                  </div>
                  <div className="product-card__body">
                    <h2>{p.name}</h2>
                    <p>{p.short}</p>
                    <p className="product-card__price" data-pending={p.price == null || undefined}>{p.price != null ? money(p.price) : 'Precio por confirmar'}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Shop
