import { ArrowUpRight } from "lucide-react";

// =========================================
// DEMO SUBMIT BUTTON
// =========================================

function DemoSubmitButton({ isSubmitting, isFormValid }) {
  return (
    <>
      <style>{`
        .demo-page .demo-form button.demo-form__submit.button.button--primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 50px;
          margin-top: 30px;
          padding: 13px 22px;
          color: #ffffff;
          background: #0176d3;
          border: 1px solid #0176d3;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.5;
          box-shadow: none;
          cursor: pointer;
          transition:
            background-color 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .demo-page .demo-form__submit svg {
          transition: transform 0.2s ease;
        }

        .demo-page .demo-form__submit:hover:not(:disabled) {
          color: #ffffff;
          background: #014486;
          border-color: #014486;
          box-shadow: 0 2px 5px rgba(1, 68, 134, 0.15);
        }

        .demo-page .demo-form__submit:hover:not(:disabled) svg {
          transform: translate(2px, -2px);
        }

        .demo-page .demo-form__submit:active:not(:disabled) {
          background: #032d60;
          border-color: #032d60;
        }

        .demo-page .demo-form__submit:focus-visible {
          outline: 2px solid #0176d3;
          outline-offset: 3px;
        }

        .demo-page .demo-form__submit:disabled {
          color: #ffffff;
          background: #a8a8a8;
          border-color: #a8a8a8;
          box-shadow: none;
          cursor: not-allowed;
          opacity: 0.75;
        }

        @media (max-width: 800px) {
          .demo-page .demo-form__submit {
            margin-top: 24px;
          }
        }

        @media (max-width: 380px) {
          .demo-page .demo-form__submit {
            min-height: 48px;
            padding: 12px 16px;
            font-size: 12px;
          }
        }
      `}</style>

      <button
        className="button button--primary demo-form__submit"
        type="submit"
        disabled={!isFormValid || isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Mengirim Pengajuan..." : "Kirim Pengajuan Demo"}

        <ArrowUpRight size={18} />
      </button>
    </>
  );
}

export default DemoSubmitButton;
