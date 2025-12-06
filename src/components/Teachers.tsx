import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { supabase, type Teacher } from '../lib/supabase';
import { siteContent } from '../content/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeachers() {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('display_order', { ascending: true })
        .limit(2);

      if (!error && data) {
        setTeachers(data);
      }
      setLoading(false);
    }

    fetchTeachers();
  }, []);

  const headingReveal = useScrollReveal(0);
  const subheadingReveal = useScrollReveal(0.1);
  const card1Reveal = useScrollReveal(0.2);
  const card2Reveal = useScrollReveal(0.3);

  const cardReveals = [card1Reveal, card2Reveal];

  const getTeacherImage = (teacherId: string, teacherName: string): string | null => {
    const imageUrls = siteContent.teachers.imageUrls as Record<string, string>;
    return imageUrls[teacherId] || imageUrls[teacherName] || null;
  };

  if (loading) {
    return (
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="teachers" className="relative pt-12 pb-0 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#ff8a41]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ffd659]/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <div ref={headingReveal.ref} style={headingReveal.style}>
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4">
              {siteContent.teachers.heading}
            </h2>
          </div>
          <div ref={subheadingReveal.ref} style={subheadingReveal.style}>
            <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto">
              {siteContent.teachers.subheading}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:gap-8 max-w-5xl mx-auto">
          {teachers.map((teacher, index) => {
            const teacherImage = getTeacherImage(teacher.id, teacher.name);

            return (
              <div
                key={teacher.id}
                ref={cardReveals[index]?.ref}
                style={cardReveals[index]?.style}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl md:rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 border border-gray-700/50"
              >
                <div className="flex flex-row">
                  <div className="flex-shrink-0 w-32 sm:w-40 md:w-64 lg:w-80">
                    {teacherImage ? (
                      <img
                        src={teacherImage}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#ffd659] to-[#ff8a41] flex items-center justify-center">
                        <span className="text-2xl md:text-7xl font-bold text-white/20">
                          Image<br/>Placeholder
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-2 md:p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="text-sm md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-4">
                      {teacher.name}
                    </h3>

                    <p className="text-[#ff8a41] font-semibold text-[0.5rem] md:text-base lg:text-lg mb-1 md:mb-6 leading-tight md:leading-relaxed">
                      {teacher.title}
                    </p>

                    <div className="flex items-center gap-1 md:gap-3 text-gray-300 mb-1 md:mb-6">
                      <GraduationCap className="w-2.5 h-2.5 md:w-6 md:h-6 text-[#ff8a41] flex-shrink-0" />
                      <span className="text-[0.45rem] md:text-base lg:text-lg font-medium leading-tight">
                        {teacher.qualifications}
                      </span>
                    </div>

                    <p className="text-gray-300 leading-tight md:leading-relaxed text-[0.45rem] md:text-base lg:text-lg">
                      {teacher.bio}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
