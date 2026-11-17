import {
  Building2,
  ChartNoAxesCombined,
  Megaphone,
} from 'lucide-react'

import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import { aboutDreams } from '../../assets/assets'

// =========================================
// KONTEN HALAMAN /tentang
// Teks berasal dari deskripsi yang sudah ada di website. Mohon ditinjau tim
// sebelum rilis, terutama bagian "Untuk Siapa DREAMS?".
// =========================================

const audiences = [
  {
    icon: Building2,
    title: 'Lembaga sosial dan yayasan',
    text: 'Lembaga yang menghimpun donasi dan ingin mengelola donatur, transaksi, serta penyaluran bantuan dengan lebih rapi.',
  },
  {
    icon: Megaphone,
    title: 'Tim fundraising',
    text: 'Tim yang mengelola calon donatur, menindaklanjuti prospek, dan menjaga hubungan dengan donatur.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Pengelola program dan pimpinan',
    text: 'Pihak yang memantau performa program donasi, pencapaian target, dan penyaluran bantuan melalui dashboard dan analitik.',
  },
]

function AboutDetail() {
  return (
    <>
      <style>{`
        .about-detail {
          padding: var(--section-spacing) 0 calc(var(--section-spacing) * 0.6);
        }

        .about-detail__intro {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: 56px;
          align-items: center;
        }

        .about-detail__text p {
          color: var(--color-text);
          font-size: var(--text-lg);
          line-height: 1.8;
        }

        .about-detail__text p + p {
          margin-top: 18px;
        }

        .about-detail__image {
          display: block;
          width: 100%;
          height: auto;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .about-detail__block {
          margin-top: calc(var(--section-spacing) * 0.8);
        }

        .about-detail__audiences {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .about-detail__card {
          padding: 28px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-white);
          box-shadow: var(--shadow-sm);
        }

        .about-detail__card-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          margin-bottom: 16px;
          border-radius: 14px;
          color: var(--color-primary);
          background: var(--color-light-blue);
        }

        .about-detail__card h3 {
          margin-bottom: 8px;
          color: var(--color-heading);
          font-size: var(--text-xl);
          font-weight: 700;
        }

        .about-detail__card p {
          color: var(--color-text);
          line-height: 1.7;
        }

        @media (max-width: 900px) {
          .about-detail__intro {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .about-detail__audiences {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .about-detail {
            padding-top: 64px;
          }

          .about-detail__card {
            padding: 22px;
          }
        }
      `}</style>

      <section className="about-detail">
        <Container>
          {/* APA ITU DREAMS */}
          <div className="about-detail__intro">
            <div className="about-detail__text">
              <SectionHeading
                eyebrow="Apa itu DREAMS?"
                title="Mengelola aktivitas lembaga dalam satu sistem."
                align="left"
              />

              <p>
                DREAMS merupakan sistem pengelolaan donasi dan operasional
                lembaga sosial. Sistem ini mencakup pengelolaan donatur,
                transaksi, prospek, analitik, hingga penyaluran bantuan.
              </p>
              <p>
                Dengan DREAMS, data donatur, transaksi, dan penyaluran bantuan
                dikelola dalam satu sistem sehingga aktivitas lembaga lebih
                terstruktur dan lebih mudah dipantau.
              </p>
              <p>
                DREAMS juga menyediakan dashboard dan analitik RFM untuk
                membantu lembaga memahami aktivitas transaksi, pencapaian
                target, serta karakteristik donatur.
              </p>
            </div>

            <img
              className="about-detail__image"
              src={aboutDreams}
              alt="Relawan menyerahkan bantuan kepada masyarakat"
              loading="lazy"
            />
          </div>

          {/* UNTUK SIAPA */}
          <div className="about-detail__block">
            <SectionHeading
              eyebrow="Pengguna"
              title="Untuk Siapa DREAMS?"
              description="DREAMS dirancang untuk lembaga yang mengelola donasi dan menyalurkan bantuan."
            />

            <div className="about-detail__audiences">
              {audiences.map((item) => {
                const Icon = item.icon

                return (
                  <article className="about-detail__card" key={item.title}>
                    <span className="about-detail__card-icon" aria-hidden="true">
                      <Icon size={24} strokeWidth={2} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default AboutDetail
