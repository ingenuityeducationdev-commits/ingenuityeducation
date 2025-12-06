import { useEffect, useState } from 'react';
import { BookOpen, Check, Award, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, type IntensiveProgram } from '../lib/supabase';
import { siteContent } from '../content/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Intensives() {
  const [programs, setPrograms] = useState<IntensiveProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      const { data, error } = await supabase
        .from('intensive_programs')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (!error && data) {
        setPrograms(data);
      }
      setLoading(false);
    }

    fetchPrograms();
  }, []);

  const badgeReveal = useScrollReveal(0);
  const headingReveal = useScrollReveal(0.1);
  const subheadingReveal = useScrollReveal(0.2);
  const card1Reveal = useScrollReveal(0.3);
  const card2Reveal = useScrollReveal(0.4);
  const card3Reveal = useScrollReveal(0.5);

  const cardReveals = [card1Reveal, card2Reveal, card3Reveal];

  if (loading) {
    return (
      <section className="relative py-24 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="intensives" className="relative py-24 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-96 h-96 bg-[#ff8a41]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-[#ffd659]/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <div ref={badgeReveal.ref} style={badgeReveal.style}>
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-[#ffd659]/30 to-[#ff8a41]/30 text-white rounded-full text-xs md:text-sm font-semibold mb-2 md:mb-4 border border-[#ff8a41]/50">
              <Award className="w-3 h-3 md:w-4 md:h-4" />
              <span>{siteContent.intensives.badge}</span>
            </div>
          </div>
          <div ref={headingReveal.ref} style={headingReveal.style}>
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4">
              {siteContent.intensives.heading}
            </h2>
          </div>
          <div ref={subheadingReveal.ref} style={subheadingReveal.style}>
            <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto">
              {siteContent.intensives.subheading}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {programs.map((program, index) => (
            <div
              key={program.id}
              ref={cardReveals[index]?.ref}
              style={cardReveals[index]?.style}
              className="bg-gray-800 rounded-xl md:rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 border border-[#ff8a41]/30 flex flex-col"
            >
              <div className="p-4 md:p-8 flex-1">
                <div className="inline-block px-3 py-0.5 md:px-4 md:py-1 bg-gradient-to-r from-[#ffd659]/30 to-[#ff8a41]/30 text-white rounded-full text-xs md:text-sm font-semibold mb-2 md:mb-4 border border-[#ff8a41]/50">
                  {program.year_level}
                </div>

                <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3">
                  {program.name}
                </h3>

                <div className="mb-3 md:mb-6">
                  <div className="flex items-center gap-1 md:gap-2 text-xl md:text-3xl font-bold text-white mb-1">
                    <DollarSign className="w-5 h-5 md:w-7 md:h-7 text-[#ff8a41]" />
                    <span className="bg-gradient-to-r from-[#ffd659] to-[#ff8a41] bg-clip-text text-transparent">
                      {program.price}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 ml-6 md:ml-9">One-time program fee</p>
                </div>

                <p className="text-xs md:text-base text-gray-300 mb-3 md:mb-6 leading-relaxed">
                  {program.description}
                </p>

                <div className="border-t border-gray-700 pt-3 md:pt-6">
                  <div className="flex items-center gap-2 mb-2 md:mb-3 text-white font-semibold text-sm md:text-base">
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-[#ff8a41]" />
                    <span>What You'll Get:</span>
                  </div>
                  <ul className="space-y-2">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-gray-300">
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-[#ff8a41] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 md:p-6 bg-gray-900 border-t border-[#ff8a41]/30">
                <Link
                  to="/contact"
                  className="block w-full py-2 md:py-3 bg-gradient-to-r from-[#ffd659] to-[#ff8a41] text-white rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 text-center"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
