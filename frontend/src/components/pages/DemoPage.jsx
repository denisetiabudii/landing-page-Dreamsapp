import Navbar from "../demosection/DemoNavbar";
import Footer from "../layout/Footer";

import DemoCaption from "../demosection/DemoCaption";
import DemoInput from "../demosection/DemoInput";

// =========================================
// DEMO PAGE
// =========================================

function DemoPage() {
  return (
    <div className="demo-page">
      {/* =====================================
          PAGE STYLES
      ====================================== */}

      <style>{`
        /* =====================================
           PAGE FOUNDATION
        ====================================== */

        .demo-page {
          display: flex;
          min-height: 100vh;
          flex-direction: column;
          background: var(--color-surface);
        }

        .demo-page .container {
          width: min(100% - 48px, var(--container-width));
          margin-inline: auto;
        }

        /* =====================================
           MAIN SECTION
        ====================================== */

        .demo-page .demo-main {
          flex: 1;
          padding:
            calc(var(--navbar-height, 88px) + 42px)
            0
            clamp(42px, 7vw, 78px);

          background:
            radial-gradient(
              ellipse at 12% 10%,
              rgb(8 123 238 / 9%),
              transparent 34%
            ),
            radial-gradient(
              ellipse at 88% 55%,
              rgb(8 123 238 / 6%),
              transparent 36%
            ),
            var(--color-surface);
        }

        .demo-page .demo-layout {
          display: grid;
          grid-template-columns:
            minmax(0, 0.82fr)
            minmax(0, 1.18fr);
          align-items: start;
          gap: clamp(32px, 6vw, 76px);
          max-width: 1120px;
          margin: 0 auto;
        }

        /* =====================================
           RESPONSIVE
        ====================================== */

        @media (max-width: 800px) {
          .demo-page .demo-main {
            padding:
              calc(var(--navbar-height, 88px) + 32px)
              0
              52px;
          }

          .demo-page .demo-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>

      {/* =====================================
          NAVBAR
      ====================================== */}

      <Navbar />

      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <main className="demo-main">
        <div className="container">
          <div className="demo-layout">
            <DemoCaption />

            <DemoInput />
          </div>
        </div>
      </main>

      {/* =====================================
          FOOTER
      ====================================== */}

      <Footer />
    </div>
  );
}

export default DemoPage;
