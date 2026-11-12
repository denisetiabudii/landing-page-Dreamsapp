import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, ArrowUpRight, CircleAlert, X } from 'lucide-react'
// =========================================
// WHATSAPP ICON
// =========================================

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="dreams-status-whatsapp-icon"
      fill="currentColor"
    >
      <path d="M16.01 3.2C8.96 3.2 3.23 8.93 3.23 15.98c0 2.25.59 4.45 1.7 6.4L3.2 28.8l6.59-1.73a12.7 12.7 0 0 0 6.22 1.62h.01c7.05 0 12.78-5.73 12.78-12.78A12.73 12.73 0 0 0 16.01 3.2Zm0 23.35h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.91 1.03 1.04-3.81-.25-.4a10.57 10.57 0 0 1-1.63-5.68c0-5.83 4.74-10.57 10.58-10.57 2.82 0 5.47 1.1 7.46 3.1a10.5 10.5 0 0 1 3.1 7.47c0 5.83-4.74 10.57-10.59 10.57Zm5.8-7.92c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.84 1.05-1.03 1.27-.19.22-.38.25-.7.08-.32-.16-1.34-.5-2.55-1.59-.94-.83-1.57-1.86-1.75-2.18-.18-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.02-2.44-.27-.64-.55-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.86.69.78.25 1.49.22 2.05.13.63-.09 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.13-.3-.21-.62-.37Z" />
    </svg>
  )
}

// =========================================
// DEMO FORM STATUS
// =========================================

