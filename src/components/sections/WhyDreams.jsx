import { useEffect, useRef, useState } from 'react'
import {
  Building2,
  Target,
  Network,
  ShieldCheck,
  Sparkles,
  MousePointer2,
} from 'lucide-react'

import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import { dreamsMascot } from '../../assets/assets'

// =========================================
// WHY DREAMS - DATA
// =========================================
const reasons = [
  {
    id: 1,
    title: 'Satu Ekosistem',
    description:
      'Hubungkan donatur, relawan, dan pengelola dalam satu ekosistem digital yang terintegrasi.',
    icon: Building2,
    color: '#176B45',
    light: '#E6F5ED',
    gradient: 'linear-gradient(135deg, #176B45, #35A879)',
  },
  {
    id: 2,
    title: 'Pengelolaan Terarah',
    description:
      'Kelola aktivitas, program, dan kebutuhan organisasi dengan sistem yang lebih terstruktur.',
    icon: Target,
    color: '#087BEE',
    light: '#E8F3FF',
    gradient: 'linear-gradient(135deg, #087BEE, #4FC3E0)',
  },
  {
    id: 3,
    title: 'Kolaborasi Mudah',
    description:
      'Bangun hubungan dan kolaborasi yang lebih mudah bersama berbagai pihak.',
    icon: Network,
    color: '#7952D8',
    light: '#F0EAFE',
    gradient: 'linear-gradient(135deg, #7952D8, #A78BFA)',
  },
  {
    id: 4,
    title: 'Transparansi Terjaga',
    description:
      'Dukung pengelolaan kegiatan yang lebih transparan, akuntabel, dan terpercaya.',
    icon: ShieldCheck,
    color: '#0891B2',
    light: '#E0F7FC',
    gradient: 'linear-gradient(135deg, #0891B2, #4FC3E0)',
  },
]

// =========================================
// MASCOT EYES - CONFIG
// =========================================
const EYE_SIDES = ['left', 'right']

const EYES = {
  left: { x: 41.1, y: 30.7, width: 8.1, ratio: 1.124, tilt: 6, rest: 5 },
  right: { x: 58.8, y: 34.0, width: 7.7, ratio: 1.087, tilt: 9, rest: -5 },
}

const EYE_TRAVEL = { x: 0.0085, y: 0.004 }

const EYE_REACH = 1

