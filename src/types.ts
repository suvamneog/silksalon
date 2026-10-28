export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
  audience: string;
  imageUrl: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  audience: 'Men' | 'Women';
  services: Service[];
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., "10:30 AM"
  totalPrice: number;
  totalDurationMinutes: number;
  notes?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface SalonConfig {
  name: string;
  location: string;
  address: string;
  city: string;
  timingsText: string;
  openHour: number; // 10 (10 AM)
  closeHour: number; // 20 (8 PM)
  phone: string;
  whatsapp: string;
  tagline: string;
}