function DemoFormStatus({ status }) {
  const [dismissedStatus, setDismissedStatus] = useState(null)
  const [previousStatus, setPreviousStatus] = useState(status)
  const [whatsappAttempt, setWhatsappAttempt] = useState(null)
  // RESET DISMISSED STATUS
  if (status !== previousStatus) {
    setPreviousStatus(status)
    setDismissedStatus(null)
    setWhatsappAttempt(null)
  }

  const isVisible = Boolean(status) && dismissedStatus !== status

  // DISMISS STATUS
  const handleClose = () => {
    setDismissedStatus(status)
  }

  // OPEN WHATSAPP
  // Dibuka lewat klik (bukan <a href>) agar nomor tidak terlihat
  // di status bar browser saat kursor diarahkan ke tombol.
  const handleOpenWhatsapp = () => {
    if (!status?.url) return

    const popup = window.open(status.url, '_blank')

    if (popup) {
      popup.opener = null
      setWhatsappAttempt('opened')
    } else {
      setWhatsappAttempt('blocked')
    }
  }

  // ESCAPE KEY
  useEffect(() => {
    if (!isVisible) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setDismissedStatus(status)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isVisible, status])

  // LOCK BACKGROUND SCROLL
  useEffect(() => {
    if (!isVisible) return

    const scrollY = window.scrollY

    const previousBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    }

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.position = previousBodyStyles.position
      document.body.style.top = previousBodyStyles.top
      document.body.style.width = previousBodyStyles.width
      document.body.style.overflow = previousBodyStyles.overflow

      window.scrollTo({
        top: scrollY,
        behavior: 'instant',
      })
    }
  }, [isVisible])

  // HIDE STATUS
  if (!isVisible) {
    return null
  }

  const isSuccess = status.status === 'success'

  // RENDER
  return createPortal(
    <>
      <style>{`
        .dreams-status-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 16px;

          background: rgba(12, 32, 59, 0.48);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);

          overflow: hidden;
          overscroll-behavior: none;
          touch-action: none;

          animation: dreams-overlay-enter 0.22s ease;
        }

        .dreams-status-modal {
          position: relative;

          width: min(100%, 440px);
          max-height: calc(100dvh - 32px);

          overflow: hidden;
          overscroll-behavior: none;
          touch-action: none;

          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 22px;

          box-shadow:
            0 30px 80px rgba(8, 31, 66, 0.2),
            0 8px 24px rgba(8, 31, 66, 0.08);

          animation: dreams-modal-enter 0.28s
            cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* ACCENT */
        .dreams-status-accent {
          position: absolute;
          top: 0;
          left: 0;

          width: 100%;
          height: 4px;

          background: linear-gradient(
            90deg,
            #0649b8 0%,
            #087bee 48%,
            #56b5ff 100%
          );
        }

        .dreams-status-accent--success {
          background: linear-gradient(
            90deg,
            #15803d 0%,
            #22c55e 48%,
            #86efac 100%
          );
        }

        /* CLOSE BUTTON */
.dreams-status-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  color: #64748b;
  background: #f8fafc;

  border: 1px solid #e2e8f0;
  border-radius: 10px;

  cursor: pointer;

  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.dreams-status-close:hover {
  color: #102d50;
  background: #eef2f7;
  border-color: #cbd5e1;

  transform: rotate(90deg);
}

.dreams-status-close:focus-visible {
  outline: 2px solid #087bee;
  outline-offset: 2px;
}

.dreams-status-close:active {
  transform: rotate(90deg) scale(0.95);
}

        /* CONTENT */
        .dreams-status-content {
          padding: 32px 30px 24px;
          text-align: center;
        }

        /* VISUAL */
        .dreams-status-visual {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 82px;
          height: 82px;

          margin: 0 auto 20px;
        }

        .dreams-status-visual::before {
          content: "";

          position: absolute;
          inset: 0;

          background: #eaf4ff;
          border: 1px solid #d9eaff;
          border-radius: 24px;

          transform: rotate(-6deg);
        }

        .dreams-status-visual--success::before {
          background: #ecfdf3;
          border-color: #bbf7d0;
        }

        .dreams-status-visual::after {
          content: "";

          position: absolute;
          inset: 7px;

          background: rgba(8, 123, 238, 0.06);
          border-radius: 19px;
        }

        .dreams-status-visual--success::after {
          background: rgba(34, 197, 94, 0.07);
        }

        /* ICON */
        .dreams-status-icon {
          position: relative;
          z-index: 1;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 56px;
          height: 56px;

          color: #087bee;
          background: #ffffff;

          border: 1px solid #dbeafe;
          border-radius: 18px;

          box-shadow: 0 8px 22px rgba(8, 123, 238, 0.12);
        }

        .dreams-status-icon--success {
          color: #16a34a;
          border-color: #bbf7d0;

          box-shadow: 0 8px 22px rgba(22, 163, 74, 0.12);
        }

        .dreams-status-icon--error {
          color: #dc2626;
          background: #fff7f7;
          border-color: #fee2e2;

          box-shadow: 0 8px 22px rgba(220, 38, 38, 0.08);
        }

        /* EYEBROW */
        .dreams-status-eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;

          margin-bottom: 11px;
          padding: 6px 11px;

          color: #087bee;
          background: #eff6ff;

          border: 1px solid #e0edff;
          border-radius: 100px;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.7px;
          text-transform: uppercase;
        }

        .dreams-status-eyebrow--success {
          color: #15803d;
          background: #f0fdf4;
          border-color: #dcfce7;
        }

        /* TITLE */
        .dreams-status-title {
          margin: 0;

          color: #102d50;

          font-size: 23px;
          font-weight: 750;
          letter-spacing: -0.7px;
          line-height: 1.35;
        }

        /* DESCRIPTION */
        .dreams-status-description {
          max-width: 340px;

          margin: 11px auto 0;

          color: #718096;

          font-size: 13px;
          font-weight: 400;
          line-height: 1.75;
        }

        /* ACTIONS */
        .dreams-status-actions {
          display: flex;
          flex-direction: column;
          gap: 9px;

          margin-top: 23px;
        }

        /* WHATSAPP BUTTON */
        .dreams-status-whatsapp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          width: 100%;
          min-height: 49px;

          padding: 12px 17px;

          color: #ffffff;

          background: linear-gradient(
            135deg,
            #087bee 0%,
            #065bc7 100%
          );

          border: 1px solid #087bee;
          border-radius: 12px;

          box-shadow: 0 7px 18px rgba(8, 123, 238, 0.2);

          font-family: inherit;
          font-size: 13px;
          font-weight: 650;
          text-decoration: none;

          cursor: pointer;

          transition:
            box-shadow 0.2s ease,
            transform 0.2s ease,
            background 0.2s ease;
        }

        .dreams-status-whatsapp:hover {
          background: linear-gradient(
            135deg,
            #066cda 0%,
            #0649b8 100%
          );

          box-shadow: 0 10px 24px rgba(8, 123, 238, 0.28);
          transform: translateY(-2px);
        }

        .dreams-status-whatsapp:active {
          transform: translateY(0);
        }

        .dreams-status-whatsapp-icon {
          display: block;

          width: 20px;
          height: 20px;

          flex: 0 0 20px;

          color: #ffffff;
        }

        /* CANCEL BUTTON */
        .dreams-status-cancel {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          min-height: 40px;

          padding: 10px 16px;

          color: #64748b;
          background: transparent;

          border: 1px solid transparent;
          border-radius: 11px;

          font-size: 12px;
          font-weight: 600;

          cursor: pointer;

          transition:
            color 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease;
        }

        .dreams-status-cancel:hover {
          color: #102d50;
          background: #f7f9fc;
          border-color: #edf1f7;
        }

        /* FOOTER */
        .dreams-status-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;

          margin-top: 15px;

          color: #a0aec0;

          font-size: 10px;
          line-height: 1.5;
        }

        .dreams-status-footer--success {
          color: #16a34a;
        }

        /* ANIMATIONS */
        @keyframes dreams-overlay-enter {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes dreams-modal-enter {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* MOBILE */
        @media (max-width: 480px) {
          .dreams-status-overlay {
            padding: 14px;
          }

          .dreams-status-modal {
            width: 100%;
            max-width: 400px;

            max-height: calc(100dvh - 28px);

            border-radius: 20px;

            overflow: hidden;
            overscroll-behavior: none;
            touch-action: none;
          }

          .dreams-status-content {
            padding: 27px 21px 21px;
          }

          .dreams-status-visual {
            width: 70px;
            height: 70px;

            margin-bottom: 17px;
          }

          .dreams-status-visual::before {
            border-radius: 21px;
          }

          .dreams-status-visual::after {
            inset: 6px;
            border-radius: 16px;
          }

          .dreams-status-icon {
            width: 49px;
            height: 49px;

            border-radius: 16px;
          }

          .dreams-status-title {
            font-size: 21px;
            letter-spacing: -0.5px;
          }

          .dreams-status-description {
            margin-top: 9px;

            font-size: 12px;
            line-height: 1.7;
          }

          .dreams-status-actions {
            margin-top: 19px;
          }

          .dreams-status-whatsapp {
            min-height: 46px;
            padding: 11px 14px;

            font-size: 12px;
          }

          .dreams-status-cancel {
            min-height: 38px;

            font-size: 11px;
          }

          .dreams-status-footer {
            margin-top: 12px;

            font-size: 9px;
          }
        }

        /* SHORT SCREEN */
        @media (max-height: 650px) {
          .dreams-status-content {
            padding-top: 20px;
            padding-bottom: 17px;
          }

          .dreams-status-visual {
            width: 58px;
            height: 58px;

            margin-bottom: 12px;
          }

          .dreams-status-visual::before {
            border-radius: 17px;
          }

          .dreams-status-visual::after {
            inset: 5px;
            border-radius: 13px;
          }

          .dreams-status-icon {
            width: 43px;
            height: 43px;

            border-radius: 13px;
          }

          .dreams-status-title {
            font-size: 20px;
          }

          .dreams-status-description {
            margin-top: 7px;
            line-height: 1.6;
          }

          .dreams-status-actions {
            margin-top: 14px;
          }

          .dreams-status-footer {
            margin-top: 9px;
          }
        }

        /* REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .dreams-status-overlay,
          .dreams-status-modal {
            animation: none;
          }

          .dreams-status-whatsapp,
          .dreams-status-cancel {
            transition: none;
          }
        }
      `}</style>

      <div className="dreams-status-overlay" role="presentation">
        <div
          className="dreams-status-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dreams-status-title"
          aria-describedby="dreams-status-description"
        >
          {/* ACCENT */}
          <div
            className={`dreams-status-accent ${
              isSuccess ? 'dreams-status-accent--success' : ''
            }`}
          />
          {/* CLOSE BUTTON */}
          <button
            type="button"
            className="dreams-status-close"
            onClick={handleClose}
            aria-label="Tutup popup"
            title="Tutup"
          >
            <X size={18} strokeWidth={2} />
          </button>

          <div className="dreams-status-content">
            {/* STATUS VISUAL */}
            <div
              className={`dreams-status-visual ${
                isSuccess ? 'dreams-status-visual--success' : ''
              }`}
            >
              <div
                className={`dreams-status-icon ${
                  isSuccess
                    ? 'dreams-status-icon--success'
                    : 'dreams-status-icon--error'
                }`}
              >
                {isSuccess ? (
                  <CheckCircle2 size={32} strokeWidth={2.4} />
                ) : (
                  <CircleAlert size={30} strokeWidth={2.2} />
                )}
              </div>
            </div>

            {/* EYEBROW */}
            <div
              className={`dreams-status-eyebrow ${
                isSuccess ? 'dreams-status-eyebrow--success' : ''
              }`}
            >
              {isSuccess ? 'Pengajuan Terkirim' : 'Perlu Perhatian'}
            </div>

            {/* TITLE */}
            <h2 id="dreams-status-title" className="dreams-status-title">
              {isSuccess ? 'Terima kasih!' : 'Pengajuan Belum Berhasil'}
            </h2>

            {/* DESCRIPTION */}
            <p
              id="dreams-status-description"
              className="dreams-status-description"
            >
              {isSuccess
                ? whatsappAttempt === 'opened'
                  ? 'WhatsApp sudah dibuka di tab baru. Setelah pesan terkirim, tekan tombol di bawah untuk menutup.'
                  : whatsappAttempt === 'blocked'
                    ? 'Browser memblokir tab WhatsApp. Izinkan pop-up untuk situs ini, lalu coba lagi.'
                    : status.url
                      ? 'Permintaan demo aplikasi DREAMS Anda telah berhasil kami terima. Jika berkenan, Anda dapat melanjutkan komunikasi melalui WhatsApp.'
                      : 'Permintaan demo aplikasi DREAMS Anda telah berhasil kami terima. Tim kami akan menindaklanjuti permintaan Anda.'
                : status.message ||
                  'Terjadi kesalahan saat mengirim pengajuan. Silakan coba kembali.'}
            </p>

            {/* ACTIONS */}
            <div className="dreams-status-actions">
              {isSuccess && status.url && whatsappAttempt !== 'opened' && (
                <button
                  type="button"
                  className="dreams-status-whatsapp"
                  onClick={handleOpenWhatsapp}
                >
                  <WhatsAppIcon />

                  <span>Lanjut ke WhatsApp</span>

                  <ArrowUpRight size={16} />
                </button>
              )}

              {isSuccess && whatsappAttempt === 'opened' && (
                <>
                  <button
                    type="button"
                    className="dreams-status-whatsapp"
                    onClick={handleClose}
                  >
                    <span>Sudah mengirim pesan</span>
                  </button>

                  <button
                    type="button"
                    className="dreams-status-cancel"
                    onClick={handleOpenWhatsapp}
                  >
                    Buka WhatsApp lagi
                  </button>
                </>
              )}

              {whatsappAttempt !== 'opened' && (
                <button
                  type="button"
                  className="dreams-status-cancel"
                  onClick={handleClose}
                >
                  Nanti saja
                </button>
              )}
            </div>

            {/* FOOTER */}
            <div
              className={`dreams-status-footer ${
                isSuccess ? 'dreams-status-footer--success' : ''
              }`}
            >
              <CheckCircle2 size={12} />

              <span>
                {isSuccess
                  ? 'Pengajuan Anda telah tersimpan di sistem DREAMS'
                  : 'Silakan periksa kembali pengajuan Anda'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
}

export default DemoFormStatus
