import { ChevronDown } from 'lucide-react'

import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import { faqItems } from '../../data/faq'

// Data terstruktur FAQ (dibaca Google).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

// Memakai <details> bawaan HTML: dapat dibuka tanpa JavaScript dan seluruh
// jawaban tetap terbaca oleh mesin pencari.
function Faq() {
  return (
    <>
      <style>{`
        .faq {
          padding: var(--section-spacing) 0;
          background: var(--color-surface);
        }

        .faq__list {
          display: grid;
          gap: 14px;
          max-width: 860px;
          margin: 0 auto;
        }

        .faq__item {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-white);
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .faq__item[open] {
          border-color: var(--color-primary);
        }

        .faq__question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 24px;
          color: var(--color-heading);
          font-size: var(--text-lg);
          font-weight: 700;
          line-height: 1.4;
          list-style: none;
          cursor: pointer;
        }

        .faq__question::-webkit-details-marker {
          display: none;
        }

        .faq__question svg {
          flex-shrink: 0;
          color: var(--color-primary);
          transition: transform 0.25s ease;
        }

        .faq__item[open] .faq__question svg {
          transform: rotate(180deg);
        }

        .faq__answer {
          padding: 0 24px 22px;
          color: var(--color-text);
          line-height: 1.8;
        }

        @media (max-width: 640px) {
          .faq {
            padding: 72px 0;
          }

          .faq__question {
            padding: 16px 18px;
            font-size: var(--text-base);
          }

          .faq__answer {
            padding: 0 18px 18px;
          }
        }
      `}</style>

      <section className="faq" id="faq">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replaceAll('<', '\\u003c'),
          }}
        />

        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Pertanyaan yang Sering Diajukan"
            description="Jawaban singkat seputar DREAMS untuk lembaga sosial."
          />

          <div className="faq__list">
            {faqItems.map((item) => (
              <details className="faq__item" key={item.question}>
                <summary className="faq__question">
                  {item.question}
                  <ChevronDown size={22} aria-hidden="true" />
                </summary>
                <p className="faq__answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default Faq
