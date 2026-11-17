import { ArrowUpRight } from 'lucide-react'

import PageShell from '../layout/PageShell'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Features from '../sections/Features'
import CTA from '../sections/CTA'
import { features } from '../../data/features'

function FiturPage() {
  return (
    <PageShell
      path="/fitur"
      title="Fitur DREAMS untuk Pengelolaan Donasi"
      lead="Kelola donatur, transaksi, prospek, analitik RFM, distribusi bantuan, dan komunikasi WhatsApp dalam satu sistem."
    >
      <Features />

      <section className="fitur-explain">
        <style>{`
          .fitur-explain {
            padding: var(--section-spacing) 0;
          }

          .fitur-explain__list {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px;
          }

          .fitur-explain__item {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 28px;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            background: var(--color-white);
            box-shadow: var(--shadow-sm);
          }

          .fitur-explain__icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 14px;
            color: var(--color-primary);
            background: var(--color-light-blue);
          }

          .fitur-explain__item h3 {
            color: var(--color-heading);
            font-size: var(--text-xl);
            font-weight: 700;
            letter-spacing: -0.02em;
          }

          .fitur-explain__item p {
            color: var(--color-text);
            line-height: 1.75;
          }

          .fitur-explain__link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: auto;
            color: var(--color-primary);
            font-size: var(--text-sm);
            font-weight: 600;
          }

          .fitur-explain__link:hover {
            text-decoration: underline;
            text-underline-offset: 4px;
          }

          @media (max-width: 800px) {
            .fitur-explain {
              padding: 72px 0;
            }

            .fitur-explain__list {
              grid-template-columns: 1fr;
            }

            .fitur-explain__item {
              padding: 22px;
            }
          }
        `}</style>

        <Container>
          <SectionHeading
            eyebrow="Penjelasan Fitur"
            title="Apa yang Dapat Dikelola dengan DREAMS"
            description="Enam modul yang saling terhubung dalam satu sistem."
          />

          <div className="fitur-explain__list">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <article className="fitur-explain__item" key={feature.title}>
                  <span className="fitur-explain__icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={2} />
                  </span>

                  <h3>{feature.title}</h3>
                  <p>{feature.detail}</p>

                  {feature.href && (
                    <a href={feature.href} className="fitur-explain__link">
                      Pelajari {feature.title}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <CTA />
    </PageShell>
  )
}

export default FiturPage
