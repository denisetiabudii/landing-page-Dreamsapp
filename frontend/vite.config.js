import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

const GTM_RE = /^GTM-[A-Z0-9]+$/
const GA_RE = /^G-[A-Z0-9]+$/
const CLARITY_RE = /^[a-z0-9]+$/i

function cleanId(value, pattern, name) {
  const v = String(value ?? '').trim()
  if (!v) return ''
  if (!pattern.test(v)) {
    console.warn(`[dreams] ${name} tidak valid, diabaikan.`)
    return ''
  }
  return v
}

// Menyuntik analytics (hanya jika ID terisi) dan mengisi alamat situs di meta SEO.
function dreamsHtml(env) {
  const siteUrl = String(env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')
  const gtm = cleanId(env.VITE_GTM_ID, GTM_RE, 'VITE_GTM_ID')
  const ga = gtm ? '' : cleanId(env.VITE_GA_ID, GA_RE, 'VITE_GA_ID')
  const clarity = cleanId(
  env.VITE_CLARITY_ID,
  CLARITY_RE,
  'VITE_CLARITY_ID',
)

  return {
    name: 'dreams-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        let out = html
        if (siteUrl) {
          out = out.replaceAll('__SITE_URL__', siteUrl)
        } else {
          out = out
            .split('\n')
            .filter((line) => !line.includes('__SITE_URL__'))
            .join('\n')
        }

        const tags = []

        if (gtm) {
          tags.push({
            tag: 'script',
            injectTo: 'head-prepend',
            children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`,
          })
          tags.push({
            tag: 'noscript',
            injectTo: 'body-prepend',
            children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          })
        }

        if (ga) {
          tags.push({
            tag: 'script',
            injectTo: 'head',
            attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${ga}` },
          })
          tags.push({
            tag: 'script',
            injectTo: 'head',
            children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`,
          })
        }

        if (clarity) {
          tags.push({
            tag: 'script',
            injectTo: 'head',
            children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`,
          })
        }

        return { html: out, tags }
      },
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /']
      if (siteUrl) robots.push(`Sitemap: ${siteUrl}/sitemap.xml`)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })

      if (siteUrl) {
        const urls = ['/', '/demo']
          .map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`)
          .join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
      } else {
        console.warn('[dreams] VITE_SITE_URL kosong: sitemap, canonical, dan gambar preview tidak dibuat.')
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)), 'VITE_')
  return {
    plugins: [react(), dreamsHtml(env)],
  }
})