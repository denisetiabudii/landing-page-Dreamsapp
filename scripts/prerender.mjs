// =========================================
// PRERENDER
// Dijalankan setelah `vite build` (client) dan `vite build --ssr` (dist-ssr).
// Menulis HTML lengkap ke dist/index.html dan dist/<route>/index.html.
// =========================================

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

import { routes } from '../src/routes.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

const env = loadEnv('production', root, 'VITE_')
const siteUrl = String(env.VITE_SITE_URL ?? '')
  .trim()
  .replace(/\/+$/, '')

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

// Ganti metadata per halaman berdasarkan template index.html.
function applyMeta(html, { path, title, description, ogDescription }) {
  const t = escapeHtml(title)
  const d = escapeHtml(description)
  const og = escapeHtml(ogDescription ?? description)
  const url = escapeHtml(`${siteUrl}${path === '/' ? '/' : path}`)

  let out = html
    .replace(/<title>[^<]*<\/title>/, () => `<title>${t}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      (_, before, after) => `${before}${d}${after}`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      (_, before, after) => `${before}${t}${after}`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      (_, before, after) => `${before}${og}${after}`,
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      (_, before, after) => `${before}${t}${after}`,
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      (_, before, after) => `${before}${og}${after}`,
    )

  // Data terstruktur beranda hanya dipakai di "/".
  if (path !== '/') {
    out = out.replace(
      /<script[^>]*id="jsonld-home"[^>]*>[\s\S]*?<\/script>/,
      '',
    )
  }

  if (siteUrl) {
    out = out
      .replace(
        /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
        (_, before, after) => `${before}${url}${after}`,
      )
      .replace(
        /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
        (_, before, after) => `${before}${url}${after}`,
      )
  }

  return out
}

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html tidak berisi <div id="root"></div>.')
}

const { render } = await import(
  pathToFileURL(resolve(ssrDir, 'entry-server.js')).href
)

let failed = 0

for (const route of routes) {
  try {
    const appHtml = await render(route.path)
    const page = applyMeta(template, route).replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    )

    const file =
      route.path === '/'
        ? resolve(dist, 'index.html')
        : resolve(dist, route.path.slice(1), 'index.html')

    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, page)

    console.log(`[prerender] ${route.path} → ${appHtml.length} karakter HTML`)
  } catch (error) {
    failed += 1
    console.error(`[prerender] GAGAL ${route.path}:`, error)
  }
}

rmSync(ssrDir, { recursive: true, force: true })

// Semua route wajib berhasil diprerender.
if (failed > 0) {
  console.error(
    `[prerender] Build gagal: ${failed} halaman tidak berhasil dibuat.`,
  )
  process.exit(1)
}

console.log(`[prerender] Berhasil membuat ${routes.length} halaman.`)
