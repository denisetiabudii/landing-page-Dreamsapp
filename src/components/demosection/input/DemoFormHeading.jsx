// =========================================
// DEMO FORM HEADING
// =========================================

function DemoFormHeading() {
  return (
    <>
      <style>{`
        .demo-page .demo-form__heading {
          position: relative;
          margin-bottom: 32px;
        }

        .demo-page .demo-form__heading > span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          color: #0176d3;
          background: #f0f8ff;
          border: 1px solid #d8edff;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .demo-page .demo-form__heading h2 {
          margin-top: 18px;
          color: #181818;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -0.025em;
        }

        .demo-page .demo-form__heading p {
          max-width: 480px;
          margin-top: 12px;
          color: #5c5c5c;
          font-size: 14px;
          line-height: 1.7;
        }

        @media (max-width: 800px) {
          .demo-page .demo-form__heading {
            margin-bottom: 26px;
          }
        }

        @media (max-width: 480px) {
          .demo-page .demo-form__heading h2 {
            font-size: 1.4rem;
          }

          .demo-page .demo-form__heading p {
            font-size: 13px;
          }
        }

        @media (max-width: 380px) {
          .demo-page .demo-form__heading h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <div className="demo-form__heading">
        <span>Formulir permintaan</span>

        <h2>Ceritakan kebutuhan lembaga Anda</h2>

        <p>
          Tim DREAMS akan menghubungi Anda untuk menindaklanjuti permintaan
          demo.
        </p>
      </div>
    </>
  )
}

export default DemoFormHeading
