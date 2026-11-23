/** WhatsApp queda solo como contacto para dudas; las ventas se hacen en la tienda de la página. */
export const WHATSAPP = 'https://wa.me/593967527607'

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

/**
 * Dónde queda el local. PENDIENTE: el cliente debe dar la dirección exacta y el horario.
 * `mapQuery` es el nombre del local tal como aparece en Google Maps; lo usa el botón "Cómo llegar".
 */
export const LOCATION = {
  address: '[Calle principal y secundaria]',
  reference: '[Referencia: frente a…, junto a…]',
  city: 'Cuenca, Ecuador',
  hours: [
    ['Lunes a viernes', '[09:00 – 18:00]'],
    ['Sábado', '[09:00 – 13:00]'],
  ] as [string, string][],
  mapQuery: 'Morlako Rider, Cuenca, Ecuador',
}

/** El mapa embebido (la ficha "Morlako Rider" de Google Maps) y el enlace "Cómo llegar". */
export const mapEmbed =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.654302866708!2d-79.00590292396359!3d-2.9154243395792294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd1983a1931d25%3A0xf46be65018a8f92!2sMorlako%20Rider!5e0!3m2!1ses!2sec!4v1795403480907!5m2!1ses!2sec'
export const mapDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(LOCATION.mapQuery)}`
