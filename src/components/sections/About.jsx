import { ArrowUpRight } from 'lucide-react'

import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import { aboutDreams } from '../../assets/assets'

// =========================================
// ABOUT SECTION
// =========================================

function About() {
  return (
    <section className="about section" id="tentang">
      <style>{`
        /* =========================================
           ABOUT SECTION
        ========================================= */

        .about {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(8, 123, 238, 0.07) 0%,
              transparent 45%
            ),
            radial-gradient(
              ellipse at 100% 100%,
              rgba(79, 195, 224, 0.10) 0%,
              transparent 40%
            ),
            linear-gradient(
              135deg,
              #F4F8FD 0%,
              #FFFFFF 48%,
              #EEF6FF 100%
            );
        }

        /* =========================================
           BACKGROUND DECORATION
        ========================================= */

        .about::before {
          content: '';
          position: absolute;
          top: 8%;
          right: -120px;
          z-index: -1;

          width: 360px;
          height: 360px;

          border-radius: 50%;
          background: rgba(8, 123, 238, 0.045);
          filter: blur(80px);
          pointer-events: none;
        }

        .about::after {
          content: '';
          position: absolute;
          bottom: -100px;
          left: -120px;
          z-index: -1;

          width: 320px;
          height: 320px;

          border-radius: 50%;
          background: rgba(79, 195, 224, 0.08);
          filter: blur(75px);
          pointer-events: none;
        }

        /* =========================================
           INTRODUCTION LAYOUT
        ========================================= */

        .about .about__intro {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          align-items: center;
          gap: clamp(40px, 6vw, 88px);
        }

        /* =========================================
           ABOUT IMAGE
        ========================================= */

        .about .about__image-wrapper {
          position: relative;
          isolation: isolate;

          width: 100%;
          height: clamp(380px, 40vw, 500px);

          overflow: hidden;
          border-radius: 28px;

          background: #EAF4FF;

          box-shadow:
            0 24px 60px rgba(16, 45, 80, 0.10),
            0 4px 16px rgba(16, 45, 80, 0.04);
        }

        .about .about__image-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;

          pointer-events: none;

          background: linear-gradient(
            180deg,
            rgba(16, 45, 80, 0.02) 45%,
            rgba(16, 45, 80, 0.42) 100%
          );
        }

        .about .about__image-wrapper::after {
          content: '';
          position: absolute;
          inset: 14px;
          z-index: 2;

          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 18px;

          pointer-events: none;
        }

        .about .about__image {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: center;

          transition: transform 0.7s cubic-bezier(0.2, 0.65, 0.3, 1);
        }

        .about .about__image-wrapper:hover .about__image {
          transform: scale(1.045);
        }

        /* =========================================
           IMAGE LABEL
        ========================================= */

        .about .about__image-label {
          position: absolute;
          right: 28px;
          bottom: 28px;
          left: 28px;
          z-index: 3;

          display: flex;
          align-items: center;
          gap: 10px;

          color: #FFFFFF;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .about .about__image-label-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;

          border-radius: 50%;
          background: #63D9AE;

          box-shadow: 0 0 12px rgba(99, 217, 174, 0.6);
        }

        /* =========================================
           ABOUT CONTENT
        ========================================= */

        .about .about__content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;

          min-width: 0;
        }

        .about .about__content .section-heading {
          width: 100%;
        }

        /* =========================================
           ABOUT DESCRIPTION
        ========================================= */

        .about .about__description {
          width: 100%;
          padding-top: 4px;
        }

        .about .about__description p {
          margin: 0;

          color: var(--color-text);
          font-size: clamp(15px, 1.15vw, 17px);
          line-height: 1.85;
          letter-spacing: -0.01em;

          opacity: 0.82;
        }

        /* =========================================
           ABOUT LINK
        ========================================= */

        .about .about__link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;

          width: fit-content;
          margin-top: 28px;
          padding: 13px 20px;

          border: 1px solid rgba(8, 123, 238, 0.18);
          border-radius: 12px;

          background: rgba(8, 123, 238, 0.06);
          color: var(--color-primary, #087BEE);

          font-size: 14px;
          font-weight: 600;
          text-decoration: none;

          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .about .about__link svg {
          transition: transform 0.25s ease;
        }

        .about .about__link:hover {
          transform: translateY(-2px);

          border-color: rgba(8, 123, 238, 0.35);
          background: rgba(8, 123, 238, 0.10);

          box-shadow: 0 8px 24px rgba(8, 123, 238, 0.08);
        }

        .about .about__link:hover svg {
          transform: translate(3px, -3px);
        }

        .about .about__link:focus-visible {
          outline: 3px solid rgba(8, 123, 238, 0.35);
          outline-offset: 4px;
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 900px) {
          .about .about__intro {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .about .about__image-wrapper {
            height: clamp(320px, 55vw, 440px);
          }

          .about .about__content {
            gap: 20px;
          }

          .about .about__description p {
            font-size: 16px;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {
          .about .about__intro {
            gap: 28px;
          }

          .about .about__image-wrapper {
            height: auto;
            aspect-ratio: 4 / 3;
            border-radius: 20px;
          }

          .about .about__image-wrapper::after {
            inset: 10px;
            border-radius: 13px;
          }

          .about .about__image-label {
            right: 20px;
            bottom: 20px;
            left: 20px;

            gap: 8px;
            font-size: 11px;
          }

          .about .about__content {
            gap: 18px;
          }

          .about .about__description {
            padding-top: 0;
          }

          .about .about__description p {
            font-size: var(--text-base, 15px);
            line-height: 1.75;
          }

          .about .about__link {
            margin-top: 22px;
            padding: 12px 17px;
            font-size: 13px;
          }

          .about::before {
            top: 5%;
            right: -180px;

            width: 280px;
            height: 280px;

            filter: blur(65px);
          }

          .about::after {
            bottom: -120px;
            left: -160px;

            width: 250px;
            height: 250px;

            filter: blur(60px);
          }
        }

        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .about .about__image,
          .about .about__link,
          .about .about__link svg {
            transition: none;
          }

          .about .about__image-wrapper:hover .about__image {
            transform: none;
          }
        }
      `}</style>

      {/* INTRODUCTION */}
      <Container>
        <div className="about__intro">
          {/* DOCUMENTARY IMAGE */}
          <div className="about__image-wrapper">
            <img
              src={aboutDreams}
              alt="Relawan menyerahkan bantuan kepada masyarakat"
              className="about__image"
              loading="lazy"
              decoding="async"
            />

            <div className="about__image-label">
              <span className="about__image-label-dot" />
              Pengelolaan lembaga sosial
            </div>
          </div>

          {/* DREAMS OVERVIEW */}
          <div className="about__content">
            <SectionHeading
              eyebrow="Tentang DREAMS"
              title="Mengelola aktivitas lembaga dalam satu sistem."
              align="left"
            />

            <div className="about__description">
              <p>
                DREAMS merupakan sistem pengelolaan donasi dan operasional
                lembaga sosial. Sistem ini mencakup pengelolaan donatur,
                transaksi, prospek, analitik, hingga penyaluran bantuan.
              </p>

              <a href="#fitur" className="about__link">
                Kenali fitur DREAMS
                <ArrowUpRight size={18} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
