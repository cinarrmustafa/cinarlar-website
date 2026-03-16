import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Droplets, Menu, X, Leaf, MessageCircle, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  // Handle smooth scrolling for anchor links (especially when coming from another page like /blog)
  React.useEffect(() => {
    setIsMobileMenuOpen(false);

    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100); // Slight delay ensures page is fully rendered before scrolling
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  const navLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetlerimiz', path: '/#services' },
    { name: 'Blog', path: '/blog' },
    { name: 'İletişim', path: '/#contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-agri-bg">
      {/* Header Container - Floating Pill */}
      <div className="sticky top-6 z-50 px-4 sm:px-6 lg:px-8 flex justify-center w-full pointer-events-none">
        <header className="w-full max-w-6xl bg-white/40 backdrop-blur-xl rounded-2xl shadow-sm border border-white/60 transition-all duration-300 pointer-events-auto">
          <div className="flex justify-between items-center h-20 pl-1 pr-6 sm:pl-2 sm:pr-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-0 group">
              <img src="/logo.png" alt="Çınarlar Logo" className="h-[72px] w-auto object-contain flex-shrink-0 translate-y-1" />
              <span className="font-heading font-bold text-lg text-[#1E1E1E] tracking-tight leading-[1.1] -ml-8">
                Çınarlar Boru ve<br /> Sulama Sistemleri
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const linkClasses = "text-[#4A4A4A] hover:text-[#1E1E1E] font-medium transition-colors duration-200 text-sm tracking-wide";
                if (link.path.includes('#')) {
                  if (location.pathname === '/' || location.pathname === '') {
                    return (
                      <a
                        key={link.name}
                        href={link.path.replace('/', '')}
                        onClick={(e) => {
                          e.preventDefault();
                          const id = link.path.split('#')[1];
                          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className={linkClasses}
                      >
                        {link.name}
                      </a>
                    );
                  } else {
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={linkClasses}
                      >
                        {link.name}
                      </Link>
                    )
                  }
                } else {
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={linkClasses}
                    >
                      {link.name}
                    </Link>
                  );
                }
              })}
              <a
                href="tel:+905323112558"
                className="bg-agri-green hover:bg-agri-green-dark text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                aria-label="Bizi Arayın"
              >
                <PhoneCall className="w-4 h-4" />
                <span className="tracking-wide font-medium text-sm">+90 532 311 25 58</span>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#1E1E1E] hover:text-black focus:outline-none p-1"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-20 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 max-w-5xl mx-auto bg-[#EFECE6]/98 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-xl pointer-events-auto z-40"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 shadow-lg">
                {navLinks.map((link) => {
                  if (link.path.includes('#')) {
                    if (location.pathname === '/' || location.pathname === '') {
                      return (
                        <a
                          key={link.name}
                          href={link.path.replace('/', '')}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            const id = link.path.split('#')[1];
                            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className="block px-3 py-4 text-base font-medium text-agri-text hover:text-agri-green-dark hover:bg-agri-bg rounded-lg transition-colors"
                        >
                          {link.name}
                        </a>
                      );
                    } else {
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-3 py-4 text-base font-medium text-agri-text hover:text-agri-green-dark hover:bg-agri-bg rounded-lg transition-colors"
                        >
                          {link.name}
                        </Link>
                      );
                    }
                  } else {
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-4 text-base font-medium text-agri-text hover:text-agri-green-dark hover:bg-agri-bg rounded-lg transition-colors"
                      >
                        {link.name}
                      </Link>
                    );
                  }
                })}
                <div className="pt-4 px-3">
                  <a
                    href="tel:+905323112558"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-center items-center gap-2 w-full text-center bg-agri-green text-white px-6 py-3 rounded-xl font-medium transition-colors hover:bg-agri-green-dark"
                  >
                    <PhoneCall className="w-5 h-5" />
                    <span className="tracking-widest font-semibold">+90 532 311 25 58</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-agri-green-dark text-white/80 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center mb-6">
                <span className="font-heading font-bold text-2xl text-white tracking-tight">
                  Çınarlar Boru ve Sulama Sistemleri
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-white/70">
                30 yılı aşkın tecrübemizle İzmir ve Ege Bölgesi'nde su sondajı, dalgıç pompa satış-servis ve sulama sistemi kurulumunda anahtar teslim çözümler sunuyoruz.
              </p>
            </div>

            <div>
              <h4 className="text-white font-heading font-semibold mb-6">Hızlı Bağlantılar</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                <li>
                  {location.pathname === '/' || location.pathname === '' ? (
                    <a
                      href="#services"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="hover:text-white transition-colors"
                    >
                      Hizmetlerimiz
                    </a>
                  ) : (
                    <Link to="/#services" className="hover:text-white transition-colors">Hizmetlerimiz</Link>
                  )}
                </li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Haberler</Link></li>
                <li>
                  {location.pathname === '/' || location.pathname === '' ? (
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="hover:text-white transition-colors"
                    >
                      İletişim
                    </a>
                  ) : (
                    <Link to="/#contact" className="hover:text-white transition-colors">İletişim</Link>
                  )}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-heading font-semibold mb-6">Hizmetlerimiz</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: 'Sulama Ekipmanları', target: 'services' },
                  { name: 'Sondaj ve Kuyu Ekipmanları', target: 'services' },
                  { name: 'Sondaj ve Kuyu Danışmanlığı', target: 'services' },
                  { name: 'Sulama Sistemleri ve Teknikleri', target: 'services' }
                ].map((item, index) => (
                  <li key={index}>
                    {location.pathname === '/' || location.pathname === '' ? (
                      <a
                        href={`#${item.target}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className="hover:text-white transition-colors"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link to={`/#${item.target}`} className="hover:text-white transition-colors">{item.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-heading font-semibold mb-6">İletişim</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start space-x-3">
                  <span className="text-agri-water mt-0.5">📍</span>
                  <a
                    href="https://maps.google.com/?q=Pamukyazı, 8. Cd. No:38, 35885 Torbalı/İzmir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Pamukyazı, 8. Cd. No:38, 35885<br />Torbalı/İzmir, Türkiye
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-agri-water">📞</span>
                  <a href="tel:+905323112558" className="hover:text-white transition-colors">+90 532 311 25 58</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
            <p>&copy; {new Date().getFullYear()} Çınarlar Boru ve Sulama Sistemleri. Tüm hakları saklıdır.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button onClick={() => alert('Gizlilik Politikası yakında eklenecektir.')} className="hover:text-white transition-colors">Gizlilik Politikası</button>
              <button onClick={() => alert('Kullanım Şartları yakında eklenecektir.')} className="hover:text-white transition-colors">Kullanım Şartları</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/905323112558"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center gap-2 overflow-hidden"
        title="WhatsApp ile İletişime Geçin"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[200px] transition-all duration-500 ease-in-out font-bold">
          WhatsApp'tan Yazın
        </span>
        <MessageCircle className="w-7 h-7 fill-white" />
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
        {/* Pulsating Ring Effect */}
        <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30 -z-10"></div>
      </a>
    </div >
  );
}
