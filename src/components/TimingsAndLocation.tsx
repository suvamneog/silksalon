import { useState } from 'react';
import { Clock, MapPin, Phone, MessageCircle, ExternalLink, Copy, Check, Navigation } from 'lucide-react';
import { SalonConfig } from '../types';
import { isSalonOpenNow } from '../utils/helpers';

interface TimingsAndLocationProps {
  salonConfig: SalonConfig;
  onOpenBooking: () => void;
}

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function TimingsAndLocation({ salonConfig, onOpenBooking }: TimingsAndLocationProps) {
  const [copied, setCopied] = useState(false);
  const status = isSalonOpenNow();

  // Get current day name to highlight in schedule
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday
  const currentDayName = currentDayIndex === 0 ? 'Sunday' : DAYS_OF_WEEK[currentDayIndex - 1];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${salonConfig.name}, ${salonConfig.location}, Guwahati, Assam`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="timings" className="py-16 sm:py-20 bg-[#F4EFEA]/70 border-t border-b border-[#E6DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-widest text-[#786E63] font-semibold">
            Hours & Directions
          </div>
          <h2 className="text-3xl sm:text-4xl font-display text-[#1E1B18] font-normal tracking-tight text-balance">
            Visit Us on GS Road
          </h2>
          <p className="text-sm sm:text-base text-[#665D52] leading-relaxed">
            Conveniently situated on GS Road, Guwahati. We welcome men and women 7 days a week with extended evening hours until 8:00 PM.
          </p>
        </div>

        {/* 2-Column Grid: Left is Timings, Right is Location & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Operating Hours */}
          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#E6DFD5] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EFE9DF]">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#C5A059]" />
                  <h3 className="text-xl font-display font-medium text-[#1E1B18]">
                    Operating Hours
                  </h3>
                </div>
                {/* Live Open / Closed indicator */}
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full">
                  <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-[#2E7D32]' : 'bg-[#D32F2F]'}`} />
                  <span>{status.isOpen ? 'Open Now' : 'Closed Now'}</span>
                </div>
              </div>

              {/* Status explanation */}
              <p className="text-xs sm:text-sm text-[#665D52]">
                {status.message}
              </p>

              {/* Daily Schedule List */}
              <div className="divide-y divide-[#F4EFEA] text-sm">
                {DAYS_OF_WEEK.map((day) => {
                  const isCurrentDay = day === currentDayName;
                  return (
                    <div
                      key={day}
                      className={`py-2.5 flex items-center justify-between transition-colors ${
                        isCurrentDay ? 'font-semibold text-[#1E1B18] bg-[#FAF8F5] px-2 -mx-2' : 'text-[#5C5449]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{day}</span>
                        {isCurrentDay && (
                          <span className="text-[11px] font-normal text-[#C5A059] uppercase tracking-wider">
                            (Today)
                          </span>
                        )}
                      </div>
                      <span className="tabular-nums font-medium text-[#1E1B18]">
                        10:00 AM – 8:00 PM
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EFE9DF]">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#2A2622] hover:bg-[#1E1B18] transition-colors cursor-pointer text-center"
              >
                Reserve a Slot During These Hours
              </button>
            </div>
          </div>

          {/* Card 2: Location & Contact */}
          <div id="location" className="lg:col-span-6 bg-[#FFFFFF] border border-[#E6DFD5] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EFE9DF]">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-[#C5A059]" />
                  <h3 className="text-xl font-display font-medium text-[#1E1B18]">
                    Location & Direct Line
                  </h3>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 text-xs text-[#786E63] hover:text-[#1E1B18] transition-colors cursor-pointer"
                  title="Copy full address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Address details */}
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-[#8A8073]">Salon Address</div>
                <div className="text-lg font-medium text-[#1E1B18]">
                  GS Road, Guwahati
                </div>
                <p className="text-sm text-[#665D52] leading-relaxed">
                  Located along prime GS Road in Guwahati, accessible for nearby residents and visitors looking for haircuts, facials, and hair colour.
                </p>
              </div>

              {/* Direct Touchpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href={`tel:+91${salonConfig.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-3 p-3.5 bg-[#FAF8F5] border border-[#E6DFD5] hover:border-[#2A2622] transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-[#EAE4DC] flex items-center justify-center shrink-0 group-hover:bg-[#2A2622] group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-[#2A2622] group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#8A8073]">Phone Call</div>
                    <div className="text-sm font-semibold text-[#1E1B18] tabular-nums">
                      {salonConfig.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/91${salonConfig.whatsapp.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(salonConfig.name)}%2C%20I%20am%20messaging%20from%20your%20website%20to%20inquire%20about%20a%20slot.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 bg-[#FAF8F5] border border-[#E6DFD5] hover:border-[#1C5A3E] transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-[#E8F3ED] flex items-center justify-center shrink-0 group-hover:bg-[#1C5A3E] group-hover:text-white transition-colors">
                    <MessageCircle className="w-4 h-4 text-[#1C5A3E] group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#8A8073]">WhatsApp Chat</div>
                    <div className="text-sm font-semibold text-[#1E1B18] tabular-nums">
                      {salonConfig.whatsapp}
                    </div>
                  </div>
                </a>
              </div>

              {/* Map Preview Graphic & Maps Link */}
              <div className="relative border border-[#E6DFD5] bg-[#FAF8F5] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
                    <Navigation className="w-4 h-4 text-[#C5A059]" />
                    <span>Guwahati Corridor</span>
                  </div>
                  <span className="text-xs text-[#786E63]">GS Road Sector</span>
                </div>
                <div className="h-20 bg-[#EFE9DF] rounded-none flex items-center justify-center text-xs text-[#786E63] border border-dashed border-[#D5CCC0] px-4 text-center">
                  <span>Silk Salon • GS Road, Guwahati • Open Daily 10 AM – 8 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EFE9DF]">
              <a
                href="https://maps.google.com/?q=GS+Road,+Guwahati"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-[#2A2622] bg-[#FAF8F5] border border-[#D5CCC0] hover:bg-[#F4EFEA] hover:border-[#2A2622] transition-colors cursor-pointer text-center"
              >
                <ExternalLink className="w-4 h-4 text-[#C5A059]" />
                <span>Open GS Road in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
