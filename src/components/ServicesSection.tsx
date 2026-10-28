import { ArrowRight, Clock, Users, Check } from 'lucide-react';
import { Service } from '../types';
import { SALON_SERVICES } from '../data/salonData';
import { formatPrice, formatDuration } from '../utils/helpers';

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
  selectedServiceIds?: string[];
}

export function ServicesSection({ onSelectService, selectedServiceIds = [] }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-widest text-[#786E63] font-semibold">
            Services & Pricing Menu
          </div>
          <h2 className="text-3xl sm:text-4xl font-display text-[#1E1B18] font-normal tracking-tight text-balance">
            Crafted for Men & Women
          </h2>
          <p className="text-sm sm:text-base text-[#665D52] leading-relaxed">
            Transparent pricing with dedicated time reservations. Every appointment is carried out with focused attention to detail on GS Road.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SALON_SERVICES.map((service) => {
            const isSelected = selectedServiceIds.includes(service.id);

            return (
              <article
                key={service.id}
                className={`flex flex-col bg-[#FFFFFF] border transition-all duration-200 overflow-hidden group ${
                  isSelected
                    ? 'border-[#2A2622] ring-1 ring-[#2A2622] shadow-md'
                    : 'border-[#E6DFD5] hover:border-[#C5A059] hover:shadow-md'
                }`}
              >
                {/* Visual Asset Slot */}
                <div className="relative aspect-[4/3] bg-[#EAE4DC] overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={`${service.name} at Silk Salon Guwahati`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Subtle top price overlay */}
                  <div className="absolute top-3 right-3 bg-[#1E1B18]/90 text-[#FAF8F5] text-xs font-semibold px-2.5 py-1 backdrop-blur-sm tabular-nums">
                    {formatPrice(service.price)}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-[#786E63]">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-[#C5A059]" />
                        <span className="tabular-nums">{formatDuration(service.durationMinutes)}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#786E63]" />
                        <span>{service.audience}</span>
                      </span>
                    </div>

                    {/* Service Name */}
                    <h3 className="text-xl sm:text-2xl font-display font-medium text-[#1E1B18] tracking-tight">
                      {service.name}
                    </h3>

                    {/* Service Description */}
                    <p className="text-sm text-[#665D52] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Price & Booking Trigger Button */}
                  <div className="pt-4 border-t border-[#F0EBE3] flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#8A8073]">Price</div>
                      <div className="text-xl font-semibold text-[#1E1B18] tabular-nums">
                        {formatPrice(service.price)}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectService(service)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#C5A059] text-[#1E1B18] hover:bg-[#B59048]'
                          : 'bg-[#2A2622] text-[#FAF8F5] hover:bg-[#1E1B18]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <span>Book Slot</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Clear Notice about Services */}
        <div className="mt-12 text-center text-xs text-[#786E63]">
          <span>Need multiple services? You can combine Haircut, Facial, and Hair Colour in a single appointment when booking a slot.</span>
        </div>
      </div>
    </section>
  );
}
