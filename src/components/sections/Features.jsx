import { useRef, useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import { features } from '../../data/features'

import {
  featureDonatur,
  featureTransaksi,
  featureProspek,
  featureAnalitikRfm,
  featureDistribusi,
  featureKomunikasi,
} from '../../assets/assets'

// =========================================
// DATA ILUSTRASI FITUR DREAMS
// =========================================

const illustrationList = [
  {
    image: featureDonatur,
    alt: 'Ilustrasi manajemen donatur',
  },
  {
    image: featureTransaksi,
    alt: 'Ilustrasi pengelolaan transaksi',
  },
  {
    image: featureProspek,
    alt: 'Ilustrasi manajemen prospek',
  },
  {
    image: featureAnalitikRfm,
    alt: 'Ilustrasi analitik RFM',
  },
  {
    image: featureDistribusi,
    alt: 'Ilustrasi pengelolaan distribusi',
  },
  {
    image: featureKomunikasi,
    alt: 'Ilustrasi komunikasi WhatsApp',
  },
]

// =========================================
// FEATURES SECTION
// =========================================

const Features = () => {
  const stackRef = useRef(null)
  const cardRefs = useRef([])

  const [visibleHeaders, setVisibleHeaders] = useState([])

  // =========================================
  // DETECT REAL CARD STACKING
  // =========================================

  useEffect(() => {
    let animationFrame = null

    const updateHeaders = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame)
      }

      animationFrame = requestAnimationFrame(() => {
        const cards = cardRefs.current

        const nextVisibleHeaders = cards.map((card, index) => {
          const nextCard = cards[index + 1]

          if (!card || !nextCard) return false

          const currentRect = card.getBoundingClientRect()
          const nextRect = nextCard.getBoundingClientRect()

          const currentStickyTop =
            parseFloat(window.getComputedStyle(card).top) || 0

          const headerHeight =
            parseFloat(
              window.getComputedStyle(card).getPropertyValue('--stack-offset'),
            ) || 56

          const currentCardIsSticky = currentRect.top <= currentStickyTop + 2

          const nextCardIsOverlappingContent =
            nextRect.top <= currentRect.top + headerHeight + 2 &&
            nextRect.bottom > currentRect.top + headerHeight

          return currentCardIsSticky && nextCardIsOverlappingContent
        })

        setVisibleHeaders((previous) => {
          const isSame =
            previous.length === nextVisibleHeaders.length &&
            previous.every(
              (value, index) => value === nextVisibleHeaders[index],
            )

          return isSame ? previous : nextVisibleHeaders
        })
      })
    }

    updateHeaders()

    window.addEventListener('scroll', updateHeaders, {
      passive: true,
    })

    window.addEventListener('resize', updateHeaders)

    return () => {
      window.removeEventListener('scroll', updateHeaders)
      window.removeEventListener('resize', updateHeaders)

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  // =========================================
  // HANDLE FEATURE CLICK
  // =========================================

  const handleFeatureClick = (index) => {
    const stack = stackRef.current
    const selectedCard = cardRefs.current[index]

    if (!stack || !selectedCard) return

    const stackStyles = window.getComputedStyle(stack)

    const gap = parseFloat(stackStyles.rowGap) || 0
    const stackPaddingTop = parseFloat(stackStyles.paddingTop) || 0

    const stackTop =
      stack.getBoundingClientRect().top + window.scrollY + stackPaddingTop

    let naturalOffset = 0

    for (let i = 0; i < index; i += 1) {
      const previousCard = cardRefs.current[i]

      if (previousCard) {
        naturalOffset += previousCard.offsetHeight + gap
      }
    }

    const stickyTop = parseFloat(window.getComputedStyle(selectedCard).top) || 0

    const targetY = Math.max(0, stackTop + naturalOffset - stickyTop)

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  // =========================================
  // CARD COLORS
  // =========================================

  // =========================================
  // RENDER
  // =========================================

  return (
    <>
      <style>{`

        /* =====================================
           FEATURES SECTION
        ===================================== */

        .features {
          --navbar-clearance: 80px;

          --stack-top: 104px;
          --stack-offset: 56px;
          --stack-gap: clamp(48px, 14vh, 140px);
          --stack-bottom-space: 20px;

          --card-max: 600px;
          --card-min: 440px;

          --card-height: max(
            var(--card-min),
            min(
              var(--card-max),
              calc(
                100vh - var(--stack-top) - var(--stack-offset) * 5 -
                  var(--stack-bottom-space)
              )
            )
          );

          position: relative;
          overflow: clip;

          padding: 72px 0 120px;

          background: var(--color-surface);
        }

        @supports (height: 100svh) {
          .features {
            --card-height: max(
              var(--card-min),
              min(
                var(--card-max),
                calc(
                  100svh - var(--stack-top) - var(--stack-offset) * 5 -
                    var(--stack-bottom-space)
                )
              )
            );
          }
        }

        /* =====================================
           FEATURES HEADING
        ===================================== */

        .features .section-heading {
          margin-top: 0;
        }

        /* =====================================
           FEATURES STACK
        ===================================== */

        .features__stack {
          position: relative;

          width: 100%;
          max-width: 1100px;

          display: flex;
          flex-direction: column;

          margin: 64px auto 0;

          gap: var(--stack-gap);
        }

        .features__stack::after {
          content: '';

          display: block;

          flex: 0 0 0;
        }

        /* =====================================
           FEATURE CARD — STICKY
           Parent tetap stabil untuk deteksi header.
        ===================================== */

        .feature-card {
          --card-color: #087bee;

          /*
            Scale:
            Index 0 = 90%
            Index 1 = 92%
            Index 2 = 94%
            Index 3 = 96%
            Index 4 = 98%
            Index 5 = 100%
          */

          --card-scale: calc(
            0.9 + var(--card-index, 0) * 0.02
          );

          position: sticky;

          top: calc(
            var(--stack-top) + var(--card-index, 0) * var(--stack-offset)
          );

          z-index: calc(10 + var(--card-index, 0));

          flex: 0 0 auto;

          width: 100%;
          height: var(--card-height);

          padding: 0;

          background: transparent;

          border: none;
          border-radius: 28px;

          /*
            Parent sticky tidak menggunakan transform.
            getBoundingClientRect() tetap stabil.
          */

          transform: none;

          will-change: auto;
        }

        /* =====================================
           CARD SURFACE
           Scale diterapkan pada visual card.
        ===================================== */

        .feature-card__surface {
          position: relative;

          width: 100%;
          height: 100%;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          box-sizing: border-box;

          color: #ffffff;

          background:
            radial-gradient(
              circle at 85% 15%,
              rgba(255, 255, 255, 0.12),
              transparent 35%
            ),
            linear-gradient(
              145deg,
              color-mix(in srgb, var(--card-color) 85%, #102d50),
              var(--card-color) 55%,
              color-mix(in srgb, var(--card-color) 75%, #000000)
            );

          border: none;
          border-radius: 28px;

          box-shadow:
            0 24px 60px
            color-mix(in srgb, var(--card-color) 22%, transparent),
            0 4px 16px rgba(16, 45, 80, 0.1);

          transform: scale(var(--card-scale));

          transform-origin: center top;

          transition:
            transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease;
        }

        /* =====================================
           CARD HOVER
           Mengangkat surface tanpa mengubah parent.
        ===================================== */

        .feature-card:hover .feature-card__surface {
          transform: scale(var(--card-scale)) translateY(-6px);
        }

        /* =====================================
           CARD HEADER
        ===================================== */

        .feature-card__header {
          position: relative;
          z-index: 2;

          width: 100%;
          height: var(--stack-offset);

          display: flex;
          align-items: center;
          justify-content: space-between;

          flex-shrink: 0;

          gap: 20px;

          padding: 0 28px;

          box-sizing: border-box;

          background: transparent;

          border: none;

          text-align: left;
          cursor: default;

          font: inherit;

          transition: background 0.25s ease;
        }

        /* =====================================
           HEADER — HIDDEN IDENTITY
        ===================================== */

        .feature-card__identity,
        .feature-card__header-arrow {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          transform: translateY(-3px);

          transition:
            opacity 0.25s ease,
            visibility 0.25s ease,
            transform 0.25s ease;
        }

        /* =====================================
           HEADER — VISIBLE STACKING STATE
        ===================================== */

        .feature-card__header--visible {
          background: rgba(255, 255, 255, 0.07);

          border: none;

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);

          cursor: pointer;
        }

        .feature-card__header--visible .feature-card__identity,
        .feature-card__header--visible .feature-card__header-arrow {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;

          transform: translateY(0);
        }

        .feature-card__header--visible:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .feature-card__header--visible:focus-visible {
          outline: 2px solid white;
          outline-offset: -4px;
        }

        /* =====================================
           CARD IDENTITY
        ===================================== */

        .feature-card__identity {
          flex: 1;

          display: flex;
          align-items: center;

          gap: 12px;

          min-width: 0;
        }

        /* =====================================
           HEADER ICON
        ===================================== */

        .feature-card__icon {
          position: relative;

          width: 36px;
          height: 36px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #ffffff;

          background: rgba(255, 255, 255, 0.12);

          border: none;
          border-radius: 11px;

          transition:
            background 0.25s ease,
            transform 0.25s ease;
        }

        .feature-card__header--visible:hover .feature-card__icon {
          background: rgba(255, 255, 255, 0.2);

          transform: translateY(-1px);
        }

        /* =====================================
           HEADER TITLES
        ===================================== */

        .feature-card__titles {
          display: block;

          flex: 1;

          min-width: 0;
        }

        .feature-card__name {
          display: block;

          color: #ffffff;

          font-size: 14px;
          font-weight: 600;

          line-height: 1.4;
          letter-spacing: -0.02em;

          white-space: nowrap;

          overflow: hidden;
          text-overflow: ellipsis;
        }

        .feature-card__header--visible .feature-card__name {
          color: #ffffff;
        }

        /* =====================================
           HEADER ARROW
        ===================================== */

        .feature-card__header-arrow {
          flex-shrink: 0;

          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #ffffff;

          background: rgba(255, 255, 255, 0.08);

          border: none;
          border-radius: 50%;

          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .feature-card__header--visible:hover
          .feature-card__header-arrow {
          transform: translate(2px, -2px);

          background: rgba(255, 255, 255, 0.18);
        }

        /* =====================================
           CARD CONTENT
        ===================================== */

        .feature-card__content {
          position: relative;
          z-index: 2;

          flex: 1;

          min-height: 0;

          display: grid;

          grid-template-columns:
            minmax(0, 0.8fr)
            minmax(0, 1.2fr);

          align-items: center;

          gap: 40px;

          padding: 28px 36px 36px;

          box-sizing: border-box;
        }

        /* =====================================
           CARD TEXT
        ===================================== */

        .feature-card__text {
          position: relative;

          min-width: 0;

          display: flex;
          flex-direction: column;
          align-items: flex-start;

          gap: 18px;
        }

        .feature-card__text h3 {
          max-width: 460px;

          margin: 0;

          color: #ffffff;

          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 700;

          line-height: 1.2;
          letter-spacing: -0.045em;
        }

        .feature-card__text p {
          max-width: 460px;

          margin: 0;

          color: rgba(255, 255, 255, 0.78);

          font-size: 1rem;
          font-weight: 400;

          line-height: 1.75;
        }

        .feature-card__more {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 1px;
          opacity: 0.92;
          transition: opacity 0.2s ease;
        }

        .feature-card__more:hover {
          opacity: 1;
        }

        .feature-card__more-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
        }

        /* =====================================
           CARD ACTION ARROW
        ===================================== */

        .feature-card__arrow {
          width: 44px;
          height: 44px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-top: 8px;

          color: var(--card-color);

          background: #ffffff;

          border: none;
          border-radius: 50%;

          box-shadow:
            0 6px 18px rgba(0, 0, 0, 0.12);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .feature-card__surface:hover .feature-card__arrow {
          transform: translate(3px, -3px);

          box-shadow:
            0 10px 24px rgba(0, 0, 0, 0.2);
        }

        /* =====================================
           FEATURE VISUAL WRAPPER
        ===================================== */

        .feature-card__visual {
          position: relative;

          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0;

          background: transparent;

          border: none;
          border-radius: 0;

          overflow: visible;
        }

        /* =====================================
           FEATURE VISUAL - BASE
        ===================================== */

        .feature-visual {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: min(100%, 340px);
          max-width: 340px;

          aspect-ratio: 1 / 1;

          margin-inline: auto;

          z-index: 1;

          background: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;

          overflow: visible;

          transform: rotate(-1deg);

          transition: transform 0.45s ease;
        }

        /* =====================================
           AMBIENT GLOW
        ===================================== */

        .feature-visual__glow {
          position: absolute;

          inset: 15%;

          z-index: 0;

          border-radius: 50%;

          background: radial-gradient(
            circle,
            rgba(79, 195, 224, 0.28) 0%,
            rgba(8, 123, 238, 0.15) 40%,
            transparent 75%
          );

          filter: blur(35px);

          pointer-events: none;
        }

        /* =====================================
           ILLUSTRATION IMAGE
        ===================================== */

        .feature-visual__image {
          position: relative;

          display: block;

          width: 100%;
          height: 100%;

          z-index: 2;

          object-fit: contain;
          object-position: center;

          background: transparent;

          border: none;
          border-radius: 0;
          box-shadow: none;

          filter: drop-shadow(
            0 14px 24px rgba(0, 30, 100, 0.12)
          );

          animation: featureIllustrationFloat 6s ease-in-out infinite;

          transition: filter 0.45s ease;
        }

        /* =====================================
           HOVER — ILLUSTRATION
        ===================================== */

        .feature-card:hover .feature-visual {
          transform: rotate(0deg) translateY(-4px);
        }

        .feature-card:hover .feature-visual__image {
          filter: drop-shadow(
            0 20px 30px rgba(0, 30, 100, 0.18)
          );
        }

        /* =====================================
           FLOATING ANIMATION
        ===================================== */

        @keyframes featureIllustrationFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        /* =====================================
           RESPONSIVE — SHORT DESKTOP
        ===================================== */

        @media (min-width: 769px) and (max-height: 820px) {
          .features {
            --navbar-clearance: 60px;

            --stack-top: 76px;
            --stack-offset: 44px;
            --stack-bottom-space: 16px;

            --card-max: 520px;
            --card-min: 380px;

            padding: 64px 0 140px;
          }

          .feature-card__content {
            gap: 28px;

            padding: 16px 36px 20px;
          }

          .feature-card__text {
            gap: 14px;
          }

          .feature-card__text h3 {
            font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          }

          .feature-card__text p {
            font-size: 0.9rem;
            line-height: 1.7;
          }

          .feature-card__arrow {
            width: 40px;
            height: 40px;
          }
        }

        /* =====================================
           RESPONSIVE — TABLET
        ===================================== */

        @media (max-width: 1024px) {
          .features {
            --navbar-clearance: 60px;

            --stack-top: 80px;
            --stack-offset: 52px;

            --card-max: 560px;
            --card-min: 440px;

            padding: 64px 0 140px;
          }

          .features__stack {
            margin-top: 100px;
          }

          .feature-card,
          .feature-card__surface {
            border-radius: 24px;
          }

          .feature-card__header {
            padding: 0 24px;
          }

          .feature-card__content {
            gap: 28px;

            padding: 20px 28px 28px;
          }

          .feature-card__text h3 {
            font-size: 2rem;
          }

          .feature-card__text p {
            font-size: 0.95rem;
          }
        }

        /* =====================================
           RESPONSIVE — TABLET FEATURE VISUAL
        ===================================== */

        @media (max-width: 768px) {
          .feature-visual {
            width: min(100%, 280px);
            max-width: 280px;

            aspect-ratio: 1 / 1;

            transform: none;
          }

          .feature-card:hover .feature-visual {
            transform: translateY(-2px);
          }

          .feature-visual__glow {
            inset: 20%;
            filter: blur(28px);
          }
        }

        /* =====================================
           RESPONSIVE — MOBILE
        ===================================== */

        @media (max-width: 768px) {
          .features {
            --navbar-clearance: 48px;

            --stack-top: 72px;
            --stack-offset: 46px;

            --stack-gap: clamp(32px, 10vh, 100px);

            --card-max: 520px;
            --card-min: 420px;

            padding: 56px 0 110px;
          }

          .features__stack {
            margin-top: 80px;
          }

          .feature-card,
          .feature-card__surface {
            border-radius: 22px;
          }

          .feature-card__header {
            gap: 14px;

            padding: 0 22px;
          }

          .feature-card__identity {
            gap: 10px;
          }

          .feature-card__icon {
            width: 32px;
            height: 32px;

            border-radius: 9px;
          }

          .feature-card__name {
            font-size: 0.88rem;
          }

          .feature-card__header-arrow {
            width: 28px;
            height: 28px;
          }

          .feature-card__content {
            grid-template-columns: 1fr;
            grid-template-rows: auto minmax(0, 1fr);

            gap: 20px;

            padding: 16px 24px 24px;
          }

          .feature-card__text {
            gap: 14px;
          }

          .feature-card__text h3 {
            font-size: 1.7rem;
          }

          .feature-card__text p {
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .feature-card__arrow {
            width: 36px;
            height: 36px;
          }

          .feature-card__visual {
            min-height: 0;

            padding: 0;

            overflow: visible;
          }
        }

        /* =====================================
           RESPONSIVE — MOBILE FEATURE VISUAL
        ===================================== */

        @media (max-width: 480px) {
          .feature-visual {
            width: min(100%, 230px);
            max-width: 230px;

            aspect-ratio: 1 / 1;
          }

          .feature-visual__glow {
            inset: 22%;

            filter: blur(24px);
          }

          .feature-visual__image {
            filter: drop-shadow(
              0 10px 18px rgba(0, 30, 100, 0.1)
            );
          }
        }

        /* =====================================
           RESPONSIVE — SMALL MOBILE
        ===================================== */

        @media (max-width: 480px) {
          .features {
            --navbar-clearance: 40px;

            --stack-top: 64px;
            --stack-offset: 42px;

            --stack-gap: clamp(28px, 8vh, 80px);

            --card-max: 480px;
            --card-min: 400px;

            padding: 48px 0 70px;
          }

          .features__stack {
            margin-top: 35px;
          }

          .feature-card,
          .feature-card__surface {
            border-radius: 20px;
          }

          .feature-card__header {
            padding: 0 18px;
          }

          .feature-card__identity {
            gap: 9px;
          }

          .feature-card__icon {
            width: 30px;
            height: 30px;
          }

          .feature-card__name {
            font-size: 0.82rem;
          }

          .feature-card__content {
            gap: 14px;

            padding: 14px 20px 20px;
          }

          .feature-card__text h3 {
            font-size: 1.45rem;
          }

          .feature-card__text p {
            font-size: 0.8rem;
          }

          .feature-card__arrow {
            width: 32px;
            height: 32px;
          }

          .feature-card__visual {
            width: 100%;

            padding: 0;
          }
        }

        /* =====================================
           ACCESSIBILITY — REDUCED MOTION
        ===================================== */

        @media (prefers-reduced-motion: reduce) {
          .feature-card__surface,
          .feature-card__icon,
          .feature-card__arrow,
          .feature-card__header-arrow,
          .feature-card__identity,
          .feature-visual,
          .feature-visual__image,
          .feature-card:hover .feature-visual,
          .feature-card:hover .feature-visual__image {
            transition: none;
            animation: none;
          }

          .feature-card:hover .feature-card__surface {
            transform: scale(var(--card-scale));
          }
        }

      `}</style>

      {/* =====================================
          FEATURES SECTION
      ===================================== */}

      <section className="features">
        <Container>
          <SectionHeading
            eyebrow="DREAMS FEATURES"
            title="Satu platform untuk mengelola donasi"
            description="Kelola hubungan donor, pantau performa program, dan optimalkan strategi fundraising dalam satu ekosistem."
          />

          {/* FEATURE STACK */}

          <div className="features__stack" ref={stackRef} id="fitur">
            {features.map((feature, index) => {
              const Icon = feature.icon

              const cardColor = feature.color

              const illustration =
                illustrationList[index % illustrationList.length]

              const isHeaderVisible = Boolean(visibleHeaders[index])

              return (
                <article
                  key={feature.title}
                  ref={(element) => {
                    cardRefs.current[index] = element
                  }}
                  className="feature-card"
                  style={{
                    '--card-color': cardColor,
                    '--card-index': index,
                  }}
                >
                  <div className="feature-card__surface">
                    {/* CARD HEADER */}

                    <button
                      type="button"
                      className={`feature-card__header ${
                        isHeaderVisible ? 'feature-card__header--visible' : ''
                      }`}
                      onClick={() => handleFeatureClick(index)}
                      aria-label={`Kembali ke fitur ${feature.title}`}
                      tabIndex={isHeaderVisible ? 0 : -1}
                      aria-hidden={!isHeaderVisible}
                    >
                      <div className="feature-card__identity">
                        <div className="feature-card__icon">
                          <Icon size={24} strokeWidth={2} />
                        </div>

                        <span className="feature-card__titles">
                          <span className="feature-card__name">
                            {feature.title}
                          </span>
                        </span>
                      </div>

                      <span className="feature-card__header-arrow">
                        <ArrowUpRight size={20} />
                      </span>
                    </button>

                    {/* CARD CONTENT */}

                    <div className="feature-card__content">
                      {/* FEATURE DESCRIPTION */}

                      <div className="feature-card__text">
                        <h3>{feature.title}</h3>

                        <p>{feature.description}</p>

                        {feature.href && (
                          <a href={feature.href} className="feature-card__more">
                            Selengkapnya
                            <span className="feature-card__more-hidden">
                              {' '}
                              tentang {feature.title}
                            </span>
                          </a>
                        )}

                        <div className="feature-card__arrow">
                          <ArrowUpRight size={22} />
                        </div>
                      </div>

                      {/* FEATURE VISUAL */}

                      <div className="feature-card__visual">
                        <div className="feature-visual">
                          <div className="feature-visual__glow" />

                          <img
                            className="feature-visual__image"
                            src={illustration.image}
                            alt={illustration.alt}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}

export default Features