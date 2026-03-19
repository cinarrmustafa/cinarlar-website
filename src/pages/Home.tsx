import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Droplets, Sprout, Sun, ArrowRight, CheckCircle2, Leaf, ShieldCheck, BarChart3,
  MapPin, PhoneCall, CheckCircle, ShieldCheck as ShieldIcon, ThumbsUp, Wrench, Clock, PenTool, Medal, Settings, Pickaxe, Calendar
} from 'lucide-react';
import { supabase, type BlogPost, normalizeCategory } from '../lib/supabase';

const reasons = [
  {
    icon: <Clock className="h-6 w-6 text-agri-green" strokeWidth={1.5} />,
    title: '35 Yıllık Saha Tecrübesi',
    description: 'Bölgenin kuyu yapısını, su kaynaklarını ve tarımsal ihtiyaçlarını 35 yıllık tecrübemizle birleştirerek sizlere bu alanda ihtiyacınız olan rehberliği sunuyoruz.'
  },
  {
    icon: <Medal className="h-6 w-6 text-agri-green" strokeWidth={1.5} />,
    title: 'Doğru Pompa Seçimi',
    description: 'Her kuyunun özellikleri farklıdır. İhtiyacınıza uygun pompa ve sistemi doğru hesaplamalarla belirliyoruz. Böylece sizin bilginiz olmasa bile sizin için doğru seçimi yapıyoruz.'
  },
  {
    icon: <Settings className="h-6 w-6 text-agri-earth" strokeWidth={1.5} />,
    title: 'Uzun Ömürlü Sistemler',
    description: 'Kurduğumuz sistemler yüksek verimle çalışıyor ve uzun yıllar sorunsuz kullanım sağlıyor.'
  },
  {
    icon: <ThumbsUp className="h-6 w-6 text-agri-green-dark" strokeWidth={1.5} />,
    title: 'Güvenilir Hizmet',
    description: 'Yıllardır aynı bölgede faaliyet gösteriyor ve müşterilerimizle güvene dayalı ilişkiler kuruyoruz.'
  }
];

const features = [
  {
    icon: <Droplets className="h-8 w-8 text-agri-green" />,
    title: 'Dalgıç Pompa Sistemleri',
    description: 'Derin kuyu ve yeraltı suyu kullanımında en verimli pompa sistemlerini kuruyoruz.'
  },
  {
    icon: <Sprout className="h-8 w-8 text-agri-green" />,
    title: 'Sulama Sistemleri',
    description: 'Tarımda verimliliğin temelinde doğru sulama sistemi vardır.'
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-agri-earth" />,
    title: 'Kuyu Sistemleri',
    description: 'Kuyunuz için en doğru pompa seçimi, sistemin verimli çalışmasının en önemli adımıdır.'
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-agri-green-dark" />,
    title: 'Teknik Danışmanlık',
    description: 'Pompa seçimi, debi tayini ve enerji verimliliği.'
  }
];

