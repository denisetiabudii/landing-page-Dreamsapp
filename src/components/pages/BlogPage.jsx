import PageShell from '../layout/PageShell'
import Container from '../common/Container'
import BlogCard from '../common/BlogCard'
import CTA from '../sections/CTA'
import { blogPosts } from '../../data/blogPosts'

function BlogPage() {
  return (
    <PageShell
      path="/blog"
      title="Blog DREAMS"
      lead="Panduan dan wawasan seputar pengelolaan donasi, donatur, dan transparansi untuk lembaga sosial."
    >
      <section className="blog-list">
        <style>{`
          .blog-list {
            padding: var(--section-spacing) 0 calc(var(--section-spacing) * 0.6);
          }

          .blog-list__grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 26px;
          }

          @media (max-width: 1024px) {
            .blog-list__grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 640px) {
            .blog-list__grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <Container>
          <div className="blog-list__grid">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </PageShell>
  )
}

export default BlogPage
