import {
  Settings2,
  ReceiptText,
  Users,
  ChartNoAxesCombined,
} from "lucide-react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

import {
  clearPointerPosition,
  trackPointerPosition,
} from "../../utils/pointerTracking";

// =========================================
// HOW IT WORKS — DATA
// =========================================

const steps = [
  {
    icon: Settings2,
    title: "Kelola Data dan Referensi",
    description:
      "Kelola data donatur serta referensi pendukung seperti program, channel donasi, segmen, dan metode pembayaran.",
  },
  {
    icon: ReceiptText,
    title: "Catat Aktivitas Donasi",
    description:
      "Kelola informasi transaksi donasi untuk membantu pencatatan dan pemantauan aktivitas donasi.",
  },
  {
    icon: Users,
    title: "Bangun Hubungan dengan Donatur",
    description:
      "Kelola data prospek dan calon donatur, termasuk informasi tindak lanjut dan respons.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Pantau dan Evaluasi",
    description:
      "Gunakan dashboard dan analitik RFM untuk melihat aktivitas transaksi, pencapaian target, serta karakteristik donatur.",
  },
];

// =========================================
// HOW IT WORKS — COMPONENT
// =========================================

function HowItWorks() {
  return (
    <>
      {/* =========================================
          HOW IT WORKS — STYLES
      ========================================= */}

      <style>{`
        /* =========================================
           HOW IT WORKS SECTION
        ========================================= */

        .how-it-works {
          background: var(--color-surface);
        }

        .how-it-works__grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          margin-top: 58px;
        }

        /* =========================================
           WORKFLOW CARD
        ========================================= */

        .workflow-card {
          position: relative;
          isolation: isolate;
          display: flex;
          border-radius: var(--radius-lg);
        }

        /* Pointer Glow */

        .workflow-card__glow {
          position: absolute;
          inset: 0;
          z-index: 2;
          padding: 4px;
          border-radius: inherit;

          background: radial-gradient(
            ellipse 140px 100px at var(--pointer-x, 50%) var(--pointer-y, 50%),
            rgba(71, 170, 250, 0.9),
            rgba(16, 185, 129, 0) 100%
          );

          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);

          -webkit-mask-composite: xor;

          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);

          mask-composite: exclude;

          filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.55));

          opacity: 0;
          pointer-events: none;
          transition: opacity 200ms ease;
        }

        /* Card Surface */

        .workflow-card__surface {
          position: relative;
          z-index: 1;
          flex: 1;
          min-height: 260px;
          padding: 28px;

          background: #102d50;
          border: 1px solid #1d4775;
          border-radius: var(--radius-lg);

          box-shadow: 0 10px 30px rgba(16, 45, 80, 0.18);

          transition:
            transform var(--transition),
            box-shadow var(--transition),
            background var(--transition),
            border-color var(--transition);
        }

        /* Card Hover */

        .workflow-card:hover .workflow-card__surface {
          background: #163b65;
          border-color: #4fc3e0;

          transform: translateY(-5px);

          box-shadow: 0 18px 40px rgba(8, 123, 238, 0.25);
        }

        /* Pointer Glow Hover */

        @media (hover: hover) and (pointer: fine) {
          .workflow-card:hover .workflow-card__glow {
            opacity: 1;
            transform: translateY(-5px);
          }
        }

        /* Glow remains visible on hover */

        .workflow-card:hover .workflow-card__glow {
          opacity: 1;
        }

        /* =========================================
           WORKFLOW CARD CONTENT
        ========================================= */

        .workflow-card__icon {
          display: grid;
          width: 48px;
          height: 48px;
          margin-bottom: 32px;
          place-items: center;

          color: #ffffff;
          background: #087bee;
          border: 1px solid #258df2;
          border-radius: var(--radius-md);
        }

        .workflow-card h3 {
          margin-bottom: 12px;

          color: #ffffff;
          font-size: var(--text-lg);
          line-height: 1.4;
        }

        .workflow-card p {
          color: #c7d8eb;
          font-size: var(--text-sm);
          line-height: 1.8;
        }

        /* =========================================
           RESPONSIVE — TABLET
        ========================================= */

        @media (max-width: 992px) {
          .how-it-works__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        /* =========================================
           RESPONSIVE — MOBILE
        ========================================= */

        @media (max-width: 576px) {
          .how-it-works__grid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-top: 38px;
          }

          .workflow-card__surface {
            min-height: auto;
            padding: 16px;
          }

          .workflow-card__icon {
            margin-bottom: 20px;
          }

          .workflow-card h3 {
            font-size: 0.95rem;
          }

          .workflow-card p {
            font-size: 0.78rem;
            line-height: 1.6;
          }
        }
      `}</style>

      {/* =========================================
          HOW IT WORKS — LAYOUT
      ========================================= */}

      <section className="how-it-works section" id="cara-kerja">
        <Container>
          <SectionHeading
            eyebrow="Cara Kerja"
            title="Dari pengelolaan data hingga evaluasi aktivitas."
            description="Berikut gambaran aktivitas pengelolaan lembaga yang dapat didukung oleh berbagai modul DREAMS."
          />

          <div className="how-it-works__grid">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  className="workflow-card"
                  key={step.title}
                  onPointerMove={trackPointerPosition}
                  onPointerLeave={clearPointerPosition}
                >
                  <span className="workflow-card__glow" aria-hidden="true" />

                  <div className="workflow-card__surface">
                    <div className="workflow-card__icon">
                      <Icon size={23} />
                    </div>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}

export default HowItWorks;
