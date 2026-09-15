import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType, InventoryFilterState } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { BuyPage } from './pages/BuyPage';
import { SellExchangePage } from './pages/SellExchangePage';
import { SellYourCarPage } from './pages/SellYourCarPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const initialFilters: InventoryFilterState = {
  make: '',
  model: '',
  priceRange: '',
  bodyType: '',
  transmission: '',
  fuelType: '',
  engine: '',
  yearMin: '',
  yearMax: '',
  mileageMax: '',
  location: '',
  condition: '',
  inventoryType: '',
  searchQuery: '',
  sortBy: 'newest',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('toyota-corolla-grande-2022');
  const [filters, setFilters] = useState<InventoryFilterState>(initialFilters);

  const handleNavigate = (page: PageType, vehicleId?: string) => {
    if (vehicleId) {
      setSelectedVehicleId(vehicleId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyFilters = (newFilters: Partial<InventoryFilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleUpdateFilters = (newFilters: Partial<InventoryFilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-red-600 selection:text-white font-sans antialiased">
      {/* Sticky Top Header */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content with subtle fade-in transition */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (currentPage === 'vehicle-detail' ? `-${selectedVehicleId}` : '')}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onApplyFilters={handleApplyFilters}
              />
            )}

            {currentPage === 'inventory' && (
              <InventoryPage
                onNavigate={handleNavigate}
                filters={filters}
                onUpdateFilters={handleUpdateFilters}
                onResetFilters={handleResetFilters}
              />
            )}

            {currentPage === 'vehicle-detail' && (
              <VehicleDetailPage
                vehicleId={selectedVehicleId}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'buy' && (
              <BuyPage
                onNavigate={handleNavigate}
                onApplyFilters={handleApplyFilters}
              />
            )}

            {currentPage === 'sell-your-car' && (
              <SellYourCarPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'sell-exchange' && (
              <SellExchangePage onNavigate={handleNavigate} />
            )}

            {currentPage === 'services' && (
              <ServicesPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'about' && (
              <AboutPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Floating WhatsApp Quick-Chat */}
      <WhatsAppButton />

      {/* Full-width Comprehensive Dealership Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
