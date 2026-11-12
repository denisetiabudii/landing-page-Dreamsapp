function Badge({ children, variant = 'primary' }) {
  return (
    <>
      <style>{`
        /* =========================================
           BADGE BASE
        ========================================= */

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: var(--text-xs);
          font-weight: 700;
        }

        /* =========================================
           BADGE PRIMARY
        ========================================= */

        .badge--primary {
          color: var(--color-primary);
          background: var(--color-light-blue);
        }

        /* =========================================
           BADGE NEUTRAL
        ========================================= */

        .badge--neutral {
          color: var(--color-text);
          background: #edf1f5;
        }
      `}</style>

      <span className={`badge badge--${variant}`}>{children}</span>
    </>
  )
}

export default Badge
