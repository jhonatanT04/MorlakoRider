import type { CSSProperties } from 'react'
import Footer from '../components/Footer'
import { Arrow, ProductImage } from '../components/Photo'
import { PRIMARY, money, wa } from '../constants'
import { findProduct } from '../data/products'

const destacado = findProduct('casco-bell-srt')!

/** Las tres categorías, cada una con la foto de un producto de la tienda. */
const catalogo = [
  { slug: 'casco-atomic-integral', cat: 'cascos', title: 'Cascos para moto', facts: 'Integrales y adventure: Bell, TSS y Atomic' },
  { slug: 'chaqueta-ls2-negra-roja', cat: 'chaquetas', title: 'Chaquetas de moto', facts: 'Textiles LS2 con protecciones' },
  { slug: 'guantes-alpinestars-gp-plus-r', cat: 'guantes', title: 'Guantes de moto', facts: 'Alpinestars de cuero, puño largo' },
].map((c) => ({ ...c, product: findProduct(c.slug)! }))

const faqs = [
  {
    q: '¿Cómo compro en la tienda?',
    a: 'Elige el producto y tu talla, agrégalo al carrito y paga con tarjeta o por transferencia. Te enviamos la confirmación del pedido por correo.',
  },
  {
    q: '¿Talla S o M si estoy entre dos?',
    a: 'Elige la menor. El acolchado interior del casco cede con las primeras semanas de uso y el casco grande queda flojo.',
  },
  {
    q: '¿Qué quiere decir que un casco sea DOT?',
    a: 'Que cumple la norma de seguridad FMVSS 218 del Departamento de Transporte de Estados Unidos, que prueba el impacto, la penetración y la correa.',
  },
  {
    q: '¿Para qué sirve un visor Pinlock?',
    a: 'Es una lámina que se fija por dentro del visor y evita que se empañe con la lluvia o el frío de la mañana.',
  },
  {
    q: '¿Hacen envíos fuera de Cuenca?',
    a: 'Sí, según cobertura. Al pagar escribes tu ciudad y te confirmamos por correo el costo y el día de entrega.',
  },
]

/* fotos del cliente (public/assets/img/cliente-*.jpg) */
const pasos = [
  {
    title: 'Tu casco y tu talla',
    text: 'Mira la tienda por categoría, abre el producto que te guste, elige la talla y agrégalo al carrito.',
    src: '/assets/img/cliente-casco-blanco.jpg',
    pos: '50% 12%',
    w: 511,
    h: 768,
    alt: 'Motociclista con casco integral blanco y guantes, apoyado en una pared con grafitis',
  },
  {
    title: 'Pago con tarjeta o transferencia',
    text: 'Escribe tus datos de entrega y elige cómo pagar. Recibes el número de pedido en la pantalla y por correo.',
    src: '/assets/img/cliente-local-morlako.jpg',
    pos: '50% 22%',
    w: 513,
    h: 671,
    alt: 'Dos motociclistas con cascos SHAFT y chaquetas de cuero frente al mural de Morlako',
  },
  {
    title: 'Entrega en Cuenca',
    text: 'Te entregamos en Cuenca el día acordado. Para otra ciudad, te confirmamos el envío según cobertura.',
    src: '/assets/img/cliente-noche-gasolinera.jpg',
    pos: '50% 35%',
    w: 513,
    h: 761,
    alt: 'Motociclista de espaldas con casco rojo y plateado y chaqueta negra, de noche en una gasolinera',
  },
]

