import { Phone, MessageCircle, CalendarPlus } from 'lucide-react';
import { SalonConfig } from '../types';

interface MobileBottomBarProps {
  salonConfig: SalonConfig;
  onOpenBooking: () => void;
}

export function MobileBottomBar({ salonConfig, onOpenBooking }: MobileBottomBarProps) {
  return (
    <aside
      aria-label="Quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/98 border-t border-[#D5CCC0] px-4 py-2.5 backdrop-blur-md shadow-lg"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        <a
          href={`tel:+91${salonConfig.phone.replace(/\D/g, '')}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-[#FFFFFF] border border-[#E6DFD5] text-[#2A2622] hover:bg-[#F4EFEA] transition-colors rounded-none"
        >
          <Phone className="w-4 h-4 text-[#C5A059] mb-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Call</span>
        </a>

        <a
          href={`https://wa.me/91${salonConfig.whatsapp.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(salonConfig.name)}%2C%20I%20am%20inquiring%20about%20a%20slot.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-[#E8F3ED] border border-[#C2E0CE] text-[#1C5A3E] hover:bg-[#DCEDE3] transition-colors rounded-none"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-[#2A2622] text-[#FAF8F5] hover:bg-[#1E1B18] transition-colors rounded-none cursor-pointer"
        >
          <CalendarPlus className="w-4 h-4 text-[#C5A059] mb-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Book Slot</span>
        </button>
      </div>
    </aside>
  );
}
