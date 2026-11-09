import { CheckCircle2 } from "lucide-react";

// =========================================
// DEMO CAPTION
// =========================================

function DemoCaption() {
  return (
    <>
      <style>{`
        /* =====================================
           DEMO INTRO
        ====================================== */

        .demo-page .demo-intro {
          position: relative;
          top: auto;

          width: 100%;
          max-width: 490px;

          margin: 0;
          padding: 24px 0;

          text-align: left;
        }

        /* =====================================
           EYEBROW
        ====================================== */

        .demo-page .demo-intro__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 18px;
          padding: 7px 12px;

          color: var(--color-primary);

          font-size: var(--text-sm);
          font-weight: 700;

          background: var(--color-light-blue);

          border: 1px solid rgb(8 123 238 / 12%);
          border-radius: 999px;
        }

        .demo-page .demo-intro__eyebrow::before {
          width: 7px;
          height: 7px;

          content: "";

          background: var(--color-primary);
          border-radius: 50%;
        }

        /* =====================================
           HEADING
        ====================================== */

        .demo-page .demo-intro h1 {
          color: var(--color-heading);

          font-size: clamp(2.35rem, 4.4vw, 3.55rem);
          line-height: 1.15;
          letter-spacing: -0.055em;
        }

        /* =====================================
           DESCRIPTION
        ====================================== */

        .demo-page .demo-intro > p {
          margin: 20px 0 0;

          color: var(--color-text);

          font-size: var(--text-lg);
          line-height: 1.75;
        }

        .demo-page .demo-intro .demo-intro__support {
          margin-top: 14px;

          font-size: var(--text-base);
        }

        /* =====================================
           HIGHLIGHTS
        ====================================== */

        .demo-page .demo-intro__highlights {
          display: grid;
          gap: 14px;

          margin-top: 30px;
        }

        .demo-page .demo-intro__highlights span {
          display: flex;
          align-items: center;
          gap: 11px;

          color: var(--color-heading);

          font-size: var(--text-sm);
          font-weight: 600;
        }

        .demo-page .demo-intro__highlights svg {
          flex: 0 0 auto;

          color: var(--color-primary);
        }

        /* =====================================
           RESPONSIVE
        ====================================== */

        @media (max-width: 800px) {
          .demo-page .demo-intro {
            position: relative;
            top: auto;

            max-width: none;

            margin-bottom: 0;
            padding: 0;

            text-align: left;
          }

          .demo-page .demo-intro h1 {
            font-size: clamp(2rem, 9vw, 2.75rem);
          }

          .demo-page .demo-intro > p {
            font-size: var(--text-base);
          }

          .demo-page .demo-intro__highlights {
            gap: 11px;
            margin-top: 22px;
          }
        }
      `}</style>

      <section className="demo-intro" aria-labelledby="demo-title">
        <span className="demo-intro__eyebrow">Demo Aplikasi</span>

        <h1 id="demo-title">Jadwalkan Demo DREAMS</h1>

        <p>
          Kenali bagaimana DREAMS membantu lembaga mengelola donatur, transaksi,
          prospek, dan aktivitas operasional melalui satu sistem terintegrasi.
        </p>

        <p className="demo-intro__support">
          Lengkapi formulir berikut. Tim DREAMS akan menindaklanjuti permintaan
          demo Anda.
        </p>

        <div className="demo-intro__highlights">
          <span>
            <CheckCircle2 size={18} />
            Pengelolaan donatur dan transaksi
          </span>

          <span>
            <CheckCircle2 size={18} />
            Analitik dan aktivitas lembaga
          </span>

          <span>
            <CheckCircle2 size={18} />
            Sesi demo sesuai waktu pilihan
          </span>
        </div>
      </section>
    </>
  );
}

export default DemoCaption;
