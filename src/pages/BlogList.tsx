import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

import { supabase, type BlogPost } from '../lib/supabase';

export default function BlogList() {
  const categories = ['Tümü', 'Teknik', 'Teknoloji', 'Rehber', 'Sürdürülebilirlik', 'Diğer'];
  const [activeCategory, setActiveCategory] = React.useState('Tümü');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [blogs, setBlogs] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const itemsPerPage = 6;

  React.useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        if (!supabase) {
          setBlogs([]);
          return;
        }

        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (err: any) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const filteredBlogs = activeCategory === 'Tümü'
    ? blogs
    : blogs.filter(blog =>
      (blog.category || '').toLowerCase() === activeCategory.toLowerCase()
    );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="bg-agri-bg min-h-screen pt-24 pb-32">
      <Helmet>
        <title>Tarım ve Sulama Teknolojileri Blogu | Çınarlar Boru ve Sulama Sistemleri</title>
        <meta name="description" content="Sektörel gelişmeler, sondaj ve akıllı tarım teknolojileri hakkında en güncel içeriklere Ulaşım." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-heading font-bold text-agri-text mb-6"
          >
            Tarım ve Teknoloji Blogu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-agri-text-muted font-light leading-relaxed"
          >
            Sektörel gelişmeler, uzman tavsiyeleri ve modern tarım teknolojileri hakkında en güncel içerikler.
          </motion.p>
        </div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1); // Reset page on category change
              }}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat
                ? 'bg-agri-green-dark text-white shadow-md'
                : 'bg-white text-agri-text-muted hover:bg-agri-green/10 hover:text-agri-green border border-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green mb-4"></div>
              <p className="text-agri-text-muted">Blog yazıları yükleniyor...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-red-100 p-8">
              <p className="text-red-500 mb-4">Bir hata oluştu: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-agri-green text-white px-6 py-2 rounded-xl"
              >
                Tekrar Dene
              </button>
            </div>
          ) : paginatedBlogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8">
              <p className="text-agri-text-muted">Bu kategoride henüz bir yazı bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {paginatedBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-xs font-bold tracking-wide text-agri-green-dark shadow-sm capitalize">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center space-x-4 text-xs text-agri-text-muted mb-4 font-medium">
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {new Date(blog.created_at).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </div>
                    </div>

                    <h2 className="text-2xl font-heading font-bold text-agri-text mb-4 group-hover:text-agri-green transition-colors leading-tight">
                      <Link to={`/blog/${blog.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {blog.title}
                      </Link>
                    </h2>

                    <p className="text-agri-text-muted text-base leading-relaxed mb-8 flex-grow line-clamp-3">
                      {blog.summary}
                    </p>

                    <div className="mt-auto flex items-center text-sm font-bold text-agri-green-dark group-hover:text-agri-green transition-colors">
                      Makaleyi Oku
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-agri-text-muted hover:border-agri-green hover:text-agri-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNumber = idx + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors ${currentPage === pageNumber
                      ? 'bg-agri-green-dark text-white shadow-md'
                      : 'bg-white border border-gray-200 text-agri-text-muted hover:border-agri-green hover:text-agri-green'
                      }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-agri-text-muted hover:border-agri-green hover:text-agri-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </nav>
          </div>
        )}

      </div>
    </div>
  );
}
