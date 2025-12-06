import { Quote, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { siteContent } from '../content/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';

const testimonials = siteContent.testimonials.reviews;

const topRowTestimonials = [testimonials[0], testimonials[1], testimonials[2]];
const bottomRowTestimonials = [testimonials[3], testimonials[4], testimonials[5]];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-[280px] md:w-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl md:rounded-2xl p-4 md:p-8 border border-[#ff8a41]/30 mx-2 md:mx-4">
      <div className="flex items-start justify-between mb-3 md:mb-6">
        <Quote className="w-6 h-6 md:w-10 md:h-10 text-[#ff8a41]/30" />
        <div className="flex items-center gap-0.5 md:gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-[#ff8a41] fill-current" />
          ))}
        </div>
      </div>

      <p className="text-gray-300 text-xs md:text-lg leading-relaxed mb-3 md:mb-6 italic">
        "{testimonial.quote}"
      </p>

      <div className="pt-3 md:pt-6 border-t border-gray-700">
        <div className="font-bold text-white text-sm md:text-base">{testimonial.name}</div>
        <div className="text-xs md:text-sm text-gray-400">{testimonial.school}</div>
      </div>
    </div>
  );
}

function ScrollingRow({ testimonials, direction }: { testimonials: typeof topRowTestimonials, direction: 'left' | 'right' }) {
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <div
      className="relative overflow-hidden mb-4 md:mb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex ${
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
        }`}
        style={{
          width: 'fit-content',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const headingReveal = useScrollReveal(0);
  const subheadingReveal = useScrollReveal(0.1);
  const row1Reveal = useScrollReveal(0.2);
  const row2Reveal = useScrollReveal(0.3);

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#ffd659]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#ff8a41]/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative w-full">
        <div className="text-center mb-8 md:mb-16 px-4 sm:px-6 lg:px-8">
          <div ref={headingReveal.ref} style={headingReveal.style}>
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4">
              {siteContent.testimonials.heading}
            </h2>
          </div>
          <div ref={subheadingReveal.ref} style={subheadingReveal.style}>
            <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto">
              {siteContent.testimonials.subheading}
            </p>
          </div>
        </div>

        <div ref={row1Reveal.ref} style={row1Reveal.style}>
          <ScrollingRow testimonials={topRowTestimonials} direction="left" />
        </div>
        <div ref={row2Reveal.ref} style={row2Reveal.style}>
          <ScrollingRow testimonials={bottomRowTestimonials} direction="right" />
        </div>
      </div>
    </section>
  );
}
