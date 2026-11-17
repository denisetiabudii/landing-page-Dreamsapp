import { ArrowUpRight } from 'lucide-react'

import PageShell from '../layout/PageShell'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import CTA from '../sections/CTA'
import { featurePages } from '../../data/featurePages'

function FeatureDetailPage({ slug }) {
  const page = featurePages[slug]
  if (!page) return null

  return (
    <PageShell
      path={`/fitur/${slug}`}
      title={page.heading}
      lead={page.lead}
    >
      <section className="feature-detail">
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

          .feature-detail__point {
            padding: 24px;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            background: var(--color-white);
            box-shadow: var(--shadow-sm);
          }

          .feature-detail__point h2 {
            margin-bottom: 8px;
            color: var(--color-heading);
            font-size: var(--text-xl);
          }

          .feature-detail__point p {
            color: var(--color-text);
            line-height: 1.7;
          }

          .feature-detail__images {
            display: grid;
            gap: 24px;
          }

          .feature-detail__images img {
            display: block;
            width: 100%;
            height: auto;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            background: var(--color-white);
            box-shadow: var(--shadow-md);
          }

          .feature-detail__related {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 0;
          }

          .feature-detail__related a {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 10px 18px;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-sm);
            color: var(--color-navy);
            font-weight: 600;
            transition: var(--transition);
          }

          .feature-detail__related a:hover {
            border-color: var(--color-primary);
            color: var(--color-primary);
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
                loading="lazy"
              />
            ))}
          </div>

          <div style={{ height: 56 }} />

          <SectionHeading title="Fitur Terkait" align="left" />

          <nav className="feature-detail__related" aria-label="Fitur terkait">
            <a href="/fitur">
              Semua fitur <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {page.related.map((relatedSlug) => (
              <a key={relatedSlug} href={`/fitur/${relatedSlug}`}>
                {featurePages[relatedSlug].title}
                <ArrowUpRight size={16} aria-hidden="true" />
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
