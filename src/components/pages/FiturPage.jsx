import { ArrowUpRight } from 'lucide-react'

import PageShell from '../layout/PageShell'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Features from '../sections/Features'
import CTA from '../sections/CTA'
import { featurePages } from '../../data/featurePages'

function FiturPage() {
  return (
    <PageShell
      path="/fitur"
      title="Fitur DREAMS untuk Pengelolaan Donasi"
      lead="Kelola donatur, transaksi, prospek, analitik RFM, distribusi bantuan, dan komunikasi WhatsApp dalam satu sistem."
    >
      <Features />

      <section className="fitur-detail">
        <style>{`
          .fitur-detail {
            padding: var(--section-spacing) 0;
          }

          .fitur-detail__grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 20px;
          }

          .fitur-detail__card {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 24px;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            background: var(--color-white);
            box-shadow: var(--shadow-sm);
            transition: var(--transition);
          }

          .fitur-detail__card:hover {
            border-color: var(--color-primary);
            transform: translateY(-3px);
          }

          .fitur-detail__card h3 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: var(--color-heading);
            font-size: var(--text-xl);
          }

          .fitur-detail__card p {
            color: var(--color-text);
            line-height: 1.7;
          }
        `}</style>

        <Container>
          <SectionHeading
            eyebrow="Pelajari Lebih Lanjut"
            title="Telusuri Fitur Utama DREAMS"
          />

          <div className="fitur-detail__grid">
            {Object.entries(featurePages).map(([slug, page]) => (
              <a
                key={slug}
                href={`/fitur/${slug}`}
                className="fitur-detail__card"
              >
                <h3>
                  {page.title}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </h3>
                <p>{page.lead}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </PageShell>
  )
}

export default FiturPage
