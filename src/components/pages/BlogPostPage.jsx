import { ArrowUpRight } from 'lucide-react'

import PageShell from '../layout/PageShell'
import Container from '../common/Container'
import BlogCover from '../common/BlogCover'
import BlogCard from '../common/BlogCard'
import CTA from '../sections/CTA'
import { blogPosts } from '../../data/blogPosts'
import { formatDate } from '../../utils/formatDate'

const siteUrl = String(import.meta.env.VITE_SITE_URL ?? '')
  .trim()
  .replace(/\/+$/, '')

function BlogPostPage({ slug }) {
  const post = blogPosts.find((item) => item.slug === slug)
  if (!post) return null

  const others = blogPosts.filter((item) => item.slug !== slug).slice(0, 2)

  // Data terstruktur artikel (dibaca Google).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'id',
    author: { '@type': 'Organization', name: 'DREAMS' },
    publisher: { '@type': 'Organization', name: 'DREAMS' },
    mainEntityOfPage: siteUrl ? `${siteUrl}/blog/${post.slug}` : undefined,
  }

  return (
    <PageShell
      path={`/blog/${post.slug}`}
      title={post.title}
      lead={`${post.category} · ${formatDate(post.date)} · ${post.readTime}`}
      accent={post.accent}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replaceAll('<', '\\u003c'),
        }}
      />

      <article className="blog-post">
        <style>{`
          .blog-post {
            padding: 48px 0 calc(var(--section-spacing) * 0.6);
          }

          .blog-post__inner {
            max-width: 760px;
            margin: 0 auto;
          }

          .blog-post__cover {
            margin-bottom: 40px;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
          }

          .blog-post__body h2 {
            margin: 40px 0 14px;
            color: var(--color-heading);
            font-size: var(--text-2xl);
            font-weight: 700;
            line-height: 1.25;
            letter-spacing: -0.025em;
          }

          .blog-post__body p {
            margin-bottom: 18px;
            color: var(--color-text);
            font-size: var(--text-lg);
            line-height: 1.85;
          }

          .blog-post__body ul {
            margin: 0 0 20px;
            padding-left: 22px;
          }

          .blog-post__body li {
            margin-bottom: 10px;
            color: var(--color-text);
            font-size: var(--text-lg);
            line-height: 1.75;
          }

          .blog-post__body li::marker {
            color: var(--card-color);
          }

          .blog-post__cta {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 12px;
            padding: 14px 22px;
            border-radius: var(--radius-md, 12px);
            color: #ffffff;
            font-weight: 700;
            background: linear-gradient(
              135deg,
              color-mix(in srgb, var(--card-color) 85%, #102d50),
              var(--card-color) 55%,
              color-mix(in srgb, var(--card-color) 75%, #000000)
            );
            transition: var(--transition);
          }

          .blog-post__cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 14px 30px -18px var(--card-color);
          }

          .blog-more {
            margin-top: 72px;
          }

          .blog-more h2 {
            margin-bottom: 24px;
            color: var(--color-heading);
            font-size: var(--text-2xl);
            font-weight: 700;
            letter-spacing: -0.025em;
          }

          .blog-more__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 24px;
          }

          @media (max-width: 720px) {
            .blog-more__grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <Container>
          <div className="blog-post__inner" style={{ '--card-color': post.accent }}>
            <BlogCover post={post} className="blog-post__cover" />

            <div className="blog-post__body">
              {post.sections.map((section, index) => (
                <section key={section.heading ?? index}>
                  {section.heading && <h2>{section.heading}</h2>}

                  {section.paragraphs?.map((text) => (
                    <p key={text}>{text}</p>
                  ))}

                  {section.list && (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.after?.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </section>
              ))}

              {post.cta && (
                <a href={post.cta.href} className="blog-post__cta">
                  {post.cta.label}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="blog-more">
            <h2>Baca Juga</h2>

            <div className="blog-more__grid">
              {others.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </Container>
      </article>

      <CTA />
    </PageShell>
  )
}

export default BlogPostPage
