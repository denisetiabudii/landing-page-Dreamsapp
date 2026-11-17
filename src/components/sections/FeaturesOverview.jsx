import { ArrowRight, ArrowUpRight } from 'lucide-react'

import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Button from '../common/Button'
import { features } from '../../data/features'

// Ringkasan fitur untuk beranda. Versi lengkap ada di halaman /fitur.
function FeaturesOverview() {
  return (
    <>
      <style>{`
        .features-overview {
          padding: var(--section-spacing) 0;
          background: var(--color-surface);
        }

        .features-overview__grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .features-overview__card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 28px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-white);
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .features-overview__card:hover {
          border-color: var(--color-primary);
          transform: translateY(-3px);
        }

        .features-overview__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          color: var(--color-primary);
          background: var(--color-light-blue);
        }

        .features-overview__card h3 {
          color: var(--color-heading);
          font-size: var(--text-xl);
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .features-overview__card p {
          color: var(--color-text);
          line-height: 1.7;
        }

        .features-overview__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: auto;
          padding-top: 6px;
          color: var(--color-primary);
          font-size: var(--text-sm);
          font-weight: 600;
        }

        .features-overview__link:hover {
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .features-overview__action {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }

        @media (max-width: 1024px) {
          .features-overview__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .features-overview {
            padding: 72px 0;
          }

          .features-overview__grid {
            grid-template-columns: 1fr;
          }

          .features-overview__card {
            padding: 22px;
          }
        }
      `}</style>

      <section className="features-overview" id="ringkasan-fitur">
        <Container>
          <SectionHeading
            eyebrow="Fitur DREAMS"
            title="Fitur Utama DREAMS"
            description="Enam modul yang membantu lembaga mengelola donatur, transaksi, prospek, analitik, distribusi bantuan, dan komunikasi."
          />

          <div className="features-overview__grid">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <article className="features-overview__card" key={feature.title}>
                  <span className="features-overview__icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={2} />
                  </span>

                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>

                  <a
                    href={feature.href ?? '/fitur'}
                    className="features-overview__link"
                  >
                    Selengkapnya
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </article>
              )
            })}
          </div>

          <div className="features-overview__action">
            <Button href="/fitur">
              Lihat Semua Fitur
              <ArrowRight size={18} />
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default FeaturesOverview
