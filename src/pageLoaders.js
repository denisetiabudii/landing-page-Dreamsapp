// Memuat komponen halaman berdasarkan nama di src/routes.js.
// import.meta.glob membuat tiap halaman menjadi chunk terpisah di browser.
const modules = import.meta.glob('./components/pages/*.jsx')

export async function loadPage(name) {
  const load = modules[`./components/pages/${name}.jsx`]
  if (!load) throw new Error(`Komponen halaman tidak ditemukan: ${name}`)
  const mod = await load()
  return mod.default
}
