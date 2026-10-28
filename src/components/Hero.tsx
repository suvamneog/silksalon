import { Phone, MessageCircle, ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';
import { SalonConfig } from '../types';
import { SALON_HERO_IMAGE } from '../data/salonData';
import { isSalonOpenNow } from '../utils/helpers';

interface HeroProps {
  salonConfig: SalonConfig;
  onOpenBooking: () => void;
}

export function Hero({ salonConfig, onOpenBooking }: HeroProps) {
  const status = isSalonOpenNow();

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA]/60 to-[#FAF8F5] border-b border-[#E6DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Unboxed Location Kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#786E63] font-medium">
              <span>{salonConfig.location}</span>
              <span aria-hidden="true">·</span>
              <span>Men & Women</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#C5A059] font-semibold">Boutique Salon</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-[#1E1B18] tracking-tight leading-[1.15] text-balance">
              Precision Hair & Rejuvenating Wellness on GS Road.
            </h1>

            {/* Narrative Prose incorporating prompt details */}
            <p className="text-base sm:text-lg text-[#5C5449] leading-relaxed max-w-2xl font-light">
              Welcome to <span className="font-medium text-[#1E1B18]">{salonConfig.name}</span>. We are dedicated to helping men and women nearby in Guwahati look and feel confident with expert haircuts, refreshing facials, and rich hair colour in a calm, modern setting.
            </p>

            {/* CTAs & Contact */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#2A2622] hover:bg-[#1E1B18] transition-all cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <span>Book a Slot</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </button>

              <a
                href={`tel:+91${salonConfig.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#2A2622] bg-[#FAF8F5] border border-[#D5CCC0] hover:bg-[#F4EFEA] hover:border-[#2A2622] transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Call {salonConfig.phone}</span>
              </a>

              <a
                href={`https://wa.me/91${salonConfig.whatsapp.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(salonConfig.name)}%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20slot.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1C5A3E] bg-[#E8F3ED] hover:bg-[#DCEDE3] border border-[#C2E0CE] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Live Timing Indicator & Hours */}
            <div className="pt-3 border-t border-[#E6DFD5] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#6B6358]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-medium text-[#1E1B18]">{salonConfig.timingsText}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#3B8256]" />
                <span>{status.message}</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Salon Interior Image with Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden bg-[#EAE4DC] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] border border-[#DDD5C7] shadow-lg">
              <img
                src={SALON_HERO_IMAGE}
                alt="Silk Salon modern styling interior on GS Road Guwahati"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-[#FAF8F5] pointer-events-none">
                <p className="text-xs font-medium uppercase tracking-widest text-[#E8D9C5]">GS Road, Guwahati</p>
                <p className="text-sm font-display font-medium text-white">Silk Salon Experience</p>
              </div>
            </div>

            {/* Subtle floating badge adhering to single elevation rule */}
            <div className="absolute -bottom-3 -right-3 hidden sm:flex items-center gap-2 bg-[#2A2622] text-[#FAF8F5] px-4 py-2 border border-[#443E38] shadow-md text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Dedicated Care for Men & Women</span>
            </div>
          </div>
        </div>

        {/* 4-Item Information Strip below Hero */}
        <div className="mt-12 pt-8 border-t border-[#E6DFD5] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#8A8073]">Location</div>
            <div className="text-sm font-medium text-[#1E1B18] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>GS Road, Guwahati</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#8A8073]">Operating Days</div>
            <div className="text-sm font-medium text-[#1E1B18] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Monday to Sunday</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#8A8073]">Operating Hours</div>
            <div className="text-sm font-medium text-[#1E1B18] tabular-nums">
              10:00 AM – 8:00 PM
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#8A8073]">Direct Assistance</div>
            <div className="text-sm font-medium text-[#1E1B18] tabular-nums">
              +91 {salonConfig.phone}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
