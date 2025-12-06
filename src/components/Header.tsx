import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-6">
      <nav
        className={`relative max-w-7xl mx-auto transition-all duration-300 rounded-3xl overflow-hidden ${
          isScrolled
            ? 'bg-gray-900/50 backdrop-blur-md shadow-xl shadow-orange-500/20'
            : 'bg-gray-900/50 backdrop-blur-md'
        }`}
      >
        <div className="absolute inset-0 rounded-3xl pointer-events-none">
          <div className="absolute inset-0 rounded-3xl border border-white/10"></div>
          <div className="absolute inset-0 rounded-3xl" style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 0%, rgba(0,0,0,0.1) 100%)',
          }}></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent"></div>
        </div>
        <div className="relative flex items-center justify-between h-16 md:h-20 px-3 md:px-6">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-1.5 md:gap-4 group"
          >
            <img
              src="/Screen_Shot_2025-11-25_at_3.17.45_pm-removebg-preview 2 copy.png"
              alt="Ingenuity Education"
              className="h-6 md:h-14 w-auto brightness-0 invert transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-[10px] md:text-xl tracking-wider">INGENUITY</span>
              <span className="text-white font-bold text-[10px] md:text-xl tracking-wider">EDUCATION</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('teachers')}
              className="text-gray-200 hover:text-[#ff8a41] font-semibold transition-colors"
            >
              Teachers
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className="text-gray-200 hover:text-[#ff8a41] font-semibold transition-colors"
            >
              Courses
            </button>
            <Link
              to="/contact"
              className="text-gray-200 hover:text-[#ff8a41] font-semibold transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2 bg-gradient-to-r from-[#ffd659] to-[#ff8a41] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
            >
              Enroll Now
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-orange-900/30 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700/50 px-6">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('teachers')}
                className="text-left px-4 py-2 text-gray-200 hover:bg-orange-900/30 rounded-lg font-semibold transition-colors"
              >
                Teachers
              </button>
              <button
                onClick={() => scrollToSection('courses')}
                className="text-left px-4 py-2 text-gray-200 hover:bg-orange-900/30 rounded-lg font-semibold transition-colors"
              >
                Courses
              </button>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left px-4 py-2 text-gray-200 hover:bg-orange-900/30 rounded-lg font-semibold transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-3 bg-gradient-to-r from-[#ffd659] to-[#ff8a41] text-white rounded-full font-semibold hover:shadow-lg transition-all text-center block"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
