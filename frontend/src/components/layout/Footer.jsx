import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import Container from "../common/Container";
import { dreamsDark, deftDark } from "../../assets/assets";
import honeycomb from "../../assets/images/brand/dreams-honeycomb.svg";
import { siteConfig } from "../../data/siteConfig";

// =========================================
// INSTAGRAM ICON
// =========================================

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="footer__brand-icon">
      <defs>
        <linearGradient
          id="instagram-gradient"
          x1="4"
          y1="28"
          x2="28"
          y2="4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB800" />
          <stop offset=".5" stopColor="#F02D79" />
          <stop offset="1" stopColor="#8055D9" />
        </linearGradient>
      </defs>

      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        rx="8"
        fill="url(#instagram-gradient)"
      />

      <rect
        x="8"
        y="8"
        width="16"
        height="16"
        rx="5"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />

      <circle cx="16" cy="16" r="4" fill="none" stroke="#fff" strokeWidth="2" />

      <circle cx="22" cy="10" r="1.3" fill="#fff" />
    </svg>
  );
}

// =========================================
// FACEBOOK ICON
// =========================================

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="footer__brand-icon">
      <circle cx="16" cy="16" r="15" fill="#1877F2" />

      <path
        fill="#fff"
        d="M18.1 27V17.2h3.3l.5-3.8h-3.8V11c0-1.1.3-1.9 1.9-1.9H22V5.7c-.4-.1-1.6-.2-3-.2-3 0-5.1 1.8-5.1 5.2v2.8h-3.4v3.8h3.4V27h4.2Z"
      />
    </svg>
  );
}

// =========================================
// FOOTER COMPONENT
// =========================================

