import { ArrowUpRight } from 'lucide-react'

import PageShell from '../layout/PageShell'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import CTA from '../sections/CTA'
import { features } from '../../data/features'
import { featurePages } from '../../data/featurePages'

function FeatureDetailPage({ slug }) {
  const page = featurePages[slug]
  if (!page) return null

  const href = `/fitur/${slug}`
  const current = features.find((feature) => feature.href === href)
  const others = features.filter((feature) => feature.href !== href)

  return (
    <PageShell
      path={href}
      title={page.heading}
      lead={page.lead}
      accent={current?.color}
    >
      <section
        className="feature-detail"
        style={{ '--card-color': current?.color ?? '#087bee' }}
      >
        <style>{`
          .feature-detail {
            padding: var(--section-spacing) 0 calc(var(--section-spacing) * 0.6);
          }

          .feature-detail__points {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 20px;
            margin-bottom: 56px;
          }

          /* Warna kartu sama dengan kartu bertumpuk di halaman Fitur */
          .feature-detail__point {
            position: relative;
            overflow: hidden;
            padding: 28px;
            border-radius: var(--radius-lg);
            color: #ffffff;
            background: linear-gradient(
              135deg,
              color-mix(in srgb, var(--card-color) 85%, #102d50),
              var(--card-color) 55%,
              color-mix(in srgb, var(--card-color) 75%, #000000)
            );
            box-shadow: 0 18px 40px -22px var(--card-color);
          }

          .feature-detail__point::after {
            content: '';
            position: absolute;
            top: -60px;
            right: -60px;
            width: 170px;
            height: 170px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            pointer-events: none;
          }

          .feature-detail__point h2,
          .feature-detail__point p {
            position: relative;
            z-index: 1;
          }

          .feature-detail__point h2 {
            margin-bottom: 10px;
            color: #ffffff;
            font-size: var(--text-xl);
            letter-spacing: -0.02em;
          }

          .feature-detail__point p {
            color: rgba(255, 255, 255, 0.92);
            line-height: 1.75;
          }

          /* Panel berwarna agar gambar lebih menonjol */
          .feature-detail__images {
            display: grid;
            justify-items: center;
            gap: 28px;
            padding: 40px 24px;
            border-radius: 28px;
            background: linear-gradient(
              145deg,
              color-mix(in srgb, var(--card-color) 30%, #ffffff),
              color-mix(in srgb, var(--card-color) 12%, #ffffff)
            );
            border: 1px solid color-mix(in srgb, var(--card-color) 25%, #ffffff);
          }

          /* Ilustrasi persegi dengan latar transparan */
          .feature-detail__images img {
            display: block;
            width: min(100%, 460px);
            height: auto;
            filter: drop-shadow(0 24px 30px rgba(8, 30, 70, 0.22));
          }

          .feature-detail__spacer {
            height: 56px;
          }

          @media (max-width: 640px) {
            .feature-detail__images {
              padding: 24px 12px;
              border-radius: 20px;
            }
          }

          .feature-detail__related {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 14px;
          }

          /* Tiap tautan memakai warna fiturnya (sama dengan kartu bertumpuk) */
          .feature-detail__related a {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 16px 20px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: var(--radius-md, 14px);
            color: #ffffff;
            font-weight: 600;
            background: linear-gradient(
              135deg,
              color-mix(in srgb, var(--card-color) 85%, #102d50),
              var(--card-color) 55%,
              color-mix(in srgb, var(--card-color) 75%, #000000)
            );
            transition: var(--transition);
          }

          /* "Semua fitur" bukan fitur tertentu: warna footer */
          .feature-detail__related a.feature-detail__all {
            background: linear-gradient(
              120deg,
              #091d35 0%,
              #10385e 55%,
              #07549c 100%
            );
          }

          .feature-detail__related a:hover {
            transform: translateY(-3px);
            box-shadow: 0 14px 30px -18px var(--card-color, #07549c);
          }

          .feature-detail__related svg {
            flex-shrink: 0;
            color: rgba(255, 255, 255, 0.85);
          }
        `}</style>

        <Container>
          <div className="feature-detail__points">
            {page.points.map((point) => (
              <article key={point.title} className="feature-detail__point">
                <h2>{point.title}</h2>
                <p>{point.text}</p>
              </article>
            ))}
          </div>

          <div className="feature-detail__images">
            {page.images.map((image) => (
              <img
                key={image.alt}
                src={image.src}
                alt={image.alt}
                width="1254"
                height="1254"
                loading="lazy"
              />
            ))}
          </div>

          <div className="feature-detail__spacer" />

          <SectionHeading title="Fitur Terkait" align="left" />

          <nav className="feature-detail__related" aria-label="Fitur terkait">
            <a href="/fitur" className="feature-detail__all">
              Semua fitur <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            {others.map((feature) => (
              <a
                key={feature.href}
                href={feature.href}
                style={{ '--card-color': feature.color }}
              >
                {feature.title}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <CTA />
    </PageShell>
  )
}

export default FeatureDetailPage