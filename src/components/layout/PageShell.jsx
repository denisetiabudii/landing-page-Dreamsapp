import Navbar from './Navbar'
import Footer from './Footer'
import FloatingActions from '../common/FloatingActions'
import Container from '../common/Container'

// Kerangka halaman biasa (non-beranda): navbar, judul h1, isi, footer.
// accent : warna (hex) untuk membuat header berlatar warna; kosong = header terang.
function PageShell({ path, title, lead, accent, children }) {
  return (
    <>
      <style>{`
        .page-intro {
          padding: calc(var(--navbar-height, 80px) + 48px) 0 40px;
          background:
            radial-gradient(ellipse at 12% 10%, rgb(8 123 238 / 9%), transparent 40%),
            var(--color-surface);
        }

        .page-intro__title {
          max-width: 820px;
          color: var(--color-heading);
          font-size: clamp(2rem, 5vw, var(--text-4xl));
          line-height: 1.15;
          font-weight: 750;
          letter-spacing: -0.035em;
        }

        /* Header berwarna (halaman detail fitur) */
        .page-intro--accent {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--card-color) 85%, #102d50),
            var(--card-color) 55%,
            color-mix(in srgb, var(--card-color) 75%, #000000)
          );
        }

        .page-intro--accent::after {
          content: '';
          position: absolute;
          top: -120px;
          right: -80px;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          pointer-events: none;
        }

        .page-intro--accent .container {
          position: relative;
          z-index: 1;
        }

        .page-intro--accent .page-intro__title {
          color: #ffffff;
        }

        .page-intro--accent .page-intro__lead {
          color: rgba(255, 255, 255, 0.92);
        }

        .page-intro__lead {
          max-width: 680px;
          margin-top: 16px;
          color: var(--color-text);
          font-size: var(--text-lg);
          line-height: 1.7;
        }
      `}</style>

      <Navbar solid path={path} />

      <main>
        <header
          className={`page-intro ${accent ? 'page-intro--accent' : ''}`}
          style={accent ? { '--card-color': accent } : undefined}
        >
          <Container>
            <h1 className="page-intro__title">{title}</h1>
            {lead && <p className="page-intro__lead">{lead}</p>}
          </Container>
        </header>

        {children}
      </main>

      <Footer />
      <FloatingActions />
    </>
  )
}

export default PageShell