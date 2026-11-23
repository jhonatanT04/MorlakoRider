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

if (container.firstElementChild) hydrateRoot(container, app)
else {
  document.title = titleFor(path)
  createRoot(container).render(app)
}
