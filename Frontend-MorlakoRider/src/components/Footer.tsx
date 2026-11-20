import type { ReactNode } from 'react'
import { wa } from '../constants'

/**
 * Pie de página. En la portada lleva antes el cierre con foto (closing) y ocupa su pantalla;
 * en las páginas de la tienda es solo el pie con los enlaces.
 */
function Footer({ closing }: { closing?: ReactNode }) {
  const links = (
    <div className="closing__links">
      <div className="grid">
        <div className="span-4 stack-4">
          <a className="nav__logo footer__brand" href="/">
            <img className="footer__mascota" src="/assets/img/mascota-casco.webp" alt="" width="96" height="96" loading="lazy" />
            Morlako Rider
          </a>
          <p className="footer__lede">Equipo para motociclistas en Cuenca.</p>
        </div>
        <div className="span-2 start-7 footer__col">
          <h3>Tienda</h3>
          <ul>
            <li><a href="/tienda/?cat=cascos">Cascos</a></li>
            <li><a href="/tienda/?cat=chaquetas">Chaquetas</a></li>
            <li><a href="/tienda/?cat=guantes">Guantes</a></li>
          </ul>
        </div>
        <div className="span-2 footer__col">
          <h3>Compras</h3>
          <ul>
            <li><a href="/#pedido">Cómo comprar</a></li>
            <li><a href="/carrito/">Carrito</a></li>
          </ul>
        </div>
        <div className="span-2 footer__col">
          <h3>Ayuda</h3>
          <ul>
            <li><a href="/#faq">Preguntas</a></li>
            <li><a href={wa('Hola Morlako Rider, tengo una pregunta.')}>WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__legal">
        <span>&copy; 2026 Morlako Rider</span>
        <div className="socials"></div>
      </div>
    </div>
  )

  if (closing)
    return (
      <footer className="footer closing footer--dark ground-inverse" id="contact" aria-labelledby="close-h">
        <div className="wrap">
          {closing}
          {links}
        </div>
      </footer>
    )

  return (
    <footer className="footer footer--dark ground-inverse footer--shop" id="contact">
      <div className="wrap">{links}</div>
    </footer>
  )
}

export default Footer
