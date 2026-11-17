import PageShell from '../layout/PageShell'
import AboutDetail from '../sections/AboutDetail'
import CTA from '../sections/CTA'

function TentangPage() {
  return (
    <PageShell
      path="/tentang"
      title="Tentang DREAMS"
      lead="Sistem pengelolaan donasi dan operasional lembaga sosial untuk mendukung aktivitas lembaga secara lebih terstruktur."
    >
      <AboutDetail />
      <CTA />
    </PageShell>
  )
}

export default TentangPage
