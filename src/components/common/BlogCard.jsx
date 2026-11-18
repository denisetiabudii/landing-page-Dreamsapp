import BlogCover from './BlogCover'
import { formatDate } from '../../utils/formatDate'

function BlogCard({ post }) {
  return (
    <a href={`/blog/${post.slug}`} className="blog-card">
      <style>{`
        .blog-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-white);
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .blog-card:hover {
          border-color: var(--card-color, var(--color-primary));
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .blog-card__body {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 10px;
          padding: 22px 24px 26px;
        }

        .blog-card__category {
          color: var(--card-color);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .blog-card__title {
          color: var(--color-heading);
          font-size: var(--text-xl);
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .blog-card__excerpt {
          color: var(--color-text);
          line-height: 1.7;
        }

        .blog-card__meta {
          margin-top: auto;
          padding-top: 6px;
          color: var(--color-muted);
          font-size: var(--text-sm);
        }
      `}</style>

      <BlogCover post={post} />

      <div className="blog-card__body" style={{ '--card-color': post.accent }}>
        <span className="blog-card__category">{post.category}</span>
        <h2 className="blog-card__title">{post.title}</h2>
        <p className="blog-card__excerpt">{post.description}</p>
        <span className="blog-card__meta">
          {formatDate(post.date)} · {post.readTime}
        </span>
      </div>
    </a>
  )
}

export default BlogCard
