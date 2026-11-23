import type { ReactNode } from 'react'
import { wa } from '../constants'

/**
 * Pie de página. En la portada lleva antes el cierre con foto (closing), que ocupa su pantalla;
 * después, en todas las páginas, el pie con los enlaces que se descubre al hacer scroll.
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

  /* el pie con los enlaces y el nombre grande: queda fijo debajo de la página y aparece al final,
     cuando la página sube como una cortina (.footer--reveal en index.css) */
  const reveal = (
    <footer className="footer footer--dark ground-inverse footer--reveal" id={closing ? undefined : 'contact'}>
      <div className="wrap">{links}</div>
      <p className="footer__word" aria-hidden="true">Morlako Rider</p>
    </footer>
  )

  if (closing)
    return (
      <>
        <footer className="footer closing footer--dark ground-inverse closing--solo" id="contact" aria-labelledby="close-h">
          <div className="wrap">{closing}</div>
        </footer>
        {reveal}
      </>
    )

  return reveal
}

export default Footer
