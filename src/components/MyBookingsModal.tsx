import { useState, useEffect, useId } from 'react';
import { X, Calendar, Clock, MapPin, Trash2, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Booking, SalonConfig } from '../types';
import {
  getStoredBookings,
  cancelBookingInStorage,
  deleteBookingFromStorage,
  formatPrice,
  formatDuration,
  generateWhatsAppBookingUrl,
} from '../utils/helpers';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  salonConfig: SalonConfig;
  onOpenNewBooking: () => void;
}

export function MyBookingsModal({
  isOpen,
  onClose,
  salonConfig,
  onOpenNewBooking,
}: MyBookingsModalProps) {
  const modalTitleId = useId();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (isOpen) {
      setBookings(getStoredBookings());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCancel = (bookingId: string) => {
    cancelBookingInStorage(bookingId);
    setBookings(getStoredBookings());
  };

  const handleDelete = (bookingId: string) => {
    deleteBookingFromStorage(bookingId);
    setBookings(getStoredBookings());
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative bg-[#FAF8F5] border border-[#DDD5C7] w-full max-w-2xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#2A2622] text-[#FAF8F5] px-6 py-4 flex items-center justify-between border-b border-[#3D3731]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <h2 id={modalTitleId} className="text-lg font-display tracking-tight text-[#FAF8F5]">
              My Booked Slots
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#A89F91] hover:text-[#FAF8F5] transition-colors p-1 cursor-pointer"
            aria-label="Close my bookings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Calendar className="w-12 h-12 text-[#C5A059] mx-auto opacity-70" />
              <div className="space-y-1">
                <h3 className="text-lg font-display font-medium text-[#1E1B18]">
                  No Appointments Booked Yet
                </h3>
                <p className="text-sm text-[#786E63] max-w-sm mx-auto">
                  Reserve a haircut, facial, or hair colour with Silk Salon on GS Road.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewBooking();
                }}
                className="py-2.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#2A2622] hover:bg-[#1E1B18] transition-colors cursor-pointer"
              >
                Book a Slot Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className={`bg-white border p-5 transition-all ${
                    b.status === 'cancelled'
                      ? 'border-[#E6DFD5] opacity-65 bg-[#FAF8F5]'
                      : 'border-[#DDD5C7] shadow-sm hover:border-[#C5A059]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0EBE3]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#1E1B18] tracking-wider uppercase">
                        {b.id}
                      </span>
                      <span aria-hidden="true" className="text-xs text-[#8A8073]">·</span>
                      <span className="text-xs text-[#786E63]">For {b.audience}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {b.status === 'confirmed' ? (
                        <span className="text-xs font-medium text-[#1C5A3E] bg-[#E8F3ED] px-2.5 py-0.5 rounded-full">
                          Confirmed
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-[#9B1C1C] bg-[#FDF2F2] px-2.5 py-0.5 rounded-full">
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Booking details */}
                  <div className="py-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-[#2A2622]">
                      <Calendar className="w-4 h-4 text-[#C5A059]" />
                      <span className="font-semibold tabular-nums">{b.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#2A2622]">
                      <Clock className="w-4 h-4 text-[#C5A059]" />
                      <span className="font-semibold tabular-nums">{b.timeSlot} ({formatDuration(b.totalDurationMinutes)})</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#665D52]">
                      <MapPin className="w-4 h-4 text-[#786E63]" />
                      <span>GS Road, Guwahati</span>
                    </div>
                    <div className="text-[#665D52]">
                      Name: <strong className="text-[#1E1B18]">{b.customerName}</strong> ({b.customerPhone})
                    </div>
                  </div>

                  {/* Services list */}
                  <div className="py-2.5 border-t border-[#F0EBE3] space-y-1">
                    <div className="text-[11px] uppercase tracking-wider text-[#786E63]">
                      Services:
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {b.services.map((s) => (
                        <span
                          key={s.id}
                          className="bg-[#F4EFEA] text-[#2A2622] px-2.5 py-1 border border-[#E6DFD5]"
                        >
                          {s.name} · {formatPrice(s.price)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {b.notes && (
                    <div className="text-xs text-[#786E63] italic pt-1">
                      Notes: {b.notes}
                    </div>
                  )}

                  {/* Footer actions */}
                  <div className="pt-3 border-t border-[#F0EBE3] flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-[#1E1B18] tabular-nums">
                      Total: {formatPrice(b.totalPrice)}
                    </div>

                    <div className="flex items-center gap-2">
                      {b.status === 'confirmed' ? (
                        <>
                          <a
                            href={generateWhatsAppBookingUrl(salonConfig.whatsapp, b)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1C5A3E] bg-[#E8F3ED] hover:bg-[#DCEDE3] border border-[#C2E0CE] transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            onClick={() => handleCancel(b.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#8A3B3B] hover:text-[#5A2020] transition-colors cursor-pointer"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Cancel Slot</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#786E63] hover:text-[#9B1C1C] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Record</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-3 text-center">
                <button
                  onClick={() => {
                    onClose();
                    onOpenNewBooking();
                  }}
                  className="py-2.5 px-5 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#2A2622] hover:bg-[#1E1B18] transition-colors cursor-pointer"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
