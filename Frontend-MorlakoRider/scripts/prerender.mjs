// Escribe cada página de la tienda ya renderizada: dist/index.html, dist/tienda/index.html,
// dist/producto/<slug>/index.html, etc. Así cada URL llega con su HTML (buscadores, vista previa
// al compartir y los checks estáticos de la skill) y funciona en cualquier hosting estático.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve, join } from 'node:path'

const { render, routes } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const template = await readFile(resolve('dist/index.html'), 'utf8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) throw new Error('prerender: no encuentro <div id="root"></div> en dist/index.html')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

for (const route of [...routes, '/404/']) {
  const { html, title } = render(route)
  let page = template.replace(marker, `<div id="root">${html}</div>`).replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
  // las páginas de la tienda no llevan el momento de la portada
  if (route !== '/') page = page.replace(/<link rel="modulepreload" href="\/assets\/moments\/[^"]+">\n?/g, '')
  // por ahora solo la página principal lleva la vista previa del enlace (og: y twitter:)
  if (route !== '/') {
    page = page
      .replace(/<!-- Vista previa al compartir[\s\S]*?-->\n?/, '')
      .replace(/<meta (?:property="og:[^"]+"|name="twitter:[^"]+") content="[^"]*">\n?/g, '')
  }
  const out = route === '/404/' ? resolve('dist/404.html') : join(resolve('dist'), route, 'index.html')
  await mkdir(resolve(out, '..'), { recursive: true })
  await writeFile(out, page)
}
await rm(resolve('dist-ssr'), { recursive: true, force: true })
console.log(`prerender: ${routes.length + 1} páginas listas`)
