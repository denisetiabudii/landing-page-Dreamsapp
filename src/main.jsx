import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { loadPage } from './pageLoaders'
import { findRoute } from './routes'

// Halaman dimuat sebelum render agar hasilnya sama dengan HTML hasil prerender.
const route = findRoute(window.location.pathname)
const Page = await loadPage(route.page)

const app = (
  <StrictMode>
    <Page {...route.props} />
  </StrictMode>
)

const rootElement = document.getElementById('root')

// Ada isi = hasil prerender → hydrate. Kosong (mis. dev server) → render biasa.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
