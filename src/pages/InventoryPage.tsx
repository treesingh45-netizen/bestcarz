import React, { useState, useMemo } from 'react';
import { 
  Filter, SlidersHorizontal, Search, RotateCcw, X, 
  ChevronDown, ArrowUpDown, ShieldCheck, Check
} from 'lucide-react';
import { Vehicle, PageType, InventoryFilterState } from '../types';
import { getAllInventory } from '../data/inventory';
import { VehicleCard } from '../components/VehicleCard';

interface InventoryPageProps {
  onNavigate: (page: PageType, vehicleId?: string) => void;
  filters: InventoryFilterState;
  onUpdateFilters: (filters: Partial<InventoryFilterState>) => void;
  onResetFilters: () => void;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({
  onNavigate,
  filters,
  onUpdateFilters,
  onResetFilters,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const allCars = useMemo(() => getAllInventory(), []);

  // Filter and sort the vehicles
  const filteredVehicles = useMemo(() => {
    return allCars.filter((vehicle) => {
      // Search query (make, model, variant, color)
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesQuery = 
          vehicle.make.toLowerCase().includes(q) ||
          vehicle.model.toLowerCase().includes(q) ||
          vehicle.variant.toLowerCase().includes(q) ||
          vehicle.color.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Make
      if (filters.make && vehicle.make !== filters.make) return false;

      // Model
      if (filters.model && !vehicle.model.toLowerCase().includes(filters.model.toLowerCase())) {
        return false;
      }

      // Body Type
      if (filters.bodyType && vehicle.bodyType !== filters.bodyType) return false;

      // Transmission
      if (filters.transmission && vehicle.transmission !== filters.transmission) return false;

      // Fuel Type
      if (filters.fuelType && vehicle.fuelType !== filters.fuelType) return false;

      // Condition
      if (filters.condition && !vehicle.condition.toLowerCase().includes(filters.condition.toLowerCase())) {
        return false;
      }

      // Price Range
      if (filters.priceRange) {
        const price = vehicle.price;
        if (filters.priceRange === 'under-30' && price >= 3000000) return false;
        if (filters.priceRange === '30-50' && (price < 3000000 || price > 5000000)) return false;
        if (filters.priceRange === '50-80' && (price < 5000000 || price > 8000000)) return false;
        if (filters.priceRange === '80-150' && (price < 8000000 || price > 15000000)) return false;
        if (filters.priceRange === 'above-150' && price <= 15000000) return false;
      }

      // Year Min / Max
      if (filters.yearMin && vehicle.year < parseInt(filters.yearMin, 10)) return false;
      if (filters.yearMax && vehicle.year > parseInt(filters.yearMax, 10)) return false;

      // Mileage Max
      if (filters.mileageMax && vehicle.mileage > parseInt(filters.mileageMax, 10)) return false;

      // Engine
      if (filters.engine && !vehicle.engine.toLowerCase().includes(filters.engine.toLowerCase())) {
        return false;
      }

      // Inventory Classification (Showroom vs Sample Catalog)
      if (filters.inventoryType && vehicle.inventoryType !== filters.inventoryType) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'mileage-asc') return a.mileage - b.mileage;
      // Default: newest year first, then lowest mileage
      if (b.year !== a.year) return b.year - a.year;
      return a.mileage - b.mileage;
    });
  }, [filters]);

  const showroomCount = useMemo(() => allCars.filter((v) => v.inventoryType === 'showroom').length, [allCars]);
  const ownerListingCount = useMemo(() => allCars.filter((v) => v.inventoryType === 'owner_listing').length, [allCars]);
  const sampleCatalogCount = useMemo(() => allCars.filter((v) => v.inventoryType === 'sample_catalog').length, [allCars]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.inventoryType) count++;
    if (filters.make) count++;
    if (filters.model) count++;
    if (filters.bodyType) count++;
    if (filters.priceRange) count++;
    if (filters.transmission) count++;
    if (filters.fuelType) count++;
    if (filters.engine) count++;
    if (filters.yearMin) count++;
    if (filters.yearMax) count++;
    if (filters.mileageMax) count++;
    if (filters.condition) count++;
    if (filters.searchQuery) count++;
    return count;
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Page Header */}
      <div className="border-b border-zinc-200 pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                Lahore Showroom Inventory
              </span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-zinc-950">
              Explore Our Cars
            </h1>
            <p className="text-sm text-zinc-600 mt-2 max-w-2xl">
              Browse available vehicles by brand, model, price, mileage, year and specification. All vehicles are parked at our DHA Lahore showroom and ready for physical inspection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 bg-zinc-100 text-zinc-800 rounded-md border border-zinc-200">
              {filteredVehicles.length} Vehicles Displayed
            </span>
          </div>
        </div>

        {/* Inventory Classification Switcher Tabs */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="inline-flex p-1 bg-zinc-100 rounded-lg border border-zinc-200 self-start flex-wrap gap-1">
            <button
              onClick={() => onUpdateFilters({ inventoryType: '' })}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                !filters.inventoryType
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All Vehicles ({allCars.length})
            </button>
            <button
              onClick={() => onUpdateFilters({ inventoryType: 'showroom' })}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                filters.inventoryType === 'showroom'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Showroom Stock ({showroomCount})
            </button>
            <button
              onClick={() => onUpdateFilters({ inventoryType: 'owner_listing' })}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                filters.inventoryType === 'owner_listing'
                  ? 'bg-white text-amber-900 shadow-xs font-bold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Owner Listings ({ownerListingCount})
            </button>
            <button
              onClick={() => onUpdateFilters({ inventoryType: 'sample_catalog' })}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                filters.inventoryType === 'sample_catalog'
                  ? 'bg-white text-amber-800 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
              Pakistan Market Catalog ({sampleCatalogCount})
            </button>
          </div>

          <div className="text-xs text-zinc-500">
            {filters.inventoryType === 'showroom' ? (
              <span className="text-emerald-700 font-medium">
                Showing verified cars physically staged at DHA Lahore showroom.
              </span>
            ) : filters.inventoryType === 'owner_listing' ? (
              <span className="text-amber-800 font-medium">
                Showing vehicles listed by private owners and verified third-party sellers.
              </span>
            ) : filters.inventoryType === 'sample_catalog' ? (
              <span className="text-zinc-800 font-medium">
                Showing popular Pakistani market models available for custom sourcing.
              </span>
            ) : (
              <span>Showroom inventory, owner marketplace listings & market sourcing catalog</span>
            )}
          </div>
        </div>

        {/* Owner Listings Disclaimer */}
        {filters.inventoryType === 'owner_listing' && (
          <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 flex items-start gap-2.5">
            <span className="font-bold text-amber-700 uppercase tracking-wider text-[11px] shrink-0 mt-0.5">Disclaimer:</span>
            <p>
              Vehicle information is provided by the seller and should be independently verified before purchase. BEST CARz does not guarantee information supplied by third-party sellers.
            </p>
          </div>
        )}

        {/* Transparency Disclosure Notice */}
        <div className="mt-4 p-3.5 bg-zinc-50 border border-zinc-200 rounded-md flex items-start gap-2.5 text-xs text-zinc-600">
          <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <p>
            <strong className="text-zinc-900 font-semibold">Inventory Transparency:</strong> BEST CARz clearly distinguishes between <strong>Showroom Stock</strong> (direct dealership vehicles), <strong>Owner Listings</strong> (third-party vehicles promoted by BEST CARz), and our <strong>Market Catalog</strong> (sourcing benchmarks). Every vehicle transaction is supported with verified Punjab biometric ownership transfer.
          </p>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white p-5 rounded-lg border border-zinc-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-red-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Filter Inventory
                </span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={onResetFilters}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFilterCount})</span>
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Quick Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Grande, Civic, Fortuner..."
                  value={filters.searchQuery}
                  onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600 text-zinc-900"
                />
              </div>
            </div>

            {/* Inventory Classification */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Inventory Category
              </label>
              <select
                value={filters.inventoryType || ''}
                onChange={(e) => onUpdateFilters({ inventoryType: e.target.value })}
                className="w-full text-xs py-2 px-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600 text-zinc-900"
              >
                <option value="">All Inventory ({allCars.length})</option>
                <option value="showroom">Verified Showroom ({showroomCount})</option>
                <option value="owner_listing">Owner Listings ({ownerListingCount})</option>
                <option value="sample_catalog">Pakistan Market Catalog ({sampleCatalogCount})</option>
              </select>
            </div>

            {/* Make / Brand */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Make / Manufacturer
              </label>
              <select
                value={filters.make}
                onChange={(e) => onUpdateFilters({ make: e.target.value })}
                className="w-full text-xs py-2 px-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600 text-zinc-900"
              >
                <option value="">All Makes</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Changan">Changan</option>
                <option value="KIA">KIA</option>
                <option value="Hyundai">Hyundai</option>
                <option value="MG">MG</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Budget / Price
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => onUpdateFilters({ priceRange: e.target.value })}
                className="w-full text-xs py-2 px-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600 text-zinc-900"
              >
                <option value="">Any Budget</option>
                <option value="under-30">Under PKR 30 Lakhs</option>
                <option value="30-50">PKR 30 - 50 Lakhs</option>
                <option value="50-80">PKR 50 - 80 Lakhs</option>
                <option value="80-150">PKR 80 Lakhs - 1.50 Crore</option>
                <option value="above-150">Above PKR 1.50 Crore</option>
              </select>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Body Type
              </label>
              <select
                value={filters.bodyType}
                onChange={(e) => onUpdateFilters({ bodyType: e.target.value })}
                className="w-full text-xs py-2 px-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600 text-zinc-900"
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

            {/* Transmission */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Transmission
              </label>
              <select
                value={filters.transmission}
                onChange={(e) => onUpdateFilters({ transmission: e.target.value })}
                className="w-full text-xs py-2 px-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600 text-zinc-900"
              >
                <option value="">All Transmissions</option>
                <option value="Automatic">Automatic</option>
                <option value="CVT">CVT / e-CVT</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Fuel Type
              </label>
              <select
                value={filters.fuelType}
                onChange={(e) => onUpdateFilters({ fuelType: e.target.value })}
                className="w-full text-xs py-2 px-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600 text-zinc-900"
              >
                <option value="">All Fuel Types</option>
                <option value="Petrol">Petrol</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

            {/* Year Min */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                  Min Year
                </label>
                <select
                  value={filters.yearMin}
                  onChange={(e) => onUpdateFilters({ yearMin: e.target.value })}
                  className="w-full text-xs py-2 px-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900"
                >
                  <option value="">Any</option>
                  <option value="2021">2021+</option>
                  <option value="2022">2022+</option>
                  <option value="2023">2023+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                  Max Mileage
                </label>
                <select
                  value={filters.mileageMax}
                  onChange={(e) => onUpdateFilters({ mileageMax: e.target.value })}
                  className="w-full text-xs py-2 px-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900"
                >
                  <option value="">Any</option>
                  <option value="20000">&lt; 20,000 km</option>
                  <option value="35000">&lt; 35,000 km</option>
                  <option value="50000">&lt; 50,000 km</option>
                </select>
              </div>
            </div>

            {/* Engine Size Filter */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Engine Capacity
              </label>
              <select
                value={filters.engine}
                onChange={(e) => onUpdateFilters({ engine: e.target.value })}
                className="w-full text-xs py-2 px-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900"
              >
                <option value="">Any Engine</option>
                <option value="658">660 cc (Alto)</option>
                <option value="998">1000 cc (Wagon R)</option>
                <option value="1197">1200 cc (Swift)</option>
                <option value="149">1500 cc (Civic Turbo, City, Yaris, MG)</option>
                <option value="1798">1800 cc (Corolla Grande)</option>
                <option value="1999">2000 cc (Sportage, Tucson)</option>
                <option value="2755">2800 cc Diesel (Fortuner, Hilux)</option>
              </select>
            </div>

            {/* Dealership Guarantee Note */}
            <div className="pt-4 border-t border-zinc-100 text-[11px] text-zinc-500 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-zinc-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Dealership Guarantee</span>
              </div>
              <p className="leading-relaxed">
                Physical verification on premises. Guaranteed genuine mileage and authentic Punjab biometric documentation.
              </p>
            </div>
          </div>
        </aside>

        {/* RESULTS & CARDS */}
        <main className="lg:col-span-3 space-y-6">
          {/* Controls Bar: Mobile filter button + Sorting */}
          <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 text-xs font-semibold py-2 px-3 bg-zinc-100 text-zinc-800 rounded-md border border-zinc-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Quick Search on Tablets/Mobile */}
            <div className="block lg:hidden flex-1 min-w-[180px]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search model..."
                  value={filters.searchQuery}
                  onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
                  className="w-full text-xs pl-8 pr-2.5 py-1.5 bg-zinc-50 border border-zinc-200 rounded-md"
                />
              </div>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <label className="text-xs text-zinc-500 hidden sm:inline">Sort by:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => onUpdateFilters({ sortBy: e.target.value as any })}
                className="text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-md py-1.5 px-2.5 text-zinc-800 focus:outline-hidden"
              >
                <option value="newest">Newest Model Year</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="mileage-asc">Lowest Mileage First</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-zinc-400">Active filters:</span>
              {filters.inventoryType && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-zinc-900 text-white rounded-full">
                  {filters.inventoryType === 'showroom' ? 'Showroom Stock' : 'Pakistan Market Catalog'}
                  <button onClick={() => onUpdateFilters({ inventoryType: '' })}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.make && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-red-50 text-red-700 rounded-full border border-red-200">
                  Make: {filters.make}
                  <button onClick={() => onUpdateFilters({ make: '' })}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.bodyType && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-red-50 text-red-700 rounded-full border border-red-200">
                  Body: {filters.bodyType}
                  <button onClick={() => onUpdateFilters({ bodyType: '' })}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.priceRange && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-red-50 text-red-700 rounded-full border border-red-200">
                  Budget: {filters.priceRange}
                  <button onClick={() => onUpdateFilters({ priceRange: '' })}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.transmission && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-red-50 text-red-700 rounded-full border border-red-200">
                  {filters.transmission}
                  <button onClick={() => onUpdateFilters({ transmission: '' })}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.fuelType && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-red-50 text-red-700 rounded-full border border-red-200">
                  {filters.fuelType}
                  <button onClick={() => onUpdateFilters({ fuelType: '' })}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-zinc-100 text-zinc-800 rounded-full border border-zinc-300">
                  "{filters.searchQuery}"
                  <button onClick={() => onUpdateFilters({ searchQuery: '' })}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                onClick={onResetFilters}
                className="text-xs text-zinc-500 hover:text-red-600 underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Vehicle Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
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
          ) : (
            <div className="bg-white rounded-lg border border-zinc-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-zinc-900">
                No matching vehicles found
              </h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                We couldn't find any vehicles currently matching your selected criteria. Try adjusting your filters or search for another Pakistani model.
              </p>
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-2 text-xs font-semibold py-2.5 px-5 bg-zinc-900 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE COLLAPSIBLE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          ></div>
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-bold text-zinc-900">Filter Vehicles</span>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filters Form */}
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Inventory Category</label>
                  <select
                    value={filters.inventoryType || ''}
                    onChange={(e) => onUpdateFilters({ inventoryType: e.target.value })}
                    className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md"
                  >
                    <option value="">All Inventory ({allCars.length})</option>
                    <option value="showroom">Verified Showroom ({showroomCount})</option>
                    <option value="owner_listing">Owner Listings ({ownerListingCount})</option>
                    <option value="sample_catalog">Pakistan Market Catalog ({sampleCatalogCount})</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Make</label>
                  <select
                    value={filters.make}
                    onChange={(e) => onUpdateFilters({ make: e.target.value })}
                    className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md"
                  >
                    <option value="">All Makes</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Changan">Changan</option>
                    <option value="KIA">KIA</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="MG">MG</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Budget</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => onUpdateFilters({ priceRange: e.target.value })}
                    className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md"
                  >
                    <option value="">Any Budget</option>
                    <option value="under-30">Under PKR 30 Lakhs</option>
                    <option value="30-50">PKR 30 - 50 Lakhs</option>
                    <option value="50-80">PKR 50 - 80 Lakhs</option>
                    <option value="80-150">PKR 80 Lakhs - 1.50 Crore</option>
                    <option value="above-150">Above PKR 1.50 Crore</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Body Type</label>
                  <select
                    value={filters.bodyType}
                    onChange={(e) => onUpdateFilters({ bodyType: e.target.value })}
                    className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md"
                  >
                    <option value="">All Body Types</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Crossover">Crossover</option>
                    <option value="Pickup">Pickup</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Transmission</label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => onUpdateFilters({ transmission: e.target.value })}
                    className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md"
                  >
                    <option value="">All Transmissions</option>
                    <option value="Automatic">Automatic</option>
                    <option value="CVT">CVT</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Fuel Type</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => onUpdateFilters({ fuelType: e.target.value })}
                    className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md"
                  >
                    <option value="">All Fuel Types</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-red-600 text-white font-semibold rounded-md text-xs"
              >
                Apply Filters ({filteredVehicles.length} Cars)
              </button>
              <button
                onClick={() => {
                  onResetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 bg-zinc-100 text-zinc-700 font-semibold rounded-md text-xs"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
