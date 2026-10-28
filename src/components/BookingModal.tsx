import { useState, useId } from 'react';
import { X, Check, Clock, Calendar, Phone, User, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Service, Booking, SalonConfig } from '../types';
import { SALON_SERVICES } from '../data/salonData';
import {
  formatPrice,
  formatDuration,
  generateUpcomingDates,
  generateTimeSlots,
  generateWhatsAppBookingUrl,
  saveBookingToStorage,
} from '../utils/helpers';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: Service | null;
  salonConfig: SalonConfig;
  onBookingSuccess?: () => void;
}

export function BookingModal({
  isOpen,
  onClose,
  preSelectedService,
  salonConfig,
  onBookingSuccess,
}: BookingModalProps) {
  const modalTitleId = useId();
  // State for booking workflow
  const upcomingDates = generateUpcomingDates(14);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(() =>
    preSelectedService ? [preSelectedService.id] : ['haircut']
  );
  const [audience, setAudience] = useState<'Men' | 'Women'>('Men');
  const [selectedDate, setSelectedDate] = useState<string>(upcomingDates[0].dateStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  // Selected services list
  const selectedServices = SALON_SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  // Available slots for selected date & duration
  const availableSlots = generateTimeSlots(selectedDate, totalDuration || 30);

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(serviceId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((id) => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (selectedServices.length === 0) {
      setFormError('Please select at least one service.');
      return;
    }

    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number (e.g., 98765 43210).');
      return;
    }

    if (!selectedTimeSlot) {
      setFormError('Please pick an available time slot.');
      return;
    }

    const newBooking: Booking = {
      id: `SILK-${Date.now().toString(36).toUpperCase()}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      audience,
      services: selectedServices,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      totalPrice,
      totalDurationMinutes: totalDuration,
      notes: notes.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    saveBookingToStorage(newBooking);
    setConfirmedBooking(newBooking);
    if (onBookingSuccess) onBookingSuccess();
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
    setFormError(null);
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
              {confirmedBooking ? 'Booking Confirmed' : 'Book an Appointment at Silk Salon'}
            </h2>
          </div>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-[#A89F91] hover:text-[#FAF8F5] transition-colors p-1 cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {confirmedBooking ? (
            /* Confirmation Screen */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-[#E8F3ED] text-[#1C5A3E] rounded-full mx-auto flex items-center justify-center border border-[#C2E0CE]">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#786E63] font-semibold">
                  Reservation Reference #{confirmedBooking.id}
                </span>
                <h3 className="text-2xl font-display text-[#1E1B18]">
                  Slot Reserved for {confirmedBooking.customerName}
                </h3>
                <p className="text-sm text-[#665D52]">
                  We look forward to seeing you at Silk Salon on GS Road, Guwahati.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#FFFFFF] border border-[#E6DFD5] p-5 text-left space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#F0EBE3]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#786E63]">
                    Date & Time
                  </span>
                  <span className="text-sm font-semibold text-[#1E1B18] tabular-nums">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#786E63]">
                    Selected Services ({confirmedBooking.audience})
                  </div>
                  {confirmedBooking.services.map((s) => (
                    <div key={s.id} className="flex justify-between text-sm">
                      <span className="text-[#3D3731]">{s.name} ({formatDuration(s.durationMinutes)})</span>
                      <span className="font-medium text-[#1E1B18] tabular-nums">{formatPrice(s.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#F0EBE3] flex justify-between items-center">
                  <div>
                    <div className="text-xs text-[#786E63]">Total Estimated Duration</div>
                    <div className="text-sm font-medium text-[#1E1B18] tabular-nums">
                      {formatDuration(confirmedBooking.totalDurationMinutes)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#786E63]">Total Payable at Salon</div>
                    <div className="text-lg font-bold text-[#1E1B18] tabular-nums">
                      {formatPrice(confirmedBooking.totalPrice)}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#786E63] pt-1">
                  Location: GS Road, Guwahati · Contact: {salonConfig.phone}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={generateWhatsAppBookingUrl(salonConfig.whatsapp, confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C5A3E] hover:bg-[#164831] transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation on WhatsApp ({salonConfig.whatsapp})</span>
                </a>

                <div className="flex gap-3">
                  <a
                    href={`tel:+91${salonConfig.phone.replace(/\D/g, '')}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-[#2A2622] bg-[#FAF8F5] border border-[#D5CCC0] hover:bg-[#F4EFEA] transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Call Salon</span>
                  </a>

                  <button
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#2A2622] hover:bg-[#1E1B18] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBook} className="space-y-6">
              {/* Step 1: Select Service(s) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
                    1. Select Service(s)
                  </label>
                  <span className="text-xs text-[#786E63]">
                    {selectedServices.length} selected · Total: <strong className="text-[#1E1B18] tabular-nums">{formatPrice(totalPrice)}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SALON_SERVICES.map((service) => {
                    const isSelected = selectedServiceIds.includes(service.id);
                    return (
                      <button
                        type="button"
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#FFFFFF] border-[#2A2622] ring-1 ring-[#2A2622] shadow-sm'
                            : 'bg-[#FAF8F5] border-[#E6DFD5] hover:border-[#C5A059]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 mb-2">
                          <span className="text-sm font-semibold text-[#1E1B18]">
                            {service.name}
                          </span>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isSelected ? 'bg-[#2A2622] text-white' : 'border border-[#C5BFB5]'}`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </span>
                        </div>
                        <div className="text-xs text-[#786E63] space-y-0.5">
                          <div className="font-semibold text-[#1E1B18] tabular-nums">
                            {formatPrice(service.price)}
                          </div>
                          <div>{formatDuration(service.durationMinutes)}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Audience Preference */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
                  2. Preferred Styling For
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Men', 'Women'] as const).map((aud) => (
                    <button
                      type="button"
                      key={aud}
                      onClick={() => setAudience(aud)}
                      className={`py-2.5 px-4 text-xs font-semibold uppercase tracking-wider border text-center transition-all cursor-pointer ${
                        audience === aud
                          ? 'bg-[#2A2622] text-[#FAF8F5] border-[#2A2622]'
                          : 'bg-[#FFFFFF] text-[#4A443C] border-[#E6DFD5] hover:border-[#C5A059]'
                      }`}
                    >
                      For {aud}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Date Picker (Next 14 Days) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>3. Choose Date</span>
                  </label>
                  <span className="text-xs text-[#786E63]">Open Mon–Sun 10 am–8 pm</span>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                  {upcomingDates.map((item) => {
                    const isSelected = selectedDate === item.dateStr;
                    return (
                      <button
                        type="button"
                        key={item.dateStr}
                        onClick={() => setSelectedDate(item.dateStr)}
                        className={`flex flex-col items-center justify-center py-2 px-3 min-w-[70px] border transition-all cursor-pointer shrink-0 ${
                          isSelected
                            ? 'bg-[#2A2622] text-[#FAF8F5] border-[#2A2622]'
                            : 'bg-[#FFFFFF] text-[#4A443C] border-[#E6DFD5] hover:border-[#C5A059]'
                        }`}
                      >
                        <span className="text-[11px] uppercase tracking-wider">
                          {item.dayName}
                        </span>
                        <span className="text-sm font-semibold mt-0.5 tabular-nums">
                          {item.label.split(' ')[1]}
                        </span>
                        <span className="text-[10px] text-[#A89F91]">
                          {item.isToday ? 'Today' : item.label.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Available Time Slots */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>4. Choose Slot (10 AM to 8 PM)</span>
                  </label>
                  <span className="text-xs text-[#786E63] tabular-nums">
                    Est. {formatDuration(totalDuration)}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-44 overflow-y-auto pr-1">
                  {availableSlots.length === 0 ? (
                    <div className="col-span-full py-4 text-center text-xs text-[#8A8073]">
                      No more available slots for this date. Please choose another date.
                    </div>
                  ) : (
                    availableSlots.map(({ time, isPast }) => {
                      const isSelected = selectedTimeSlot === time;
                      return (
                        <button
                          type="button"
                          key={time}
                          disabled={isPast}
                          onClick={() => setSelectedTimeSlot(time)}
                          className={`py-2 px-2 text-xs font-medium border text-center transition-all cursor-pointer tabular-nums ${
                            isPast
                              ? 'bg-[#F4EFEA] text-[#B0A79C] border-[#E6DFD5] cursor-not-allowed opacity-50 line-through'
                              : isSelected
                              ? 'bg-[#C5A059] text-[#1E1B18] font-semibold border-[#C5A059]'
                              : 'bg-[#FFFFFF] text-[#2A2622] border-[#E6DFD5] hover:border-[#C5A059]'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Step 5: Contact Info */}
              <div className="space-y-3 pt-2 border-t border-[#E6DFD5]">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
                  5. Customer Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#786E63] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#A89F91] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. John Baruah"
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#D5CCC0] focus:border-[#2A2622] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#786E63] mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#A89F91] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#D5CCC0] focus:border-[#2A2622] focus:outline-none transition-colors tabular-nums"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#786E63] mb-1">
                    Special Notes or Preferred Hair/Skin Needs (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. sensitive scalp, light brown hair tone preference"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D5CCC0] focus:border-[#2A2622] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Error Display */}
              {formError && (
                <div className="p-3 bg-[#FDF2F2] border border-[#F8B4B4] text-[#9B1C1C] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Summary & Submit */}
              <div className="pt-4 border-t border-[#E6DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left w-full sm:w-auto">
                  <div className="text-[11px] uppercase tracking-wider text-[#786E63]">
                    Estimated Total
                  </div>
                  <div className="text-xl font-bold text-[#1E1B18] tabular-nums">
                    {formatPrice(totalPrice)}
                    <span className="text-xs font-normal text-[#786E63] ml-2">
                      ({formatDuration(totalDuration)})
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                    className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#4A443C] bg-[#FAF8F5] border border-[#D5CCC0] hover:bg-[#F4EFEA] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#2A2622] hover:bg-[#1E1B18] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
