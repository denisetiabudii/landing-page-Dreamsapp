import { useEffect, useRef, useState } from 'react'

import { ArrowRight, PlayCircle, CheckCircle2, X } from 'lucide-react'

import Container from '../common/Container'
import Button from '../common/Button'
import Badge from '../common/Badge'

import { heroDashboardDonatur } from '../../assets/assets'
import { siteConfig } from '../../data/siteConfig'

import {
  clearPointerPosition,
  trackPointerPosition,
} from '../../utils/pointerTracking'

// =========================================
// KOORDINAT LAYAR LAPTOP
// =========================================

const LAPTOP_SCREEN_CORNERS = [
  [1042, 424],
  [1567, 399],
  [1542, 750],
  [1010, 734],
]

// =========================================
// TRANSFORMASI PERSPEKTIF
// =========================================

function getScreenTransform(corners, width, height) {
  const [topLeft, topRight, bottomRight, bottomLeft] = corners

  const deltaX1 = topRight.x - bottomRight.x
  const deltaX2 = bottomLeft.x - bottomRight.x
  const deltaX3 = topLeft.x - topRight.x + bottomRight.x - bottomLeft.x

  const deltaY1 = topRight.y - bottomRight.y
  const deltaY2 = bottomLeft.y - bottomRight.y
  const deltaY3 = topLeft.y - topRight.y + bottomRight.y - bottomLeft.y

  const denominator = deltaX1 * deltaY2 - deltaX2 * deltaY1

  const perspectiveX = (deltaX3 * deltaY2 - deltaX2 * deltaY3) / denominator

  const perspectiveY = (deltaX1 * deltaY3 - deltaX3 * deltaY1) / denominator

  const a = (topRight.x - topLeft.x + perspectiveX * topRight.x) / width

  const b = (bottomLeft.x - topLeft.x + perspectiveY * bottomLeft.x) / height

  const c = topLeft.x

  const d = (topRight.y - topLeft.y + perspectiveX * topRight.y) / width

  const e = (bottomLeft.y - topLeft.y + perspectiveY * bottomLeft.y) / height

  const f = topLeft.y

  return `matrix3d(
    ${a}, ${d}, 0, ${perspectiveX / width},
    ${b}, ${e}, 0, ${perspectiveY / height},
    0, 0, 1, 0,
    ${c}, ${f}, 0, 1
  )`
}

// =========================================
// KOMPONEN HERO
// =========================================

