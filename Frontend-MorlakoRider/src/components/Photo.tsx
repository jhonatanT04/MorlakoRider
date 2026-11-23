import type { CSSProperties } from 'react'

const FULL = new Set(['f21655085', 'f43902550', 'f61873805'])

const DIMS: Record<string, [number, number]> = {
  f21655085: [1280, 431],
  f1364380: [960, 713],
  f43902550: [1280, 770],
  f61844305: [960, 1440],
  f7495393: [960, 782],
  f61873805: [1280, 853],
  f202794336: [960, 720],
  f75794406: [960, 644],
}

export function Photo({
  id,
  alt,
  sizes = '(max-width: 1023px) 100vw, 50vw',
  className,
  eager = false,
  pos,
}: {
  id: string
  alt: string
  sizes?: string
  className?: string
  eager?: boolean
  pos?: string
}) {
  const full = FULL.has(id)
  const base = `/assets/img/photo-${id}`
  const srcSet = full
    ? `${base}-500.jpg 500w, ${base}-960.jpg 960w, ${base}.jpg 1280w`
    : `${base}-500.jpg 500w, ${base}-960.jpg 960w`
  return (
    <img
      className={className}
      src={full ? `${base}.jpg` : `${base}-960.jpg`}
      srcSet={srcSet}
      sizes={sizes}
      width={DIMS[id]?.[0]}
      height={DIMS[id]?.[1]}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      style={pos ? ({ '--ly-pos': pos, '--pos': pos } as CSSProperties) : undefined}
      data-source="stand-in"
      data-subject="stand-in"
    />
  )
}

export const Arrow = () => (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
)

export function ProductImage({
  product: p,
  sizes = '(max-width: 1023px) 100vw, 50vw',
  className,
  eager = false,
}: {
  product: { image: string; dims: [number, number]; alt: string }
  sizes?: string
  className?: string
  eager?: boolean
}) {
  const base = `/assets/img/products/${p.image}`
  const [w, h] = p.dims
  return (
    <img
      className={className}
      src={`${base}-960.jpg`}
      srcSet={`${base}-500.jpg 500w, ${base}-960.jpg ${w}w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={p.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      data-source="client"
    />
  )
}
