import { lazy, Suspense } from 'react'

const LandingPage = lazy(() => import('./components/pages/LandingPage'))
const DemoPage = lazy(() => import('./components/pages/DemoPage'))

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const CurrentPage = currentPath === '/demo' ? DemoPage : LandingPage

  return (
    <Suspense fallback={null}>
      <CurrentPage />
    </Suspense>
  )
}

export default App
