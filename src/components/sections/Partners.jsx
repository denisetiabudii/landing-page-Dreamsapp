import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import { partners } from '../../data/partners'

function Partners() {
  if (partners.length === 0) return null

  return (
    <>
      <style>{`
        .partners {
          padding: calc(var(--section-spacing) * 0.7) 0;
          background: var(--color-background);
        }

        .partners__list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 24px 48px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .partners__item img {
          display: block;
          width: auto;
          max-width: 150px;
          height: 56px;
          object-fit: contain;
        }

        @media (max-width: 480px) {
          .partners__list {
            gap: 20px 32px;
          }

          .partners__item img {
            max-width: 110px;
            height: 44px;
          }
        }
      `}</style>

      <section className="partners" id="mitra">
        <Container>
          <SectionHeading
            eyebrow="Mitra"
            title="Lembaga yang Sudah Menggunakan DREAMS"
          />

          <ul className="partners__list">
            {partners.map((partner) => {
              const logo = (
                <img
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  loading="lazy"
                  height="56"
                />
              )

              return (
                <li className="partners__item" key={partner.name}>
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {logo}
                    </a>
                  ) : (
                    logo
                  )}
                </li>
              )
            })}
          </ul>
        </Container>
      </section>
    </>
  )
}

export default Partners
