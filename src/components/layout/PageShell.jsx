import DemoNavbar from '../demosection/DemoNavbar'
import Footer from './Footer'
import FloatingActions from '../common/FloatingActions'
import Container from '../common/Container'

// Kerangka halaman biasa (non-beranda): navbar, judul h1, isi, footer.
function PageShell({ title, lead, children }) {
  return (
    <>
      <style>{`
        .page-intro {
          padding: calc(var(--navbar-height, 88px) + 48px) 0 40px;
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

        .page-intro__lead {
          max-width: 680px;
          margin-top: 16px;
          color: var(--color-text);
          font-size: var(--text-lg);
          line-height: 1.7;
        }
      `}</style>

      <DemoNavbar />

      <main>
        <header className="page-intro">
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
