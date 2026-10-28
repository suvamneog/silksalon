import { useState } from 'react';
import { Menu, X, CalendarCheck } from 'lucide-react';
import { SalonConfig } from '../types';

interface HeaderProps {
  salonConfig: SalonConfig;
  bookingCount: number;
  onOpenBooking: () => void;
  onOpenMyBookings: () => void;
}

export function Header({
  salonConfig,
  bookingCount,
  onOpenBooking,
  onOpenMyBookings,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6DFD5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-2xl sm:text-3xl font-display tracking-tight text-[#1E1B18] hover:text-[#C5A059] transition-colors whitespace-nowrap shrink-0"
        >
          {salonConfig.name}
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A443C]">
          <a
            href="#services"
            className="hover:text-[#1E1B18] transition-colors whitespace-nowrap shrink-0"
          >
            Services & Prices
          </a>
          <a
            href="#timings"
            className="hover:text-[#1E1B18] transition-colors whitespace-nowrap shrink-0"
          >
            Timings & Hours
          </a>
          <a
            href="#location"
            className="hover:text-[#1E1B18] transition-colors whitespace-nowrap shrink-0"
          >
            Location & Contact
          </a>
          <button
            onClick={onOpenMyBookings}
            className="inline-flex items-center gap-1.5 hover:text-[#1E1B18] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-[#C5A059]" />
            <span>My Bookings</span>
            {bookingCount > 0 && (
              <span className="text-xs bg-[#2A2622] text-[#FAF8F5] rounded-full px-1.5 py-0.2 min-w-4 text-center tabular-nums">
                {bookingCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#2A2622] hover:bg-[#1E1B18] active:scale-[0.99] rounded-none transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            Book a Slot
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2A2622] hover:bg-[#F4EFEA] rounded transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E6DFD5] bg-[#FAF8F5] px-6 py-5 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#4A443C]">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1E1B18]"
            >
              Services & Prices
            </a>
            <a
              href="#timings"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1E1B18]"
            >
              Timings & Hours
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1E1B18]"
            >
              Location & Contact
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="flex items-center justify-between py-1 text-left hover:text-[#1E1B18] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-[#C5A059]" />
                <span>My Bookings</span>
              </span>
              {bookingCount > 0 && (
                <span className="text-xs bg-[#2A2622] text-[#FAF8F5] rounded-full px-2 py-0.5 tabular-nums">
                  {bookingCount} active
                </span>
              )}
            </button>
          </nav>
          <div className="pt-3 border-t border-[#E6DFD5]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#2A2622] hover:bg-[#1E1B18] rounded-none transition-all cursor-pointer text-center"
            >
              Book a Slot Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
