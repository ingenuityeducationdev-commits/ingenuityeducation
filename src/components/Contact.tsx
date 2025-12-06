import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Facebook, Instagram, Linkedin } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const headingReveal = useScrollReveal(0);
  const subheadingReveal = useScrollReveal(0.1);
  const ctaReveal = useScrollReveal(0.2);
  const infoCardsReveal = useScrollReveal(0.3);
  const formReveal = useScrollReveal(0.4);
  const mapReveal = useScrollReveal(0.5);
  const socialReveal = useScrollReveal(0.6);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message
        }]);

      if (dbError) throw dbError;

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;

      const emailResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (!emailResponse.ok) {
        console.error('Email sending failed, but form data was saved');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative pt-40 pb-24 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#ff8a41]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#ffd659]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <div ref={headingReveal.ref} style={headingReveal.style}>
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4">
              {siteContent.contact.heading}
            </h2>
          </div>
          <div ref={subheadingReveal.ref} style={subheadingReveal.style}>
            <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto">
              {siteContent.contact.subheading}
            </p>
          </div>
        </div>

        <div ref={infoCardsReveal.ref} style={infoCardsReveal.style}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16">
            <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#ff8a41]/30 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#ffd659] to-[#ff8a41] flex items-center justify-center mb-3 md:mb-4">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1 md:mb-2 text-sm md:text-base">Email</h3>
              <a
                href={`mailto:${siteContent.contact.info.email}`}
                className="text-gray-300 hover:text-[#ff8a41] transition-colors break-all text-xs md:text-base"
              >
                {siteContent.contact.info.email}
              </a>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-[#ff8a41]/30 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd659] to-[#ff8a41] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Phone</h3>
              <a
                href={`tel:${siteContent.contact.info.phone.replace(/\s/g, '')}`}
                className="text-gray-300 hover:text-[#ff8a41] transition-colors"
              >
                {siteContent.contact.info.phone}
              </a>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-[#ff8a41]/30 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd659] to-[#ff8a41] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Address</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {siteContent.contact.info.address.full}
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-[#ff8a41]/30 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd659] to-[#ff8a41] flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Hours</h3>
              <div className="text-gray-300 text-sm space-y-1">
                <p>{siteContent.contact.info.hours.weekdays}</p>
                <p>{siteContent.contact.info.hours.weekends}</p>
                <p className="text-gray-400">{siteContent.contact.info.hours.closed}</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={formReveal.ref} style={formReveal.style} className="mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-800 rounded-2xl p-8 border border-[#ff8a41]/30">
              <h3 className="text-2xl font-bold text-white mb-2">
                {siteContent.contact.form.title}
              </h3>
              <p className="text-gray-300 mb-6">
                {siteContent.contact.form.description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8a41] transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8a41] transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8a41] transition-colors"
                    placeholder="+61 400 000 000"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#ff8a41] transition-colors"
                  >
                    {siteContent.contact.form.subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8a41] transition-colors resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-xl text-green-300">
                    Thank you for your message! We'll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-300">
                    There was an error submitting your message. Please try again or contact us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-[#ffd659] to-[#ff8a41] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div ref={socialReveal.ref} style={socialReveal.style}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
            <div className="flex justify-center gap-4">
              <a
                href={siteContent.contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gray-800 border border-[#ff8a41]/30 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#ffd659] hover:to-[#ff8a41] transition-all duration-300"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href={siteContent.contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gray-800 border border-[#ff8a41]/30 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#ffd659] hover:to-[#ff8a41] transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href={siteContent.contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gray-800 border border-[#ff8a41]/30 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#ffd659] hover:to-[#ff8a41] transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
