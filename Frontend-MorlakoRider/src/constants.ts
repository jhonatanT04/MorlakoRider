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
 * Dónde queda el local (la dirección de su ficha en Google Maps).
 * Si `hours` queda vacío, la portada pide escribir por WhatsApp para confirmar el horario.
 * `mapQuery` es el nombre del local tal como aparece en Google Maps; lo usa el botón "Cómo llegar".
 * `coords` es [longitud, latitud] del pin en el mapa.
 */
export const LOCATION = {
  address: 'Av. 27 de Febrero, entre Jacinto Flores y Roberto Crespo Toral',
  city: 'Cuenca, Ecuador',
  hours: [
    ['Lunes a viernes', '10:00 – 19:00'],
    ['Sábado', '10:00 – 15:00'],
  ] as [string, string][],
  mapQuery: 'Morlako Rider, Cuenca, Ecuador',
  coords: [-79.0059029, -2.9154243] as [number, number],
}

/** El enlace "Cómo llegar" (abre la ruta en Google Maps). */
export const mapDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(LOCATION.mapQuery)}`
