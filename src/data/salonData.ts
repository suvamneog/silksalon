import { Service, SalonConfig } from '../types';

export const SALON_CONFIG: SalonConfig = {
  name: 'Silk Salon',
  location: 'GS Road, Guwahati',
  address: 'GS Road, Guwahati, Assam',
  city: 'Guwahati',
  timingsText: 'Monday to Sunday, 10:00 AM – 8:00 PM',
  openHour: 10, // 10 am
  closeHour: 20, // 8 pm
  phone: '98765 43210',
  whatsapp: '98765 43210',
  tagline: 'Haircuts, facials, and hair colour for men and women on GS Road, Guwahati.',
};

export const SALON_SERVICES: Service[] = [
  {
    id: 'haircut',
    name: 'Haircut',
    price: 299,
    durationMinutes: 30,
    description: 'Precision haircut and styling tailored for men and women. Includes styling and finish.',
    audience: 'Men & Women',
    imageUrl: '/src/assets/images/service_haircut_1793139911166.jpg',
  },
  {
    id: 'facial',
    name: 'Facial',
    price: 999,
    durationMinutes: 60,
    description: 'Deep pore cleansing, gentle exfoliation, and soothing botanical hydration for healthy, radiant skin.',
    audience: 'Men & Women',
    imageUrl: '/src/assets/images/service_facial_1793139911573.jpg',
  },
  {
    id: 'hair-colour',
    name: 'Hair Colour',
    price: 1499,
    durationMinutes: 90,
    description: 'Professional hair colouring with personalized shade consultation, precision application, and gloss treatment.',
    audience: 'Men & Women',
    imageUrl: '/src/assets/images/service_hair_colour_1793139912195.jpg',
  },
];

export const SALON_HERO_IMAGE = '/src/assets/images/hero_salon_interior_1793139911851.jpg';
