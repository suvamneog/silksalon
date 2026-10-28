/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { SalonConfig, Service } from './types';
import { SALON_CONFIG } from './data/salonData';
import { getStoredBookings } from './utils/helpers';
import { ClassExampleBanner } from './components/ClassExampleBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TimingsAndLocation } from './components/TimingsAndLocation';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { OwnerCustomizerModal } from './components/OwnerCustomizerModal';
import { MobileBottomBar } from './components/MobileBottomBar';

export default function App() {
  const [salonConfig, setSalonConfig] = useState<SalonConfig>(() => {
    try {
      const stored = localStorage.getItem('silk_salon_config');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return SALON_CONFIG;
  });

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [myBookingsModalOpen, setMyBookingsModalOpen] = useState(false);
  const [customizerModalOpen, setCustomizerModalOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);
  const [bookingCount, setBookingCount] = useState<number>(0);

  const refreshBookingCount = () => {
    const list = getStoredBookings();
    const active = list.filter((b) => b.status === 'confirmed');
    setBookingCount(active.length);
  };

  useEffect(() => {
    refreshBookingCount();
  }, []);

  const handleSaveConfig = (newConfig: SalonConfig) => {
    setSalonConfig(newConfig);
    try {
      localStorage.setItem('silk_salon_config', JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  const handleSelectService = (service: Service) => {
    setPreSelectedService(service);
    setBookingModalOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setPreSelectedService(null);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1B18]">
      {/* 1. Class Example Notification Banner */}
      <ClassExampleBanner onOpenCustomizer={() => setCustomizerModalOpen(true)} />

      {/* 2. Top Bar (3-Zone Contract) */}
      <Header
        salonConfig={salonConfig}
        bookingCount={bookingCount}
        onOpenBooking={handleOpenGeneralBooking}
        onOpenMyBookings={() => setMyBookingsModalOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          salonConfig={salonConfig}
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* 4. Services & Pricing Menu (Haircut Rs 299, Facial Rs 999, Hair Colour Rs 1,499) */}
        <ServicesSection
          onSelectService={handleSelectService}
          selectedServiceIds={preSelectedService ? [preSelectedService.id] : []}
        />

        {/* 5. Timings & Location (GS Road, Guwahati · Mon-Sun 10 am - 8 pm) */}
        <TimingsAndLocation
          salonConfig={salonConfig}
          onOpenBooking={handleOpenGeneralBooking}
        />
      </main>

      {/* 6. Footer */}
      <Footer
        salonConfig={salonConfig}
        onOpenCustomizer={() => setCustomizerModalOpen(true)}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* 7. Mobile Thumb Navigation Bar */}
      <MobileBottomBar
        salonConfig={salonConfig}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* 8. Slot Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preSelectedService={preSelectedService}
        salonConfig={salonConfig}
        onBookingSuccess={refreshBookingCount}
      />

      {/* 9. My Bookings Modal */}
      <MyBookingsModal
        isOpen={myBookingsModalOpen}
        onClose={() => {
          setMyBookingsModalOpen(false);
          refreshBookingCount();
        }}
        salonConfig={salonConfig}
        onOpenNewBooking={handleOpenGeneralBooking}
      />

      {/* 10. Owner Customizer Tool Modal */}
      <OwnerCustomizerModal
        isOpen={customizerModalOpen}
        onClose={() => setCustomizerModalOpen(false)}
        salonConfig={salonConfig}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}