export default function Home() {
  const [latestBlogs, setLatestBlogs] = React.useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchLatestBlogs() {
      try {
        setBlogsLoading(true);
        if (!supabase) return;

        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        const normalizedData = (data || []).map(blog => ({
          ...blog,
          category: normalizeCategory(blog.category)
        }));
        setLatestBlogs(normalizedData);
      } catch (err) {
        console.error('Error fetching latest blogs:', err);
      } finally {
        setBlogsLoading(false);
      }
    }

    fetchLatestBlogs();
  }, []);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Çınarlar Boru ve Sulama Sistemleri",
    "image": "https://cinarlarsondaj.com/hero-bg.jpg",
    "url": "https://cinarlarsondaj.com",
    "telephone": "+905323112558",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pamukyazı, 8. Cd. No:38",
      "addressLocality": "Torbalı/İzmir",
      "postalCode": "35885",
      "addressCountry": "TR"
    },
    "description": "35 yılı aşkın tecrübeyle İzmir Torbalı'da dalgıç pompa, derin kuyu sondajı ve akıllı sulama sistemleri çözümleri üretiyoruz."
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Çınarlar Boru ve Sulama Sistemleri | İzmir Torbalı Pompa Sistemleri</title>
        <meta name="description" content="35 yılı aşkın tecrübeyle İzmir Torbalı'da dalgıç pompa, derin kuyu sondajı ve akıllı sulama sistemleri çözümleri üretiyoruz." />
        <meta name="keywords" content="sondaj, kuyu pompası, dalgıç pompa, damla sulama, izmir sondaj, torbalı pompa" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            alt="İzmir Torbalı Dalgıç Pompa ve Tarımsal Sulama Sistemleri Uzmanı"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-agri-green-dark/90 via-agri-green-dark/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-white"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl mb-6 border border-white/20">
              <span className="text-sm font-medium tracking-wide text-white/90">DERİN KUYU & DALGIÇ POMPA ÇÖZÜMLERİ</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6 tracking-tight">
              Suya Kavuşmanın <br />
              <span className="bg-clip-text text-transparent bg-[length:200%_100%] animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, #5ec4d4 0%, #ffffff 30%, #5ec4d4 50%, #ffffff 80%, #5ec4d4 100%)' }}>En Hızlı Yolu</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-light max-w-xl">
              Çınarlar olarak 35 yıldır su sondajı, dalgıç pompa seçimi ve sulama sistemi kurulumunda yanınızdayız. Sadece ürün satmıyoruz, doğru sistemi kuruyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                className="inline-flex justify-center items-center bg-agri-water hover:bg-agri-water-light text-agri-green-dark px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Hizmetlerimizi İnceleyin
              </a>
              <a
                href="#contact"
                className="inline-flex justify-center items-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300"
              >
                Bizimle İletişime Geçin
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features / Services Section */}
      <section id="services" className="py-24 bg-agri-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold tracking-widest text-agri-green mb-3"
            >
              HİZMETLERİMİZ
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-heading font-bold text-agri-text mb-6"
            >
              İhtiyaçlarınıza yönelik tüm çözümler
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-agri-text-muted text-lg leading-relaxed"
            >
              Kuyu açılımından kuyu teslimine kadar tüm süreçlerde yanınızdayız
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Subtle hover glow effect (Magic UI inspired but very subtle) */}
                <div className="absolute inset-0 bg-gradient-to-br from-agri-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="bg-agri-bg w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-heading font-bold text-agri-text mb-3">{feature.title}</h4>
                  <p className="text-agri-text-muted leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neden Bizi Tercih Etmelisiniz Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/why-us-bg.jpg"
                  alt="35 Yıllık Tecrübe ile Sondaj ve Kuyu Teknolojileri"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-agri-green-dark/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-2xl font-bold font-heading mb-2">35 Yıllık Tecrübe</p>
                  <p className="text-white/80">Binlerce başarılı kuyu ve pompa projesi.</p>
                </div>
              </div>
            </motion.div>

            <div className="w-full md:w-1/2">
              <span className="block text-sm font-bold tracking-widest text-agri-green mb-3 uppercase">
                DENEYİM & GÜVEN
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-agri-text mb-8">
                Neden Bizi Tercih Etmelisiniz?
              </h2>

              <div className="space-y-6">
                {reasons.map((reason, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="bg-agri-bg p-3 rounded-xl shrink-0">
                      {reason.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-agri-text mb-1">{reason.title}</h3>
                      <p className="text-agri-text-muted leading-relaxed">{reason.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-agri-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-sm font-bold tracking-widest text-agri-green mb-3"
              >
                BLOGDAN GÜNCEL İÇERİKLER
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-heading font-bold text-agri-text"
              >
                Tarım ve Teknoloji Yazıları
              </motion.h3>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/blog"
                className="hidden md:inline-flex items-center text-agri-green-dark font-bold hover:text-agri-green transition-colors"
              >
                Tümünü Gör
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl h-96 animate-pulse border border-gray-100"></div>
              ))
            ) : latestBlogs.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-agri-text-muted">Henüz blog yazısı bulunmuyor.</p>
              </div>
            ) : (
              latestBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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

                    <h4 className="text-2xl font-heading font-bold text-agri-text mb-4 group-hover:text-agri-green transition-colors leading-tight line-clamp-2">
                      <Link to={`/blog/${blog.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {blog.title}
                      </Link>
                    </h4>

                    <p className="text-agri-text-muted text-base leading-relaxed mb-8 flex-grow line-clamp-3">
                      {blog.summary}
                    </p>

                    <div className="mt-auto flex items-center text-sm font-bold text-agri-green-dark group-hover:text-agri-green transition-colors">
                      Makaleyi Oku
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              to="/blog"
              className="inline-flex items-center text-agri-green-dark font-bold hover:text-agri-green transition-colors"
            >
              Tümünü Gör
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brands / Partner Section */}
      <section className="py-20 bg-white border-t border-b border-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-[0.2em] text-agri-green/60 uppercase"
            >
              ÇÖZÜM ORTAKLARIMIZ
            </motion.h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {/* Kurlar Dalgıç Pompa & Motor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grayscale hover:grayscale-0 transition-all duration-500"
            >
              <img
                src="/kurlar-logo.jpg"
                alt="Kurlar Dalgıç Pompa & Motor"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </motion.div>

            {/* Düzgünler Plastik */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-500"
            >
              <img
                src="/duzgunler-logo.png"
                alt="Düzgünler Plastik"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Service Areas Unified Section */}
      <section id="contact" className="py-24 bg-agri-bg relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-agri-green/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-agri-water/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-xl shadow-agri-green-dark/5 border border-gray-100 flex flex-col lg:flex-row gap-16 items-center">

            {/* Left Column: Contact CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div>
                <div className="inline-flex items-center space-x-2 bg-agri-bg px-4 py-2 rounded-xl mb-6 border border-gray-100">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agri-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-agri-green"></span>
                  </span>
                  <span className="text-sm font-semibold tracking-wide text-agri-green-dark">HEMEN İLETİŞİME GEÇİN</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-agri-text mb-6 leading-tight">
                  Doğru Pompa Sistemi İçin <span className="text-agri-green">Yanınızdayız</span>
                </h2>
                <p className="text-lg text-agri-text-muted leading-relaxed mb-8">
                  Başta <strong>Torbalı</strong> olmak üzere tüm İzmir'e ve diğer çevre illerimize hizmetler sunuyoruz. Kuyunuz için en uygun pompa sistemini öğrenmek ve doğru çözümü bulmak için bize ulaşın.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+905323112558" className="group flex items-center justify-center gap-3 bg-agri-green hover:bg-agri-green-dark text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1">
                  <PhoneCall className="h-6 w-6" />
                  <span className="text-xl font-bold tracking-wide">+90 532 311 25 58</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Service Areas & Map Box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative"
            >
              {/* Map Container */}
              <div className="w-full h-[400px] lg:h-[450px] rounded-[2rem] overflow-hidden shadow-inner border-4 border-gray-50 relative z-10 bg-gray-100">
                <iframe
                  title="Çınarlar Boru ve Sulama Sistemleri Harita Konumu"
                  src="https://maps.google.com/maps?q=Çınarlar%20Boru%20ve%20Sulama%20Sistemleri,%20Pamukyazı,%208.%20Cd.%20No:38,%2035885%20Torbalı/İzmir&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
