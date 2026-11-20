import { useState, type FormEvent } from 'react'
import { Arrow } from '../components/Photo'
import { money } from '../constants'
import { findProduct } from '../data/products'
import { cartTotal, clearCart, useCart } from '../lib/cart'
import { createOrder, startCardPayment, type Customer, type PaymentMethod } from '../lib/orders'

const EMPTY: Customer = { name: '', email: '', phone: '', idNumber: '', city: 'Cuenca', address: '', notes: '' }

type Errors = Partial<Record<keyof Customer, string>>

function validate(c: Customer): Errors {
  const e: Errors = {}
  if (c.name.trim().length < 3) e.name = 'Escribe tu nombre y apellido.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim())) e.email = 'Escribe un correo válido, por ejemplo nombre@correo.com.'
  if (c.phone.replace(/\D/g, '').length < 9) e.phone = 'Escribe un número de celular de 10 dígitos.'
  if (!/^\d{10}(\d{3})?$/.test(c.idNumber.trim())) e.idNumber = 'Escribe tu cédula (10 dígitos) o RUC (13 dígitos).'
  if (c.city.trim().length < 3) e.city = 'Escribe tu ciudad.'
  if (c.address.trim().length < 8) e.address = 'Escribe la dirección de entrega con calles y una referencia.'
  return e
}

/** /checkout: datos de entrega, método de pago y confirmación del pedido. */
function Checkout() {
  const lines = useCart()
  const total = cartTotal(lines)
  const [c, setC] = useState<Customer>(EMPTY)
  const [payment, setPayment] = useState<PaymentMethod>('tarjeta')
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)

  const set = (k: keyof Customer) => (e: { target: { value: string } }) => {
    setC((prev) => ({ ...prev, [k]: e.target.value }))
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(c)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    setSending(true)
    const order = await createOrder(lines, c, payment)
    const next = payment === 'tarjeta' ? await startCardPayment(order) : `/pedido/?n=${encodeURIComponent(order.number)}`
    clearCart()
    location.href = next
  }

  const field = (k: keyof Customer, label: string, props: Record<string, unknown> = {}, full = false) => (
    <label className={'field' + (full ? ' field--full' : '')}>
      {label}
      <input
        id={`f-${k}`}
        value={c[k]}
        onChange={set(k)}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        {...props}
      />
      {errors[k] && <span className="field__error" id={`e-${k}`}>{errors[k]}</span>}
    </label>
  )

  return (
    <main id="top" className="shop">
      <div className="page">
        <div className="wrap">
          <nav className="crumbs" aria-label="Ruta"><a href="/carrito/">Carrito</a><span aria-hidden="true">/</span><span>Pago</span></nav>
          <div className="page__head">
            <h1>Finalizar compra</h1>
          </div>

          {lines.length === 0 ? (
            <div className="empty">
              <p>No hay productos en tu carrito.</p>
              <a className="btn btn--primary" href="/tienda/">Ir a la tienda<Arrow /></a>
            </div>
          ) : (
            <div className="cart">
              <form className="checkout" onSubmit={submit} noValidate>
                <fieldset className="checkout__block">
                  <legend>Datos de entrega</legend>
                  <div className="form">
                    {field('name', 'Nombre y apellido', { autoComplete: 'name' }, true)}
                    {field('email', 'Correo', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
                    {field('phone', 'Celular', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
                    {field('idNumber', 'Cédula o RUC', { inputMode: 'numeric', autoComplete: 'off' })}
                    {field('city', 'Ciudad', { autoComplete: 'address-level2' })}
                    {field('address', 'Dirección de entrega', { autoComplete: 'street-address', placeholder: 'Calle principal, secundaria y una referencia' }, true)}
                    <label className="field field--full">
                      Notas para la entrega (opcional)
                      <textarea id="f-notes" value={c.notes} onChange={set('notes')} rows={3} />
                    </label>
                  </div>
                </fieldset>

                <fieldset className="checkout__block">
                  <legend>Método de pago</legend>
                  <div className="pay">
                    <label className="pay__option">
                      <input type="radio" name="payment" value="tarjeta" checked={payment === 'tarjeta'} onChange={() => setPayment('tarjeta')} />
                      <span className="pay__body">
                        <strong>Tarjeta de crédito o débito</strong>
                        <span>Pagas en la página segura de la pasarela de pago. Tus datos de tarjeta no pasan por esta tienda.</span>
                      </span>
                    </label>
                    <label className="pay__option">
                      <input type="radio" name="payment" value="transferencia" checked={payment === 'transferencia'} onChange={() => setPayment('transferencia')} />
                      <span className="pay__body">
                        <strong>Transferencia bancaria</strong>
                        <span>Al confirmar ves los datos de la cuenta. Enviamos tu pedido cuando recibimos la transferencia.</span>
                      </span>
                    </label>
                  </div>
                </fieldset>

                <button className="btn btn--primary checkout__submit" type="submit" disabled={sending}>
                  {sending ? 'Procesando…' : payment === 'tarjeta' ? `Pagar ${money(total)} con tarjeta` : 'Confirmar pedido'}
                  {!sending && <Arrow />}
                </button>
              </form>

              <aside className="summary" aria-label="Tu pedido">
                <h2>Tu pedido</h2>
                <ul className="summary__lines">
                  {lines.map((l) => {
                    const p = findProduct(l.slug)!
                    return (
                      <li key={l.slug + l.size}>
                        <span>{p.name} · {l.size} × {l.qty}</span>
                        <span>{money((p.price ?? 0) * l.qty)}</span>
                      </li>
                    )
                  })}
                </ul>
                <dl>
                  <div><dt>Envío</dt><dd>Se confirma por correo</dd></div>
                  <div className="summary__total"><dt>Total productos</dt><dd>{money(total)}</dd></div>
                </dl>
              </aside>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Checkout