const svg = { viewBox: '0 0 24 24', width: 28, height: 28, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/* beneficios: iconos de línea en el dorado de la marca */
const BENEFICIOS = [
  { title: 'Equipamiento de calidad', text: 'Productos seleccionados para motociclistas.',
    icon: <svg {...svg}><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg> },
  { title: 'Envíos disponibles', text: 'Entrega en Cuenca y otras ciudades según cobertura.',
    icon: <svg {...svg}><path d="M2 6h11v10H2z" /><path d="M13 9h4l3 3.5V16h-7z" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="16.5" cy="17.5" r="1.8" /></svg> },
  { title: 'Pagos seguros', text: 'Con tarjeta o por transferencia bancaria.',
    icon: <svg {...svg}><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 9.5h19" /><path d="M6 15h4" /></svg> },
  { title: 'Atención personalizada', text: 'Te ayudamos a elegir tu equipamiento.',
    icon: <svg {...svg}><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z" /><path d="M8.5 11h7M8.5 14h4" /></svg> },
]

function Home() {
  return (
    <>
      <main id="top">
        {/* HERO oscuro: la foto del cliente de fondo a todo lo ancho y el texto a la izquierda */}
        <section className="hero hero--photo hero--night" data-box="none" data-tone="dark" data-calm="left" data-enter aria-labelledby="hero-h">
          <img
            className="hero__bg"
            src="/assets/img/fondo-hero.jpg"
            srcSet="/assets/img/fondo-hero-800.jpg 800w, /assets/img/fondo-hero.jpg 1376w"
            sizes="(max-width: 1023px) 1376px, 100vw"
            width={1376}
            height={768}
            alt="Motociclista de espaldas con casco LS2 rojo y blanco y una capucha crema con la mascota de Morlako Rider, al atardecer"
            fetchPriority="high"
            data-source="client"
            data-subject="client"
            style={{ ['--ly-pos' as string]: '70% 40%' }}
          />
          <div className="wrap">
            <div className="hero-text">
              <div className="hero__text">
                <p className="hero__kicker">Cuenca, Ecuador</p>
                <h1 id="hero-h">Cascos y chaquetas de moto en Cuenca</h1>
                <p className="hero__lead">
                  Nuestra tienda en línea de equipo para moto: eliges tu talla, pagas con tarjeta o transferencia y
                  te entregamos el pedido en Cuenca y otras ciudades según cobertura.
                </p>
                <div className="btn-row">
                  <a className="btn btn--primary" href="/tienda/">{PRIMARY}<Arrow /></a>
                  <a className="btn btn--secondary" href="#catalogo">Ver el catálogo</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFICIOS: cuatro razones para confiar, sin foto ni banner, antes del catálogo */}
        <section className="section" id="beneficios" aria-labelledby="beneficios-h">
          <div className="wrap grid">
            <div className="span-6 benefits__intro">
              <div className="section-head">
                <h2 id="beneficios-h">Por qué comprar en Morlako Rider</h2>
                <p>Equipo elegido por motociclistas, pago seguro y entrega en Cuenca.</p>
              </div>
              <img className="mascota" src="/assets/img/mascota-casco.webp" alt="" width={480} height={480} loading="lazy" />
            </div>
            <ul className="benefits span-6 start-7">
              {BENEFICIOS.map((b) => (
                <li className="benefit" key={b.title}>
                  <span className="benefit__icon" aria-hidden="true">{b.icon}</span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CATÁLOGO: tres categorías que llevan a la tienda */}
        <section className="section" id="catalogo" aria-labelledby="catalogo-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="catalogo-h">El catálogo de Morlako Rider</h2>
              <p>Equipo para quien sale en moto todos los días. Toca una categoría para ver los modelos, las tallas y los precios.</p>
            </div>
            <div className="grid">
              {catalogo.map((c) => (
                <a className="tile span-4" href={`/tienda/?cat=${c.cat}`} key={c.cat}>
                  <div className="tile__media tile__media--product" style={{ background: c.product.bg }}>
                    <ProductImage product={c.product} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 30vw, 410px" />
                  </div>
                  <div className="tile__head"><h3>{c.title}</h3></div>
                  <p className="tile__facts">{c.facts}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CASCO DESTACADO: dark-band, split texto + foto */}
        <section className="section ground-maroon" id="casco" aria-labelledby="casco-h">
          <div className="wrap grid">
            <div className="span-6">
              <p className="promo-tag">Casco destacado</p>
              <div className="section-head">
                <h2 id="casco-h">{destacado.name}, {money(destacado.price ?? 0)}</h2>
                <p>{destacado.description}</p>
              </div>
              <ul className="rows rows--spec">
                {destacado.specs.map(([k, v]) => (
                  <li key={k}><span className="rows__name">{k}</span><span className="rows__value">{v}</span></li>
                ))}
              </ul>
              <div className="btn-row casco__cta">
                <a className="btn btn--primary" href={`/producto/${destacado.slug}/`}>Comprar el Bell SRT<Arrow /></a>
              </div>
            </div>
            <div className="frame frame--photo span-6 start-7 casco__photo casco__photo--product" style={{ background: destacado.bg }}>
              <ProductImage product={destacado} className="frame__img" />
            </div>
          </div>
        </section>

        {/* CÓMO COMPRAR: el momento pinned-chapters (dos pantallas) */}
        <section className="section" id="pedido" style={{ '--h': 2 } as CSSProperties} data-moment="pinned-chapters" aria-labelledby="pedido-h">
          <div className="wrap mo-pc__grid">
            <div className="mo-pc__text">
              <h2 id="pedido-h">Compra de cascos y chaquetas en tres pasos</h2>
              <ol className="mo-pc__steps">
                {pasos.map((p) => (
                  <li className="mo-pc__step" key={p.title}>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <figure className="mo-pc__visual">
                      <img src={p.src} width={p.w} height={p.h} alt={p.alt} style={{ objectPosition: p.pos }} loading="lazy" decoding="async" data-source="client" data-subject="client" />
                    </figure>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mo-pc__visuals frame"></div>
          </div>
        </section>
        {/* PREGUNTAS: faq, el split de la página */}
        <section className="section" id="faq" aria-labelledby="preguntas-h">
          <div className="wrap grid">
            <div className="span-6">
              <div className="section-head">
                <h2 id="preguntas-h">Preguntas sobre cascos y compras</h2>
                <p>Lo que más nos preguntan antes de comprar.</p>
              </div>
              <a className="link" href={wa('Hola Morlako Rider, tengo una pregunta.')}>¿Otra duda? Escríbenos por WhatsApp</a>
              <div className="frame frame--photo faq__photo">
                <img
                  className="frame__img"
                  src="/assets/img/cliente-campo-1280.jpg"
                  srcSet="/assets/img/cliente-campo-640.jpg 640w, /assets/img/cliente-campo-1280.jpg 1280w"
                  sizes="(max-width: 1023px) 100vw, 640px"
                  width={1280}
                  height={715}
                  alt="Motociclista con casco LS2 rojo y blanco y capucha crema, sentado en un campo de hierba seca"
                  loading="lazy"
                  data-source="client"
                  data-subject="client"
                />
              </div>
            </div>
            {/* cajas tipo acordeón: <details> nativo, una abierta a la vez */}
            <div className="faq-box span-6 start-7">
              {faqs.map((f, i) => (
                <details className="faq-box__item" name="faq" open={i === 0} key={f.q}>
                  <summary>
                    <h3>{f.q}</h3>
                    <span className="faq-box__icon" aria-hidden="true"></span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer
        closing={
          <div className="closing__cta close--photo">
            <div className="section-head--split">
              <div>
                <h2 id="close-h">Tu próximo casco está en la tienda</h2>
                <p className="t-lead">Modelos, tallas y precios en un solo lugar, con pago en línea.</p>
              </div>
              <a className="btn btn--primary" href="/tienda/">{PRIMARY}<Arrow /></a>
            </div>
            <div className="close__media">
              <img
                src="/assets/img/cliente-cuenca-catedral-centro.jpg"
                width={840}
                height={687}
                alt="Motociclista con casco LS2 y chaqueta de cuero frente a la Catedral Nueva, en el Parque Calderón de Cuenca"
                loading="lazy"
                decoding="async"
                style={{ '--pos': '50% 41%' } as CSSProperties}
                data-source="client"
                data-subject="client"
              />
            </div>
          </div>
        }
      />
    </>
  )
}

export default Home
