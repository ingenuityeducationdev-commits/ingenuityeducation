import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { siteContent } from '../content/siteContent';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-6 md:mb-12">
          <div className="text-center md:text-left col-span-full md:col-span-1">
            <div className="mb-3 md:mb-4 flex items-center justify-center md:justify-start gap-2 md:gap-3">
              <img
                src="/Screen_Shot_2025-11-25_at_3.17.45_pm-removebg-preview 2 copy.png"
                alt="Ingenuity Education"
                className="h-6 md:h-12 w-auto brightness-0 invert"
              />
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-xs md:text-lg tracking-wider">INGENUITY</span>
                <span className="text-white font-bold text-xs md:text-lg tracking-wider">EDUCATION</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-[10px] md:text-base hidden md:block">
              {siteContent.footer.tagline}
            </p>
          </div>

          <div className="text-center md:text-left col-span-full md:col-span-1">
            <h3 className="text-white font-bold mb-2 md:mb-4 text-xs md:text-base">Quick Links</h3>
            <ul className="space-y-1 md:space-y-2 text-[10px] md:text-base">
              <li>
                <button
                  onClick={() => document.getElementById('teachers')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#ff8a41] transition-colors"
                >
                  Our Teachers
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#ff8a41] transition-colors"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('enrollment')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#ff8a41] transition-colors"
                >
                  Enrollment
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left col-span-full md:col-span-1 hidden md:block">
            <h3 className="text-white font-bold mb-2 md:mb-4 text-xs md:text-base">Contact</h3>
            <ul className="space-y-2 md:space-y-3 text-[10px] md:text-base">
              <li className="flex items-start justify-center md:justify-start gap-2 md:gap-3">
                <Mail className="w-3 h-3 md:w-5 md:h-5 text-[#ff8a41] flex-shrink-0 mt-0.5" />
                <a href={`mailto:${siteContent.footer.contact.email}`} className="hover:text-white transition-colors">
                  {siteContent.footer.contact.email}
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-start gap-2 md:gap-3">
                <Phone className="w-3 h-3 md:w-5 md:h-5 text-[#ff8a41] flex-shrink-0 mt-0.5" />
                <a href={`tel:${siteContent.footer.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                  {siteContent.footer.contact.phone}
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-start gap-2 md:gap-3">
                <MapPin className="w-3 h-3 md:w-5 md:h-5 text-[#ff8a41] flex-shrink-0 mt-0.5" />
                <span>{siteContent.footer.contact.address}</span>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left col-span-full md:col-span-1 hidden md:block">
            <h3 className="text-white font-bold mb-2 md:mb-4 text-xs md:text-base">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-3 md:gap-4">
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ffd659] hover:to-[#ff8a41] transition-all"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ffd659] hover:to-[#ff8a41] transition-all"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ffd659] hover:to-[#ff8a41] transition-all"
              >
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
            <div className="mt-4 md:mt-6">
              <p className="text-[10px] md:text-sm text-gray-400 mb-2">{siteContent.footer.newsletter.heading}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={siteContent.footer.newsletter.placeholder}
                  className="flex-1 px-3 py-1.5 md:px-4 md:py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#ff8a41] text-[10px] md:text-sm"
                />
                <button className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-[#ffd659] to-[#ff8a41] text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all text-[10px] md:text-sm font-semibold">
                  {siteContent.footer.newsletter.button}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
            <p className="text-[10px] md:text-sm text-gray-400">
              © {new Date().getFullYear()} {siteContent.footer.copyright}
            </p>
            <div className="flex gap-3 md:gap-6 text-[10px] md:text-sm">
              <a href="#" className="hover:text-white transition-colors">
                {siteContent.footer.links.privacy}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {siteContent.footer.links.terms}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {siteContent.footer.links.refund}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
