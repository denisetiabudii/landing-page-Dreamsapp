import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// =========================================
// WHATSAPP ICON
// =========================================

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="floating-actions__icon"
      fill="currentColor"
    >
      <path d="M16.01 3.2C8.96 3.2 3.23 8.93 3.23 15.98c0 2.25.59 4.45 1.7 6.4L3.2 28.8l6.59-1.73a12.7 12.7 0 0 0 6.22 1.62h.01c7.05 0 12.78-5.73 12.78-12.78A12.73 12.73 0 0 0 16.01 3.2Zm0 23.35h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.91 1.03 1.04-3.81-.25-.4a10.57 10.57 0 0 1-1.63-5.68c0-5.83 4.74-10.57 10.58-10.57 2.82 0 5.47 1.1 7.46 3.1a10.5 10.5 0 0 1 3.1 7.47c0 5.83-4.74 10.57-10.59 10.57Zm5.8-7.92c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.84 1.05-1.03 1.27-.19.22-.38.25-.7.08-.32-.16-1.34-.5-2.55-1.59-.94-.83-1.57-1.86-1.75-2.18-.18-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.02-2.44-.27-.64-.55-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.86.69.78.25 1.49.22 2.05.13.63-.09 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.13-.3-.21-.62-.37Z" />
    </svg>
  );
}

// =========================================
// FLOATING ACTIONS
// =========================================

function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setShowBackToTop(window.scrollY > 420);
    };

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  // =========================================
  // OPEN WHATSAPP
  // Link WhatsApp diminta ke server saat tombol diklik, sehingga nomor
  // tidak ada di bundle frontend dan tidak terlihat saat tombol di-hover.
  // =========================================

  const handleOpenWhatsapp = async () => {
    if (isOpening) return;

    setIsOpening(true);
    setHasError(false);

    // Tab dibuka lebih dulu (masih di dalam event klik) agar tidak
    // diblokir popup blocker, lalu diarahkan setelah link diterima.
    const popup = window.open("", "_blank");
    if (popup) popup.opener = null;

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

      if (!apiBaseUrl) {
        throw new Error("API belum dikonfigurasi.");
      }

      const response = await fetch(`${apiBaseUrl}/whatsapp-link`, {
        headers: { Accept: "application/json" },
      });

      const result = await response.json().catch(() => null);
      const url = result?.data?.whatsapp_url;

      // Hanya link wa.me yang diterima
      if (
        !response.ok ||
        typeof url !== "string" ||
        !url.startsWith("https://wa.me/")
      ) {
        throw new Error("Link WhatsApp tidak tersedia.");
      }

      if (popup) {
        popup.location.href = url;
      } else {
        window.location.assign(url);
      }
    } catch {
      if (popup) popup.close();
      setHasError(true);
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <>
      <style>{`
        /* =========================================
           FLOATING ACTIONS
        ========================================= */

        .floating-actions {
          position: fixed;
          right: max(22px, env(safe-area-inset-right));
          bottom: max(22px, env(safe-area-inset-bottom));
          z-index: 1200;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        /* =========================================
           FLOATING BUTTONS
        ========================================= */

        .floating-actions .floating-actions__whatsapp,
        .floating-actions .floating-actions__top {
          display: grid;
          width: 58px;
          height: 58px;
          padding: 0;
          place-items: center;

          border: 0;
          border-radius: 50%;

          box-shadow: 0 8px 24px rgb(6 28 51 / 25%);

          font: inherit;
          cursor: pointer;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        /* =========================================
           WHATSAPP BUTTON
        ========================================= */

        .floating-actions .floating-actions__whatsapp {
          position: relative;

          background: #25d366;
          border: 3px solid #ffffff;
        }

        .floating-actions .floating-actions__whatsapp[aria-busy="true"] {
          cursor: progress;
          opacity: 0.85;
        }

        .floating-actions .floating-actions__icon {
          display: block;
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          color: #ffffff;
        }

        /* =========================================
           WHATSAPP LABEL
        ========================================= */

        .floating-actions .floating-actions__label {
          position: absolute;
          right: calc(100% + 12px);
          top: 50%;

          padding: 11px 15px;

          color: #17324f;
          background: #ffffff;
          border: 1px solid rgb(16 45 80 / 8%);
          border-radius: 999px;

          box-shadow: 0 6px 22px rgb(6 28 51 / 16%);

          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
          white-space: nowrap;

          opacity: 0;
          pointer-events: none;

          transform: translate(8px, -50%);

          transition:
            opacity 0.18s ease,
            transform 0.18s ease;
        }

        .floating-actions .floating-actions__label::after {
          position: absolute;
          top: 50%;
          right: -5px;

          width: 8px;
          height: 8px;

          content: "";
          background: #ffffff;

          border-top: 1px solid rgb(16 45 80 / 8%);
          border-right: 1px solid rgb(16 45 80 / 8%);

          transform: translateY(-50%) rotate(45deg);
        }

        .floating-actions .floating-actions__whatsapp:hover
          .floating-actions__label,
        .floating-actions .floating-actions__whatsapp:focus-visible
          .floating-actions__label,
        .floating-actions .floating-actions__label[data-visible="true"] {
          opacity: 1;
          transform: translate(0, -50%);
        }

        /* =========================================
           BACK TO TOP
        ========================================= */

        .floating-actions .floating-actions__top {
          color: #ffffff;
          background: #087bee;
        }

        /* =========================================
           HOVER EFFECT
        ========================================= */

        .floating-actions .floating-actions__whatsapp:hover,
        .floating-actions .floating-actions__top:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgb(6 28 51 / 32%);
        }

        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .floating-actions .floating-actions__whatsapp,
          .floating-actions .floating-actions__top,
          .floating-actions .floating-actions__label {
            transition: none;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {
          .floating-actions {
            right: max(16px, env(safe-area-inset-right));
            bottom: max(16px, env(safe-area-inset-bottom));
            gap: 10px;
          }

          .floating-actions .floating-actions__whatsapp {
            width: 54px;
            height: 54px;
          }

          .floating-actions .floating-actions__icon {
            width: 34px;
            height: 34px;
            flex-basis: 34px;
          }

          .floating-actions .floating-actions__top {
            width: 46px;
            height: 46px;
          }
        }
      `}</style>

      <div className="floating-actions" aria-label="Aksi cepat">
        {showBackToTop && (
          <button
            className="floating-actions__top"
            type="button"
            aria-label="Kembali ke atas"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <ArrowUp size={21} />
          </button>
        )}

        <button
          className="floating-actions__whatsapp"
          type="button"
          onClick={handleOpenWhatsapp}
          aria-busy={isOpening}
          aria-label="Chat dengan tim DREAMS melalui WhatsApp (buka di tab baru)"
        >
          <WhatsAppIcon />

          <span
            className="floating-actions__label"
            data-visible={hasError}
            role={hasError ? "alert" : undefined}
            aria-hidden={hasError ? undefined : "true"}
          >
            {hasError ? "Gagal membuka, coba lagi" : "Chat dengan tim DREAMS"}
          </span>
        </button>
      </div>
    </>
  );
}

export default FloatingActions;
