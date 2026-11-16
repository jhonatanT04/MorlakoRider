// CATÁLOGO DE MORLAKO RIDER
// Único producto real: SHAFT SH-360MX (con foto y precio de la tienda).
// Todo lo demás es de MUESTRA: reemplazar nombres, precios, descripciones y fotos antes de publicar.
// Para agregar fotos, guardarlas en public/img/ y poner la ruta en `image`.

export const categories = [
  'Todos',
  'Cascos',
  'Guantes',
  'Impermeables',
  'Soportes',
  'Cargadores',
  'Luces',
  'Maletas',
  'Protección',
] as const

export type Category = (typeof categories)[number]

export type Product = {
  id: string
  name: string
  category: Exclude<Category, 'Todos'>
  price: number
  note: string
  image?: string
  sample?: boolean
}

export const products: Product[] = [
  {
    id: 'sh-360mx',
    name: 'SHAFT SH-360MX',
    category: 'Cascos',
    price: 115,
    note: 'Adventure · doble propósito. DOT, coraza ABS, preparado para Pinlock 30, 2 visores exteriores + repuesto de visor.',
    image: '/img/casco/sh-360mx.jpg',
  },

  // Cascos
  { id: 'casco-integral', name: 'Casco integral', category: 'Cascos', price: 85, note: 'Cierre de doble anilla y visor con filtro UV.', sample: true },
  { id: 'casco-abierto', name: 'Casco abierto con visera', category: 'Cascos', price: 55, note: 'Ligero, ideal para ciudad y reparto.', sample: true },
  { id: 'casco-modular', name: 'Casco modular abatible', category: 'Cascos', price: 130, note: 'Mentonera que se levanta para hablar o tomar aire.', sample: true },
  { id: 'visor-extra', name: 'Visor de repuesto', category: 'Cascos', price: 18, note: 'Transparente, ahumado o espejado.', sample: true },

  // Guantes
  { id: 'guantes-ruta', name: 'Guantes de ruta', category: 'Guantes', price: 25, note: 'Palma reforzada, cierre de velcro.', sample: true },
  { id: 'guantes-invierno', name: 'Guantes impermeables', category: 'Guantes', price: 32, note: 'Forro térmico para lluvia y frío.', sample: true },
  { id: 'guantes-verano', name: 'Guantes ventilados', category: 'Guantes', price: 22, note: 'Malla transpirable para el calor.', sample: true },

  // Impermeables
  { id: 'imper-dos', name: 'Impermeable de dos piezas', category: 'Impermeables', price: 35, note: 'Chaqueta y pantalón, costuras selladas.', sample: true },
  { id: 'imper-reflect', name: 'Impermeable con reflectivos', category: 'Impermeables', price: 42, note: 'Cintas reflectivas para trabajar de noche.', sample: true },
  { id: 'cubre-botas', name: 'Cubrebotas impermeables', category: 'Impermeables', price: 12, note: 'Se ponen sobre el calzado, con suela antideslizante.', sample: true },

  // Soportes
  { id: 'soporte-manubrio', name: 'Soporte de celular para manubrio', category: 'Soportes', price: 15, note: 'Sujeción firme con correa de goma.', sample: true },
  { id: 'soporte-retrovisor', name: 'Soporte para retrovisor', category: 'Soportes', price: 17, note: 'Se fija al espejo, giro de 360 grados.', sample: true },
  { id: 'funda-lluvia', name: 'Funda impermeable para celular', category: 'Soportes', price: 10, note: 'Pantalla táctil usable bajo la lluvia.', sample: true },

  // Cargadores
  { id: 'cargador-usb', name: 'Cargador USB para moto', category: 'Cargadores', price: 12, note: 'Doble puerto USB, con voltímetro.', sample: true },
  { id: 'cargador-rapido', name: 'Cargador USB-C de carga rápida', category: 'Cargadores', price: 20, note: 'Conexión directa a la batería con fusible.', sample: true },
  { id: 'cable-moto', name: 'Cable de carga reforzado', category: 'Cargadores', price: 6, note: 'Resistente a tirones y a la humedad.', sample: true },

  // Luces
  { id: 'luz-freno', name: 'Luz LED de freno', category: 'Luces', price: 18, note: 'Visible de día y de noche.', sample: true },
  { id: 'luces-auxiliares', name: 'Par de luces auxiliares LED', category: 'Luces', price: 35, note: 'Mayor visibilidad en ruta oscura.', sample: true },
  { id: 'direccionales', name: 'Direccionales LED', category: 'Luces', price: 14, note: 'Par, consumo bajo.', sample: true },

  // Maletas
  { id: 'top-case', name: 'Baúl trasero (top case)', category: 'Maletas', price: 60, note: 'Cabe un casco, con llave y base de montaje.', sample: true },
  { id: 'mochila-reparto', name: 'Mochila térmica de reparto', category: 'Maletas', price: 38, note: 'Mantiene la comida caliente, interior lavable.', sample: true },
  { id: 'alforjas', name: 'Alforjas laterales', category: 'Maletas', price: 48, note: 'Par, impermeables, con correas ajustables.', sample: true },

  // Protección
  { id: 'rodilleras', name: 'Rodilleras y coderas', category: 'Protección', price: 28, note: 'Juego de cuatro piezas con correas ajustables.', sample: true },
  { id: 'chaleco-reflect', name: 'Chaleco reflectivo', category: 'Protección', price: 9, note: 'Alta visibilidad, talla ajustable.', sample: true },
]
