import React, { useState } from 'react';
import { 
  ArrowLeft, MessageSquare, Phone, MapPin, Gauge, Fuel, 
  Calendar, ShieldCheck, Check, Sparkles, AlertCircle, Share2, 
  FileText, CheckCircle2, ChevronRight, Send
} from 'lucide-react';
import { Vehicle, PageType } from '../types';
import { getAllInventory } from '../data/inventory';
import { BRAND, createWhatsAppLink } from '../lib/constants';
import { BuyerInquiryModal } from '../components/BuyerInquiryModal';

interface VehicleDetailPageProps {
  vehicleId: string;
  onNavigate: (page: PageType, vehicleId?: string) => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  vehicleId,
  onNavigate,
}) => {
  const allInventory = getAllInventory();
  const vehicle = allInventory.find((v) => v.id === vehicleId) || allInventory[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Inquiry form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState(
    `Hello BEST CARz, I'm interested in inspecting this ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}. Please let me know available viewing times at your DHA showroom.`
  );
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const whatsappMessage = `Hello BEST CARz, I’m interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant} (Listed at ${vehicle.priceFormatted}). Please share more details and arrange an inspection at DHA Lahore.`;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setInquirySubmitted(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.year} ${vehicle.make} ${vehicle.model} - BEST CARz Lahore`,
        text: `Check out this ${vehicle.year} ${vehicle.make} ${vehicle.model} at BEST CARz DHA Lahore: ${vehicle.priceFormatted}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Related vehicles (same body type or make)
  const relatedVehicles = allInventory.filter(
    (v) => v.id !== vehicle.id && (v.make === vehicle.make || v.bodyType === vehicle.bodyType)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 text-xs">
        <div className="flex items-center gap-2 text-zinc-500">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-red-600 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => onNavigate('inventory')}
            className="hover:text-red-600 transition-colors"
          >
            Inventory
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {vehicle.make} {vehicle.model}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('inventory')}
            className="inline-flex items-center gap-1.5 font-semibold text-zinc-700 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Inventory</span>
          </button>
          <span className="text-zinc-300">|</span>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Car</span>
          </button>
        </div>
      </div>

      {/* Hero Header: Title, Price, Badges */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-red-600 text-white rounded-sm">
              {vehicle.year} Model
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-zinc-100 text-zinc-800 rounded-sm border border-zinc-200">
              {vehicle.bodyType}
            </span>
            {vehicle.inventoryType === 'owner_listing' ? (
              <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-500 text-zinc-950 rounded-sm shadow-xs flex items-center gap-1">
                ★ OWNER LISTING
              </span>
            ) : vehicle.inventoryType === 'sample_catalog' ? (
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-900 rounded-sm border border-amber-300 flex items-center gap-1">
                Demo Listing • Pakistan Market Sample
              </span>
            ) : (
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-800 rounded-sm border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Verified Showroom Stock • DHA Lahore
              </span>
            )}
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500" />
              {vehicle.location}
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-950">
            {vehicle.make} {vehicle.model}
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 font-medium">
            {vehicle.variant}
          </p>
        </div>

        {/* Pricing Card Header */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-5 lg:min-w-[320px] text-right sm:text-left lg:text-right">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
            {vehicle.inventoryType === 'sample_catalog' ? 'Typical Market Price' : 'Demand / Asking Price'}
          </span>
          <div className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 mt-0.5">
            {vehicle.priceFormatted}
          </div>
          <span className="text-[11px] text-zinc-500 block mt-1">
            {vehicle.inventoryType === 'sample_catalog'
              ? 'Market benchmark based on recent Lahore/Punjab transactions'
              : 'Includes all current Punjab token taxes & biometric readiness'}
          </span>
        </div>
      </div>

      {/* Transparency Status Banner */}
      {vehicle.inventoryType === 'owner_listing' ? (
        <div className="p-4.5 bg-amber-50/90 border border-amber-300 rounded-lg text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-600 text-white font-bold uppercase tracking-wider text-[10px] rounded-xs">
                OWNER LISTING
              </span>
              <span className="font-bold text-amber-950 text-xs">Third-Party Marketplace Vehicle</span>
            </div>
            <p className="text-zinc-700 leading-relaxed max-w-3xl">
              <strong>Disclaimer:</strong> Vehicle information is provided by the seller and should be independently verified before purchase. BEST CARz does not guarantee information supplied by third-party sellers. BEST CARz coordinates inspection arrangements and facilitates secure biometric Punjab transfer.
            </p>
          </div>
          <button
            onClick={() => setInquiryModalOpen(true)}
            className="shrink-0 px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-md font-semibold text-xs transition-colors"
          >
            Inquire via BEST CARz
          </button>
        </div>
      ) : vehicle.inventoryType === 'sample_catalog' ? (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="font-bold text-amber-900 block uppercase tracking-wider text-[11px]">
              Representative Pakistan Market Model (Demo Listing)
            </span>
            <p className="text-zinc-700">
              This profile illustrates typical pricing, specifications, and condition benchmarks for this vehicle in Pakistan. It is not currently parked on our showroom floor, but our team can source, inspect (150-point checklist), and acquire this exact model for you with verified Punjab biometric transfer.
            </p>
          </div>
          <button
            onClick={() => onNavigate('buy')}
            className="shrink-0 px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-md font-semibold text-xs transition-colors"
          >
            Request Sourcing
          </button>
        </div>
      ) : (
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-950 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 animate-ping"></div>
          <div>
            <span className="font-bold text-emerald-900 block uppercase tracking-wider text-[11px]">
              Verified Physical Showroom Inventory
            </span>
            <p className="text-zinc-700">
              This vehicle is physically staged at our showroom on St No 2 E Main Blvd DHA, Iqbal Park, Lahore. Available for immediate in-person inspection, test drive, and same-day biometric clearance.
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: Gallery + Quick Specs + Contact Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Gallery & In-Depth Guide */}
        <div className="lg:col-span-8 space-y-10">
          {/* IMAGE GALLERY */}
          <div className="space-y-3">
            {/* Primary Featured Image */}
            <div className="relative aspect-16/10 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-200 shadow-xs">
              <img
                src={vehicle.images[selectedImageIndex]}
                alt={`${vehicle.make} ${vehicle.model} - View ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 right-3 bg-zinc-950/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-sm">
                Photo {selectedImageIndex + 1} of {vehicle.images.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
              {vehicle.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative shrink-0 w-24 aspect-16/10 rounded-sm overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-red-600 ring-2 ring-red-600/20'
                      : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* QUICK SPECIFICATIONS BAR */}
          <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-4">
              Key Specifications At A Glance
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-100">
                <span className="text-zinc-400 block text-[11px] uppercase font-medium">Year</span>
                <span className="text-zinc-900 font-bold text-sm mt-0.5 block">{vehicle.year}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-100">
                <span className="text-zinc-400 block text-[11px] uppercase font-medium">Mileage</span>
                <span className="text-zinc-900 font-bold text-sm mt-0.5 block">{vehicle.mileage.toLocaleString()} km</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-100">
                <span className="text-zinc-400 block text-[11px] uppercase font-medium">Transmission</span>
                <span className="text-zinc-900 font-bold text-sm mt-0.5 block">{vehicle.transmission}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-100">
                <span className="text-zinc-400 block text-[11px] uppercase font-medium">Fuel Type</span>
                <span className="text-zinc-900 font-bold text-sm mt-0.5 block">{vehicle.fuelType}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-100">
                <span className="text-zinc-400 block text-[11px] uppercase font-medium">Engine Capacity</span>
                <span className="text-zinc-900 font-bold text-sm mt-0.5 block">{vehicle.engine}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-100">
                <span className="text-zinc-400 block text-[11px] uppercase font-medium">Color</span>
                <span className="text-zinc-900 font-bold text-sm mt-0.5 block">{vehicle.color}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-100">
                <span className="text-zinc-400 block text-[11px] uppercase font-medium">Registration</span>
                <span className="text-zinc-900 font-bold text-sm mt-0.5 block">{vehicle.registrationCity}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-100">
                <span className="text-zinc-400 block text-[11px] uppercase font-medium">Ground Clearance</span>
                <span className="text-zinc-900 font-bold text-sm mt-0.5 block">{vehicle.technicalSpecs.groundClearance}</span>
              </div>
            </div>
          </div>

          {/* SECTION: OVERVIEW */}
          <section className="bg-white rounded-lg border border-zinc-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="font-editorial text-2xl font-bold text-zinc-950">
              Overview & Pakistani Market Suitability
            </h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {vehicle.overview}
            </p>
            <div className="pt-3 border-t border-zinc-100">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                Specific Dealership Notes:
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50 p-3 rounded-md border border-zinc-200/60">
                {vehicle.description}
              </p>
            </div>
          </section>

          {/* SECTION: TECHNICAL SPECIFICATIONS TABLE */}
          <section className="bg-white rounded-lg border border-zinc-200 p-6 sm:p-8 space-y-5 shadow-xs">
            <h3 className="font-editorial text-2xl font-bold text-zinc-950">
              Performance & Technical Specifications
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  <tr className="border-b border-zinc-100">
                    <th className="py-3 font-semibold text-zinc-500 w-1/3">Engine Displacement</th>
                    <td className="py-3 text-zinc-900 font-medium">{vehicle.technicalSpecs.engineDisplacement}</td>
                  </tr>
                  <tr className="border-b border-zinc-100 bg-zinc-50/50">
                    <th className="py-3 font-semibold text-zinc-500">Maximum Power Output</th>
                    <td className="py-3 text-zinc-900 font-medium">{vehicle.technicalSpecs.power}</td>
                  </tr>
                  <tr className="border-b border-zinc-100">
                    <th className="py-3 font-semibold text-zinc-500">Peak Torque</th>
                    <td className="py-3 text-zinc-900 font-medium">{vehicle.technicalSpecs.torque}</td>
                  </tr>
                  <tr className="border-b border-zinc-100 bg-zinc-50/50">
                    <th className="py-3 font-semibold text-zinc-500">Drivetrain System</th>
                    <td className="py-3 text-zinc-900 font-medium">{vehicle.technicalSpecs.drivetrain}</td>
                  </tr>
                  <tr className="border-b border-zinc-100">
                    <th className="py-3 font-semibold text-zinc-500">Transmission Details</th>
                    <td className="py-3 text-zinc-900 font-medium">{vehicle.technicalSpecs.transmissionDetail}</td>
                  </tr>
                  <tr className="border-b border-zinc-100 bg-zinc-50/50">
                    <th className="py-3 font-semibold text-zinc-500">Fuel Tank Capacity</th>
                    <td className="py-3 text-zinc-900 font-medium">{vehicle.technicalSpecs.fuelTankCapacity}</td>
                  </tr>
                  <tr>
                    <th className="py-3 font-semibold text-zinc-500">Suspension Ground Clearance</th>
                    <td className="py-3 text-zinc-900 font-medium">{vehicle.technicalSpecs.groundClearance}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION: FEATURES & SAFETY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Features */}
            <section className="bg-white rounded-lg border border-zinc-200 p-6 shadow-xs space-y-4">
              <h3 className="font-editorial text-xl font-bold text-zinc-950">
                Vehicle Features & Equipment
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-700">
                {vehicle.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Safety */}
            <section className="bg-white rounded-lg border border-zinc-200 p-6 shadow-xs space-y-4">
              <h3 className="font-editorial text-xl font-bold text-zinc-950">
                Safety & Stability Systems
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-700">
                {vehicle.safety.map((saf, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{saf}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* SECTION: INTERIOR & EXTERIOR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white rounded-lg border border-zinc-200 p-6 shadow-xs space-y-2">
              <h3 className="font-editorial text-xl font-bold text-zinc-950">
                Interior & Comfort
              </h3>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {vehicle.interior}
              </p>
            </section>

            <section className="bg-white rounded-lg border border-zinc-200 p-6 shadow-xs space-y-2">
              <h3 className="font-editorial text-xl font-bold text-zinc-950">
                Exterior & Design
              </h3>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {vehicle.exterior}
              </p>
            </section>
          </div>

          {/* SECTION: REALISTIC FUEL ECONOMY */}
          <section className="bg-white rounded-lg border border-zinc-200 p-6 shadow-xs space-y-3">
            <h3 className="font-editorial text-xl font-bold text-zinc-950">
              Fuel Economy Considerations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              <div className="p-4 bg-zinc-50 rounded-md border border-zinc-200">
                <span className="text-[11px] uppercase font-bold text-zinc-500 block">
                  City Traffic (Lahore Urban)
                </span>
                <span className="font-editorial text-2xl font-bold text-zinc-950 mt-1 block">
                  {vehicle.fuelEconomy.city}
                </span>
              </div>
              <div className="p-4 bg-zinc-50 rounded-md border border-zinc-200">
                <span className="text-[11px] uppercase font-bold text-zinc-500 block">
                  Highway / Motorway (M-2 / Ring Road)
                </span>
                <span className="font-editorial text-2xl font-bold text-zinc-950 mt-1 block">
                  {vehicle.fuelEconomy.highway}
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-500 italic">
              Note: {vehicle.fuelEconomy.notes} Actual mileage may vary depending on tire pressures, seasonal air-conditioning loads, and driving style.
            </p>
          </section>

          {/* SECTION: IDEAL FOR & MARKET POSITION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white rounded-lg border border-zinc-200 p-6 shadow-xs space-y-2">
              <h3 className="font-editorial text-xl font-bold text-zinc-950">
                Ideal For
              </h3>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {vehicle.idealFor}
              </p>
            </section>

            <section className="bg-white rounded-lg border border-zinc-200 p-6 shadow-xs space-y-2">
              <h3 className="font-editorial text-xl font-bold text-zinc-950">
                Price & Market Position
              </h3>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {vehicle.marketPosition}
              </p>
            </section>
          </div>

          {/* SECTION: VERIFIED CONDITION & INSPECTION REPORT */}
          <section className="bg-white rounded-lg border-2 border-red-600/20 p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
              <ShieldCheck className="w-5 h-5 text-red-600" />
              <h3 className="font-editorial text-2xl font-bold text-zinc-950">
                Verified Dealership Condition Report
              </h3>
            </div>
            <p className="text-xs text-zinc-600">
              This vehicle was physically inspected at BEST CARz Lahore. Unlike unverified online classifieds, our ratings reflect verified mechanical condition and legal paperwork status.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200">
                <span className="font-semibold text-zinc-500 uppercase block text-[10px]">Engine & Transmission</span>
                <span className="font-bold text-zinc-900 mt-1 block">{vehicle.conditionReport.engineRating}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200">
                <span className="font-semibold text-zinc-500 uppercase block text-[10px]">Body & Paint Verification</span>
                <span className="font-bold text-zinc-900 mt-1 block">{vehicle.conditionReport.bodyRating}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200">
                <span className="font-semibold text-zinc-500 uppercase block text-[10px]">Tyres & Alloys</span>
                <span className="font-bold text-zinc-900 mt-1 block">{vehicle.conditionReport.tyreRating}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200">
                <span className="font-semibold text-zinc-500 uppercase block text-[10px]">Suspension & Steering</span>
                <span className="font-bold text-zinc-900 mt-1 block">{vehicle.conditionReport.suspensionRating}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200">
                <span className="font-semibold text-zinc-500 uppercase block text-[10px]">Biometric Transfer</span>
                <span className="font-bold text-zinc-900 mt-1 block">{vehicle.conditionReport.biometricStatus}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200">
                <span className="font-semibold text-zinc-500 uppercase block text-[10px]">Token Taxes Status</span>
                <span className="font-bold text-zinc-900 mt-1 block">{vehicle.conditionReport.tokenTaxStatus}</span>
              </div>
            </div>

            <div className="p-3 bg-red-50 text-red-900 rounded-md text-xs border border-red-100 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{vehicle.conditionReport.notes}</span>
            </div>
          </section>
        </div>

        {/* Right 4 Cols: Sticky Inquiry Box & Dealership Contact */}
        <div className="lg:col-span-4 space-y-6">
          {/* STICKY INTERESTED BOX */}
          <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-md sticky top-28 space-y-6">
            <div className="border-b border-zinc-100 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 block">
                Direct Dealership Action
              </span>
              <h3 className="font-editorial text-2xl font-bold text-zinc-950 mt-1">
                Interested in this vehicle?
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Connect with BEST CARz for inspection or booking.
              </p>
            </div>

            {/* Action Buttons: SEND INQUIRY, WHATSAPP SELLER / BEST CARz, CALL */}
            <div className="space-y-2.5">
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow-sm active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>SEND INQUIRY</span>
              </button>

              <a
                href={createWhatsAppLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-semibold text-xs transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{vehicle.inventoryType === 'owner_listing' ? 'WHATSAPP SELLER / BEST CARz' : 'WHATSAPP BEST CARz'}</span>
              </a>

              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md font-semibold text-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-red-400" />
                <span>CALL ({BRAND.phone})</span>
              </a>
            </div>

            {/* Physical Location Info */}
            <div className="pt-4 border-t border-zinc-100 space-y-2 text-xs text-zinc-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-zinc-900 block">Showroom Location:</span>
                  <span>{BRAND.address}</span>
                </div>
              </div>
              <div className="text-[11px] text-zinc-400 pl-6">
                Viewing Hours: {BRAND.hours}
              </div>
            </div>

            {/* Quick Vehicle Inspection Booking Form */}
            <div className="pt-4 border-t border-zinc-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
                Schedule Inspection / Test Drive
              </h4>

              {inquirySubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Inquiry Sent Successfully!</span>
                  </div>
                  <p>Our sales consultant in DHA Lahore will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-600 uppercase mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-600 uppercase mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0321 0000000"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-600 uppercase mb-1">
                      Message / Questions
                    </label>
                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inspection Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Vehicles */}
      {relatedVehicles.length > 0 && (
        <section className="pt-12 border-t border-zinc-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-2xl font-bold text-zinc-950">
              Similar Cars in Lahore Stock
            </h3>
            <button
              onClick={() => onNavigate('inventory')}
              className="text-xs font-semibold text-red-600 hover:text-red-700"
            >
              Browse All Cars
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedVehicles.map((relVehicle) => (
              <div
                key={relVehicle.id}
                onClick={() => {
                  onNavigate('vehicle-detail', relVehicle.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <div className="aspect-16/10 overflow-hidden bg-zinc-100">
                  <img
                    src={relVehicle.images[0]}
                    alt={relVehicle.model}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-editorial text-lg font-bold text-zinc-900 group-hover:text-red-600">
                      {relVehicle.make} {relVehicle.model}
                    </h4>
                    <span className="text-xs font-bold text-zinc-950">
                      {relVehicle.priceFormatted}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500 flex items-center gap-2">
                    <span>{relVehicle.year}</span>
                    <span>•</span>
                    <span>{relVehicle.mileage.toLocaleString()} km</span>
                    <span>•</span>
                    <span>{relVehicle.transmission}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Buyer Inquiry Modal for Owner & Showroom Vehicles */}
      <BuyerInquiryModal
        vehicle={vehicle}
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
};
