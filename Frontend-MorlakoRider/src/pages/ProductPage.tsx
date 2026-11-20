import { useState } from 'react'
import { Arrow, ProductImage } from '../components/Photo'
import { money, wa } from '../constants'
import { CATEGORIES, canBuy, type Product } from '../data/products'
import { addToCart, MAX_QTY } from '../lib/cart'

/** /producto/:slug: foto, precio, talla, cantidad y "Agregar al carrito". */
function ProductPage({ product: p }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [error, setError] = useState(false)
  const [added, setAdded] = useState(false)
  const cat = CATEGORIES.find((c) => c.id === p.category)!

  const add = () => {
    if (!size) {
      setError(true)
      return
    }
    addToCart(p.slug, size, qty)
    setAdded(true)
  }

  return (
    <main id="top" className="shop">
      <div className="page">
        <div className="wrap">
          <nav className="crumbs" aria-label="Ruta">
            <a href="/">Inicio</a><span aria-hidden="true">/</span>
            <a href={`/tienda/?cat=${p.category}`}>{cat.label}</a><span aria-hidden="true">/</span>
            <span>{p.name}</span>
          </nav>

          <div className="pdp">
            <div className="pdp__media" style={{ background: p.bg, aspectRatio: `${p.dims[0]} / ${p.dims[1]}` }}>
              <ProductImage product={p} eager sizes="(max-width: 1023px) 100vw, 640px" />
            </div>

            <div className="pdp__info">
              <h1>{p.name}</h1>
              <p className="pdp__price" data-pending={!canBuy(p) || undefined}>{canBuy(p) ? money(p.price) : 'Precio por confirmar'}</p>
              <p className="pdp__desc">{p.description}</p>

              <fieldset className="sizes" aria-describedby={error ? 'size-error' : undefined}>
                <legend>Talla</legend>
                <div className="sizes__list">
                  {p.sizes.map((s) => (
                    <label className="size" key={s}>
                      <input
                        type="radio"
                        name="size"
                        value={s}
                        checked={size === s}
                        onChange={() => {
                          setSize(s)
                          setError(false)
                          setAdded(false)
                        }}
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
                {error && <p className="field__error" id="size-error" role="alert">Elige una talla para continuar.</p>}
              </fieldset>

              {canBuy(p) ? (
              <div className="pdp__buy">
                <div className="qty" aria-label="Cantidad">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Quitar uno" disabled={qty <= 1}>−</button>
                  <output aria-live="polite">{qty}</output>
                  <button type="button" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} aria-label="Agregar uno" disabled={qty >= MAX_QTY}>+</button>
                </div>
                <button className="btn btn--primary pdp__add" type="button" onClick={add}>
                  Agregar al carrito<Arrow />
                </button>
              </div>
              ) : (
              <div className="pdp__buy">
                <a className="btn btn--primary pdp__add" href={wa(`Hola, quiero saber el precio del ${p.name}${size ? `, talla ${size}` : ''}.`)} target="_blank" rel="noopener">
                  Consultar el precio<Arrow />
                </a>
              </div>
              )}

              {added && (
                <p className="pdp__added" role="status">
                  Agregado al carrito: {p.name}, talla {size}. <a className="link" href="/carrito/">Ver el carrito</a>
                </p>
              )}

              <ul className="rows rows--spec pdp__specs">
                {p.specs.map(([k, v]) => (
                  <li key={k}><span className="rows__name">{k}</span><span className="rows__value">{v}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductPage
