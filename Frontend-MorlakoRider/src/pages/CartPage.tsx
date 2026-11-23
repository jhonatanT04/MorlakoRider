import { Arrow, ProductImage } from '../components/Photo'
import { money } from '../constants'
import { findProduct } from '../data/products'
import { cartTotal, MAX_QTY, removeLine, setQty, useCart } from '../lib/cart'

function CartPage() {
  const lines = useCart()
  const total = cartTotal(lines)

  return (
    <main id="top" className="shop">
      <div className="page">
        <div className="wrap">
          <div className="page__head">
            <h1>Tu carrito</h1>
          </div>

          {lines.length === 0 ? (
            <div className="empty">
              <p>Tu carrito está vacío.</p>
              <a className="btn btn--primary" href="/tienda/">Ir a la tienda<Arrow /></a>
            </div>
          ) : (
            <div className="cart">
              <ul className="cart__lines">
                {lines.map((l) => {
                  const p = findProduct(l.slug)!
                  return (
                    <li className="cart-line" key={l.slug + l.size}>
                      <a className="cart-line__media" href={`/producto/${p.slug}/`} style={{ background: p.bg }}>
                        <ProductImage product={p} sizes="120px" />
                      </a>
                      <div className="cart-line__info">
                        <h2><a href={`/producto/${p.slug}/`}>{p.name}</a></h2>
                        <p>Talla {l.size} · {money(p.price ?? 0)} c/u</p>
                        <button className="cart-line__remove" type="button" onClick={() => removeLine(l.slug, l.size)}>Quitar</button>
                      </div>
                      <div className="qty" aria-label={`Cantidad de ${p.name}`}>
                        <button type="button" onClick={() => setQty(l.slug, l.size, l.qty - 1)} aria-label="Quitar uno" disabled={l.qty <= 1}>−</button>
                        <output>{l.qty}</output>
                        <button type="button" onClick={() => setQty(l.slug, l.size, l.qty + 1)} aria-label="Agregar uno" disabled={l.qty >= MAX_QTY}>+</button>
                      </div>
                      <p className="cart-line__total">{money((p.price ?? 0) * l.qty)}</p>
                    </li>
                  )
                })}
              </ul>

              <aside className="summary" aria-label="Resumen">
                <h2>Resumen</h2>
                <dl>
                  <div><dt>Subtotal</dt><dd>{money(total)}</dd></div>
                  <div><dt>Envío</dt><dd>Se confirma según tu ciudad</dd></div>
                  <div className="summary__total"><dt>Total productos</dt><dd>{money(total)}</dd></div>
                </dl>
                <a className="btn btn--primary summary__btn" href="/checkout/">Continuar al pago<Arrow /></a>
                <a className="link" href="/tienda/">Seguir comprando</a>
              </aside>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default CartPage
