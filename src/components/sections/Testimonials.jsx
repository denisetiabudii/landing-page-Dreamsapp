import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import { testimonials } from '../../data/testimonials'

function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <>
      <style>{`
        .testimonials {
          padding: var(--section-spacing) 0;
          background: var(--color-surface);
        }

        .testimonials__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .testimonials__card {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 0;
          padding: 28px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-white);
          box-shadow: var(--shadow-sm);
        }

        .testimonials__quote {
          color: var(--color-text);
          font-size: var(--text-base);
          line-height: 1.75;
        }

        .testimonials__author {
          margin-top: auto;
        }

        .testimonials__name {
          display: block;
          color: var(--color-heading);
          font-weight: 700;
        }

        .testimonials__meta {
          color: var(--color-muted);
          font-size: var(--text-sm);
        }

        @media (max-width: 480px) {
          .testimonials__card {
            padding: 22px;
          }
        }
      `}</style>

      <section className="testimonials" id="testimoni">
        <Container>
          <SectionHeading
            eyebrow="Testimoni"
            title="Dipercaya Lembaga Pengguna DREAMS"
            description="Cerita dari lembaga yang sudah mengelola donasinya bersama DREAMS."
          />

          <div className="testimonials__grid">
            {testimonials.map((item) => (
              <figure
                className="testimonials__card"
                key={`${item.name}-${item.organization}`}
              >
                <blockquote className="testimonials__quote">
                  {item.quote}
                </blockquote>

                <figcaption className="testimonials__author">
                  <strong className="testimonials__name">{item.name}</strong>
                  <span className="testimonials__meta">
                    {[item.role, item.organization].filter(Boolean).join(' · ')}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default Testimonials
