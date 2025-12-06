import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteContent } from '../content/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Hero() {
  const titleReveal = useScrollReveal(0);
  const subtitleReveal = useScrollReveal(0.1);
  const buttonsReveal = useScrollReveal(0.2);
  const statsReveal = useScrollReveal(0.3);

  const scrollToEnrollment = () => {
    document.getElementById('enrollment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-900 via-black to-black pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#ff8a41]/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#ffd659]/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">

          <div ref={titleReveal.ref} style={titleReveal.style}>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
              {siteContent.hero.title.main}{' '}
              <span className="bg-gradient-to-r from-[#ffd659] to-[#ff8a41] bg-clip-text text-transparent">
                {siteContent.hero.title.highlight}
              </span>
            </h1>
          </div>

          <div ref={subtitleReveal.ref} style={subtitleReveal.style}>
            <p className="text-base md:text-2xl text-gray-300 mb-6 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              {siteContent.hero.subtitle}
            </p>
          </div>

          <div ref={buttonsReveal.ref} style={buttonsReveal.style} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="group px-5 py-2.5 md:px-8 md:py-4 bg-gradient-to-r from-[#ffd659] to-[#ff8a41] text-white rounded-full font-semibold text-sm md:text-lg hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              Enroll Now
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => document.getElementById('teachers')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 md:px-8 md:py-4 bg-gray-800 text-white rounded-full font-semibold text-sm md:text-lg hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg border border-[#ff8a41]/30"
            >
              Meet Our Teachers
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
