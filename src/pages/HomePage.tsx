import React, { useState } from 'react';
import { 
  Search, ShieldCheck, RefreshCw, Car, ArrowRight, 
  CheckCircle2, Star, Phone, MessageSquare, Send, Award, PlusCircle
} from 'lucide-react';
import { Vehicle, PageType, InventoryFilterState } from '../types';
import { INVENTORY } from '../data/inventory';
import { TESTIMONIALS } from '../data/testimonials';
import { VehicleCard } from '../components/VehicleCard';
import { BRAND, createWhatsAppLink } from '../lib/constants';
import { FortunerOfferModal } from '../components/FortunerOfferModal';

interface HomePageProps {
  onNavigate: (page: PageType, vehicleId?: string) => void;
  onApplyFilters: (filters: Partial<InventoryFilterState>) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onApplyFilters }) => {
  // Search module state
  const [searchMake, setSearchMake] = useState('');
  const [searchModel, setSearchModel] = useState('');
  const [searchBodyType, setSearchBodyType] = useState('');
  const [searchPriceRange, setSearchPriceRange] = useState('');
  const [searchTransmission, setSearchTransmission] = useState('');
  const [searchFuel, setSearchFuel] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Fortuner Financing Offer Modal state
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  // Quick inquiry state
  const [quickInquirySent, setQuickInquirySent] = useState(false);
  const [quickCarQuery, setQuickCarQuery] = useState('');
  const [quickPhone, setQuickPhone] = useState('');

  const featuredVehicles = INVENTORY.filter((v) => v.featured).slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters({
      make: searchMake,
      model: searchModel,
      bodyType: searchBodyType,
      priceRange: searchPriceRange,
      transmission: searchTransmission,
      fuelType: searchFuel,
      location: searchLocation,
    });
    onNavigate('inventory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBodyTypeClick = (bodyType: string) => {
    onApplyFilters({ bodyType });
    onNavigate('inventory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCarQuery || !quickPhone) return;
    setQuickInquirySent(true);
  };

  const bodyTypes = [
    {
      name: 'Sedan',
      count: 'Corolla, Civic, Yaris, City',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'SUV',
      count: 'Fortuner, Prado, Land Cruiser',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Hatchback',
      count: 'Alto, Swift, Wagon R, Cultus',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Crossover',
      count: 'Sportage, Tucson, MG HS, Oshan',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Pickup',
      count: 'Hilux Revo, Rocco, D-Max',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: '7-Seater',
      count: 'Fortuner, BR-V, APV, Rush',
      image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative bg-zinc-950 text-white overflow-hidden">
        {/* Full-width premium automotive backdrop */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85"
            alt="BEST CARz Lahore Showroom"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-20 sm:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Main Hero Content - Kept as the primary visual focus */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              {/* Brand credo label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-xs tracking-widest uppercase font-semibold text-zinc-200 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>FIND THE RIGHT CAR. BUY WITH CONFIDENCE.</span>
              </div>

              <div className="space-y-1">
                <span className="text-sm font-semibold tracking-widest uppercase text-red-400 block">
                  {BRAND.name} • {BRAND.tagline}
                </span>
                <span className="font-signature text-2xl sm:text-3xl text-zinc-300 block">
                  {BRAND.subtagline}
                </span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Your Next Car Starts Here.
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl">
                Explore quality cars, compare specifications, check pricing, and connect directly with BEST CARz for buying, selling, or exchanging your vehicle in Lahore and across Pakistan.
              </p>
            </div>

            {/* Right: Premium Offer Card (positioned over vehicle image, without covering headline) */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full max-w-xs sm:max-w-sm bg-white text-zinc-950 rounded-xl shadow-2xl border border-zinc-200 overflow-hidden relative transition-shadow hover:shadow-zinc-950/25">
                {/* Subtle red accent line matching BEST CARz branding */}
                <div className="h-1 bg-red-600"></div>

                {/* Real Toyota Fortuner Vehicle Image */}
                <div className="relative h-32 sm:h-36 w-full bg-zinc-100 overflow-hidden">
                  <img
                    src="/fortuner_offer.jpg"
                    alt="Toyota Fortuner at BEST CARz Lahore"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-zinc-950/85 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                    FINANCING OFFER
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div>
                    <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 leading-tight">
                      TOYOTA FORTUNER
                    </h3>
                    
                    {/* 13.99% is the largest highlighted element after the Toyota Fortuner name */}
                    <div className="mt-1.5 flex items-baseline justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block">
                          Starting From
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-editorial text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
                            13.99%
                          </span>
                          <span className="text-[11px] font-bold text-red-600 uppercase tracking-wide">
                            p.a.
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block">
                          Tenure
                        </span>
                        <span className="text-xs font-bold text-zinc-800">
                          1 – 5 Years
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Supporting Line */}
                  <div className="border-t border-zinc-100 pt-2.5">
                    <p className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                      Flexible Financing Available
                    </p>
                    <p className="text-[11px] text-zinc-500 font-normal leading-tight mt-0.5">
                      Bank Alfalah & Meezan Auto Ijarah partner rate tier.
                    </p>
                  </div>

                  {/* Subtle Button: VIEW OFFER */}
                  <button
                    type="button"
                    onClick={() => setOfferModalOpen(true)}
                    className="w-full py-2.5 px-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-zinc-900 group active:scale-98"
                  >
                    <span>VIEW OFFER</span>
                    <ArrowRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Small Disclaimer */}
                  <p className="text-[9px] sm:text-[10px] text-zinc-400 leading-snug text-center pt-0.5">
                    Terms & conditions apply. Financing subject to approval.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats / Highlights Bar */}
          <div className="mt-12 pt-8 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-zinc-300">
            <div>
              <div className="text-xl sm:text-2xl font-editorial font-bold text-white">100% Verified</div>
              <div className="text-xs text-zinc-400 mt-0.5">Physical Inspection & Biometric</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-editorial font-bold text-white">Transparent</div>
              <div className="text-xs text-zinc-400 mt-0.5">Clear Pricing & Paperwork</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-editorial font-bold text-white">DHA Lahore</div>
              <div className="text-xs text-zinc-400 mt-0.5">St No 2 E Main Blvd</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-editorial font-bold text-white">Direct Connect</div>
              <div className="text-xs text-zinc-400 mt-0.5">Instant WhatsApp Inquiry</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE INVENTORY SEARCH MODULE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-20">
        <div className="bg-white rounded-xl shadow-xl border border-zinc-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-zinc-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-red-600">
                  Live Inventory Search
                </h2>
              </div>
              <h3 className="font-editorial text-2xl font-bold text-zinc-900 mt-0.5">
                Filter Pakistani Market Vehicles
              </h3>
            </div>
            <span className="text-xs text-zinc-500 font-medium">
              Showing verified cars available at our Lahore dealership
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filter 1: Brand / Make */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1.5">
                  Brand / Make
                </label>
                <select
                  value={searchMake}
                  onChange={(e) => setSearchMake(e.target.value)}
                  className="w-full text-sm bg-zinc-50 border border-zinc-200 rounded-md py-2.5 px-3 text-zinc-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                >
                  <option value="">All Brands (Toyota, Honda, Suzuki...)</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Changan">Changan</option>
                  <option value="KIA">KIA</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="MG">MG</option>
                </select>
              </div>

              {/* Filter 2: Model */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1.5">
                  Model
                </label>
                <select
                  value={searchModel}
                  onChange={(e) => setSearchModel(e.target.value)}
                  className="w-full text-sm bg-zinc-50 border border-zinc-200 rounded-md py-2.5 px-3 text-zinc-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                >
                  <option value="">All Models</option>
                  <option value="Corolla">Toyota Corolla / Grande</option>
                  <option value="Civic">Honda Civic (Reborn / Civic X / RS)</option>
                  <option value="City">Honda City</option>
                  <option value="Fortuner">Toyota Fortuner</option>
                  <option value="Aqua">Toyota Aqua Hybrid</option>
                  <option value="Vitz">Toyota Vitz</option>
                  <option value="Cultus">Suzuki Cultus (VXL / AGS)</option>
                  <option value="Alto">Suzuki Alto 660cc</option>
                  <option value="Swift">Suzuki Swift</option>
                  <option value="Wagon R">Suzuki Wagon R</option>
                  <option value="Yaris">Toyota Yaris</option>
                  <option value="Alsvin">Changan Alsvin</option>
                  <option value="Sportage">KIA Sportage</option>
                  <option value="Hilux">Toyota Hilux Revo</option>
                  <option value="Tucson">Hyundai Tucson</option>
                  <option value="HS">MG HS</option>
                </select>
              </div>

              {/* Filter 3: Price Range */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1.5">
                  Price Range
                </label>
                <select
                  value={searchPriceRange}
                  onChange={(e) => setSearchPriceRange(e.target.value)}
                  className="w-full text-sm bg-zinc-50 border border-zinc-200 rounded-md py-2.5 px-3 text-zinc-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                >
                  <option value="">Any Budget</option>
                  <option value="under-30">Under PKR 30 Lakhs</option>
                  <option value="30-50">PKR 30 - 50 Lakhs</option>
                  <option value="50-80">PKR 50 - 80 Lakhs</option>
                  <option value="80-150">PKR 80 Lakhs - 1.50 Crore</option>
                  <option value="above-150">Above PKR 1.50 Crore</option>
                </select>
              </div>

              {/* Filter 4: Body Type */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1.5">
                  Body Type
                </label>
                <select
                  value={searchBodyType}
                  onChange={(e) => setSearchBodyType(e.target.value)}
                  className="w-full text-sm bg-zinc-50 border border-zinc-200 rounded-md py-2.5 px-3 text-zinc-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                >
                  <option value="">All Body Types</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Crossover">Crossover</option>
                  <option value="Pickup">Pickup</option>
                  <option value="7-Seater">7-Seater</option>
                </select>
              </div>
            </div>

            {/* Second row of filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1.5">
                  Transmission
                </label>
                <select
                  value={searchTransmission}
                  onChange={(e) => setSearchTransmission(e.target.value)}
                  className="w-full text-sm bg-zinc-50 border border-zinc-200 rounded-md py-2.5 px-3 text-zinc-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                >
                  <option value="">Any Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="CVT">CVT / e-CVT</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1.5">
                  Fuel Type
                </label>
                <select
                  value={searchFuel}
                  onChange={(e) => setSearchFuel(e.target.value)}
                  className="w-full text-sm bg-zinc-50 border border-zinc-200 rounded-md py-2.5 px-3 text-zinc-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                >
                  <option value="">All Fuel Types</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1.5">
                  Location
                </label>
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full text-sm bg-zinc-50 border border-zinc-200 rounded-md py-2.5 px-3 text-zinc-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                >
                  <option value="">All Lahore Showrooms</option>
                  <option value="DHA Lahore">DHA Lahore</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-6 rounded-md transition-colors text-sm shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>VIEW CARS</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* 3. FEATURED INVENTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Verified Dealership Showcase
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
              Featured Cars
            </h2>
            <p className="text-sm text-zinc-600 max-w-xl mt-2">
              Carefully inspected Pakistani-market vehicles currently available at our DHA Lahore showroom with full biometric and service documentation.
            </p>
          </div>

          <button
            onClick={() => {
              onNavigate('inventory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-red-600 group transition-colors self-start sm:self-auto"
          >
            <span>View Complete Inventory ({INVENTORY.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={(id) => {
                onNavigate('vehicle-detail', id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* 4. WHY BEST CARz TRUST SECTION */}
      <section className="bg-zinc-100 py-16 sm:py-20 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Our Core Philosophy
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
              Why BEST CARz
            </h2>
            <p className="text-sm text-zinc-600 mt-2">
              A transparent, dependable approach to the Pakistani used and certified automobile market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Trust Pillar 1 */}
            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-zinc-900">
                BUY WITH CONFIDENCE
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Carefully presented vehicles and clear information. Every car is cataloged with verified engine health, genuine paint condition, and clear Punjab MTMIS ownership status.
              </p>
            </div>

            {/* Trust Pillar 2 */}
            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-zinc-900">
                SELL WITH EASE
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                A straightforward process for owners looking to sell. Avoid time-wasters and low-ballers with honest market valuations and swift, secure payments.
              </p>
            </div>

            {/* Trust Pillar 3 */}
            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-zinc-900">
                EXCHANGE YOUR CAR
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Upgrade or change your vehicle with an easy exchange inquiry. Bring in your existing car and smoothly settle the difference towards any model on our floor.
              </p>
            </div>

            {/* Trust Pillar 4 */}
            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-zinc-900">
                ANY CAR. ANY MODEL.
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Support across a wide range of Pakistani-market vehicles—from economical city hatchbacks (Alto, Wagon R) to executive sedans and 4x4 off-road SUVs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BROWSE BY BODY TYPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Categorized Selection
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
              Browse by Body Type
            </h2>
            <p className="text-sm text-zinc-600 mt-2">
              Select a category to view matching inventory tailored to your driving style and space requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {bodyTypes.map((item) => (
            <button
              key={item.name}
              onClick={() => handleBodyTypeClick(item.name)}
              className="group bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-xs hover:shadow-md hover:border-red-300 transition-all text-left flex flex-col cursor-pointer"
            >
              <div className="aspect-4/3 overflow-hidden bg-zinc-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <h4 className="font-editorial text-base font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                  {item.name}
                </h4>
                <p className="text-[11px] text-zinc-500 line-clamp-1">
                  {item.count}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 6. HOW IT WORKS (FOUR-STEP PROCESS) */}
      <section className="bg-white py-16 sm:py-20 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Simple & Transparent
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
              How It Works
            </h2>
            <p className="text-sm text-zinc-600 mt-2">
              Our straightforward four-step roadmap to finding, inspecting, and driving home your next vehicle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 01 */}
            <div className="relative bg-zinc-50 p-6 rounded-lg border border-zinc-200/80 space-y-3">
              <span className="font-editorial text-3xl font-bold text-red-600 block">
                01
              </span>
              <h3 className="text-lg font-bold text-zinc-900">Browse</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Explore available vehicles online with high-resolution photography, accurate engine specs, and upfront pricing.
              </p>
            </div>

            {/* Step 02 */}
            <div className="relative bg-zinc-50 p-6 rounded-lg border border-zinc-200/80 space-y-3">
              <span className="font-editorial text-3xl font-bold text-red-600 block">
                02
              </span>
              <h3 className="text-lg font-bold text-zinc-900">Compare</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Review specifications, verified mileage, pricing, fuel economy, and condition ratings to make an informed choice.
              </p>
            </div>

            {/* Step 03 */}
            <div className="relative bg-zinc-50 p-6 rounded-lg border border-zinc-200/80 space-y-3">
              <span className="font-editorial text-3xl font-bold text-red-600 block">
                03
              </span>
              <h3 className="text-lg font-bold text-zinc-900">Inquire</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Contact BEST CARz directly via WhatsApp or phone. Visit our DHA Lahore showroom for a comprehensive physical inspection.
              </p>
            </div>

            {/* Step 04 */}
            <div className="relative bg-zinc-50 p-6 rounded-lg border border-zinc-200/80 space-y-3">
              <span className="font-editorial text-3xl font-bold text-red-600 block">
                04
              </span>
              <h3 className="text-lg font-bold text-zinc-900">Drive Away</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Complete on-spot biometric verification, finalize transparent payment terms, and drive home with total peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOMEPAGE PLACEMENT: HAVE A CAR TO SELL? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-2xl p-8 sm:p-12 lg:p-14 border border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-red-400 bg-white/10 px-3 py-1 rounded-full inline-block">
                Pakistan Car Marketplace
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                HAVE A CAR TO SELL?
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                Turn your car into a listing on BEST CARz. Reach potential buyers looking for vehicles in Pakistan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => {
                  onNavigate('sell-your-car');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>LIST YOUR CAR</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="bg-zinc-100 py-16 sm:py-20 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Dealership Reputation
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
              Customer Feedback
            </h2>
            <p className="text-sm text-zinc-600 mt-2">
              Reflecting actual vehicle transactions and honest customer interactions at our Lahore dealership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-700 leading-relaxed italic">
                    "{t.review}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-3">
                  {/* Profile image placeholder */}
                  <div className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {t.customerName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-zinc-900 truncate">
                      {t.customerName}
                    </h4>
                    <p className="text-[11px] text-red-600 truncate font-medium">
                      {t.vehiclePurchased}
                    </p>
                    <p className="text-[10px] text-zinc-400">
                      {t.city} • {t.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL HOMEPAGE CONTACT STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-zinc-950 text-white rounded-xl p-8 sm:p-12 relative overflow-hidden border border-zinc-800">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                Personalized Vehicle Sourcing
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-white">
                Looking for a specific car?
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Tell BEST CARz what you're looking for and our team can help you find it. We source verified vehicles across Lahore and Punjab matching your exact budget and specifications.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
              <a
                href={createWhatsAppLink("Hello BEST CARz, I'm looking for a specific car and need your help finding it.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-3 px-5 rounded-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold py-3 px-5 rounded-md border border-zinc-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-400" />
                <span>Call Dealership</span>
              </a>

              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-3 px-5 rounded-md transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Toyota Fortuner 13.99% Partner Financing Offer Modal */}
      <FortunerOfferModal
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