function Footer() {
  return (
    <>
      <footer className="footer" id="footer">
        <Container>
          {/* Footer Main */}
          <div className="footer__main">
            {/* Brand */}
            <div className="footer__brand">
              <a href="#beranda" className="footer__logo-link">
                <img src={dreamsDark} alt="DREAMS" className="footer__logo" />
              </a>

              <p>
                Sistem pengelolaan donasi dan operasional lembaga sosial untuk
                mendukung aktivitas lembaga secara lebih terstruktur.
              </p>
            </div>

            {/* Office Location */}
            <section
              className="footer__locations"
              aria-labelledby="footer-locations-title"
            >
              <h3 id="footer-locations-title">Lokasi Kantor</h3>

              <a
                href={siteConfig.officeMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__location-link"
                aria-label="Buka lokasi kantor DREAMS di Google Maps"
              >
                <MapPin size={18} aria-hidden="true" />

                <div>
                  <strong>Lokasi Kantor DREAMS</strong>
                  <span>Lihat lokasi melalui Google Maps</span>
                </div>

                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </section>

            {/* Contact */}
            <section
              id="kontak"
              className="footer__contact"
              aria-labelledby="footer-contact-title"
            >
              <h3 id="footer-contact-title">Hubungi Kami</h3>

              <p>
                Punya pertanyaan atau ingin mengenal DREAMS lebih jauh? Hubungi
                tim kami melalui kanal berikut.
              </p>

              {/* Email */}
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="footer__contact-link"
                >
                  <Mail size={18} aria-hidden="true" />
                  <span>{siteConfig.email}</span>
                </a>
              )}

              {/* Social Media */}
              <div className="footer__socials" aria-label="Media sosial DREAMS">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="Instagram DREAMS (buka di tab baru)"
                >
                  <InstagramIcon />
                  <span>Instagram</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>

                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="Facebook DREAMS (buka di tab baru)"
                >
                  <FacebookIcon />
                  <span>Facebook</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>

              {/* Application Access */}
              <div className="footer__access">
                <h3>Akses</h3>

                <a
                  href={siteConfig.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Masuk Aplikasi DREAMS
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </section>
          </div>

          {/* Footer Bottom */}
          <div className="footer__bottom">
            <div className="footer__credit">
              <span>Developed by</span>
              <img src={deftDark} alt="DEFT.id" />
            </div>

            <p>© {new Date().getFullYear()} DREAMS. All rights reserved.</p>
          </div>
        </Container>
      </footer>

      {/* =========================================
          FOOTER STYLES
      ========================================= */}

      <style>{`
        /* =========================================
           FOOTER BASE
        ========================================= */

        .footer {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 76px 0 24px;
          color: #ffffff;
          background: linear-gradient(
            120deg,
            #091d35 0%,
            #10385e 55%,
            #07549c 100%
          );
        }

        /* Honeycomb Background */

        .footer::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background-image: url("${honeycomb}");
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          opacity: 0.65;
        }

        /* =========================================
           FOOTER MAIN LAYOUT
        ========================================= */

        .footer .footer__main {
          display: grid;
          grid-template-columns:
            minmax(0, 0.9fr)
            minmax(0, 1.35fr)
            minmax(0, 0.9fr);
          gap: clamp(32px, 5vw, 72px);
          padding-bottom: 48px;
        }

        .footer .footer__brand,
        .footer .footer__locations,
        .footer .footer__contact,
        .footer .footer__access {
          min-width: 0;
        }

        /* =========================================
           BRAND
        ========================================= */

        .footer .footer__logo-link {
          display: inline-block;
        }

        .footer .footer__logo {
          display: block;
          width: 100px;
          height: auto;
          margin-bottom: 20px;
        }

        .footer .footer__brand p,
        .footer .footer__contact p {
          max-width: 330px;
          color: #d5e5f5;
          font-size: 14px;
          line-height: 1.8;
        }

        /* =========================================
           COLUMN HEADINGS
        ========================================= */

        .footer .footer__contact h3,
        .footer .footer__locations h3,
        .footer .footer__access h3 {
          margin-bottom: 18px;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
        }

        .footer .footer__locations h3,
        .footer .footer__access h3 {
          position: relative;
          padding-bottom: 12px;
        }

        .footer .footer__locations h3::after,
        .footer .footer__access h3::after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 2px;
          content: "";
          background: #54b7ff;
          border-radius: 2px;
        }

        /* =========================================
           CONTACT EMAIL
        ========================================= */

        .footer .footer__contact-link {
          display: flex;
          align-items: center;
          gap: 10px;
          width: fit-content;
          max-width: 100%;
          margin-top: 22px;
          color: #d5e5f5;
          font-size: 14px;
          line-height: 1.6;
          transition: color 0.2s ease;
        }

        .footer .footer__contact-link span {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .footer .footer__contact-link svg {
          flex-shrink: 0;
          color: #ffffff;
        }

        .footer .footer__contact-link:hover {
          color: #b9dcff;
        }

        /* =========================================
           BRAND ICONS
        ========================================= */

        .footer .footer__brand-icon {
          display: block;
          width: 20px;
          height: 20px;
          flex: 0 0 20px;
        }

        /* =========================================
           OFFICE LOCATION
        ========================================= */

        .footer .footer__location-link {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 16px;
          color: #d5e5f5;
          text-decoration: none;
          background: rgb(255 255 255 / 6%);
          border: 1px solid rgb(255 255 255 / 12%);
          border-radius: 12px;
          transition:
            background-color 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
        }

        .footer .footer__location-link > svg {
          flex-shrink: 0;
          color: #75c4ff;
        }

        .footer .footer__location-link div {
          display: grid;
          flex: 1;
          gap: 5px;
          min-width: 0;
        }

        .footer .footer__location-link strong {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
        }

        .footer .footer__location-link span {
          color: #c5d4e5;
          font-size: 12px;
          line-height: 1.5;
        }

        .footer .footer__location-link:hover {
          background: rgb(255 255 255 / 12%);
          border-color: #54b7ff;
          transform: translateY(-2px);
        }

        /* =========================================
           SOCIAL MEDIA
        ========================================= */

        .footer .footer__socials {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        .footer .footer__social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 11px;
          color: #ffffff;
          background: rgb(255 255 255 / 8%);
          border: 1px solid rgb(255 255 255 / 14%);
          border-radius: 999px;
          font-size: 13px;
          text-decoration: none;
          transition:
            background-color 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
        }

        .footer .footer__social-link:hover {
          background: rgb(255 255 255 / 15%);
          border-color: rgb(255 255 255 / 30%);
          transform: translateY(-2px);
        }

        /* =========================================
           APPLICATION ACCESS
        ========================================= */

        .footer .footer__access {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-top: 30px;
        }

        .footer .footer__access a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #d5e5f5;
          font-size: 14px;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer .footer__access a:hover {
          color: #ffffff;
        }

        /* =========================================
           FOOTER BOTTOM
        ========================================= */

        .footer .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          padding-top: 24px;
          border-top: 1px solid rgb(255 255 255 / 20%);
        }

        .footer .footer__bottom p,
        .footer .footer__credit {
          color: #d5e5f5;
          font-size: 12px;
        }

        .footer .footer__credit {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .footer .footer__credit img {
          display: block;
          width: 58px;
          height: auto;
        }

        /* =========================================
           RESPONSIVE - TABLET
        ========================================= */

        @media (max-width: 900px) {
          .footer .footer__main {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 36px;
          }

          .footer .footer__locations {
            grid-column: 1 / -1;
            grid-row: 2;
          }

          .footer .footer__access {
            margin-top: 24px;
          }
        }

        /* =========================================
           RESPONSIVE - MOBILE
        ========================================= */

        @media (max-width: 600px) {
          .footer {
            padding-top: 56px;
          }

          .footer .footer__main {
            grid-template-columns: 1fr;
            gap: 32px;
            padding-bottom: 36px;
          }

          .footer .footer__locations {
            grid-column: auto;
            grid-row: auto;
          }

          .footer .footer__access {
            margin-top: 24px;
          }

          .footer .footer__bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
}

export default Footer;
