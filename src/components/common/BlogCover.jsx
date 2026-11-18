import { ChartNoAxesCombined, ReceiptText, Users } from 'lucide-react'

import { getBlogCover } from '../../data/blogPosts'

const icons = {
  chart: ChartNoAxesCombined,
  users: Users,
  receipt: ReceiptText,
}

// Foto sampul artikel. Kalau fotonya belum ada, tampil latar gradien berwarna
// sebagai placeholder. Foto: src/assets/images/blog/<slug>.webp (1200 × 630).
function BlogCover({ post, className = '' }) {
  const image = getBlogCover(post.slug)
  const Icon = icons[post.icon] ?? ChartNoAxesCombined

  return (
    <div
      className={`blog-cover ${className}`}
      style={{ '--card-color': post.accent }}
    >
      <style>{`
        .blog-cover {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1200 / 630;
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--card-color) 85%, #102d50),
            var(--card-color) 55%,
            color-mix(in srgb, var(--card-color) 75%, #000000)
          );
        }

        .blog-cover img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blog-cover__placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.9);
        }

        .blog-cover__placeholder::before,
        .blog-cover__placeholder::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }

        .blog-cover__placeholder::before {
          top: -70px;
          right: -50px;
          width: 220px;
          height: 220px;
        }

        .blog-cover__placeholder::after {
          bottom: -90px;
          left: -60px;
          width: 240px;
          height: 240px;
        }

        .blog-cover__placeholder svg {
          position: relative;
          z-index: 1;
          width: 22%;
          height: auto;
          max-width: 96px;
          opacity: 0.9;
        }
      `}</style>

      {image ? (
        <img
          src={image}
          alt={post.title}
          width="1200"
          height="630"
          loading="lazy"
        />
      ) : (
        <div className="blog-cover__placeholder" aria-hidden="true">
          <Icon strokeWidth={1.6} />
        </div>
      )}
    </div>
  )
}

export default BlogCover
