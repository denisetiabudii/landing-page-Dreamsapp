import PageShell from '../layout/PageShell'
import Features from '../sections/Features'

function FiturPage() {
  return (
    <PageShell
      path="/fitur"
      title="Fitur DREAMS untuk Pengelolaan Donasi"
      lead="Kelola donatur, transaksi, prospek, analitik RFM, distribusi bantuan, dan komunikasi WhatsApp dalam satu sistem."
    >
      <Features />
    </PageShell>
  )
}

export default FiturPage