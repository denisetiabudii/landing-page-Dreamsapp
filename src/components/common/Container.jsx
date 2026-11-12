function Container({ children, className = '' }) {
  return (
    <>
      <style>{`
        /* =========================================
           CONTAINER
        ========================================= */

        .container {
          width: min(100% - 48px, var(--container-width));
          margin-inline: auto;
        }

        /* =========================================
           RESPONSIVE - MOBILE
        ========================================= */

        @media (max-width: 480px) {
          .container {
            width: min(100% - 32px, var(--container-width));
          }
        }
      `}</style>

      <div className={`container ${className}`}>{children}</div>
    </>
  )
}

export default Container
