import { renderToString } from 'react-dom/server'
import App, { ROUTES, titleFor } from './App.tsx'

export function render(path: string) {
  return { html: renderToString(<App path={path} />), title: titleFor(path) }
}

export const routes = ROUTES.map((r) => r.path)
