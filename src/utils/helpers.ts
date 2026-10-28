import { Booking, Service } from '../types';

export function formatPrice(amount: number): string {
  return `Rs ${amount.toLocaleString('en-IN')}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} mins`;
  const hrs = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return `${hrs} hr${hrs > 1 ? 's' : ''}`;
  return `${hrs} hr ${remaining} mins`;
}

export function isSalonOpenNow(): { isOpen: boolean; message: string } {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeDec = currentHour + currentMinute / 60;

  // Open Mon - Sun 10:00 AM to 8:00 PM (20:00)
  if (currentTimeDec >= 10 && currentTimeDec < 20) {
    const hoursLeft = Math.floor(20 - currentTimeDec);
    const minsLeft = Math.floor(((20 - currentTimeDec) % 1) * 60);
    return {
      isOpen: true,
      message: `Open now until 8:00 PM (${hoursLeft > 0 ? `${hoursLeft}h ` : ''}${minsLeft}m left today)`,
    };
  }

  if (currentTimeDec < 10) {
    return {
      isOpen: false,
      message: 'Opens today at 10:00 AM',
    };
  }

  return {
    isOpen: false,
    message: 'Closed for today · Opens tomorrow at 10:00 AM',
  };
}

export function generateUpcomingDates(daysCount = 14): { dateStr: string; label: string; dayName: string; isToday: boolean }[] {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    dates.push({
      dateStr,
      label,
      dayName,
      isToday: i === 0,
    });
  }

  return dates;
}

export function generateTimeSlots(selectedDateStr: string, totalDurationMinutes: number): { time: string; isPast: boolean }[] {
  const slots: { time: string; isPast: boolean }[] = [];
  const now = new Date();
  const isSelectedToday = selectedDateStr === `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Operating from 10:00 AM to 8:00 PM (20:00)
  // Last booking must finish at or before 8:00 PM (20:00 = 1200 mins from midnight)
  const salonCloseMinute = 20 * 60; // 1200

  for (let hour = 10; hour < 20; hour++) {
    for (const minute of [0, 30]) {
      const slotStartMinutes = hour * 60 + minute;
      const slotEndMinutes = slotStartMinutes + totalDurationMinutes;

      // Slot must conclude by 8:00 PM
      if (slotEndMinutes > salonCloseMinute) {
        continue;
      }

      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour;
      const displayMinute = String(minute).padStart(2, '0');
      const timeString = `${displayHour}:${displayMinute} ${period}`;

      let isPast = false;
      if (isSelectedToday) {
        if (hour < currentHour || (hour === currentHour && minute <= currentMinute + 15)) {
          isPast = true;
        }
      }

      slots.push({
        time: timeString,
        isPast,
      });
    }
  }

  return slots;
}

export function generateWhatsAppBookingUrl(phone: string, booking: {
  customerName: string;
  customerPhone: string;
  audience: string;
  services: Service[];
  date: string;
  timeSlot: string;
  totalPrice: number;
  totalDurationMinutes: number;
  notes?: string;
}): string {
  // Clean phone number (strip spaces, ensure country code)
  const cleanPhone = phone.replace(/\D/g, '');
  const targetPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const serviceNames = booking.services.map((s) => `${s.name} (${formatPrice(s.price)}, ${s.durationMinutes}m)`).join(', ');

  const text = `Hello Silk Salon! I would like to book an appointment:
• Service(s): ${serviceNames}
• Preferred For: ${booking.audience}
• Date: ${booking.date}
• Time: ${booking.timeSlot}
• Total: ${formatPrice(booking.totalPrice)} (${formatDuration(booking.totalDurationMinutes)})
• Customer Name: ${booking.customerName}
• Phone: ${booking.customerPhone}${booking.notes ? `\n• Notes: ${booking.notes}` : ''}

Please confirm this slot. Thank you!`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}

const STORAGE_KEY = 'silk_salon_appointments';

export function getStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveBookingToStorage(booking: Booking): void {
  const existing = getStoredBookings();
  const updated = [booking, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function cancelBookingInStorage(bookingId: string): void {
  const existing = getStoredBookings();
  const updated = existing.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteBookingFromStorage(bookingId: string): void {
  const existing = getStoredBookings();
  const updated = existing.filter((b) => b.id !== bookingId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
