import PageShell from '../layout/PageShell'
import About from '../sections/About'
import WhyDreams from '../sections/WhyDreams'
import CTA from '../sections/CTA'

function TentangPage() {
  return (
    <PageShell
      title="Tentang DREAMS"
      lead="Sistem pengelolaan donasi dan operasional lembaga sosial untuk mendukung aktivitas lembaga secara lebih terstruktur."
    >
      <About />
      <WhyDreams />
      <CTA />
    </PageShell>
  )
}

export default TentangPage
