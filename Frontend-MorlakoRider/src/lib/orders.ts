/**
 * Pedidos. Por ahora se guardan solo en el navegador (localStorage).
 * PENDIENTE (backend):
 *  - createOrder debe hacer POST /api/orders en Backend-MR y devolver el pedido con su número.
 *  - startCardPayment debe pedir al backend la URL de pago de la pasarela (PayPhone, Kushki o
 *    Datafast) y devolverla, para redirigir al cliente. Ningún dato de tarjeta pasa por esta página.
 */
import type { CartLine } from './cart'
import { cartTotal } from './cart'

export type PaymentMethod = 'tarjeta' | 'transferencia'

export type Customer = {
  name: string
  email: string
  phone: string
  idNumber: string
  city: string
  address: string
  notes: string
}

export type Order = {
  number: string
  createdAt: string
  lines: CartLine[]
  subtotal: number
  customer: Customer
  payment: PaymentMethod
  status: 'pendiente_pago' | 'esperando_transferencia'
}

const KEY = 'morlako-last-order'

export async function createOrder(lines: CartLine[], customer: Customer, payment: PaymentMethod): Promise<Order> {
  const order: Order = {
    number: 'MR-' + Date.now().toString(36).toUpperCase().slice(-6),
    createdAt: new Date().toISOString(),
    lines,
    subtotal: cartTotal(lines),
    customer,
    payment,
    status: payment === 'tarjeta' ? 'pendiente_pago' : 'esperando_transferencia',
  }
  localStorage.setItem(KEY, JSON.stringify(order))
  return order
}

/** La URL a la que ir para pagar con tarjeta. Con la pasarela conectada, será su página de pago. */
export async function startCardPayment(order: Order): Promise<string> {
  return `/pedido/?n=${encodeURIComponent(order.number)}`
}

export function lastOrder(): Order | null {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null')
  } catch {
    return null
  }
}
