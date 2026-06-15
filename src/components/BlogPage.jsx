import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import blogsData from '../data/blogsData';

const BlogPage = () => {
  const { slug } = useParams();
  // Find blog entry by slug (filename without .html)
  const blog = blogsData.find(b => b.link.replace('blog/', '').replace('.html', '') === slug);

  if (!blog) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Blog not found</h2>
      </div>
    );
  }

  // Build full URL for canonical link (adjust if hosted elsewhere)
  const canonicalUrl = `http://localhost:5173/${blog.link}`;

  return (
    <section className="blog-detail" style={{ padding: '2rem' }}>
      <Helmet>
        <title>{blog.title} | Ranjeet Sahoo</title>
        <meta name="description" content={blog.excerpt} />
        <meta name="keywords" content="Ranjeet Sahoo, blog, {blog.cat}" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
      </Helmet>
      <h1>{blog.title}</h1>
      <p className="meta">
        <span>{blog.cat}</span> • <span>{blog.date}</span> • <span>{blog.read}</span>
      </p>
      <article dangerouslySetInnerHTML={{ __html: blog.content }} />
    </section>
  );
};

export default BlogPage;
