import type { CartLine } from './cart'
import { cartTotal } from './cart'
import { findProduct } from '../data/products'
import { money, wa } from '../constants'

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

export type Transfer = {
  bank: string
  holder: string
  reference: string
  date: string
}

export type Order = {
  number: string
  createdAt: string
  lines: CartLine[]
  subtotal: number
  customer: Customer
  payment: PaymentMethod
  transfer?: Transfer
  status: 'pendiente_pago' | 'esperando_transferencia'
}

const KEY = 'morlako-last-order'

export async function createOrder(lines: CartLine[], customer: Customer, payment: PaymentMethod, transfer?: Transfer): Promise<Order> {
  const order: Order = {
    number: 'MR-' + Date.now().toString(36).toUpperCase().slice(-6),
    createdAt: new Date().toISOString(),
    lines,
    subtotal: cartTotal(lines),
    customer,
    payment,
    transfer: payment === 'transferencia' ? transfer : undefined,
    status: payment === 'tarjeta' ? 'pendiente_pago' : 'esperando_transferencia',
  }
  localStorage.setItem(KEY, JSON.stringify(order))
  return order
}

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

const dmy = (d: string) => d.split('-').reverse().join('/')

export function transferWhatsApp(order: Order): string {
  const c = order.customer
  const t = order.transfer
  const items = order.lines.map((l) => {
    const p = findProduct(l.slug)
    return `• ${p?.name ?? l.slug} · Talla ${l.size} × ${l.qty} = ${money((p?.price ?? 0) * l.qty)}`
  })
  const text = [
    `*PEDIDO ${order.number}* · Morlako Rider`,
    '',
    '*Productos*',
    ...items,
    `*Total:* ${money(order.subtotal)}`,
    '',
    '*Datos de entrega*',
    `Nombre: ${c.name}`,
    `Correo: ${c.email}`,
    `Celular: ${c.phone}`,
    `Cédula o RUC: ${c.idNumber}`,
    `Ciudad: ${c.city}`,
    `Dirección: ${c.address}`,
    ...(c.notes.trim() ? [`Notas: ${c.notes.trim()}`] : []),
    '',
    '*Datos de la transferencia*',
    `Banco de origen: ${t?.bank ?? ''}`,
    `Titular de la cuenta: ${t?.holder ?? ''}`,
    `N.º de comprobante: ${t?.reference ?? ''}`,
    `Fecha: ${t ? dmy(t.date) : ''}`,
    `Valor transferido: ${money(order.subtotal)}`,
    '',
    'Adjunto la foto del comprobante.',
  ].join('\n')
  return wa(text)
}
