import PageShell from '../layout/PageShell'
import AboutDetail from '../sections/AboutDetail'

function TentangPage() {
  return (
    <PageShell
      path="/tentang"
      title="Tentang DREAMS"
      lead="Sistem pengelolaan donasi dan operasional lembaga sosial untuk mendukung aktivitas lembaga secara lebih terstruktur."
    >
      <AboutDetail />
    </PageShell>
  )
}

export default TentangPage