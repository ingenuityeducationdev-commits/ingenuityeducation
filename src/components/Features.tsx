import { Users, PenTool, MessageCircle, BookOpen, Award, TrendingUp } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';

const iconMap = {
  'Small Class Sizes': Users,
  'Exam-Ready Skills': PenTool,
  '24/7 Support': MessageCircle,
  'Comprehensive Resources': BookOpen,
  'Proven Results': Award,
  'Progress Tracking': TrendingUp,
};

const features = siteContent.features.items.map(item => ({
  icon: iconMap[item.title as keyof typeof iconMap],
  title: item.title,
  description: item.description,
}));

export default function Features() {
  const headingReveal = useScrollReveal(0);
  const subheadingReveal = useScrollReveal(0.1);
  const card1Reveal = useScrollReveal(0.2);
  const card2Reveal = useScrollReveal(0.3);
  const card3Reveal = useScrollReveal(0.4);
  const card4Reveal = useScrollReveal(0.5);
  const card5Reveal = useScrollReveal(0.6);
  const card6Reveal = useScrollReveal(0.7);

  const cardReveals = [card1Reveal, card2Reveal, card3Reveal, card4Reveal, card5Reveal, card6Reveal];

  return (
    <section className="relative pt-24 pb-0 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#ffd659]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#ff8a41]/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <div ref={headingReveal.ref} style={headingReveal.style}>
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4">
              {siteContent.features.heading}
            </h2>
          </div>
          <div ref={subheadingReveal.ref} style={subheadingReveal.style}>
            <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto">
              {siteContent.features.subheading}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={cardReveals[index].ref}
              style={cardReveals[index].style}
              className="group bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-8 hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 border border-[#ff8a41]/30"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#ffd659]/30 to-[#ff8a41]/30 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#ffd659] group-hover:to-[#ff8a41] transition-all duration-300 border border-[#ff8a41]/50">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#ff8a41] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-base text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
