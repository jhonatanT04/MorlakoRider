import { useEffect, useRef } from 'react'
import { cartCount, useCart } from '../lib/cart'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/tienda/', label: 'Tienda' },
  { href: '/tienda/?cat=cascos', label: 'Cascos' },
  { href: '/tienda/?cat=chaquetas', label: 'Chaquetas' },
  { href: '/tienda/?cat=guantes', label: 'Guantes' },
  { href: '/#faq', label: 'Preguntas' },
]

const BagIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
)

/**
 * Barra de esquina a esquina: el nombre en dorado a la izquierda, las opciones al centro y el
 * carrito a la derecha (con el número de artículos). Al bajar más de 24px se convierte en la isla
 * de vidrio (index.css, "Navbar isla"). El carrito queda visible también en el teléfono.
 */
function Header() {
  // La clase se pone a mano (no con estado de React) para no pisar las clases que
  // system.js añade al mismo header (is-open del menú en el teléfono).
  const ref = useRef<HTMLElement>(null)
  const count = cartCount(useCart())

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      ref.current?.classList.toggle('nav--island', window.scrollY > 24)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className="nav nav--centre" ref={ref}>
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">Saltar al contenido</a>
        <a className="nav__logo" href="/">
          <img src="/assets/img/logo-morlako.png" alt="" width="40" height="40" />
          <span className="nav__name">Morlako Rider</span>
        </a>
        <nav className="nav__links" aria-label="Principal">
          {links.map((l) => (
            <div className="nav__item" key={l.href}>
              <a className="nav__link" href={l.href}>{l.label}</a>
            </div>
          ))}
        </nav>
        <a className="nav__cart" href="/carrito/" aria-label={`Carrito, ${count} ${count === 1 ? 'artículo' : 'artículos'}`}>
          <BagIcon />
          <span className="nav__cart-label">Carrito</span>
          <span className="nav__cart-count" data-empty={count === 0 || undefined}>{count}</span>
        </a>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menú">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      </div>
    </header>
  )
}

export default Header
