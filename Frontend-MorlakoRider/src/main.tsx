import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App, { titleFor } from './App.tsx'

const container = document.getElementById('root')!
const path = location.pathname
const app = (
  <StrictMode>
    <App path={path} />
  </StrictMode>
)

// En producción cada página viene prerenderizada (scripts/prerender.mjs): React la hidrata.
// En desarrollo (npm run dev) el contenedor está vacío y se renderiza desde cero.
if (container.firstElementChild) hydrateRoot(container, app)
else {
  document.title = titleFor(path)
  createRoot(container).render(app)
}
