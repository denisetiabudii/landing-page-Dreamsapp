import { renderToString } from 'react-dom/server'

import { loadPage } from './pageLoaders'
import { routes } from './routes'

export async function render(path) {
  const route = routes.find((item) => item.path === path)
  if (!route) throw new Error(`Halaman tidak terdaftar: ${path}`)

  const Page = await loadPage(route.page)
  return renderToString(<Page {...route.props} />)
}
