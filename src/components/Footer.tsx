import { Phone, MessageCircle, MapPin, Clock, SlidersHorizontal } from 'lucide-react';
import { SalonConfig } from '../types';

interface FooterProps {
  salonConfig: SalonConfig;
  onOpenCustomizer: () => void;
  onOpenBooking: () => void;
}

export function Footer({ salonConfig, onOpenCustomizer, onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-[#1E1B18] text-[#E8D9C5] pt-14 pb-20 md:pb-14 border-t border-[#38332D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Narrative */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-2xl font-display text-[#FAF8F5] tracking-tight">
              {salonConfig.name}
            </h3>
            <p className="text-sm text-[#A89F91] leading-relaxed max-w-sm">
              A boutique hair and beauty salon in Guwahati. Dedicated care for men and women with haircut, facial, and hair colour services on GS Road.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs">
              <button
                onClick={onOpenCustomizer}
                className="inline-flex items-center gap-1.5 text-[#C5A059] hover:text-[#FAF8F5] transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Replace Class Example Details</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#FAF8F5]">
              Quick Links
            </div>
            <ul className="space-y-2 text-sm text-[#A89F91]">
              <li>
                <a href="#services" className="hover:text-[#FAF8F5] transition-colors">
                  Services & Prices (Haircut, Facial, Hair Colour)
                </a>
              </li>
              <li>
                <a href="#timings" className="hover:text-[#FAF8F5] transition-colors">
                  Operating Timings (Mon–Sun 10 am–8 pm)
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#FAF8F5] transition-colors">
                  Location (GS Road, Guwahati)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#C5A059] transition-colors text-left cursor-pointer"
                >
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#FAF8F5]">
              Contact & Hours
            </div>
            <ul className="space-y-2.5 text-sm text-[#A89F91]">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{salonConfig.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{salonConfig.timingsText}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a
                  href={`tel:+91${salonConfig.phone.replace(/\D/g, '')}`}
                  className="hover:text-[#FAF8F5] tabular-nums"
                >
                  Call: +91 {salonConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a
                  href={`https://wa.me/91${salonConfig.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF8F5] tabular-nums"
                >
                  WhatsApp: +91 {salonConfig.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-[#312C26] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#82786B]">
          <p>
            © {new Date().getFullYear()} {salonConfig.name} · GS Road, Guwahati.
          </p>
          <p className="text-center sm:text-right max-w-md">
            Note: Silk Salon, prices, timings, and phone 98765 43210 are class examples only. Replace them with your own before publishing.
          </p>
        </div>
      </div>
    </footer>
  );
}
