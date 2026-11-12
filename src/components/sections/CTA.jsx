import { ArrowUpRight } from 'lucide-react'

import Container from '../common/Container'
import Button from '../common/Button'
import { siteConfig } from '../../data/siteConfig'

// =========================================
// CTA SECTION
// =========================================

function CTA() {
  return (
    <section className="cta" id="ajakan-demo">
      <style>{`
        /* =========================================
           CTA SECTION
        ========================================= */

        .cta {
          position: relative;
          overflow: hidden;
          padding: 90px 0;
          color: var(--color-white);
          background: var(--color-navy);
        }

        /* =========================================
           CTA CONTENT
        ========================================= */

        .cta .cta__content {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        /* =========================================
           CTA EYEBROW
        ========================================= */

        .cta .cta__eyebrow {
          display: inline-block;
          margin-bottom: 20px;
          color: #9bcfff;
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* =========================================
           CTA HEADING
        ========================================= */

        .cta .cta__content h2 {
          margin-bottom: 20px;
          font-size: clamp(2rem, 5vw, 3.4rem);
          line-height: 1.15;
          letter-spacing: -0.04em;
        }

        /* =========================================
           CTA DESCRIPTION
        ========================================= */

        .cta .cta__content p {
          max-width: 620px;
          margin: 0 auto;
          color: #c5d4e5;
          line-height: 1.8;
        }

        /* =========================================
           CTA BUTTON
        ========================================= */

        .cta .cta__content .button {
          margin-top: 32px;
        }

        /* =========================================
           CTA NOTE
        ========================================= */

        .cta .cta__content .cta__note {
          margin-top: 24px;
          color: #c5d4e5;
          font-size: var(--text-xs);
        }
      `}</style>

      <Container>
        <div className="cta__content">
          <span className="cta__eyebrow">Kenali DREAMS Lebih Dekat</span>

          <h2>Ingin melihat bagaimana DREAMS mendukung lembaga Anda?</h2>

          <p>
            Jadwalkan demo untuk mengenal fitur pengelolaan donatur, transaksi,
            prospek, analitik, dan penyaluran bantuan.
          </p>

          <Button href={siteConfig.demoUrl} variant="secondary">
            Jadwalkan Demo
            <ArrowUpRight size={18} />
          </Button>

          <p className="cta__note">
            Pesan awal akan disiapkan melalui WhatsApp.
          </p>
        </div>
      </Container>
    </section>
  )
}

export default CTA
