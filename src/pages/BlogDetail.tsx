import React from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

import { supabase, type BlogPost } from '../lib/supabase';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = React.useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;

      try {
        setLoading(true);
        if (!supabase) {
          setBlog(null);
          return;
        }

        // Fetch current blog
        const { data: currentBlog, error: fetchError } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (fetchError) throw fetchError;
        setBlog(currentBlog);

        // Fetch related blogs (posts in the same category or overall latest, excluding current)
        const { data: relatedData } = await supabase
          .from('blogs')
          .select('title, slug, image_url, category, created_at')
          .eq('status', 'published')
          .neq('slug', slug)
          .eq('category', currentBlog.category)
          .order('created_at', { ascending: false })
          .limit(3);

        // If not enough posts in same category, fill with other published posts
        if (relatedData && relatedData.length < 3) {
          const { data: fillData } = await supabase
            .from('blogs')
            .select('title, slug, image_url, category, created_at')
            .eq('status', 'published')
            .neq('slug', slug)
            .not('slug', 'in', `(${relatedData.map(p => p.slug).join(',') || '""'})`)
            .order('created_at', { ascending: false })
            .limit(3 - relatedData.length);

          setRelatedPosts([...relatedData, ...(fillData || [])]);
        } else {
          setRelatedPosts(relatedData || []);
        }

      } catch (err: any) {
        console.error('Error fetching blog:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
    // Scroll to top when slug changes (when clicking a related post)
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-agri-bg flex flex-col items-center justify-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green mb-4"></div>
        <p className="text-agri-text-muted">Blog yazısı yükleniyor...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-agri-bg flex flex-col items-center justify-center py-32">
        <Helmet>
          <title>Blog Bulunamadı | Çınarlar Boru ve Sulama Sistemleri</title>
        </Helmet>
        <h1 className="text-4xl font-heading font-bold text-agri-text mb-4">
          {error ? 'Hata Oluştu' : 'Blog Bulunamadı'}
        </h1>
        {error && <p className="text-red-500 mb-6">{error}</p>}
        <Link to="/blog" className="text-agri-green hover:underline">Bloglara Dön</Link>
      </div>
    );
  }

  return (
    <div className="bg-agri-bg min-h-screen pb-32">
      <Helmet>
        <title>{blog.title} | Çınarlar Boru ve Sulama Sistemleri</title>
        <meta name="description" content={blog.summary} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.summary} />
        <meta property="og:image" content={blog.image_url} />
      </Helmet>
      {/* Hero Image Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-agri-bg via-agri-bg/20 to-transparent"></div>

        {/* Back Button */}
        <div className="absolute top-8 left-4 md:left-8 z-10">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">

        {/* Article Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-12"
        >
          <div className="flex items-center space-x-2 mb-6">
            <span className="bg-agri-green/10 text-agri-green-dark px-4 py-1.5 rounded-xl text-sm font-bold tracking-wide">
              {blog.category.toLocaleUpperCase('tr-TR')}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-agri-text leading-[1.15] mb-8">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-agri-text-muted font-medium border-t border-gray-100 pt-6">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-agri-green" />
              {blog.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-agri-green" />
              {new Date(blog.created_at).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center ml-auto space-x-3">
              <span className="text-xs tracking-wider">PAYLAŞ:</span>
              <button
                onClick={() => {
                  const url = window.location.href;
                  const text = `${blog.title} | Çınarlar Boru ve Sulama Sistemleri`;
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-agri-water hover:text-white transition-colors"
                title="Twitter'da Paylaş"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const url = window.location.href;
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                }}
                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-agri-water hover:text-white transition-colors"
                title="LinkedIn'de Paylaş"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="blog-content"
        >
          <style dangerouslySetInnerHTML={{
            __html: `
            .blog-content h2 {
              color: #00302d; /* cinar-navy */
              font-size: 1.5rem;
              font-weight: 700;
              margin-top: 2rem;
              margin-bottom: 1rem;
              font-family: inherit;
            }
            .blog-content h3 {
              color: #00302d; /* cinar-navy */
              font-size: 1.25rem;
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
            }
            .blog-content p {
              color: #374151; /* text-gray-700 */
              line-height: 1.625;
              margin-bottom: 1rem;
            }
            .blog-content strong, .blog-content b {
              color: #111827; /* text-gray-900 */
              font-weight: 600;
            }
            .blog-content ul {
              list-style-type: disc;
              margin-left: 1.5rem;
              margin-bottom: 1rem;
              color: #374151; /* text-gray-700 */
            }
            .blog-content li {
              margin-bottom: 0.5rem;
            }
            .blog-content a {
              color: #00B4D8; /* cinar-teal */
              text-decoration: underline;
            }
            @media (min-width: 768px) {
              .blog-content h2 { font-size: 1.875rem; }
              .blog-content h3 { font-size: 1.5rem; }
            }
          `}} />
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </motion.div>


        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-gray-100">
            <h2 className="text-2xl font-heading font-bold text-agri-text mb-8">İlginizi Çekebilecek Diğer Yazılar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold text-agri-green px-2 py-1 rounded-lg uppercase tracking-wider capitalize">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-sm font-bold text-agri-text leading-tight mb-2 group-hover:text-agri-green transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="mt-auto pt-2 flex items-center text-[10px] text-agri-text-muted font-medium">
                      <Calendar className="w-3 h-3 mr-1 text-agri-green" />
                      {new Date(post.created_at).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
