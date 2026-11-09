function SectionHeading({ eyebrow, title, description, align = "center" }) {
  return (
    <>
      <style>{`
        /* =========================================
           SECTION HEADING
        ========================================= */

        .section-heading {
          max-width: 680px;
          margin-bottom: 48px;
        }

        /* =========================================
           ALIGNMENT
        ========================================= */

        .section-heading--center {
          margin-inline: auto;
          text-align: center;
        }

        .section-heading--left {
          text-align: left;
        }

        /* =========================================
           EYEBROW
        ========================================= */

        .section-heading__eyebrow {
          display: inline-block;
          margin-bottom: 14px;
          color: var(--color-primary);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* =========================================
           TITLE
        ========================================= */

        .section-heading__title {
          color: var(--color-heading);
          font-size: clamp(1.8rem, 4vw, var(--text-4xl));
          line-height: 1.2;
          font-weight: 750;
          letter-spacing: -0.035em;
        }

        /* =========================================
           DESCRIPTION
        ========================================= */

        .section-heading__description {
          margin-top: 16px;
          color: var(--color-text);
          font-size: var(--text-lg);
          line-height: 1.7;
        }

        /* =========================================
           RESPONSIVE - MOBILE
        ========================================= */

        @media (max-width: 480px) {
          .section-heading {
            margin-bottom: 32px;
          }

          .section-heading__description {
            font-size: var(--text-base);
          }
        }
      `}</style>

      <div className={`section-heading section-heading--${align}`}>
        {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}

        <h2 className="section-heading__title">{title}</h2>

        {description && (
          <p className="section-heading__description">{description}</p>
        )}
      </div>
    </>
  );
}

export default SectionHeading;
