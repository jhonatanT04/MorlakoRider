import { useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { findProduct, PRODUCTS } from './data/products'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import OrderDone from './pages/OrderDone'
import ProductPage from './pages/ProductPage'
import Shop from './pages/Shop'

export const ROUTES = [
  { path: '/', title: 'Morlako Rider: cascos y chaquetas de moto en Cuenca' },
  { path: '/tienda/', title: 'Tienda | Morlako Rider' },
  { path: '/carrito/', title: 'Carrito | Morlako Rider' },
  { path: '/checkout/', title: 'Finalizar compra | Morlako Rider' },
  { path: '/pedido/', title: 'Tu pedido | Morlako Rider' },
  ...PRODUCTS.map((p) => ({ path: `/producto/${p.slug}/`, title: `${p.name} | Morlako Rider` })),
]

export const titleFor = (path: string) =>
  ROUTES.find((r) => r.path === normalize(path))?.title ?? 'Página no encontrada | Morlako Rider'

export function normalize(path: string) {
  let p = path.replace(/index\.html$/, '')
  if (!p.endsWith('/')) p += '/'
  return p
}

function useKitScripts() {
  useEffect(() => {
    if (document.querySelector('script[data-kit]')) return
    for (const src of ['/assets/system.js', '/assets/motion/motion.js', '/assets/layout/layout.js']) {
      const s = document.createElement('script')
      s.type = 'module'
      s.src = src
      s.dataset.kit = ''
      document.body.appendChild(s)
    }
  }, [])
}

function NotFound() {
  return (
    <main id="top" className="shop">
      <div className="page">
        <div className="wrap">
          <div className="page__head">
            <h1>No encontramos esta página</h1>
            <p>Puede que el producto ya no esté en la tienda.</p>
          </div>
          <a className="btn btn--primary" href="/tienda/">Ir a la tienda</a>
        </div>
      </div>
    </main>
  )
}

function Page({ path }: { path: string }) {
  const p = normalize(path)
  if (p === '/') return <Home />
  if (p === '/tienda/') return <Shop />
  if (p === '/carrito/') return <CartPage />
  if (p === '/checkout/') return <Checkout />
  if (p === '/pedido/') return <OrderDone />
  const m = p.match(/^\/producto\/([^/]+)\/$/)
  const product = m && findProduct(m[1])
  if (product) return <ProductPage product={product} />
  return <NotFound />
}

function App({ path }: { path: string }) {
  useKitScripts()
  const home = normalize(path) === '/'
  return (
    <>
      <Header />
      <Page path={path} />
      {!home && <Footer />}
    </>
  )
}

export default App
