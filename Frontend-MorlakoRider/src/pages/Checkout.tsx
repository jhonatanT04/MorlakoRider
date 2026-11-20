import { useState, type FormEvent } from 'react'
import { Arrow } from '../components/Photo'
import { BANK, money } from '../constants'
import { findProduct } from '../data/products'
import { cartTotal, clearCart, useCart } from '../lib/cart'
import { createOrder, startCardPayment, transferWhatsApp, type Customer, type PaymentMethod, type Transfer } from '../lib/orders'

const EMPTY: Customer = { name: '', email: '', phone: '', idNumber: '', city: 'Cuenca', address: '', notes: '' }

const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
const EMPTY_TRANSFER: Transfer = { bank: '', holder: '', reference: '', date: '' }

type Errors = Partial<Record<keyof Customer, string>>
type TransferErrors = Partial<Record<keyof Transfer, string>>

function validateTransfer(t: Transfer): TransferErrors {
  const e: TransferErrors = {}
  if (t.bank.trim().length < 3) e.bank = 'Escribe el banco desde el que transferiste.'
  if (t.holder.trim().length < 3) e.holder = 'Escribe el nombre del titular de la cuenta.'
  if (t.reference.trim().length < 4) e.reference = 'Escribe el número de comprobante de la transferencia.'
  if (!t.date) e.date = 'Elige la fecha de la transferencia.'
  return e
}

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
  const [t, setT] = useState<Transfer>(EMPTY_TRANSFER)
  const [tErrors, setTErrors] = useState<TransferErrors>({})
  const [sending, setSending] = useState(false)

  const set = (k: keyof Customer) => (e: { target: { value: string } }) => {
    setC((prev) => ({ ...prev, [k]: e.target.value }))
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const setTransfer = (k: keyof Transfer) => (e: { target: { value: string } }) => {
    setT((prev) => ({ ...prev, [k]: e.target.value }))
    if (tErrors[k]) setTErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const choose = (p: PaymentMethod) => {
    setPayment(p)
    if (p === 'transferencia' && !t.date) setT((prev) => ({ ...prev, date: today() }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(c)
    const tErrs = payment === 'transferencia' ? validateTransfer(t) : {}
    setErrors(errs)
    setTErrors(tErrs)
    const first = Object.keys(errs)[0] ?? Object.keys(tErrs)[0]
    if (first) {
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    setSending(true)
    const order = await createOrder(lines, c, payment, payment === 'transferencia' ? t : undefined)
    // transferencia: el pedido y los datos de la transferencia van directo al WhatsApp de la tienda
    const next = payment === 'tarjeta' ? await startCardPayment(order) : transferWhatsApp(order)
    clearCart()
    location.href = next
  }

  const tField = (k: keyof Transfer, label: string, props: Record<string, unknown> = {}) => (
    <label className="field">
      {label}
      <input
        id={`f-${k}`}
        value={t[k]}
        onChange={setTransfer(k)}
        aria-invalid={tErrors[k] ? true : undefined}
        aria-describedby={tErrors[k] ? `e-${k}` : undefined}
        {...props}
      />
      {tErrors[k] && <span className="field__error" id={`e-${k}`}>{tErrors[k]}</span>}
    </label>
  )

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
                      <input type="radio" name="payment" value="tarjeta" checked={payment === 'tarjeta'} onChange={() => choose('tarjeta')} />
                      <span className="pay__body">
                        <strong>Tarjeta de crédito o débito</strong>
                        <span>Pagas en la página segura de la pasarela de pago. Tus datos de tarjeta no pasan por esta tienda.</span>
                      </span>
                    </label>
                    <label className="pay__option">
                      <input type="radio" name="payment" value="transferencia" checked={payment === 'transferencia'} onChange={() => choose('transferencia')} />
                      <span className="pay__body">
                        <strong>Transferencia bancaria</strong>
                        <span>Transfieres a nuestra cuenta, llenas los datos de la transferencia y te llevamos a WhatsApp para enviarnos el pedido y el comprobante.</span>
                      </span>
                    </label>
                  </div>
                </fieldset>

                {payment === 'transferencia' && (
                  <fieldset className="checkout__block">
                    <legend>Datos de la transferencia</legend>
                    <div className="transfer__to">
                      <p>Transfiere {money(total)} a esta cuenta:</p>
                      <dl className="bank">
                        <div><dt>Banco</dt><dd>{BANK.bank}</dd></div>
                        <div><dt>Tipo de cuenta</dt><dd>{BANK.type}</dd></div>
                        <div><dt>Número de cuenta</dt><dd>{BANK.number}</dd></div>
                        <div><dt>Titular</dt><dd>{BANK.holder}</dd></div>
                        <div><dt>Cédula o RUC</dt><dd>{BANK.id}</dd></div>
                      </dl>
                    </div>
                    <p className="transfer__hint">Después, llena los datos de tu transferencia:</p>
                    <div className="form">
                      {tField('bank', 'Banco desde el que transferiste', { autoComplete: 'off', placeholder: 'Ej.: Banco Pichincha' })}
                      {tField('holder', 'Titular de la cuenta', { autoComplete: 'name' })}
                      {tField('reference', 'Número de comprobante', { autoComplete: 'off', inputMode: 'numeric' })}
                      {tField('date', 'Fecha de la transferencia', { type: 'date', max: today() })}
                    </div>
                  </fieldset>
                )}

                <button className="btn btn--primary checkout__submit" type="submit" disabled={sending}>
                  {sending ? 'Procesando…' : payment === 'tarjeta' ? `Pagar ${money(total)} con tarjeta` : 'Confirmar pedido por WhatsApp'}
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
