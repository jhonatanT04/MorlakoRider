import { renderToString } from 'react-dom/server'
import App, { ROUTES, titleFor } from './App.tsx'

/** Render estático de una ruta, usado por scripts/prerender.mjs después del build. */
export function render(path: string) {
  return { html: renderToString(<App path={path} />), title: titleFor(path) }
}

export const routes = ROUTES.map((r) => r.path)
