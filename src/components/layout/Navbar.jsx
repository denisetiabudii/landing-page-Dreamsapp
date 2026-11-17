import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight, ExternalLink } from 'lucide-react'

import { dreamsLight } from '../../assets/assets'

import Container from '../common/Container'
import Button from '../common/Button'

import { navigation } from '../../data/navigation'
import { siteConfig } from '../../data/siteConfig'

// =========================================
// NAVBAR COMPONENT
// =========================================

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen((previous) => !previous)
  }

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 12)
    }

    updateScrollState()

    window.addEventListener('scroll', updateScrollState, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', updateScrollState)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  return (
    <>
      <style>{`
        /* =========================================
           1. NAVBAR BASE
        ========================================= */

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;

          width: 100%;

          background: transparent;
          border-bottom: 1px solid transparent;

          transition:
            background-color 200ms ease,
            border-color 200ms ease,
            backdrop-filter 200ms ease;
        }

        .navbar.is-scrolled {
          background: rgba(255, 255, 255, 0.96);
          border-bottom-color: #e8edf3;

          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
        }

        /* Topbar solid ketika drawer dibuka */

        .navbar.is-menu-open {
          background: #ffffff;
          border-bottom-color: #e8edf3;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;
        }

        /* =========================================
           2. NAVBAR CONTAINER
        ========================================= */

        .navbar__container {
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

        .navbar__brand {
          display: inline-flex;
          align-items: center;

          flex-shrink: 0;

          text-decoration: none;
          outline-offset: 5px;
        }

        .navbar__logo {
          display: block;

          width: 90px;
          height: auto;

          object-fit: contain;
        }

        /* =========================================
           4. DESKTOP NAVIGATION
        ========================================= */

        .navbar__navigation {
          display: flex;
          align-items: center;
          justify-content: center;

          flex: 1 1 auto;
          min-width: 0;

          gap: clamp(18px, 1.7vw, 26px);
        }

        .navbar__link {
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

        .navbar__link:hover {
          color: #0176d3;
        }

        .navbar__link::after {
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

        .navbar__link:hover::after {
          width: 100%;
        }

        /* =========================================
           5. NAVBAR ACTIONS
        ========================================= */

        .navbar__actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          gap: 12px;

          flex: 0 0 auto;
          min-width: max-content;
        }

        /* APPLICATION LINK */

        .navbar__login {
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

        .navbar__login:hover {
          color: #015fae;
          background: #e2edf9;
          border-color: #c9def5;
        }

        /* DEMO CTA */

        .navbar .navbar__demo {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 9px;

          min-height: 46px;
          padding: 0 19px;

          border: 1px solid #087bee;
          border-radius: 8px !important;

          background: #087bee;
          color: #ffffff;

          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.01em;

          text-decoration: none;
          white-space: nowrap;

          flex-shrink: 0;

          box-shadow: 0 2px 6px rgba(8, 123, 238, 0.12);

          transition:
            background 200ms ease,
            border-color 200ms ease,
            transform 200ms ease,
            box-shadow 200ms ease;
        }

        .navbar .navbar__demo:hover {
          background: #0668cc;
          border-color: #0668cc;

          box-shadow: 0 4px 12px rgba(8, 123, 238, 0.18);

          transform: translateY(-1px);
        }

        .navbar .navbar__demo:active {
          transform: translateY(0);
        }

        /* =========================================
           6. MOBILE MENU BUTTON
        ========================================= */

        .navbar__menu-toggle {
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

        .navbar__menu-toggle:hover {
          background: #e2edf9;
          border-color: #c9def5;
          color: #015fae;
        }

        /* =========================================
           7. MOBILE OVERLAY
        ========================================= */

        .navbar__mobile-overlay {
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

        .navbar__mobile-overlay.is-open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        /* =========================================
           8. MOBILE DRAWER
        ========================================= */

        .navbar__mobile-drawer {
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

        .navbar__mobile-overlay.is-open
          .navbar__mobile-drawer {
          transform: translateX(0);
        }

        /* =========================================
           9. MOBILE NAVIGATION
        ========================================= */

        .navbar__mobile-nav {
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

        .navbar__mobile-nav::-webkit-scrollbar {
          width: 4px;
        }

        .navbar__mobile-nav::-webkit-scrollbar-track {
          background: transparent;
        }

        .navbar__mobile-nav::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }

        .navbar__mobile-link {
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

        .navbar__mobile-link:hover {
          padding-left: 10px;
          color: #0176d3;
        }

        .navbar__mobile-link svg {
          color: #0176d3;

          flex-shrink: 0;
          opacity: 0.8;
        }

        /* =========================================
           10. MOBILE ACTIONS
        ========================================= */

        .navbar__mobile-actions {
          display: flex;
          flex-direction: column;

          flex-shrink: 0;

          gap: 10px;
          margin-top: 20px;
        }

        /* DEMO CTA */

        .navbar__mobile-demo {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 10px;

          min-height: 46px;
          padding: 0 20px;

          border: 1px solid #087bee;
          border-radius: 8px;

          background: #087bee;
          color: #ffffff;

          font-size: 14px;
          font-weight: 700;

          text-decoration: none;

          box-shadow: 0 2px 6px rgba(8, 123, 238, 0.12);

          transition:
            background 200ms ease,
            border-color 200ms ease,
            transform 200ms ease;
        }

        .navbar__mobile-demo:hover {
          background: #0668cc;
          border-color: #0668cc;

          transform: translateY(-1px);
        }

        /* APPLICATION LINK */

        .navbar__mobile-login {
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

        .navbar__mobile-login:hover {
          background: #e2edf9;
          border-color: #c9def5;
          color: #015fae;
        }

        /* =========================================
           11. RESPONSIVE
        ========================================= */

        @media (max-width: 1200px) {
          .navbar__container {
            gap: 22px;
          }

          .navbar__navigation {
            gap: 17px;
          }

          .navbar__link {
            font-size: 13px;
            font-weight: 600;
          }

          .navbar__login {
            padding: 0 10px;
            font-size: 12px;
          }

          .navbar .navbar__demo {
            padding: 0 16px;
            font-size: 12px;
          }
        }

        @media (max-width: 1024px) {
          .navbar__navigation,
          .navbar__login {
            display: none;
          }

          .navbar__container {
            justify-content: space-between;
          }

          .navbar__actions {
            margin-left: auto;
          }

          .navbar__menu-toggle {
            display: inline-flex;
          }
        }

        @media (max-width: 768px) {
          .navbar__container {
            min-height: 72px;
            gap: 12px;
          }

          .navbar__logo {
            width: 80px;
          }

          .navbar__navigation {
            display: none;
          }

          .navbar__actions {
            display: flex;

            margin-left: auto;
            gap: 10px;
          }

          .navbar .navbar__demo {
            min-height: 42px;
            padding: 0 15px;

            font-size: 12px;
            border-radius: 8px !important;
          }

          .navbar__mobile-overlay {
            top: 72px;
          }

          .navbar__mobile-drawer {
            padding: 22px;
          }
        }

        @media (max-width: 480px) {
          .navbar__container {
            min-height: 66px;
            gap: 8px;
          }

          .navbar__logo {
            width: 74px;
          }

          .navbar__menu-toggle {
            width: 36px;
            height: 36px;
            border-radius: 999px;
          }

          .navbar__actions {
            gap: 8px;
          }

          .navbar .navbar__demo {
            min-height: 40px;
            padding: 0 12px;

            gap: 6px;
            font-size: 11px;

            border-radius: 8px !important;
          }

          .navbar .navbar__demo svg {
            width: 14px;
            height: 14px;
          }

          .navbar__mobile-overlay {
            top: 66px;
          }

          .navbar__mobile-drawer {
            padding: 18px;

            max-height: calc(100% - 16px);
          }

          .navbar__mobile-link {
            padding: 14px 4px;
            font-size: 14px;
          }

          .navbar__mobile-actions {
            margin-top: 16px;
            gap: 8px;
          }

          .navbar__mobile-demo {
            min-height: 42px;
            font-size: 13px;
            border-radius: 8px;
          }

          .navbar__mobile-login {
            min-height: 40px;
            border-radius: 8px;
          }
        }

        @media (max-width: 360px) {
          .navbar__logo {
            width: 66px;
          }

          .navbar__menu-toggle {
            width: 32px;
            height: 32px;
            border-radius: 999px;
          }

          .navbar .navbar__demo {
            padding: 0 9px;
            font-size: 10px;

            border-radius: 8px !important;
          }

          .navbar__mobile-drawer {
            padding: 16px;
          }
        }

        /* =========================================
           12. REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .navbar *,
          .navbar__mobile-overlay,
          .navbar__mobile-drawer {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* =========================================
          NAVBAR
      ========================================= */}

      <header
        className={`navbar ${
          isScrolled ? 'is-scrolled' : ''
        } ${isMenuOpen ? 'is-menu-open' : ''}`}
      >
        <Container>
          <div className="navbar__container">
            {/* BRAND */}

            <a
              href="/"
              className="navbar__brand"
              aria-label="DREAMS Home"
              onClick={closeMenu}
            >
              <img src={dreamsLight} alt="DREAMS" className="navbar__logo" />
            </a>

            {/* DESKTOP NAVIGATION */}

            <nav className="navbar__navigation" aria-label="Navigasi utama">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} className="navbar__link">
                  {item.label}
                </a>
              ))}
            </nav>

            {/* NAVBAR ACTIONS */}

            <div className="navbar__actions">
              {!isMenuOpen && (
                <>
                  {siteConfig.appUrl && (
                    <a
                      href={siteConfig.appUrl}
                      className="navbar__login"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Masuk Aplikasi
                      <ExternalLink size={15} />
                    </a>
                  )}

                  <Button
                    href={siteConfig.demoUrl}
                    variant="primary"
                    className="navbar__demo"
                  >
                    Jadwalkan Demo
                    <ArrowUpRight size={16} />
                  </Button>
                </>
              )}

              {/* MOBILE MENU BUTTON */}

              <button
                type="button"
                className="navbar__menu-toggle"
                aria-label={isMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
                aria-expanded={isMenuOpen}
                aria-controls="navbar-mobile-drawer"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* =========================================
          MOBILE DRAWER OVERLAY
      ========================================= */}

      <div
        className={`navbar__mobile-overlay ${isMenuOpen ? 'is-open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      >
        <aside
          id="navbar-mobile-drawer"
          className="navbar__mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigasi DREAMS"
          onClick={(event) => event.stopPropagation()}
        >
          {/* MOBILE NAVIGATION */}

          <nav className="navbar__mobile-nav" aria-label="Navigasi mobile">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="navbar__mobile-link"
                onClick={closeMenu}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>

          {/* MOBILE ACTIONS */}

          <div className="navbar__mobile-actions">
            <a
              href={siteConfig.demoUrl}
              className="navbar__mobile-demo"
              onClick={closeMenu}
            >
              <span>Jadwalkan Demo</span>
              <ArrowUpRight size={18} />
            </a>

            {siteConfig.appUrl && (
              <a
                href={siteConfig.appUrl}
                className="navbar__mobile-login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                <span>Masuk Aplikasi DREAMS</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </aside>
      </div>
    </>
  )
}

export default Navbar
