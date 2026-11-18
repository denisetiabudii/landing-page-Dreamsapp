import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { Maximize2, X } from 'lucide-react'

// Gambar yang bisa diketuk untuk diperbesar, khusus layar kecil.
// Di layar besar tampil sebagai gambar biasa (tanpa tombol).
const SMALL_SCREEN = '(max-width: 768px)'

function subscribe(onChange) {
  const media = window.matchMedia(SMALL_SCREEN)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

const getSnapshot = () => window.matchMedia(SMALL_SCREEN).matches
const getServerSnapshot = () => false // server & hydrate: gambar biasa

function ZoomableImage({ src, alt }) {
  const isSmallScreen = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)

  // Tutup otomatis kalau layar membesar (mis. HP diputar jadi landscape lebar).
  const open = isOpen && isSmallScreen

  useEffect(() => {
    if (!open) return undefined

    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      trigger?.focus()
    }
  }, [open])

  const image = <img src={src} alt={alt} loading="lazy" />

  if (!isSmallScreen) return image

  return (
    <>
      <style>{`
        .zoomable {
          position: relative;
          display: block;
          width: 100%;
          margin: 0;
          padding: 0;
          border: 0;
          background: none;
          cursor: zoom-in;
          -webkit-tap-highlight-color: transparent;
        }

        .zoomable__badge {
          position: absolute;
          right: 10px;
          bottom: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: #ffffff;
          background: rgba(9, 29, 53, 0.78);
          pointer-events: none;
        }

        .zoom-modal {
          position: fixed;
          inset: 0;
          z-index: 3000;
          display: flex;
          overflow: auto;
          background: rgba(5, 15, 30, 0.94);
          -webkit-overflow-scrolling: touch;
          touch-action: pan-x pan-y pinch-zoom;
        }

        /* margin: auto = gambar di tengah, tetap bisa digeser kalau lebih lebar dari layar */
        .zoom-modal__image {
          flex-shrink: 0;
          width: 230vw;
          max-width: none;
          height: auto;
          margin: auto;
          padding: 64px 0;
          background: transparent;
        }

        .zoom-modal__close {
          position: fixed;
          top: 14px;
          right: 14px;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.14);
          cursor: pointer;
        }

        .zoom-modal__hint {
          position: fixed;
          bottom: 16px;
          left: 50%;
          z-index: 1;
          padding: 8px 14px;
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.14);
          transform: translateX(-50%);
          pointer-events: none;
        }
      `}</style>

      <button
        ref={triggerRef}
        type="button"
        className="zoomable"
        onClick={() => setIsOpen(true)}
        aria-label={`Perbesar gambar: ${alt}`}
        aria-haspopup="dialog"
      >
        {image}
        <span className="zoomable__badge" aria-hidden="true">
          <Maximize2 size={18} />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="zoom-modal"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setIsOpen(false)}
          >
            <button
              ref={closeRef}
              type="button"
              className="zoom-modal__close"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup gambar"
            >
              <X size={22} />
            </button>

            <img className="zoom-modal__image" src={src} alt={alt} />

            <span className="zoom-modal__hint">
              Geser atau cubit untuk melihat detail
            </span>
          </div>,
          document.body,
        )}
    </>
  )
}

export default ZoomableImage