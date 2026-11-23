import { useSyncExternalStore } from 'react'
import { canBuy, findProduct } from '../data/products'

export type CartLine = { slug: string; size: string; qty: number }

const KEY = 'morlako-cart'
const EMPTY: CartLine[] = []
const MAX_QTY = 10
const listeners = new Set<() => void>()
let cache: CartLine[] | null = null

function read(): CartLine[] {
  if (cache) return cache
  let lines: CartLine[] = []
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
    if (Array.isArray(raw)) lines = raw.filter((l) => l && l.qty > 0 && (() => { const p = findProduct(l.slug); return !!p && canBuy(p) })())
  } catch {
    lines = []
  }
  cache = lines
  return lines
}

function write(lines: CartLine[]) {
  cache = lines
  localStorage.setItem(KEY, JSON.stringify(lines))
  listeners.forEach((fn) => fn())
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null
      fn()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('storage', onStorage)
  }
}

export function useCart() {
  return useSyncExternalStore(subscribe, read, () => EMPTY)
}

export function addToCart(slug: string, size: string, qty = 1) {
  const lines = [...read()]
  const i = lines.findIndex((l) => l.slug === slug && l.size === size)
  if (i >= 0) lines[i] = { ...lines[i], qty: Math.min(lines[i].qty + qty, MAX_QTY) }
  else lines.push({ slug, size, qty: Math.min(qty, MAX_QTY) })
  write(lines)
}

export function setQty(slug: string, size: string, qty: number) {
  const q = Math.max(1, Math.min(qty, MAX_QTY))
  write(read().map((l) => (l.slug === slug && l.size === size ? { ...l, qty: q } : l)))
}

export function removeLine(slug: string, size: string) {
  write(read().filter((l) => !(l.slug === slug && l.size === size)))
}

export function clearCart() {
  write([])
}

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0)

export const cartTotal = (lines: CartLine[]) =>
  lines.reduce((sum, l) => sum + (findProduct(l.slug)?.price ?? 0) * l.qty, 0)

export { MAX_QTY }