// =========================================
// WHY DREAMS SECTION
// =========================================
function WhyDreams() {
  const [activeReason, setActiveReason] = useState(null)
  const [autoHighlightId, setAutoHighlightId] = useState(1)
  const [hasInteracted, setHasInteracted] = useState(false)

  const [pupilPosition, setPupilPosition] = useState({
    leftX: 0,
    leftY: 0,
    rightX: 0,
    rightY: 0,
  })

  const mascotRef = useRef(null)
  const frameRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })

  // Batalkan frame yang tertunda saat komponen dilepas
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  // =========================================
  // AUTO HIGHLIGHT INTERACTIVE ICONS
  // =========================================
  useEffect(() => {
    if (hasInteracted || activeReason !== null) return

    const intervalId = window.setInterval(() => {
      setAutoHighlightId((current) =>
        current >= reasons.length ? 1 : current + 1,
      )
    }, 2400)

    return () => window.clearInterval(intervalId)
  }, [hasInteracted, activeReason])

  const activeData = reasons.find((reason) => reason.id === activeReason)

  // =========================================
  // MASCOT - NATURAL EYE TRACKING
  // =========================================
  const updatePupils = () => {
    frameRef.current = null

    const mascot = mascotRef.current
    if (!mascot) return

    const rect = mascot.getBoundingClientRect()

    if (!rect.width || !rect.height) return

    const mouseX = pointerRef.current.x - rect.left
    const mouseY = pointerRef.current.y - rect.top

    const calculatePupil = (eye) => {
      const eyeX = (rect.width * eye.x) / 100
      const eyeY = (rect.height * eye.y) / 100

      const dx = mouseX - eyeX
      const dy = mouseY - eyeY

      const angle = Math.atan2(dy, dx)
      const distance = Math.sqrt(dx ** 2 + dy ** 2)

      const strength = Math.min(distance / (rect.width * EYE_REACH), 1)

      const screenX = Math.cos(angle) * strength * rect.width * EYE_TRAVEL.x
      const screenY = Math.sin(angle) * strength * rect.width * EYE_TRAVEL.y

      const tilt = (eye.tilt * Math.PI) / 180
      const cos = Math.cos(tilt)
      const sin = Math.sin(tilt)

      return {
        x: screenX * cos + screenY * sin,
        y: -screenX * sin + screenY * cos,
      }
    }

    const leftPupil = calculatePupil(EYES.left)
    const rightPupil = calculatePupil(EYES.right)

    setPupilPosition({
      leftX: leftPupil.x,
      leftY: leftPupil.y,
      rightX: rightPupil.x,
      rightY: rightPupil.y,
    })
  }

  const handleSectionMouseMove = (event) => {
    pointerRef.current = { x: event.clientX, y: event.clientY }

    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(updatePupils)
    }
  }

  const handleSectionMouseLeave = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    setPupilPosition({
      leftX: 0,
      leftY: 0,
      rightX: 0,
      rightY: 0,
    })
  }

  // =========================================
  // CLOSE DETAIL CARD
  // =========================================
  const handleCloseDetail = () => {
    setHasInteracted(true)
    setActiveReason(null)
  }

  // =========================================
  // AVATAR BUTTON
  // =========================================
  const renderAvatar = (reason, index) => {
    const Icon = reason.icon
    const isActive = activeReason === reason.id
    const isGuided =
      !hasInteracted && !activeData && autoHighlightId === reason.id

    const handleAvatarClick = (event) => {
      event.stopPropagation()

      setHasInteracted(true)

      setActiveReason((current) => (current === reason.id ? null : reason.id))
    }

    return (
      <button
        key={reason.id}
        type="button"
        className={`why-dreams__avatar ${
          isActive ? 'is-active' : ''
        } ${isGuided ? 'is-guided' : ''}`}
        style={{
          '--avatar-delay': `${index * 0.35}s`,
          '--avatar-color': reason.color,
          '--avatar-light': reason.light,
          '--avatar-gradient': reason.gradient,
        }}
        aria-label={reason.title}
        aria-pressed={isActive}
        onClick={handleAvatarClick}
      >
        <span className="why-dreams__avatar-ring" />

        <span className="why-dreams__avatar-icon">
          <Icon size={45} strokeWidth={1.8} />
        </span>

        <span className="why-dreams__avatar-tooltip">{reason.title}</span>

        <span className="why-dreams__avatar-mobile-label">{reason.title}</span>
      </button>
    )
  }

  // =========================================
  // RENDER
  // =========================================
  return (
    <section
      className="why-dreams"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
    >
      <Container>
        <div className="why-dreams__content">
          {/* SECTION HEADING */}
          <SectionHeading
            title="Mengapa Memilih DREAMS?"
            description="Satu platform untuk menghubungkan kebaikan, membangun kolaborasi, dan mengelola kegiatan sosial secara lebih terarah."
          />

          {/* VISUAL AREA */}
          <div
            className={`why-dreams__visual ${
              activeData ? 'has-active-detail' : ''
            }`}
          >
            {/* DISMISS AREA */}
            {activeData && (
              <button
                type="button"
                className="why-dreams__dismiss-area"
                aria-label="Tutup penjelasan"
                onClick={handleCloseDetail}
              />
            )}

            {/* TOP AVATARS */}
            <div className="why-dreams__avatar-group why-dreams__avatar-group--top">
              {reasons
                .slice(0, 2)
                .map((reason, index) => renderAvatar(reason, index))}
            </div>

            {/* LEFT AVATAR */}
            <div className="why-dreams__avatar-group why-dreams__avatar-group--left">
              {renderAvatar(reasons[2], 2)}
            </div>

            {/* RIGHT AVATAR */}
            <div className="why-dreams__avatar-group why-dreams__avatar-group--right">
              {renderAvatar(reasons[3], 3)}
            </div>

            {/* MASCOT */}
            <div className="why-dreams__mascot-wrapper" ref={mascotRef}>
              <div className="why-dreams__mascot">
                <img
                  src={dreamsMascot}
                  alt="Maskot DREAMS"
                  className="why-dreams__mascot-image"
                  loading="lazy"
                  decoding="async"
                />

                {/* EYES */}
                <div className="why-dreams__eyes">
                  {EYE_SIDES.map((side) => {
                    const eye = EYES[side]

                    return (
                      <span
                        key={side}
                        className={`why-dreams__eye why-dreams__eye--${side}`}
                        style={{
                          '--eye-x': `${eye.x}%`,
                          '--eye-y': `${eye.y}%`,
                          '--eye-width': `${eye.width}%`,
                          '--eye-ratio': eye.ratio,
                          '--eye-tilt': `${eye.tilt}deg`,
                          '--pupil-rest-x': `${eye.rest}%`,
                        }}
                      >
                        <span
                          className={`why-dreams__pupil why-dreams__pupil--${side}`}
                          style={{
                            transform: `translate(
                              calc(-50% + ${pupilPosition[`${side}X`]}px),
                              calc(-50% + ${pupilPosition[`${side}Y`]}px)
                            )`,
                          }}
                        />
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* DECORATION */}
            <div className="why-dreams__decoration why-dreams__decoration--one">
              <Sparkles size={22} />
            </div>

            <div className="why-dreams__decoration why-dreams__decoration--two">
              <Sparkles size={16} />
            </div>

            {/* INTERACTION HINT */}
            {!hasInteracted && !activeData && (
              <div className="why-dreams__interaction-hint">
                <MousePointer2 size={15} strokeWidth={2} />
                <span>Klik ikon untuk melihat keunggulan DREAMS</span>
              </div>
            )}

            {/* DETAIL CARD */}
            {activeData && (
              <div
                className="why-dreams__detail"
                key={activeData.id}
                style={{
                  '--detail-color': activeData.color,
                  '--detail-light': activeData.light,
                  '--detail-gradient': activeData.gradient,
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="why-dreams__detail-accent" />

                {/* CLOSE BUTTON */}
                <button
                  type="button"
                  className="why-dreams__detail-close"
                  aria-label="Tutup penjelasan"
                  onClick={handleCloseDetail}
                >
                  <span />
                  <span />
                </button>

                {/* ICON */}
                <div className="why-dreams__detail-icon">
                  <activeData.icon size={27} strokeWidth={1.8} />
                </div>

                {/* CONTENT */}
                <div className="why-dreams__detail-content">
                  <span className="why-dreams__detail-label">
                    KEUNGGULAN DREAMS
                  </span>

                  <h3>{activeData.title}</h3>

                  <p>{activeData.description}</p>
                </div>

                {/* NUMBER */}
                <div className="why-dreams__detail-number">
                  0{activeData.id}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* =========================================
          WHY DREAMS STYLES
      ========================================= */}
      <style>{`
        .why-dreams {
          position: relative;
          overflow: hidden;
          padding: 100px 0 200px;
          background: var(--color-surface);
        }

        .why-dreams__content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* VISUAL */
        .why-dreams__visual {
          position: relative;
          width: 100%;
          max-width: 1100px;
          height: clamp(400px, 34vw, 480px);
          margin: 30px auto 0;
        }

        /* MASCOT */
        .why-dreams__mascot-wrapper {
          position: absolute;
          left: 50%;
          bottom: 0;
          z-index: 2;
          width: clamp(300px, 27vw, 380px);
          transform: translateX(-50%);
          isolation: isolate;
        }

        .why-dreams__mascot-wrapper::before {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 10px;
          width: 85%;
          height: 150px;

          background: radial-gradient(
            ellipse at center,
            rgba(8, 123, 238, 0.12) 0%,
            rgba(8, 123, 238, 0.05) 45%,
            transparent 75%
          );

          filter: blur(24px);
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
        }

        .why-dreams__mascot-wrapper::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 100%;
          height: 130px;

          background: linear-gradient(
            to bottom,
            transparent 0%,
            color-mix(
              in srgb,
              var(--color-surface) 45%,
              transparent
            ) 40%,
            var(--color-surface) 100%
          );

          z-index: 2;
          pointer-events: none;
        }

        .why-dreams__mascot {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
        }

        .why-dreams__mascot-image {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          aspect-ratio: 1181 / 1331;
        }

        /* EYE TRACKING */
        .why-dreams__eyes {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        .why-dreams__eye {
          position: absolute;
          top: var(--eye-y);
          left: var(--eye-x);

          width: var(--eye-width);
          aspect-ratio: var(--eye-ratio);

          translate: -50% -50%;
          rotate: var(--eye-tilt, 0deg);

          overflow: hidden;
          border-radius: 50%;

          pointer-events: none;
        }

        .why-dreams__pupil {
          position: absolute;
          top: 50%;
          left: calc(50% + var(--pupil-rest-x, 0%));
          display: block;

          width: 66%;
          height: 90%;

          border-radius: 50%;

          background: radial-gradient(
            ellipse at 50% 80%,
            #a8672f 0%,
            #7a4220 38%,
            #4a2614 70%,
            #2a150b 100%
          );

          border: 1px solid rgba(34, 17, 8, 0.55);

          box-shadow:
            inset 0 2px 3px rgba(0, 0, 0, 0.25),
            inset 0 -2px 3px rgba(255, 190, 120, 0.12);

          transition:
            transform 0.16s cubic-bezier(0.22, 1, 0.36, 1);

          will-change: transform;
        }

        .why-dreams__pupil::before {
          content: '';
          position: absolute;

          width: 58%;
          height: 62%;

          top: 48%;
          left: 50%;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background: radial-gradient(
            ellipse at 45% 35%,
            #1c110c 0%,
            #0a0706 65%,
            #000000 100%
          );

          pointer-events: none;
        }

        .why-dreams__pupil::after {
          content: '';
          position: absolute;

          width: 20%;
          aspect-ratio: 1 / 1.1;

          top: 17%;
          left: 34%;

          border-radius: 50%;

          background: #ffffff;

          box-shadow: 0 0 2px rgba(255, 255, 255, 0.7);

          pointer-events: none;
        }

        /* AVATAR GROUP */
        .why-dreams__avatar-group {
          position: absolute;
          z-index: 6;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .why-dreams__avatar-group--top {
          top: -15px;
          left: 50%;
          gap: clamp(70px, 7vw, 115px);
          transform: translateX(-50%);
        }

        .why-dreams__avatar-group--left {
          top: clamp(40px, 5vw, 65px);
          left: calc(50% - clamp(320px, 32vw, 410px));
        }

        .why-dreams__avatar-group--right {
          top: clamp(40px, 5vw, 65px);
          right: calc(50% - clamp(320px, 32vw, 410px));
        }

        /* AVATAR BUTTON */
        .why-dreams__avatar {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: clamp(100px, 8.5vw, 130px);
          height: clamp(100px, 8.5vw, 130px);

          padding: 0;

          border: 1px solid color-mix(
            in srgb,
            var(--avatar-color) 18%,
            white
          );

          border-radius: 50%;

          background: linear-gradient(
            145deg,
            #ffffff 0%,
            var(--avatar-light) 100%
          );

          color: var(--avatar-color);

          box-shadow:
            0 10px 30px color-mix(
              in srgb,
              var(--avatar-color) 10%,
              transparent
            ),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);

          cursor: pointer;

          animation: whyDreamsAvatarFloating 3.5s ease-in-out infinite;
          animation-delay: var(--avatar-delay, 0s);

          transition:
            color 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            scale 0.3s ease;
        }

        /* AUTO GUIDED HIGHLIGHT */
        .why-dreams__avatar.is-guided {
          animation:
            whyDreamsAvatarFloating 3.5s ease-in-out infinite,
            whyDreamsGuidedPulse 1.8s ease-in-out infinite;

          animation-delay:
            var(--avatar-delay, 0s),
            0s;
        }

        @keyframes whyDreamsGuidedPulse {
          0%,
          100% {
            box-shadow:
              0 10px 30px color-mix(
                in srgb,
                var(--avatar-color) 10%,
                transparent
              ),
              inset 0 1px 0 rgba(255, 255, 255, 0.9);
          }

          50% {
            box-shadow:
              0 0 0 7px color-mix(
                in srgb,
                var(--avatar-color) 14%,
                transparent
              ),
              0 16px 36px color-mix(
                in srgb,
                var(--avatar-color) 24%,
                transparent
              ),
              inset 0 1px 0 rgba(255, 255, 255, 0.9);
          }
        }

        .why-dreams__avatar-ring {
          position: absolute;
          inset: 7px;

          border: 1px solid color-mix(
            in srgb,
            var(--avatar-color) 12%,
            transparent
          );

          border-radius: 50%;

          transition:
            inset 0.3s ease,
            border-color 0.3s ease;
        }

        .why-dreams__avatar-icon {
          position: relative;
          z-index: 1;

          display: flex;
          align-items: center;
          justify-content: center;

          transition:
            transform 0.3s ease,
            color 0.3s ease;
        }

        .why-dreams__avatar-icon svg {
          width: clamp(38px, 3.2vw, 48px);
          height: clamp(38px, 3.2vw, 48px);
        }

        /* MOBILE LABEL */
        .why-dreams__avatar-mobile-label {
          display: none;
        }

        /* HOVER */
        .why-dreams__avatar:hover {
          color: #ffffff;
          background: var(--avatar-gradient);
          border-color: var(--avatar-color);

          box-shadow:
            0 16px 36px color-mix(
              in srgb,
              var(--avatar-color) 28%,
              transparent
            ),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);

          scale: 1.06;
        }

        .why-dreams__avatar:hover .why-dreams__avatar-ring {
          inset: 4px;
          border-color: rgba(255, 255, 255, 0.35);
        }

        .why-dreams__avatar:hover .why-dreams__avatar-icon {
          transform: scale(1.12);
        }

        /* ACTIVE */
        .why-dreams__avatar.is-active {
          color: #ffffff;
          background: var(--avatar-gradient);
          border-color: var(--avatar-color);

          box-shadow:
            0 0 0 5px var(--avatar-light),
            0 15px 35px color-mix(
              in srgb,
              var(--avatar-color) 30%,
              transparent
            );

          scale: 1.04;
        }

        .why-dreams__avatar.is-active .why-dreams__avatar-ring {
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* TOOLTIP */
        .why-dreams__avatar-tooltip {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 50%;
          z-index: 8;

          width: max-content;
          max-width: 160px;

          padding: 9px 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;

          background: #102d50;
          color: #ffffff;

          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2px;

          opacity: 0;
          visibility: hidden;

          transform: translate(-50%, 7px);

          transition:
            opacity 0.2s ease,
            transform 0.2s ease,
            visibility 0.2s ease;

          pointer-events: none;
        }

        .why-dreams__avatar-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;

          border: 5px solid transparent;
          border-top-color: #102d50;

          transform: translateX(-50%);
        }

        .why-dreams__avatar:hover .why-dreams__avatar-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, 0);
        }

        /* FLOATING AVATAR */
        @keyframes whyDreamsAvatarFloating {
          0%,
          100% {
            translate: 0 0;
          }

          50% {
            translate: 0 -8px;
          }
        }

        /* DECORATION */
        .why-dreams__decoration {
          position: absolute;
          z-index: 1;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #4fc3e0;
          opacity: 0.8;

          pointer-events: none;
        }

        .why-dreams__decoration--one {
          top: 145px;
          left: 25%;
        }

        .why-dreams__decoration--two {
          top: 230px;
          right: 25%;
          color: #176b45;
        }

        /* INTERACTION HINT - FLOATING */
        .why-dreams__interaction-hint {
          position: absolute;
          left: 50%;
          bottom: 12px;
          z-index: 8;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          width: max-content;
          max-width: calc(100% - 24px);

          padding: 9px 15px;

          border: 1px solid rgba(8, 123, 238, 0.12);
          border-radius: 999px;

          background: rgba(255, 255, 255, 0.92);
          color: #64748b;

          font-size: 12px;
          font-weight: 600;
          line-height: 1.4;

          box-shadow: 0 8px 24px rgba(16, 45, 80, 0.08);

          transform: translateX(-50%);

          animation:
            whyDreamsHintEnter 0.5s ease both,
            whyDreamsHintFloating 3s ease-in-out infinite;

          animation-delay: 0s, 0.5s;
        }

        .why-dreams__interaction-hint svg {
          flex-shrink: 0;
          color: #087bee;
        }

        @keyframes whyDreamsHintEnter {
          from {
            opacity: 0;
            transform: translate(-50%, 6px);
          }

          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes whyDreamsHintFloating {
          0%,
          100% {
            translate: 0 0;
          }

          50% {
            translate: 0 -5px;
          }
        }

        /* DISMISS AREA */
        .why-dreams__dismiss-area {
          position: absolute;
          inset: 0;
          z-index: 5;

          width: 100%;
          height: 100%;

          padding: 0;
          border: 0;

          background: transparent;
          cursor: default;
        }

        /* DETAIL CARD */
        .why-dreams__detail {
          position: absolute;

          top: 105%;
          left: 50%;
          z-index: 7;

          display: flex;
          align-items: center;
          gap: 24px;

          width: calc(100% - 40px);
          max-width: 620px;

          padding: 32px 34px;

          border: 1px solid color-mix(
            in srgb,
            var(--detail-color) 18%,
            white
          );

          border-radius: 24px;

          background: linear-gradient(
            145deg,
            #ffffff 0%,
            var(--detail-light) 100%
          );

          box-shadow:
            0 25px 65px rgba(16, 45, 80, 0.12),
            0 8px 24px color-mix(
              in srgb,
              var(--detail-color) 8%,
              transparent
            ),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);

          transform: translate(-50%, -50%);

          animation: whyDreamsDetailEnter 0.35s ease both;

          isolation: isolate;
        }

        .why-dreams__detail-accent {
          position: absolute;
          top: 0;
          left: 30px;
          right: 30px;

          height: 3px;

          border-radius: 0 0 8px 8px;

          background: var(--detail-gradient);
          opacity: 0.9;
        }

        @keyframes whyDreamsDetailEnter {
          from {
            opacity: 0;
            transform: translate(-50%, calc(-50% + 18px)) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        /* DETAIL ICON */
        .why-dreams__detail-icon {
          position: relative;
          z-index: 1;

          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;

          width: 64px;
          height: 64px;

          border: 1px solid color-mix(
            in srgb,
            var(--detail-color) 15%,
            white
          );

          border-radius: 19px;

          background: var(--detail-gradient);
          color: #ffffff;

          box-shadow:
            0 10px 24px color-mix(
              in srgb,
              var(--detail-color) 22%,
              transparent
            );
        }

        /* DETAIL CONTENT */
        .why-dreams__detail-content {
          flex: 1;
          min-width: 0;
        }

        .why-dreams__detail-label {
          display: inline-flex;
          align-items: center;

          margin-bottom: 10px;
          padding: 6px 10px;

          border: 1px solid color-mix(
            in srgb,
            var(--detail-color) 12%,
            white
          );

          border-radius: 6px;

          background: color-mix(
            in srgb,
            var(--detail-color) 7%,
            white
          );

          color: var(--detail-color);

          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .why-dreams__detail-content h3 {
          margin: 0 0 9px;

          color: #102d50;

          font-size: 22px;
          font-weight: 750;
          letter-spacing: -0.5px;
          line-height: 1.3;
        }

        .why-dreams__detail-content p {
          margin: 0;

          color: #64748b;

          font-size: 14px;
          font-weight: 400;
          line-height: 1.8;
        }

        /* DETAIL NUMBER */
        .why-dreams__detail-number {
          align-self: flex-start;
          flex-shrink: 0;

          margin-top: 8px;

          background: var(--detail-gradient);
          background-clip: text;
          -webkit-background-clip: text;

          color: transparent;

          font-size: 42px;
          font-weight: 900;
          line-height: 1;

          opacity: 0.2;
        }

        /* DETAIL CLOSE */
        .why-dreams__detail-close {
          position: absolute;
          top: 14px;
          right: 14px;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 30px;
          height: 30px;

          padding: 0;

          border: 1px solid rgba(16, 45, 80, 0.06);
          border-radius: 50%;

          background: rgba(255, 255, 255, 0.75);

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.2s ease,
            border-color 0.2s ease;
        }

        .why-dreams__detail-close:hover {
          background: var(--detail-light);

          border-color: color-mix(
            in srgb,
            var(--detail-color) 20%,
            white
          );

          transform: rotate(90deg);
        }

        .why-dreams__detail-close span {
          position: absolute;

          width: 11px;
          height: 1.5px;

          border-radius: 2px;
          background: #64748b;
        }

        .why-dreams__detail-close span:first-child {
          transform: rotate(45deg);
        }

        .why-dreams__detail-close span:last-child {
          transform: rotate(-45deg);
        }

        /* LARGE DESKTOP */
        @media (min-width: 1440px) {
          .why-dreams__visual {
            max-width: 1200px;
            height: 500px;
          }

          .why-dreams__mascot-wrapper {
            width: clamp(340px, 28vw, 420px);
          }

          .why-dreams__mascot-wrapper::after {
            height: 150px;
          }

          .why-dreams__avatar-group--top {
            top: -15px;
            gap: clamp(110px, 8vw, 145px);
          }

          .why-dreams__avatar-group--left {
            top: 55px;
            left: calc(50% - clamp(410px, 34vw, 470px));
          }

          .why-dreams__avatar-group--right {
            top: 55px;
            right: calc(50% - clamp(410px, 34vw, 470px));
          }

          .why-dreams__decoration--one {
            left: 23%;
          }

          .why-dreams__decoration--two {
            right: 23%;
          }

          .why-dreams__detail {
            top: 115%;
            max-width: 680px;
            padding: 36px 40px;
          }

          .why-dreams__detail-icon {
            width: 70px;
            height: 70px;
          }

          .why-dreams__detail-content h3 {
            font-size: 24px;
          }

          .why-dreams__detail-content p {
            font-size: 15px;
          }

          .why-dreams__detail-number {
            font-size: 48px;
          }
        }

        /* TABLET */
        @media (max-width: 768px) {
          .why-dreams {
            padding: 80px 0 180px;
          }

          .why-dreams__visual {
            max-width: 760px;
            height: 360px;
          }

          .why-dreams__mascot-wrapper {
            width: 300px;
          }

          .why-dreams__mascot-wrapper::before {
            height: 120px;
          }

          .why-dreams__mascot-wrapper::after {
            height: 110px;
          }

          .why-dreams__avatar {
            width: 99px;
            height: 99px;
          }

          .why-dreams__avatar-icon svg {
            width: 39px;
            height: 39px;
          }

          .why-dreams__avatar-group--top {
            top: -10px;
            gap: 51px;
          }

          .why-dreams__avatar-group--left {
            top: 45px;
            left: calc(50% - 360px);
          }

          .why-dreams__avatar-group--right {
            top: 45px;
            right: calc(50% - 360px);
          }

          .why-dreams__decoration--one {
            left: 20%;
          }

          .why-dreams__decoration--two {
            right: 20%;
          }

          .why-dreams__detail {
            top: 100%;
            width: calc(100% - 32px);
            padding: 24px;
            gap: 18px;
          }

          .why-dreams__detail-icon {
            width: 54px;
            height: 54px;
            border-radius: 16px;
          }

          .why-dreams__detail-content h3 {
            font-size: 19px;
          }

          .why-dreams__detail-content p {
            font-size: 13px;
          }

          .why-dreams__detail-number {
            font-size: 32px;
          }

          .why-dreams__interaction-hint {
            bottom: 12px;
            padding: 8px 12px;
            font-size: 11px;
          }
        }

        /* MOBILE */
        @media (max-width: 480px) {
          .why-dreams {
            padding: 65px 0 160px;
          }

          .why-dreams__visual {
            height: 310px;
            margin-top: 20px;
          }

          .why-dreams__mascot-wrapper {
            width: 245px;
          }

          .why-dreams__mascot-wrapper::before {
            height: 100px;
            filter: blur(18px);
          }

          .why-dreams__mascot-wrapper::after {
            height: 90px;
          }

          .why-dreams__avatar-group--top {
            top: -10px;
            gap: 24px;
          }

          .why-dreams__avatar-group--left {
            top: 35px;
            left: calc(50% - 165px);
          }

          .why-dreams__avatar-group--right {
            top: 35px;
            right: calc(50% - 165px);
          }

          .why-dreams__avatar {
            width: 58px;
            height: 58px;
          }

          .why-dreams__avatar-ring {
            inset: 4px;
          }

          .why-dreams__avatar-icon svg {
            width: 23px;
            height: 23px;
          }

          /* MOBILE LABEL */
          .why-dreams__avatar-mobile-label {
            position: absolute;
            top: calc(100% + 5px);
            left: 50%;
            z-index: 8;

            display: block;

            width: max-content;
            max-width: 78px;

            color: var(--avatar-color);

            font-size: 8px;
            font-weight: 700;
            line-height: 1.25;
            text-align: center;

            transform: translateX(-50%);
            pointer-events: none;
          }

          .why-dreams__avatar-tooltip {
            display: none;
          }

          .why-dreams__decoration--one {
            top: 145px;
            left: 12%;
          }

          .why-dreams__decoration--two {
            top: 210px;
            right: 12%;
          }

          /* FLOATING HINT MOBILE */
          .why-dreams__interaction-hint {
            bottom: 10px;

            gap: 6px;

            max-width: calc(100% - 16px);

            padding: 8px 11px;

            font-size: 10px;
          }

          .why-dreams__interaction-hint svg {
            width: 13px;
            height: 13px;
          }

          /* MOBILE DETAIL CARD */
          .why-dreams__detail {
            top: 105%;

            gap: 12px;

            width: calc(100% - 24px);
            max-width: 360px;

            padding: 22px 16px;

            border-radius: 18px;
          }

          .why-dreams__detail-accent {
            left: 18px;
            right: 18px;
          }

          .why-dreams__detail-icon {
            width: 43px;
            height: 43px;
            border-radius: 13px;
          }

          .why-dreams__detail-icon svg {
            width: 21px;
            height: 21px;
          }

          .why-dreams__detail-content h3 {
            font-size: 16px;
            letter-spacing: -0.2px;
          }

          .why-dreams__detail-content p {
            font-size: 12px;
            line-height: 1.7;
          }

          .why-dreams__detail-number {
            font-size: 23px;
          }

          .why-dreams__detail-label {
            margin-bottom: 8px;
            padding: 5px 7px;

            font-size: 7px;
            letter-spacing: 1px;
          }

          .why-dreams__detail-close {
            top: 9px;
            right: 9px;

            width: 25px;
            height: 25px;
          }
        }

        /* SMALL MOBILE */
        @media (max-width: 360px) {
          .why-dreams__interaction-hint {
            bottom: 8px;
            gap: 5px;
            padding: 7px 9px;
            font-size: 9px;
          }

          .why-dreams__detail {
            top: 100%;
            gap: 10px;
            padding: 18px 12px;
          }

          .why-dreams__detail-icon {
            width: 36px;
            height: 36px;
          }

          .why-dreams__detail-content h3 {
            font-size: 15px;
          }

          .why-dreams__detail-content p {
            font-size: 11px;
          }

          .why-dreams__detail-number {
            font-size: 19px;
          }
        }

        /* REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .why-dreams__avatar,
          .why-dreams__detail,
          .why-dreams__interaction-hint {
            animation: none;
          }

          .why-dreams__pupil {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}

export default WhyDreams
