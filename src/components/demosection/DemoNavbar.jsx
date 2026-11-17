import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, ExternalLink, Menu, X } from 'lucide-react'

import { dreamsLight } from '../../assets/assets'
import Container from '../common/Container'
import { navigation } from '../../data/navigation'

// =========================================
// DEMO NAVBAR
// =========================================

function DemoNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const applicationUrl = 'https://demo.dreamsapp.id'

  const sectionNavigation = navigation.filter((item) =>
    ['Beranda', 'Tentang', 'Fitur', 'Produk', 'Cara Kerja', 'Kontak'].includes(
      item.label,
    ),
  )

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((previous) => !previous)
  }

  const getSectionHref = (item) => {
    return item.href
  }

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <style>{`
        /* =========================================
           1. NAVBAR BASE
        ========================================= */

        .demo-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;

          width: 100%;

          background: rgba(255, 255, 255, 0.96);
          border-bottom: 1px solid #e8edf3;

          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
        }

        /* =========================================
           2. NAVBAR CONTAINER
        ========================================= */

        .demo-navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;

          min-height: 78px;
          gap: 30px;
          min-width: 0;
        }

        /* =========================================
           3. BRAND
        ========================================= */

        .demo-navbar__brand {
          display: inline-flex;
          align-items: center;

          flex-shrink: 0;

          text-decoration: none;
          outline-offset: 5px;
        }

        .demo-navbar__logo {
          display: block;

          width: 90px;
          height: auto;

          object-fit: contain;
        }

        /* =========================================
           4. DESKTOP NAVIGATION
        ========================================= */

        .demo-navbar__links {
          display: flex;
          align-items: center;
          justify-content: center;

          flex: 1 1 auto;
          min-width: 0;

          gap: clamp(18px, 1.7vw, 26px);
        }

        .demo-navbar__link {
          display: inline-flex;
          align-items: center;

          position: relative;

          padding: 30px 0;

          color: #334155;

          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.015em;

          text-decoration: none;
          white-space: nowrap;

          flex-shrink: 0;

          transition: color 200ms ease;
        }

        .demo-navbar__link:hover {
          color: #0176d3;
        }

        .demo-navbar__link::after {
          content: "";

          position: absolute;
          bottom: 20px;
          left: 0;

          width: 0;
          height: 2px;

          border-radius: 999px;
          background: #0176d3;

          transition: width 250ms ease;
        }

        .demo-navbar__link:hover::after {
          width: 100%;
        }

        /* =========================================
           5. NAVBAR ACTIONS
        ========================================= */

        .demo-navbar__actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          gap: 12px;

          flex: 0 0 auto;
          min-width: max-content;
        }

        /* KEMBALI KE WEBSITE */

        .demo-navbar__back {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          min-height: 42px;
          padding: 0 14px;

          border: 1px solid #e2edf9;
          border-radius: 8px;

          background: #f1f7ff;
          color: #0176d3;

          font-size: 13px;
          font-weight: 600;

          text-decoration: none;
          white-space: nowrap;

          flex-shrink: 0;

          transition:
            color 200ms ease,
            background 200ms ease,
            border-color 200ms ease;
        }

        .demo-navbar__back:hover {
          color: #015fae;
          background: #e2edf9;
          border-color: #c9def5;
        }

        /* MASUK APLIKASI DREAMS */

        .demo-navbar__app {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          min-height: 42px;
          padding: 0 14px;

          border: 1px solid #0176d3;
          border-radius: 8px;

          background: #0176d3;
          color: #ffffff;

          font-size: 13px;
          font-weight: 600;

          text-decoration: none;
          white-space: nowrap;

          flex-shrink: 0;

          box-shadow: 0 2px 6px rgba(1, 118, 211, 0.12);

          transition:
            color 200ms ease,
            background 200ms ease,
            border-color 200ms ease,
            box-shadow 200ms ease;
        }

        .demo-navbar__app:hover {
          color: #ffffff;
          background: #015fae;
          border-color: #015fae;

          box-shadow: 0 4px 10px rgba(1, 118, 211, 0.18);
        }

        /* =========================================
           6. MOBILE MENU BUTTON
        ========================================= */

        .demo-navbar__menu-button {
          display: none;

          align-items: center;
          justify-content: center;

          width: 40px;
          height: 40px;
          padding: 0;

          border: 1px solid #e2edf9;
          border-radius: 999px;

          outline: none;

          background: #f1f7ff;
          color: #0176d3;

          cursor: pointer;
          flex-shrink: 0;

          transition:
            background 200ms ease,
            color 200ms ease,
            border-color 200ms ease;
        }

        .demo-navbar__menu-button:hover {
          background: #e2edf9;
          border-color: #c9def5;
          color: #015fae;
        }

        /* =========================================
           7. MOBILE OVERLAY
        ========================================= */

        .demo-navbar__mobile-overlay {
          position: fixed;

          top: 78px;
          right: 0;
          bottom: 0;
          left: 0;

          z-index: 999;

          background: rgba(15, 30, 50, 0.42);

          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          transition:
            opacity 250ms ease,
            visibility 250ms ease;
        }

        .demo-navbar__mobile-overlay.is-open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        /* =========================================
           8. MOBILE DRAWER
        ========================================= */

        .demo-navbar__mobile-drawer {
          position: absolute;
          top: 0;
          right: 0;

          display: flex;
          flex-direction: column;

          width: min(380px, 90%);
          height: auto;

          max-height: calc(100% - 20px);

          box-sizing: border-box;

          padding: 24px;

          background: #ffffff;

          transform: translateX(100%);

          transition: transform 300ms ease;

          overflow-y: auto;
          overscroll-behavior: contain;

          border-radius: 0 0 0 16px;

          box-shadow: -8px 12px 32px rgba(15, 30, 50, 0.08);
        }

        .demo-navbar__mobile-overlay.is-open
          .demo-navbar__mobile-drawer {
          transform: translateX(0);
        }

        /* =========================================
           9. MOBILE NAVIGATION
        ========================================= */

        .demo-navbar__mobile-nav {
          display: flex;
          flex-direction: column;

          flex: 0 1 auto;
          min-height: 0;

          overflow-y: auto;
          overscroll-behavior: contain;

          padding: 0;

          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .demo-navbar__mobile-nav::-webkit-scrollbar {
          width: 4px;
        }

        .demo-navbar__mobile-nav::-webkit-scrollbar-track {
          background: transparent;
        }

        .demo-navbar__mobile-nav::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }

        .demo-navbar__mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 16px;

          padding: 17px 4px;

          border-bottom: 1px solid #edf1f5;

          color: #334155;

          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;

          text-decoration: none;

          flex-shrink: 0;

          transition:
            color 200ms ease,
            padding 200ms ease;
        }

        .demo-navbar__mobile-link:hover {
          padding-left: 10px;
          color: #0176d3;
        }

        .demo-navbar__mobile-link svg {
          color: #0176d3;

          flex-shrink: 0;
          opacity: 0.8;
        }

        /* =========================================
           10. MOBILE ACTIONS
        ========================================= */

        .demo-navbar__mobile-actions {
          display: flex;
          flex-direction: column;

          flex-shrink: 0;

          gap: 10px;
          margin-top: 20px;
        }

        /* BUKA APLIKASI DREAMS */

        .demo-navbar__mobile-app {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          min-height: 44px;
          padding: 0 14px;

          border: 1px solid #0176d3;
          border-radius: 8px;

          background: #0176d3;
          color: #ffffff;

          font-size: 13px;
          font-weight: 600;

          text-decoration: none;

          box-shadow: 0 2px 6px rgba(1, 118, 211, 0.12);

          transition:
            color 200ms ease,
            background 200ms ease,
            border-color 200ms ease,
            box-shadow 200ms ease;
        }

        .demo-navbar__mobile-app:hover {
          color: #ffffff;
          background: #015fae;
          border-color: #015fae;

          box-shadow: 0 4px 10px rgba(1, 118, 211, 0.18);
        }

        /* KEMBALI KE WEBSITE */

        .demo-navbar__mobile-back {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          min-height: 44px;
          padding: 0 20px;

          border: 1px solid #e2edf9;
          border-radius: 8px;

          background: #f1f7ff;
          color: #0176d3;

          font-size: 13px;
          font-weight: 600;

          text-decoration: none;

          transition:
            background 200ms ease,
            color 200ms ease,
            border-color 200ms ease;
        }

        .demo-navbar__mobile-back:hover {
          background: #e2edf9;
          border-color: #c9def5;
          color: #015fae;
        }

        /* =========================================
           11. RESPONSIVE
        ========================================= */

        @media (max-width: 1200px) {
          .demo-navbar__inner {
            gap: 22px;
          }

          .demo-navbar__links {
            gap: 17px;
          }

          .demo-navbar__link {
            font-size: 13px;
          }

          .demo-navbar__back,
          .demo-navbar__app {
            padding: 0 10px;
            font-size: 12px;
          }
        }

        @media (max-width: 1024px) {
          .demo-navbar__links,
          .demo-navbar__back {
            display: none;
          }

          .demo-navbar__inner {
            justify-content: space-between;
          }

          .demo-navbar__actions {
            margin-left: auto;
          }

          .demo-navbar__menu-button {
            display: inline-flex;
          }
        }

        @media (max-width: 768px) {
          .demo-navbar__inner {
            min-height: 72px;
            gap: 12px;
          }

          .demo-navbar__logo {
            width: 80px;
          }

          .demo-navbar__links {
            display: none;
          }

          .demo-navbar__actions {
            display: flex;
            margin-left: auto;
            gap: 10px;
          }

          .demo-navbar__app {
            min-height: 40px;
            padding: 0 15px;
            font-size: 12px;
          }

          .demo-navbar__mobile-overlay {
            top: 72px;
          }

          .demo-navbar__mobile-drawer {
            padding: 22px;
          }
        }

        @media (max-width: 480px) {
          .demo-navbar__inner {
            min-height: 66px;
            gap: 8px;
          }

          .demo-navbar__logo {
            width: 74px;
          }

          .demo-navbar__menu-button {
            width: 36px;
            height: 36px;
          }

          .demo-navbar__actions {
            gap: 8px;
          }

          .demo-navbar__app {
            min-height: 36px;
            padding: 0 12px;
            gap: 6px;
            font-size: 11px;
          }

          .demo-navbar__app svg {
            width: 14px;
            height: 14px;
          }

          .demo-navbar__mobile-overlay {
            top: 66px;
          }

          .demo-navbar__mobile-drawer {
            padding: 18px;
            max-height: calc(100% - 16px);
          }

          .demo-navbar__mobile-link {
            padding: 14px 4px;
            font-size: 14px;
          }

          .demo-navbar__mobile-actions {
            margin-top: 16px;
            gap: 8px;
          }

          .demo-navbar__mobile-app {
            min-height: 40px;
          }

          .demo-navbar__mobile-back {
            min-height: 40px;
          }
        }

        @media (max-width: 360px) {
          .demo-navbar__logo {
            width: 66px;
          }

          .demo-navbar__menu-button {
            width: 32px;
          }

          .demo-navbar__app {
            padding: 0 9px;
            font-size: 10px;
          }

          .demo-navbar__mobile-drawer {
            padding: 16px;
          }
        }

        /* =========================================
           12. REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .demo-navbar *,
          .demo-navbar__mobile-overlay,
          .demo-navbar__mobile-drawer {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* =========================================
          NAVBAR
      ========================================= */}

      <header className="demo-navbar">
        <Container>
          <div className="demo-navbar__inner">
            {/* BRAND */}

            <a href="/" className="demo-navbar__brand" aria-label="DREAMS Home">
              <img
                src={dreamsLight}
                alt="DREAMS"
                className="demo-navbar__logo"
              />
            </a>

            {/* DESKTOP NAVIGATION */}

            <nav
              className="demo-navbar__links"
              aria-label="Navigasi Landing Page"
            >
              {sectionNavigation.map((item) => (
                <a
                  key={item.label}
                  href={getSectionHref(item)}
                  className="demo-navbar__link"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* NAVBAR ACTIONS */}

            <div className="demo-navbar__actions">
              {!isMobileMenuOpen && (
                <>
                  <a href="/" className="demo-navbar__back">
                    <ArrowLeft size={17} />
                    <span>Kembali ke Website</span>
                  </a>

                  <a
                    href={applicationUrl}
                    className="demo-navbar__app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Masuk Aplikasi DREAMS</span>
                    <ExternalLink size={15} />
                  </a>
                </>
              )}

              {/* MOBILE MENU BUTTON */}

              <button
                type="button"
                className="demo-navbar__menu-button"
                aria-label={
                  isMobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'
                }
                aria-expanded={isMobileMenuOpen}
                aria-controls="demo-mobile-drawer"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* =========================================
          MOBILE DRAWER OVERLAY
      ========================================= */}

      <div
        className={`demo-navbar__mobile-overlay ${
          isMobileMenuOpen ? 'is-open' : ''
        }`}
        onClick={closeMobileMenu}
        aria-hidden={!isMobileMenuOpen}
      >
        <aside
          id="demo-mobile-drawer"
          className="demo-navbar__mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigasi DREAMS"
          onClick={(event) => event.stopPropagation()}
        >
          {/* MOBILE NAVIGATION */}

          <nav
            className="demo-navbar__mobile-nav"
            aria-label="Navigasi Mobile Landing Page"
          >
            {sectionNavigation.map((item) => (
              <a
                key={item.label}
                href={getSectionHref(item)}
                className="demo-navbar__mobile-link"
                onClick={closeMobileMenu}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>

          {/* MOBILE ACTIONS */}

          <div className="demo-navbar__mobile-actions">
            <a
              href={applicationUrl}
              className="demo-navbar__mobile-app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              <span>Masuk Aplikasi DREAMS</span>
              <ExternalLink size={15} />
            </a>

            <a
              href="/"
              className="demo-navbar__mobile-back"
              onClick={closeMobileMenu}
            >
              <ArrowLeft size={17} />
              <span>Kembali ke Website</span>
            </a>
          </div>
        </aside>
      </div>
    </>
  )
}

export default DemoNavbar
