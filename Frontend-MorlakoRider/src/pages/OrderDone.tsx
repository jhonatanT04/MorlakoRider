import { useEffect, useState } from 'react'
import { Arrow } from '../components/Photo'
import { BANK, ORDER_EMAIL, money } from '../constants'
import { findProduct } from '../data/products'
import { lastOrder, type Order } from '../lib/orders'

function OrderDone() {
  const [order, setOrder] = useState<Order | null | undefined>(undefined)
  useEffect(() => {
    const n = new URLSearchParams(location.search).get('n')
    const o = lastOrder()
    setOrder(o && (!n || o.number === n) ? o : null)
  }, [])

  return (
    <main id="top" className="shop">
      <div className="page">
        <div className="wrap">
          {order === undefined ? (
            <div className="page__head"><h1>Tu pedido</h1></div>
          ) : order === null ? (
            <div className="empty">
              <div className="page__head"><h1>No encontramos el pedido</h1></div>
              <a className="btn btn--primary" href="/tienda/">Ir a la tienda<Arrow /></a>
            </div>
          ) : (
            <div className="done">
              <div className="page__head">
                <p className="done__kicker">Pedido {order.number}</p>
                <h1>Gracias, {order.customer.name.split(' ')[0]}</h1>
                <p>
                  Recibimos tu pedido. Te escribimos a {order.customer.email} para confirmar el envío a {order.customer.city}.
                </p>
              </div>

              {order.payment === 'transferencia' ? (
                <section className="done__block" aria-labelledby="bank-h">
                  <h2 id="bank-h">Datos para la transferencia</h2>
                  <dl className="bank">
                    <div><dt>Banco</dt><dd>{BANK.bank}</dd></div>
                    <div><dt>Tipo de cuenta</dt><dd>{BANK.type}</dd></div>
                    <div><dt>Número de cuenta</dt><dd>{BANK.number}</dd></div>
                    <div><dt>Titular</dt><dd>{BANK.holder}</dd></div>
                    <div><dt>Cédula o RUC</dt><dd>{BANK.id}</dd></div>
                    <div><dt>Valor</dt><dd>{money(order.subtotal)}</dd></div>
                  </dl>
                  <p>Envía el comprobante a <a className="link" href={`mailto:${ORDER_EMAIL}?subject=${encodeURIComponent('Comprobante ' + order.number)}`}>{ORDER_EMAIL}</a> con el número de pedido {order.number}.</p>
                </section>
              ) : (
                <section className="done__block" aria-labelledby="card-h">
                  <h2 id="card-h">Pago con tarjeta</h2>
                  <p>El pago con tarjeta se confirma en la pasarela de pago. Te avisamos por correo cuando esté aprobado.</p>
                </section>
              )}

              <section className="done__block" aria-labelledby="sum-h">
                <h2 id="sum-h">Resumen</h2>
                <ul className="summary__lines">
                  {order.lines.map((l) => {
                    const p = findProduct(l.slug)
                    return (
                      <li key={l.slug + l.size}>
                        <span>{p?.name ?? l.slug} · {l.size} × {l.qty}</span>
                        <span>{money((p?.price ?? 0) * l.qty)}</span>
                      </li>
                    )
                  })}
                </ul>
                <p className="summary__total-line"><span>Total productos</span><span>{money(order.subtotal)}</span></p>
              </section>

              <a className="btn btn--primary" href="/tienda/">Seguir comprando<Arrow /></a>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default OrderDone
