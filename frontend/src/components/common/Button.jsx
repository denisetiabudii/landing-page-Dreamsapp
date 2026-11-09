function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}) {
  const classes = `button button--${variant} ${className}`;

  return (
    <>
      <style>{`
        /* =========================================
           BUTTON BASE
        ========================================= */

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 22px;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          font-size: var(--text-sm);
          font-weight: 600;
          transition: var(--transition);
        }

        /* =========================================
           BUTTON PRIMARY
        ========================================= */

        .button--primary {
          color: var(--color-white);
          background: var(--color-primary);
        }

        .button--primary:hover {
          background: var(--color-primary-hover);
          transform: translateY(-2px);
        }

        /* =========================================
           BUTTON SECONDARY
        ========================================= */

        .button--secondary {
          color: var(--color-navy);
          background: var(--color-white);
          border-color: var(--color-border);
        }

        .button--secondary:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        /* =========================================
           RESPONSIVE - MOBILE
        ========================================= */

        @media (max-width: 480px) {
          .button {
            padding: 11px 18px;
          }
        }
      `}</style>

      {href ? (
        <a href={href} className={classes} onClick={onClick}>
          {children}
        </a>
      ) : (
        <button type="button" className={classes} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
}

export default Button;
