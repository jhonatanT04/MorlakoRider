export const WHATSAPP = 'https://wa.me/593967527607'

export const wa = (text: string) => `${WHATSAPP}?text=${encodeURIComponent(text)}`

export const PRIMARY = 'Comprar en la tienda'

export const ORDER_EMAIL = 'pedidos@morlakorider.example'

export const BANK = {
  bank: '[Banco]',
  type: '[Tipo de cuenta]',
  number: '[Número de cuenta]',
  holder: '[Titular de la cuenta]',
  id: '[Cédula o RUC del titular]',
}

export const money = (n: number) =>
  '$' +
  n.toLocaleString('es-EC', {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })

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

export const mapDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(LOCATION.mapQuery)}`
