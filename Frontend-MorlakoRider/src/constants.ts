/** WhatsApp queda solo como contacto para dudas; las ventas se hacen en la tienda de la página. */
export const WHATSAPP = 'https://wa.me/593984510834'

/** Enlace de WhatsApp con un mensaje ya escrito. */
export const wa = (text: string) => `${WHATSAPP}?text=${encodeURIComponent(text)}`

/** La acción principal de la página. */
export const PRIMARY = 'Comprar en la tienda'

/** Correo de pedidos. PENDIENTE: el correo real del cliente. */
export const ORDER_EMAIL = 'pedidos@morlakorider.example'

/**
 * Datos de la cuenta para transferencias.
 * PENDIENTE: el cliente debe dar banco, tipo y número de cuenta, titular y cédula/RUC.
 */
export const BANK = {
  bank: '[Banco]',
  type: '[Tipo de cuenta]',
  number: '[Número de cuenta]',
  holder: '[Titular de la cuenta]',
  id: '[Cédula o RUC del titular]',
}

/** Precio en dólares, como se muestra en la tienda: $115 o $115,50. */
export const money = (n: number) =>
  '$' +
  n.toLocaleString('es-EC', {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })
