/**
 * Catálogo de la tienda, con las fotos del cliente (public/assets/img/products).
 * Solo el Bell SRT tiene precio confirmado. Los productos sin `price` se muestran como
 * "Precio por confirmar" y no se pueden agregar al carrito hasta que se ponga su precio aquí.
 * Las tallas son las habituales de cada tipo de producto: confirmarlas con el stock real.
 * Más adelante este catálogo puede venir del backend (Backend-MR).
 */
export type Category = 'cascos' | 'chaquetas' | 'guantes'

export type Product = {
  slug: string
  name: string
  category: Category
  /** en dólares; sin precio el producto no se puede comprar todavía */
  price?: number
  sizes: string[]
  /** foto en public/assets/img/products/<image>-500.jpg y -960.jpg */
  image: string
  /** ancho y alto del archivo -960 (puede ser menor a 960) */
  dims: [number, number]
  /** fondo de la foto, para que el marco no la recorte en otro color */
  bg: string
  alt: string
  short: string
  description: string
  specs: [string, string][]
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'cascos', label: 'Cascos' },
  { id: 'chaquetas', label: 'Chaquetas' },
  { id: 'guantes', label: 'Guantes' },
]

const HELMET_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const PRODUCTS: Product[] = [
  {
    slug: 'casco-bell-srt',
    name: 'Casco Bell SRT',
    category: 'cascos',
    price: 65,
    sizes: HELMET_SIZES,
    image: 'casco-bell-srt',
    dims: [857, 850],
    bg: '#000000',
    alt: 'Casco integral Bell SRT negro mate con visor transparente',
    short: 'Integral, negro mate',
    description: 'Casco integral Bell SRT en negro mate, con visor transparente. Para la ciudad y la carretera.',
    specs: [
      ['Marca', 'Bell'],
      ['Tipo', 'Integral'],
      ['Color', 'Negro mate'],
      ['Visor', 'Transparente'],
    ],
  },
  {
    slug: 'casco-tss-atomic-adventure',
    name: 'Casco TSS Atomic adventure',
    category: 'cascos',
    sizes: HELMET_SIZES,
    image: 'casco-tss-atomic-adventure',
    dims: [662, 664],
    bg: '#ffffff',
    alt: 'Casco adventure TSS Atomic gris con gráficos rosados y morados, visera y visor transparente',
    short: 'Doble propósito, con visera',
    description: 'Casco adventure TSS Atomic de doble propósito, con visera y visor transparente. Gris con gráficos rosados y morados.',
    specs: [
      ['Marca', 'TSS'],
      ['Modelo', 'Atomic'],
      ['Tipo', 'Adventure, doble propósito'],
      ['Color', 'Gris, rosado y morado'],
    ],
  },
  {
    slug: 'casco-atomic-integral',
    name: 'Casco Atomic integral',
    category: 'cascos',
    sizes: HELMET_SIZES,
    image: 'casco-atomic-integral',
    dims: [660, 647],
    bg: '#000000',
    alt: 'Casco integral Atomic negro brillante con franjas grises, blancas y rojas',
    short: 'Integral, negro con rojo',
    description: 'Casco integral Atomic negro brillante con franjas grises, blancas y rojas, y visor ahumado.',
    specs: [
      ['Modelo', 'Atomic'],
      ['Tipo', 'Integral'],
      ['Color', 'Negro, gris, blanco y rojo'],
    ],
  },
  {
    slug: 'chaqueta-ls2-negra-roja',
    name: 'Chaqueta LS2 negra y roja',
    category: 'chaquetas',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'chaqueta-ls2-negra-roja',
    dims: [948, 936],
    bg: '#000000',
    alt: 'Chaqueta de moto LS2 textil negra con paneles rojos y protecciones en los hombros',
    short: 'Textil, con protecciones',
    description: 'Chaqueta de moto LS2 textil en negro con paneles rojos, protecciones en hombros y codos y detalles reflectivos.',
    specs: [
      ['Marca', 'LS2'],
      ['Material', 'Textil'],
      ['Color', 'Negro y rojo'],
      ['Protecciones', 'Hombros y codos'],
    ],
  },
  {
    slug: 'guantes-alpinestars-gp-plus-r',
    name: 'Guantes Alpinestars GP Plus R',
    category: 'guantes',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'guantes-alpinestars-gp-plus-r',
    dims: [960, 720],
    bg: 'linear-gradient(#2d2d2d, #464646)',
    alt: 'Par de guantes de cuero Alpinestars GP Plus R negros con protector de nudillos blanco',
    short: 'Cuero, puño largo',
    description: 'Guantes de pista Alpinestars GP Plus R en cuero negro, con puño largo y protector de nudillos.',
    specs: [
      ['Marca', 'Alpinestars'],
      ['Modelo', 'GP Plus R'],
      ['Material', 'Cuero'],
      ['Puño', 'Largo'],
    ],
  },
]

export const findProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug)

/** Solo los productos con precio se pueden comprar. */
export const canBuy = (p: Product): p is Product & { price: number } => typeof p.price === 'number'