function Hero() {
  const [screenStyle, setScreenStyle] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const heroRef = useRef(null)
  const backgroundRef = useRef(null)

  // =========================================
  // POSISI DASHBOARD DESKTOP
  // =========================================

  useEffect(() => {
    const hero = heroRef.current
    const background = backgroundRef.current

    if (!hero || !background) {
      return undefined
    }

    const updateScreenPosition = () => {
      if (!background.naturalWidth) {
        return
      }

      const { width, height } = hero.getBoundingClientRect()

      const backgroundStyle = getComputedStyle(background)

      const isContained = backgroundStyle.objectFit === 'contain'

      const isBottomAligned =
        backgroundStyle.objectPosition.split(' ')[1] === '100%'

      const scale = isContained
        ? Math.min(
            width / background.naturalWidth,
            height / background.naturalHeight,
          )
        : Math.max(
            width / background.naturalWidth,
            height / background.naturalHeight,
          )

      const offsetX = (width - background.naturalWidth * scale) / 2

      const verticalSpace = height - background.naturalHeight * scale

      const offsetY = isBottomAligned ? verticalSpace : verticalSpace / 2

      const corners = LAPTOP_SCREEN_CORNERS.map(([x, y]) => ({
        x: offsetX + x * scale,
        y: offsetY + y * scale,
      }))

      const left = Math.min(...corners.map(({ x }) => x))
      const top = Math.min(...corners.map(({ y }) => y))
      const right = Math.max(...corners.map(({ x }) => x))
      const bottom = Math.max(...corners.map(({ y }) => y))

      const localCorners = corners.map(({ x, y }) => ({
        x: x - left,
        y: y - top,
      }))

      setScreenStyle({
        left: `${left}px`,
        top: `${top}px`,
        width: `${right - left}px`,
        height: `${bottom - top}px`,
        transform: getScreenTransform(localCorners, right - left, bottom - top),
      })
    }

    const resizeObserver = new ResizeObserver(updateScreenPosition)

    resizeObserver.observe(hero)

    background.addEventListener('load', updateScreenPosition)

    window.addEventListener('resize', updateScreenPosition)

    if (background.complete && background.naturalWidth) {
      updateScreenPosition()
    }

    return () => {
      resizeObserver.disconnect()

      background.removeEventListener('load', updateScreenPosition)

      window.removeEventListener('resize', updateScreenPosition)
    }
  }, [])

  // =========================================
  // KONTROL MODAL
  // =========================================

  useEffect(() => {
    if (!isModalOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)

      document.body.style.overflow = previousOverflow
    }
  }, [isModalOpen])

  // =========================================
  // TAMPILAN KOMPONEN
  // =========================================

  return (
    <>
      {/* =====================================
          BAGIAN HERO
      ===================================== */}

      <section className="hero" id="beranda" ref={heroRef}>
        {/* GAMBAR LATAR LAPTOP */}

        <img
          ref={backgroundRef}
          src="/images/hero-background.webp"
          alt=""
          aria-hidden="true"
          className="hero__background"
        />

        <Container>
          <div className="hero__grid">
            {/* =================================
                KONTEN HERO
            ================================= */}

            <div className="hero__content">
              <Badge>Sistem Pengelolaan Donasi dan Organisasi</Badge>

              <h1 className="hero__title">
                Kelola Donasi.
                <span> Bangun Dampak Lebih Terarah.</span>
              </h1>

              <p className="hero__description">
                Sistem pengelolaan donasi dan operasional lembaga sosial untuk
                membantu mengelola donatur, transaksi, prospek, hingga
                penyaluran bantuan.
              </p>

              {/* TOMBOL HERO */}

              <div className="hero__actions">
                <Button href={siteConfig.demoUrl}>
                  Jadwalkan Demo
                  <ArrowRight size={18} />
                </Button>

                <Button href="#cara-kerja" variant="secondary">
                  <PlayCircle size={18} />
                  Pelajari Cara Kerja
                </Button>
              </div>

              {/* INFORMASI PENDUKUNG HERO */}

              <div className="hero__support">
                <span>
                  <CheckCircle2 size={16} />
                  Pengelolaan Donatur
                </span>

                <span>
                  <CheckCircle2 size={16} />
                  Analitik RFM
                </span>

                <span>
                  <CheckCircle2 size={16} />
                  Pengelolaan Distribusi
                </span>
              </div>
            </div>

            {/* =================================
                VISUAL DASHBOARD
            ================================= */}

            <div className="hero__visual-area">
              <div className="hero__mobile-dashboard-frame">
                {/* HEADER DASHBOARD MOBILE */}

                <div className="hero__mobile-dashboard-header">
                  <div className="hero__mobile-window-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="hero__mobile-app-title">
                    <span className="hero__mobile-app-indicator" />
                    Aplikasi DREAMS
                  </div>
                </div>

                {/* DASHBOARD */}

                <button
                  type="button"
                  className="hero__laptop-screen-wrapper"
                  style={screenStyle || undefined}
                  onPointerMove={trackPointerPosition}
                  onPointerLeave={clearPointerPosition}
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Perbesar tampilan dasbor DREAMS"
                  aria-haspopup="dialog"
                >
                  <img
                    src={heroDashboardDonatur}
                    alt="Dasbor Donatur DREAMS"
                    className="hero__dashboard-screen"
                  />
                </button>

                {/* KETERANGAN DASHBOARD MOBILE */}

                <div className="hero__mobile-dashboard-caption">
                  Tampilan aplikasi DREAMS
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================
          MODAL DASHBOARD
      ===================================== */}

      {isModalOpen && (
        <div
          className="hero__modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="hero__modal-content"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Dasbor Donatur DREAMS"
          >
            {/* HEADER MODAL */}

            <div className="hero__modal-header">
              <h3 className="hero__modal-title">Tampilan Aplikasi DREAMS</h3>

              <button
                type="button"
                className="hero__modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Tutup pratinjau"
              >
                <X size={24} />
              </button>
            </div>

            {/* GAMBAR DASHBOARD */}

            <div className="hero__modal-image-wrapper">
              <img
                src={heroDashboardDonatur}
                alt="Detail Dasbor Donatur DREAMS"
                className="hero__modal-img"
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          HERO STYLES
      ===================================== */}

      <style>{`
        /* =========================================================
           1. HERO SECTION
        ========================================================= */

        .hero {
          position: relative;
          overflow: hidden;
          padding: 120px 0 110px;
        }

        .hero__background {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          pointer-events: none;
        }

        .hero__grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          align-items: center;
          gap: 64px;
        }

        /* =========================================================
           2. HERO CONTENT
        ========================================================= */

        .hero__content {
          position: relative;
          z-index: 2;
          max-width: 570px;
        }

        .hero__title {
          margin-top: 24px;
          color: var(--color-heading);
          font-size: clamp(2.5rem, 5vw, 4.25rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.055em;
        }

        .hero__title span {
          color: var(--color-primary);
        }

        .hero__description {
          max-width: 520px;
          margin-top: 24px;
          color: var(--color-text);
          font-size: var(--text-lg);
          line-height: 1.8;
        }

        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 32px;
        }

        .hero__support {
          display: flex;
          flex-wrap: wrap;
          gap: 16px 22px;
          margin-top: 36px;
        }

        .hero__support span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--color-text);
          font-size: var(--text-xs);
          font-weight: 500;
        }

        .hero__support svg {
          flex-shrink: 0;
          color: var(--color-primary);
        }

        /* =========================================================
           3. HERO DASHBOARD DESKTOP
        ========================================================= */

        .hero__visual-area {
          position: static;
          width: 100%;
          aspect-ratio: 16 / 10;
        }

        .hero__mobile-dashboard-frame {
          display: contents;
        }

        .hero__mobile-dashboard-header,
        .hero__mobile-dashboard-caption {
          display: none;
        }

        .hero__laptop-screen-wrapper {
          position: absolute;
          z-index: 1;
          overflow: hidden;
          padding: 8px;
          border: 0;
          background: #ffffff;
          color: inherit;
          cursor: pointer;
          font: inherit;
          text-align: left;
          transform-origin: top left;
          box-shadow: 0 1px 2px rgba(15, 35, 60, 0.18);
        }

        .hero__dashboard-screen {
          position: relative;
          z-index: 1;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: fill;
        }

        /* =========================================================
           4. DESKTOP HOVER EFFECT
        ========================================================= */

        @media (min-width: 1025px) {
          .hero__laptop-screen-wrapper {
            transition:
              translate 250ms ease,
              box-shadow 250ms ease;
          }

          .hero__laptop-screen-wrapper::before {
            position: absolute;
            inset: 0;
            z-index: 0;
            background: radial-gradient(
              circle 300px at var(--pointer-x, 50%) var(--pointer-y, 50%),
              rgba(103, 162, 250, 0.95),
              rgb(115, 140, 250) 42%,
              rgba(255, 255, 255, 0) 76%
            );
            content: "";
            opacity: 0;
            pointer-events: none;
            transition: opacity 250ms ease;
          }

          .hero__laptop-screen-wrapper:hover,
          .hero__laptop-screen-wrapper:focus-visible {
            translate: 0 -4px;
            box-shadow: 0 16px 32px rgba(15, 35, 60, 0.22);
          }

          .hero__laptop-screen-wrapper:hover::before,
          .hero__laptop-screen-wrapper:focus-visible::before {
            opacity: 1;
          }
        }

        /* =========================================================
           5. DASHBOARD LIGHTBOX
        ========================================================= */

        .hero__modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(16, 45, 80, 0.85);
          backdrop-filter: blur(6px);
          animation: fadeIn 0.25s ease forwards;
        }

        .hero__modal-content {
          position: relative;
          width: 100%;
          max-width: 1100px;
          max-height: 90vh;
          overflow: auto;
          background: var(--color-white);
          border-radius: var(--radius-lg);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hero__modal-content::-webkit-scrollbar {
          display: none;
        }

        /* =========================================================
           6. MODAL STICKY HEADER
        ========================================================= */

        .hero__modal-header {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          height: 56px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(8px);
        }

        .hero__modal-close {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          color: var(--color-heading);
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 50%;
          cursor: pointer;
          transition:
            background 0.2s ease,
            transform 0.2s ease,
            color 0.2s ease;
        }

        .hero__modal-close:hover {
          color: #ffffff;
          background: var(--color-primary);
          transform: scale(1.05);
        }

        .hero__modal-close:focus-visible {
          outline: 3px solid var(--color-primary);
          outline-offset: 3px;
        }

        /* =========================================================
           7. MODAL IMAGE
        ========================================================= */

        .hero__modal-image-wrapper {
          width: 100%;
          padding: 0 12px 12px;
        }

        .hero__modal-img {
          display: block;
          width: 100%;
          height: auto;
          max-height: none;
          object-fit: contain;
        }

        /* =========================================================
           8. ANIMATIONS
        ========================================================= */

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* =========================================================
           9. TABLET
        ========================================================= */

        @media (max-width: 1024px) {
          .hero {
            padding: 100px 0 88px;
            background-color: var(--color-light-blue);
          }

          .hero__background {
            object-fit: cover;
            object-position: center bottom;
          }

          .hero__grid {
            grid-template-columns: 1fr;
            gap: 52px;
          }

          .hero__content {
            max-width: 720px;
          }

          .hero__visual-area {
            max-width: 640px;
            margin-inline: auto;
          }
        }

        /* =========================================================
           10. TABLET DASHBOARD FRAME
        ========================================================= */

        @media (min-width: 601px) and (max-width: 1024px) {
          .hero__visual-area {
            position: relative;
            aspect-ratio: auto;
          }

          .hero__mobile-dashboard-frame {
            display: block;
            width: 100%;
            padding: 8px;
            background: #ffffff;
            border: 1px solid #e4ebf2;
            border-radius: 20px;
            box-shadow: 0 12px 30px rgba(16, 45, 80, 0.12);
            overflow: hidden;
          }

          .hero__laptop-screen-wrapper {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 1340 / 628;
            transform: none !important;
            display: block;
            padding: 0;
            border-radius: 10px;
            box-shadow: none;
          }
        }

        /* =========================================================
           11. MOBILE
        ========================================================= */

        @media (max-width: 600px) {
          .hero {
            padding: 88px 0 72px;
          }

          .hero__background {
            object-fit: cover;
            object-position: center bottom;
          }

          .hero__grid {
            gap: 38px;
          }

          /* Typography */

          .hero__title {
            margin-top: 20px;
            font-size: clamp(2.25rem, 6.67vw, 2.5rem);
          }

          .hero__description {
            margin-top: 18px;
            font-size: var(--text-base);
          }

          /* CTA */

          .hero__actions {
            flex-direction: column;
          }

          .hero__actions .button {
            width: 100%;
          }

          /* Support */

          .hero__support {
            gap: 12px 16px;
          }

          /* Dashboard area */

          .hero__visual-area {
            position: relative;
            max-width: 100%;
            aspect-ratio: auto;
            margin-inline: auto;
          }

          /* =====================================
             MOBILE DASHBOARD FRAME
             DARK GRADIENT
          ===================================== */

          .hero__mobile-dashboard-frame {
            display: block;
            width: 100%;
            padding: 10px;

            background: linear-gradient(
              145deg,
              #102d50 0%,
              #083b7a 42%,
              #0649b8 72%,
              #087bee 100%
            );

            border: 1px solid rgba(79, 195, 224, 0.3);
            border-radius: 24px;

            box-shadow:
              0 16px 36px rgba(6, 35, 78, 0.22),
              0 4px 12px rgba(8, 123, 238, 0.12);

            overflow: hidden;
          }

          /* Dashboard header */

          .hero__mobile-dashboard-header {
            display: flex;
            align-items: center;
            gap: 12px;
            min-height: 52px;
            padding: 8px 12px;
            margin-bottom: 8px;

            background: rgba(8, 25, 52, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 12px;

            backdrop-filter: blur(12px);
          }

          /* Window dots */

          .hero__mobile-window-dots {
            display: flex;
            align-items: center;
            gap: 5px;
            flex-shrink: 0;
          }

          .hero__mobile-window-dots span {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #ff6b6b;
          }

          .hero__mobile-window-dots span:nth-child(2) {
            background: #ffc04d;
          }

          .hero__mobile-window-dots span:nth-child(3) {
            background: #2ecc71;
          }

          /* Application title */

          .hero__mobile-app-title {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
            min-width: 0;
            padding: 8px 10px;

            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 8px;

            color: #e2efff;
            font-size: 11px;
            font-weight: 500;
          }

          .hero__mobile-app-indicator {
            width: 4px;
            height: 4px;
            flex-shrink: 0;
            background: #00a878;
            border-radius: 50%;
          }

          /* Dashboard image */

          .hero__laptop-screen-wrapper {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 1340 / 628;
            transform: none !important;
            display: block;
            overflow: hidden;
            border-radius: 10px;
            background: #ffffff;
            filter: none;
            padding: 0;
            box-shadow: none;
          }

          .hero__dashboard-screen {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          /* Dashboard caption */

          .hero__mobile-dashboard-caption {
            display: block;
            padding: 14px 0 8px;

            color: #dbeafe;
            font-size: 13px;
            font-weight: 500;
            text-align: center;
          }

          /* Mobile lightbox */

          .hero__modal-backdrop {
            padding: 10px;
          }

          .hero__modal-content {
            width: 100%;
            max-width: 100%;
            max-height: 92dvh;
            overflow: auto;
            border-radius: 16px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .hero__modal-content::-webkit-scrollbar {
            display: none;
          }

          /* Sticky close header */

          .hero__modal-header {
            height: 54px;
            padding: 8px 10px;
            background: rgba(255, 255, 255, 0.96);
          }

          .hero__modal-close {
            width: 38px;
            height: 38px;
          }

          /* Modal image wrapper */

          .hero__modal-image-wrapper {
            padding: 0 8px 8px;
          }

          /* Modal image */

          .hero__modal-img {
            display: block;
            width: 100%;
            height: auto;
            max-height: none;
            object-fit: contain;
          }
        }

        /* =========================================================
           12. TABLET & DESKTOP IMAGE STYLE
        ========================================================= */

        @media (min-width: 601px) {
          .hero__laptop-screen-wrapper {
            border-radius: 5px;
          }

          .hero__dashboard-screen {
            filter: brightness(0.98) contrast(1.02) saturate(0.96);
          }
        }

        /* =========================================================
           13. MODAL HEADER OVERRIDE
        ========================================================= */

        .hero__modal-header {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 64px;
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
        }

        /* Modal title */

        .hero__modal-title {
          margin: 0;
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 600;
          line-height: 1.4;
          color: var(--color-heading);
          letter-spacing: -0.3px;
        }

        /* Close button */

        .hero__modal-close {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border: 1px solid var(--color-border);
          border-radius: 50%;
          background: var(--color-white);
          color: var(--color-heading);
          cursor: pointer;
          transition:
            background 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease;
        }

        .hero__modal-close:hover {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-white);
        }

        /* Mobile modal override */

        @media (max-width: 600px) {
          .hero__modal-header {
            height: 56px;
            padding: 8px 12px;
          }

          .hero__modal-title {
            font-size: 14px;
          }

          .hero__modal-close {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </>
  )
}

export default Hero
