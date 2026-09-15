import React, { useState, useRef, useEffect } from 'react';
import { 
  Car, CheckCircle2, Clock, DollarSign, ShieldCheck, 
  Upload, Eye, ArrowRight, Phone, MessageSquare, PlusCircle,
  FileText, AlertCircle, Trash2, Edit3, Lock, Check, X,
  User, Sparkles, Filter, ChevronRight, HelpCircle
} from 'lucide-react';
import { PageType, OwnerListing, ListingStatus, BuyerInquiry } from '../types';
import { BRAND, createWhatsAppLink } from '../lib/constants';
import { 
  getStoredOwnerListings, 
  createOwnerListing, 
  updateListingStatus, 
  deleteOwnerListing 
} from '../data/marketplaceStorage';

interface SellYourCarPageProps {
  onNavigate: (page: PageType, vehicleId?: string) => void;
}

export const SellYourCarPage: React.FC<SellYourCarPageProps> = ({ onNavigate }) => {
  // Navigation tabs within page
  const [activeTab, setActiveTab] = useState<'submit' | 'how-it-works' | 'seller-dashboard' | 'admin'>('submit');

  // Listings state (synced with storage)
  const [listings, setListings] = useState<OwnerListing[]>([]);

  // Multi-step submission form state
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1); // 1: Specs, 2: Photos, 3: Seller, 4: Desc, 5: Preview
  const [submittedListing, setSubmittedListing] = useState<OwnerListing | null>(null);

  // Form fields
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('Corolla');
  const [variant, setVariant] = useState('Altis 1.6 Automatic');
  const [year, setYear] = useState<number>(2021);
  const [mileage, setMileage] = useState<number>(45000);
  const [engineCapacity, setEngineCapacity] = useState('1600 cc');
  const [transmission, setTransmission] = useState<'Automatic' | 'Manual' | 'CVT' | 'e-CVT'>('Automatic');
  const [fuelType, setFuelType] = useState<'Petrol' | 'Hybrid' | 'Diesel'>('Petrol');
  const [exteriorColor, setExteriorColor] = useState('Super White');
  const [interiorColor, setInteriorColor] = useState('Beige');
  const [registrationCity, setRegistrationCity] = useState('Lahore (Punjab)');
  const [registrationNumber, setRegistrationNumber] = useState('LEA-21-9876');
  const [numberOfOwners, setNumberOfOwners] = useState('1st Owner');
  const [askingPrice, setAskingPrice] = useState<number>(5100000);
  const [condition, setCondition] = useState('Total Bumper-to-Bumper Genuine');
  const [bodyType, setBodyType] = useState<'Sedan' | 'SUV' | 'Hatchback' | 'Crossover' | 'Pickup' | '7-Seater'>('Sedan');

  // Step 2: Photos
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
  ]);
  const [photoSlotCategory, setPhotoSlotCategory] = useState('Front');

  // Step 3: Seller Info
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerWhatsapp, setSellerWhatsapp] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerCity, setSellerCity] = useState('Lahore');
  const [preferredContact, setPreferredContact] = useState<'Call' | 'WhatsApp' | 'Email' | 'Any'>('WhatsApp');

  // Step 4: Description
  const [description, setDescription] = useState(
    'Single owner driven family car. Kept in covered parking in DHA Lahore. Regular dealership maintenance with genuine parts only. Chilled AC, pristine interior, zero mechanical faults. Punjab biometric available for instant on-spot transfer.'
  );

  // Admin filter and edit state
  const [adminSearch, setAdminSearch] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>('all');
  const [selectedListingForAdmin, setSelectedListingForAdmin] = useState<OwnerListing | null>(null);
  const [adminCommissionInput, setAdminCommissionInput] = useState('');
  const [adminCommissionStatus, setAdminCommissionStatus] = useState<'Pending' | 'Paid'>('Pending');
  const [adminNotesInput, setAdminNotesInput] = useState('');

  // Seller dashboard editing
  const [editingListing, setEditingListing] = useState<OwnerListing | null>(null);

  // Form ref for scroll
  const formSectionRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const reloadListings = () => {
    setListings(getStoredOwnerListings());
  };

  useEffect(() => {
    reloadListings();
    const handleStorageUpdate = () => reloadListings();
    window.addEventListener('bestcarz_listings_updated', handleStorageUpdate);
    return () => window.removeEventListener('bestcarz_listings_updated', handleStorageUpdate);
  }, []);

  const formatPriceLakhs = (val: number) => {
    if (val >= 10000000) {
      const crore = (val / 10000000).toFixed(2);
      return `PKR ${crore} Crore`;
    }
    const lakhs = (val / 100000).toFixed(2);
    return `PKR ${lakhs} Lakhs`;
  };

  // Image Upload Handler (Supports Drag/Drop & File Input)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const addPresetPhoto = (url: string) => {
    setImages((prev) => [...prev, url]);
  };

  const removePhoto = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerName || !sellerPhone || !make || !model || askingPrice <= 0) {
      alert('Please fill out all required details before submitting.');
      return;
    }

    const newListing = createOwnerListing({
      make,
      model,
      variant,
      year: Number(year),
      mileage: Number(mileage),
      engineCapacity,
      transmission,
      fuelType,
      exteriorColor,
      interiorColor,
      registrationCity,
      registrationNumber,
      numberOfOwners,
      askingPrice: Number(askingPrice),
      askingPriceFormatted: formatPriceLakhs(Number(askingPrice)),
      condition,
      bodyType,
      images: images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      ],
      seller: {
        fullName: sellerName,
        phone: sellerPhone,
        whatsapp: sellerWhatsapp || sellerPhone,
        email: sellerEmail,
        city: sellerCity,
        preferredContactMethod: preferredContact,
      },
      description,
      adminNotes: 'Submitted via online portal. Pending team review and biometric verification.',
      commissionAgreed: 'Terms to be agreed upon review',
      commissionStatus: 'Pending',
    });

    setSubmittedListing(newListing);
    reloadListings();
  };

  const scrollToForm = () => {
    setActiveTab('submit');
    setSubmittedListing(null);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    setActiveTab('how-it-works');
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 py-8 sm:py-14 bg-zinc-50/50 min-h-screen">
      {/* 1. Main Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 text-white rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-zinc-800 shadow-xl">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-red-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SELL YOUR CAR</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              List Your Car With BEST CARz
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              Have a car to sell? List your vehicle on BEST CARz and reach potential buyers looking for cars in Pakistan. Submit your vehicle details, photos and asking price, and our team will review your listing before publishing it.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={scrollToForm}
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>LIST YOUR CAR</span>
              </button>

              <button
                onClick={scrollToHowItWorks}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-lg border border-white/20 transition-all flex items-center gap-2"
              >
                <span>HOW IT WORKS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Reassurance pills */}
            <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                No Spam Direct Calls
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Punjab & Islamabad Biometric Assistance
              </span>
              <span className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-emerald-500" />
                DHA Lahore Showroom Promotion
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mode Selector Bar (Submit, How It Works, Seller Dashboard, Admin Portal) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-2 rounded-xl border border-zinc-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <button
              onClick={() => { setActiveTab('submit'); setSubmittedListing(null); }}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'submit'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Car (Form)</span>
            </button>

            <button
              onClick={() => setActiveTab('how-it-works')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'how-it-works'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>How It Works & Commission</span>
            </button>

            <button
              onClick={() => setActiveTab('seller-dashboard')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'seller-dashboard'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Seller Dashboard ({listings.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 text-xs font-semibold rounded-md border transition-all flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-red-50 text-red-700 border-red-300'
                  : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
              }`}
              title="BEST CARz Dealership Admin & Verification Desk"
            >
              <Lock className="w-3.5 h-3.5 text-red-600" />
              <span>BEST CARz Backoffice</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. SUBMISSION TAB (Multi-Step Form + Preview + Review Screen) */}
      {activeTab === 'submit' && (
        <section ref={formSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {submittedListing ? (
            /* Post-Submission Screen */
            <div className="bg-white rounded-2xl border border-zinc-200 p-8 sm:p-14 shadow-lg text-center max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-amber-50">
                <Clock className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700 px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
                  Listing Status: Pending Review
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 pt-2">
                  Your vehicle has been submitted for review.
                </h2>
                <p className="text-sm text-zinc-600 max-w-lg mx-auto leading-relaxed">
                  BEST CARz will review the information and images before publishing the listing. Our team may contact you at <strong>{submittedListing.seller.phone}</strong> to verify vehicle details and Punjab MTMIS biometric records.
                </p>
              </div>

              {/* Vehicle Snapshot Card */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="font-semibold text-zinc-900 text-sm">
                  {submittedListing.year} {submittedListing.make} {submittedListing.model} {submittedListing.variant}
                </div>
                <div className="text-zinc-600">
                  Asking Price: <strong className="text-emerald-700">{submittedListing.askingPriceFormatted}</strong>
                </div>
                <div className="text-zinc-600">
                  Registration: {submittedListing.registrationCity} ({submittedListing.registrationNumber})
                </div>
                <div className="text-zinc-600">
                  Reference ID: <span className="font-mono text-zinc-800">{submittedListing.id}</span>
                </div>
              </div>

              <div className="p-4 bg-zinc-100 text-zinc-700 rounded-lg text-xs max-w-md mx-auto text-left flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Quality & Security Standard:</strong> We do not automatically publish every submitted vehicle. Each listing is vetted to ensure genuine documentation, clear chassis numbers, and realistic market valuations.
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setActiveTab('seller-dashboard')}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  View In Seller Dashboard
                </button>
                <button
                  onClick={() => {
                    setSubmittedListing(null);
                    setStep(1);
                  }}
                  className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-lg"
                >
                  Submit Another Vehicle
                </button>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg"
                >
                  Browse Marketplace
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              {/* Stepper Header */}
              <div className="border-b border-zinc-200 bg-zinc-50/70 p-4 sm:p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    {[
                      { num: 1, title: 'Vehicle Details' },
                      { num: 2, title: 'Photos' },
                      { num: 3, title: 'Seller Info' },
                      { num: 4, title: 'Description' },
                      { num: 5, title: 'Listing Preview' },
                    ].map((s) => (
                      <button
                        key={s.num}
                        type="button"
                        onClick={() => setStep(s.num as 1 | 2 | 3 | 4 | 5)}
                        className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                          step === s.num
                            ? 'bg-zinc-950 text-white font-bold shadow-xs'
                            : step > s.num
                            ? 'text-emerald-700 bg-emerald-50 font-medium'
                            : 'text-zinc-500 hover:bg-zinc-100'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full text-[11px] flex items-center justify-center border font-mono">
                          {step > s.num ? '✓' : s.num}
                        </span>
                        <span className="hidden sm:inline text-[11px]">{s.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Multi-Step Form Content */}
              <div className="p-6 sm:p-10 max-w-4xl mx-auto">
                {/* STEP 1: VEHICLE DETAILS */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-red-600">Step 1 of 4</span>
                      <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-950 mt-0.5">
                        Vehicle Specification & Demand
                      </h2>
                      <p className="text-xs text-zinc-500 mt-1">
                        Provide accurate mechanical and registration details for Pakistani buyers.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                      {/* Make */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Make / Brand *</label>
                        <select
                          value={make}
                          onChange={(e) => setMake(e.target.value)}
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        >
                          <option value="Toyota">Toyota</option>
                          <option value="Honda">Honda</option>
                          <option value="Suzuki">Suzuki</option>
                          <option value="Changan">Changan</option>
                          <option value="KIA">KIA</option>
                          <option value="Hyundai">Hyundai</option>
                          <option value="MG">MG</option>
                          <option value="Daihatsu">Daihatsu</option>
                          <option value="Nissan">Nissan</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Model */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Model *</label>
                        <input
                          type="text"
                          required
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          placeholder="e.g. Corolla, Civic, City, Fortuner, Alto"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      {/* Variant */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Variant *</label>
                        <input
                          type="text"
                          required
                          value={variant}
                          onChange={(e) => setVariant(e.target.value)}
                          placeholder="e.g. Altis 1.6, 1.8 Oriel, VXL AGS"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      {/* Model Year */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Model Year *</label>
                        <input
                          type="number"
                          min={1995}
                          max={2026}
                          value={year}
                          onChange={(e) => setYear(Number(e.target.value))}
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      {/* Mileage */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Mileage (Kilometers) *</label>
                        <input
                          type="number"
                          min={0}
                          value={mileage}
                          onChange={(e) => setMileage(Number(e.target.value))}
                          placeholder="e.g. 52000"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      {/* Engine Capacity */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Engine Capacity *</label>
                        <input
                          type="text"
                          value={engineCapacity}
                          onChange={(e) => setEngineCapacity(e.target.value)}
                          placeholder="e.g. 1500 cc, 1800 cc, 660 cc"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      {/* Transmission */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Transmission *</label>
                        <select
                          value={transmission}
                          onChange={(e) => setTransmission(e.target.value as any)}
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        >
                          <option value="Automatic">Automatic</option>
                          <option value="Manual">Manual</option>
                          <option value="CVT">CVT</option>
                          <option value="e-CVT">e-CVT</option>
                        </select>
                      </div>

                      {/* Fuel Type */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Fuel Type *</label>
                        <select
                          value={fuelType}
                          onChange={(e) => setFuelType(e.target.value as any)}
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        >
                          <option value="Petrol">Petrol</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Diesel">Diesel</option>
                        </select>
                      </div>

                      {/* Body Type */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Body Type *</label>
                        <select
                          value={bodyType}
                          onChange={(e) => setBodyType(e.target.value as any)}
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        >
                          <option value="Sedan">Sedan</option>
                          <option value="SUV">SUV</option>
                          <option value="Hatchback">Hatchback</option>
                          <option value="Crossover">Crossover</option>
                          <option value="Pickup">Pickup</option>
                          <option value="7-Seater">7-Seater</option>
                        </select>
                      </div>

                      {/* Exterior Color */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Exterior Color *</label>
                        <input
                          type="text"
                          value={exteriorColor}
                          onChange={(e) => setExteriorColor(e.target.value)}
                          placeholder="e.g. Super White, Attitude Black, Silver"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      {/* Interior Color */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Interior Color *</label>
                        <input
                          type="text"
                          value={interiorColor}
                          onChange={(e) => setInteriorColor(e.target.value)}
                          placeholder="e.g. Beige, Black, Grey, Brown"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      {/* Registration City */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Registration City *</label>
                        <select
                          value={registrationCity}
                          onChange={(e) => setRegistrationCity(e.target.value)}
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        >
                          <option value="Lahore (Punjab)">Lahore (Punjab)</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Karachi (Sindh)">Karachi (Sindh)</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Multan">Multan</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Unregistered">Unregistered</option>
                        </select>
                      </div>

                      {/* Registration Number */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Registration Number *</label>
                        <input
                          type="text"
                          value={registrationNumber}
                          onChange={(e) => setRegistrationNumber(e.target.value)}
                          placeholder="e.g. LEB-21-4567 or ICT-22-1234"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      {/* Number of Owners */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Number of Owners *</label>
                        <select
                          value={numberOfOwners}
                          onChange={(e) => setNumberOfOwners(e.target.value)}
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        >
                          <option value="1st Owner">1st Owner (Single Handed)</option>
                          <option value="2nd Owner">2nd Owner</option>
                          <option value="3rd Owner">3rd Owner</option>
                          <option value="4+ Owners">4+ Owners</option>
                        </select>
                      </div>

                      {/* Asking Price */}
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">
                          Asking Price (PKR) * <span className="text-red-600 font-bold">({formatPriceLakhs(Number(askingPrice))})</span>
                        </label>
                        <input
                          type="number"
                          step={50000}
                          min={500000}
                          value={askingPrice}
                          onChange={(e) => setAskingPrice(Number(e.target.value))}
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600 font-mono"
                        />
                      </div>
                    </div>

                    {/* Vehicle Condition */}
                    <div className="text-xs">
                      <label className="block font-semibold text-zinc-700 mb-1.5">Vehicle Condition Summary *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          'Total Bumper-to-Bumper Genuine',
                          '1 or 2 Pieces Minor Touchup (Cosmetic)',
                          'Sides Showered for Fresh Look (Non-accidental)',
                        ].map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCondition(c)}
                            className={`p-3 text-left rounded-md border transition-all ${
                              condition === c
                                ? 'border-red-600 bg-red-50 text-red-700 font-semibold'
                                : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold flex items-center gap-2"
                      >
                        <span>Next: Upload Photos</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: UPLOAD PHOTOS */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-red-600">Step 2 of 4</span>
                      <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-950 mt-0.5">
                        Vehicle Photographs
                      </h2>
                      <p className="text-xs text-zinc-500 mt-1">
                        High-resolution images attract serious buyers. We recommend capturing: Front, Rear, Left side, Right side, Interior, Dashboard, Seats, Engine, Wheels, and any visible scratch or wear.
                      </p>
                    </div>

                    {/* Drag and Drop Zone */}
                    <div className="border-2 border-dashed border-zinc-300 hover:border-red-500 bg-zinc-50 rounded-xl p-8 text-center transition-colors">
                      <Upload className="w-10 h-10 text-zinc-400 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-zinc-800">
                        Drag and drop your car images here, or click to browse
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-1">
                        Supports JPG, PNG, WEBP. You can upload multiple angles.
                      </p>
                      <label className="mt-4 inline-block px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold cursor-pointer transition-colors">
                        Select Photos from Device
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Quick Preset Sample Images */}
                    <div className="p-4 bg-zinc-100/70 border border-zinc-200 rounded-lg text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-zinc-800">Quick Testing / Demo Image Presets:</span>
                        <span className="text-[11px] text-zinc-500">Click to add angles</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: '+ Front 3/4 Angle', url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80' },
                          { label: '+ Rear Profile', url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80' },
                          { label: '+ Interior & Dashboard', url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80' },
                          { label: '+ Side Flank & Rims', url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80' },
                        ].map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => addPresetPhoto(preset.url)}
                            className="px-2.5 py-1.5 bg-white border border-zinc-200 hover:border-red-500 rounded text-[11px] font-medium text-zinc-700"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Photo Gallery Grid */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-zinc-800">
                          Selected Photos ({images.length})
                        </span>
                        {images.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setImages([])}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Clear All Photos
                          </button>
                        )}
                      </div>

                      {images.length === 0 ? (
                        <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-lg text-center text-xs text-zinc-500">
                          No photos added yet. Please upload at least 1 image or select a sample photo above.
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {images.map((img, idx) => (
                            <div key={idx} className="relative aspect-4/3 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 group">
                              <img
                                src={img}
                                alt={`Vehicle angle ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                                #{idx + 1} {idx === 0 ? '(Cover)' : ''}
                              </div>
                              <button
                                type="button"
                                onClick={() => removePhoto(idx)}
                                className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                title="Remove photo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-100 rounded-md text-xs font-semibold text-zinc-700"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold flex items-center gap-2"
                      >
                        <span>Next: Seller Information</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: SELLER INFORMATION */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-red-600">Step 3 of 4</span>
                      <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-950 mt-0.5">
                        Seller Information
                      </h2>
                      <p className="text-xs text-zinc-500 mt-1">
                        Your private details are securely held by BEST CARz to verify biometric authorization and coordinate buyer inspections.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={sellerName}
                          onChange={(e) => setSellerName(e.target.value)}
                          placeholder="e.g. Asim Bilal"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Phone Number (Direct Call) *</label>
                        <input
                          type="tel"
                          required
                          value={sellerPhone}
                          onChange={(e) => setSellerPhone(e.target.value)}
                          placeholder="0300-1234567"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">WhatsApp Number *</label>
                        <input
                          type="tel"
                          value={sellerWhatsapp}
                          onChange={(e) => setSellerWhatsapp(e.target.value)}
                          placeholder="0300-1234567 (if same, leave blank)"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={sellerEmail}
                          onChange={(e) => setSellerEmail(e.target.value)}
                          placeholder="asim@example.com"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">City / Area *</label>
                        <input
                          type="text"
                          required
                          value={sellerCity}
                          onChange={(e) => setSellerCity(e.target.value)}
                          placeholder="e.g. DHA Phase 6, Lahore"
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-zinc-700 mb-1">Preferred Contact Method</label>
                        <select
                          value={preferredContact}
                          onChange={(e) => setPreferredContact(e.target.value as any)}
                          className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-600"
                        >
                          <option value="WhatsApp">WhatsApp (Recommended)</option>
                          <option value="Call">Phone Call</option>
                          <option value="Email">Email</option>
                          <option value="Any">Any Channel</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-600 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Seller Privacy Protection:</strong> BEST CARz shields your personal residence address and direct contact until a genuine buyer inquiry is vetted and authenticated by our desk.
                      </span>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-100 rounded-md text-xs font-semibold text-zinc-700"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold flex items-center gap-2"
                      >
                        <span>Next: Vehicle Description</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: VEHICLE DESCRIPTION */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-red-600">Step 4 of 4</span>
                      <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-950 mt-0.5">
                        Tell buyers about your car
                      </h2>
                      <p className="text-xs text-zinc-500 mt-1">
                        Describe condition, maintenance history, upgrades, accessories, and other relevant information that will help sell your car faster.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                        Vehicle Description & Highlights *
                      </label>
                      <textarea
                        rows={6}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detail your vehicle condition, tyre health, oil change history, aftermarket screens, ceramic coating, biometric transfer readiness, and reason for selling..."
                        className="w-full text-xs p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600 resize-none font-sans leading-relaxed"
                      />
                    </div>

                    {/* Suggested Points Helper */}
                    <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 text-xs space-y-2">
                      <span className="font-semibold text-zinc-800 block">Helpful tips to include:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-600">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Punjab / ICT Biometric status
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Tire condition & brand
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Maintenance history (Authorized dealership)
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Original return file and number plates
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-100 rounded-md text-xs font-semibold text-zinc-700"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(5)}
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-semibold flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Preview Your Listing</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: LISTING PREVIEW BEFORE SUBMISSION */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Step 5: Final Check</span>
                        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-950 mt-0.5">
                          Listing Preview
                        </h2>
                        <p className="text-xs text-zinc-500 mt-1">
                          This is how your car will appear to prospective buyers on BEST CARz once approved.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Details</span>
                      </button>
                    </div>

                    {/* Preview Card Mockup */}
                    <div className="bg-white border border-zinc-300 rounded-xl overflow-hidden shadow-md">
                      {/* Image Preview Banner */}
                      <div className="relative aspect-16/9 bg-zinc-900 max-h-80 w-full overflow-hidden">
                        <img
                          src={images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'}
                          alt={`${year} ${make} ${model}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-zinc-900/90 text-white rounded-sm">
                            {year}
                          </span>
                          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-red-600 text-white rounded-sm shadow-xs">
                            OWNER LISTING
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded">
                          {images.length} Photos Attached
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-4">
                          <div>
                            <span className="text-xs text-zinc-500 uppercase tracking-wider">{make}</span>
                            <h3 className="font-editorial text-2xl font-bold text-zinc-950">
                              {year} {make} {model} {variant}
                            </h3>
                            <p className="text-xs text-zinc-500 mt-0.5">
                              {registrationCity} • {numberOfOwners} • {condition}
                            </p>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">Demand Price</span>
                            <span className="font-editorial text-2xl sm:text-3xl font-bold text-red-600">
                              {formatPriceLakhs(Number(askingPrice))}
                            </span>
                          </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-zinc-50 p-3.5 rounded-lg">
                          <div>
                            <span className="text-zinc-400 block">Mileage</span>
                            <span className="font-semibold text-zinc-800">{Number(mileage).toLocaleString()} km</span>
                          </div>
                          <div>
                            <span className="text-zinc-400 block">Engine</span>
                            <span className="font-semibold text-zinc-800">{engineCapacity}</span>
                          </div>
                          <div>
                            <span className="text-zinc-400 block">Transmission</span>
                            <span className="font-semibold text-zinc-800">{transmission}</span>
                          </div>
                          <div>
                            <span className="text-zinc-400 block">Fuel Type</span>
                            <span className="font-semibold text-zinc-800">{fuelType}</span>
                          </div>
                        </div>

                        {/* Description Preview */}
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-zinc-800">Seller Description:</span>
                          <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50 p-3 rounded-md border border-zinc-100">
                            {description}
                          </p>
                        </div>

                        {/* Third-Party Disclaimer */}
                        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-md text-[11px] text-amber-900 leading-normal">
                          <strong>Disclaimer:</strong> Vehicle information is provided by the seller and should be independently verified before purchase. BEST CARz does not guarantee information supplied by third-party sellers.
                        </div>

                        {/* Seller Information (Private Verification) */}
                        <div className="p-3 bg-zinc-100 rounded-md text-xs text-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            Seller: <strong>{sellerName || 'Private Owner'}</strong> ({sellerCity})
                          </div>
                          <div>
                            Contact: <strong>{sellerPhone}</strong> ({preferredContact})
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Approval Notice & Submit Button */}
                    <div className="p-4 bg-zinc-100 border border-zinc-200 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 font-bold text-xs text-zinc-900">
                        <ShieldCheck className="w-4 h-4 text-red-600" />
                        <span>Submission Terms & Commission Agreement</span>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        By submitting, you agree to list your vehicle with BEST CARz. A commission may be charged by BEST CARz when a vehicle is successfully sold through the platform. Commission terms will be agreed with the seller before the transaction is completed. BEST CARz reviews all submissions prior to publishing.
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-100 rounded-md text-xs font-semibold text-zinc-700"
                      >
                        Back to Edit
                      </button>
                      <button
                        type="button"
                        onClick={handleFinalSubmit}
                        className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm & Submit for Review</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 4. HOW IT WORKS & COMMISSION SECTION */}
      <section ref={howItWorksRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* How It Works 4-Step Process */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-zinc-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Transparent Selling Journey
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600">
              A structured 4-step process designed to eliminate scam calls and guarantee verified biometric closing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 01 */}
            <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3 relative hover:border-zinc-300 transition-colors">
              <span className="font-editorial text-4xl font-bold text-zinc-300 block">01</span>
              <h3 className="font-bold text-zinc-900 text-base">List Your Car</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Submit your vehicle details, specifications, asking demand, and photographs through our simple multi-step form.
              </p>
            </div>

            {/* Step 02 */}
            <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3 relative hover:border-zinc-300 transition-colors">
              <span className="font-editorial text-4xl font-bold text-red-300 block">02</span>
              <h3 className="font-bold text-zinc-900 text-base">BEST CARz Reviews</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Our team checks the submitted information, documentation, and photos before publishing the listing to ensure accuracy.
              </p>
            </div>

            {/* Step 03 */}
            <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3 relative hover:border-zinc-300 transition-colors">
              <span className="font-editorial text-4xl font-bold text-zinc-300 block">03</span>
              <h3 className="font-bold text-zinc-900 text-base">Connect With Buyers</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Potential buyers can view the listing, send inquiries, and arrange showroom or supervised inspections in Lahore.
              </p>
            </div>

            {/* Step 04 */}
            <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3 relative hover:border-zinc-300 transition-colors">
              <span className="font-editorial text-4xl font-bold text-emerald-400 block">04</span>
              <h3 className="font-bold text-zinc-900 text-base">Complete the Sale</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                BEST CARz facilitates the process, and the agreed commission applies upon successful sale and biometric transfer.
              </p>
            </div>
          </div>
        </div>

        {/* Dedicated Commission Section */}
        <div className="bg-zinc-950 text-white p-8 sm:p-12 lg:p-14 rounded-2xl border border-zinc-800 shadow-xl">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider text-red-400">
              <DollarSign className="w-3.5 h-3.5" />
              <span>SELL WITH BEST CARz</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-white leading-tight">
              No Complicated Process. Transparent Commission.
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              List your vehicle, connect with interested buyers, and let BEST CARz help facilitate the sale.
            </p>

            <div className="p-5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-zinc-200 leading-relaxed space-y-3">
              <p className="font-medium text-white">
                "A commission may be charged by BEST CARz when a vehicle is successfully sold through the platform. Commission terms will be agreed with the seller before the transaction is completed."
              </p>
              <div className="text-xs text-zinc-400 space-y-1 pt-1 border-t border-white/10">
                <p>• Zero upfront listing fee required to submit your car.</p>
                <p>• Commission is payable only upon verified closing and secure receipt of payment.</p>
                <p>• Complete assistance with Punjab & Islamabad excise biometric verification.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToForm}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-md shadow-md transition-colors"
              >
                Submit Your Car Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SELLER DASHBOARD VIEW */}
      {activeTab === 'seller-dashboard' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
            <div>
              <h2 className="font-editorial text-3xl font-bold text-zinc-950">
                Seller Dashboard
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Manage your listed vehicles, track approval status, and review buyer inquiries.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('submit');
                setSubmittedListing(null);
                setStep(1);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-semibold flex items-center gap-2 self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Another Vehicle</span>
            </button>
          </div>

          {listings.length === 0 ? (
            <div className="p-12 bg-white rounded-xl border border-zinc-200 text-center space-y-4">
              <Car className="w-12 h-12 text-zinc-300 mx-auto" />
              <h3 className="font-editorial text-xl font-bold text-zinc-800">No Vehicles Listed Yet</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                You have not submitted any vehicles to BEST CARz yet. Start by filling out our simple listing form.
              </p>
              <button
                onClick={scrollToForm}
                className="px-5 py-2.5 bg-zinc-900 text-white rounded-md text-xs font-semibold"
              >
                List Your First Car
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {listings.map((l) => {
                const statusColors: Record<ListingStatus, string> = {
                  'Pending Review': 'bg-amber-100 text-amber-800 border-amber-300',
                  'Published': 'bg-emerald-100 text-emerald-800 border-emerald-300',
                  'Under Offer': 'bg-sky-100 text-sky-800 border-sky-300',
                  'Sold': 'bg-zinc-800 text-white border-zinc-900',
                  'Rejected': 'bg-red-100 text-red-800 border-red-300',
                };

                return (
                  <div
                    key={l.id}
                    className="bg-white rounded-xl border border-zinc-200 p-5 sm:p-6 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <img
                          src={l.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'}
                          alt={l.model}
                          className="w-20 h-14 object-cover rounded-md border border-zinc-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-950 text-base">
                              {l.year} {l.make} {l.model} {l.variant}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${statusColors[l.status]}`}>
                              {l.status}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-500 mt-0.5">
                            Demand: <strong className="text-zinc-900">{l.askingPriceFormatted}</strong> • {l.mileage.toLocaleString()} km • Reg: {l.registrationCity}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {l.status !== 'Sold' && (
                          <button
                            onClick={() => {
                              updateListingStatus(l.id, 'Sold');
                              reloadListings();
                            }}
                            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-semibold"
                          >
                            Mark as Sold
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm(`Remove listing for ${l.year} ${l.make} ${l.model}?`)) {
                              deleteOwnerListing(l.id);
                              reloadListings();
                            }
                          }}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded text-xs font-semibold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Listing Summary Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-zinc-50 p-3 rounded-lg text-xs text-zinc-600">
                      <div>
                        Seller: <strong>{l.seller.fullName}</strong> ({l.seller.phone})
                      </div>
                      <div>
                        Submitted on: <strong>{new Date(l.createdAt).toLocaleDateString()}</strong>
                      </div>
                      <div>
                        Inquiries Received: <strong>{l.inquiries?.length || 0} Buyer Inquiries</strong>
                      </div>
                    </div>

                    {/* Inquiries Section */}
                    {l.inquiries && l.inquiries.length > 0 && (
                      <div className="pt-3 border-t border-zinc-100 space-y-2">
                        <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                          Buyer Inquiries for this vehicle:
                        </span>
                        <div className="space-y-2">
                          {l.inquiries.map((inq) => (
                            <div
                              key={inq.id}
                              className="p-3 bg-zinc-50 border border-zinc-200 rounded-md text-xs space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-zinc-900">
                                  {inq.buyerName} ({inq.buyerPhone})
                                </span>
                                <span className="text-[10px] text-zinc-400">
                                  {new Date(inq.createdAt).toLocaleString()}
                                </span>
                              </div>
                              {inq.offerPrice && (
                                <div className="text-emerald-700 font-semibold">
                                  Buyer's Offer: {inq.offerPrice}
                                </div>
                              )}
                              <p className="text-zinc-600 italic">"{inq.message}"</p>
                              <div className="flex items-center gap-2 pt-1">
                                <a
                                  href={`tel:${inq.buyerPhone}`}
                                  className="text-xs text-red-600 hover:underline flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>Call Buyer</span>
                                </a>
                                <a
                                  href={createWhatsAppLink(`Assalam-o-Alaikum ${inq.buyerName}, regards your inquiry for the ${l.year} ${l.make} ${l.model} listed on BEST CARz.`)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-emerald-700 hover:underline flex items-center gap-1"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>WhatsApp Buyer</span>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* 6. BEST CARZ ADMIN BACKOFFICE DASHBOARD */}
      {activeTab === 'admin' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-zinc-950 text-white p-6 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-500" />
                <h2 className="font-editorial text-2xl font-bold text-white">
                  BEST CARz Staff Admin & Verification Desk
                </h2>
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                DHA Showroom Internal Backoffice
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Review submitted cars from owners and dealers across Pakistan. Verify documentation, agree on commission terms, approve or reject listings, and record commission clearance.
            </p>
          </div>

          {/* Admin Filters */}
          <div className="bg-white p-4 rounded-xl border border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-zinc-700">Filter Status:</span>
              {(['all', 'Pending Review', 'Published', 'Under Offer', 'Sold', 'Rejected'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setAdminStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                    adminStatusFilter === st
                      ? 'bg-zinc-950 text-white'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div>
              <input
                type="text"
                placeholder="Search by car, owner, city..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="p-2 border border-zinc-200 rounded-md bg-zinc-50 focus:bg-white text-xs"
              />
            </div>
          </div>

          {/* Admin Listings List */}
          <div className="space-y-4">
            {listings
              .filter((l) => {
                if (adminStatusFilter !== 'all' && l.status !== adminStatusFilter) return false;
                if (adminSearch) {
                  const q = adminSearch.toLowerCase();
                  return (
                    l.make.toLowerCase().includes(q) ||
                    l.model.toLowerCase().includes(q) ||
                    l.seller.fullName.toLowerCase().includes(q) ||
                    l.seller.city.toLowerCase().includes(q) ||
                    l.registrationNumber.toLowerCase().includes(q)
                  );
                }
                return true;
              })
              .map((l) => (
                <div
                  key={l.id}
                  className="bg-white rounded-xl border border-zinc-200 p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-950 text-lg">
                          {l.year} {l.make} {l.model} {l.variant}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded font-semibold bg-zinc-100 text-zinc-800 border">
                          {l.status}
                        </span>
                        {l.featured && (
                          <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">
                        Demand: <strong className="text-red-600">{l.askingPriceFormatted}</strong> • {l.mileage.toLocaleString()} km • Reg: {l.registrationNumber} ({l.registrationCity})
                      </div>
                    </div>

                    {/* Approval / Rejection Controls */}
                    <div className="flex flex-wrap items-center gap-2">
                      {l.status !== 'Published' && (
                        <button
                          onClick={() => {
                            updateListingStatus(l.id, 'Published');
                            reloadListings();
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Publish</span>
                        </button>
                      )}

                      {l.status !== 'Rejected' && (
                        <button
                          onClick={() => {
                            updateListingStatus(l.id, 'Rejected');
                            reloadListings();
                          }}
                          className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded text-xs font-semibold"
                        >
                          Reject
                        </button>
                      )}

                      <button
                        onClick={() => {
                          const currentFeat = Boolean(l.featured);
                          updateListingStatus(l.id, l.status, { featured: !currentFeat });
                          reloadListings();
                        }}
                        className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded text-xs font-semibold"
                      >
                        {l.featured ? 'Remove Featured' : 'Feature on Homepage'}
                      </button>
                    </div>
                  </div>

                  {/* Private Seller & Commission Record (Backoffice Only) */}
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-xs grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="font-bold text-zinc-800 block text-[11px] uppercase tracking-wider text-zinc-500">
                        Seller Credentials (Confidential)
                      </span>
                      <div>Name: <strong>{l.seller.fullName}</strong></div>
                      <div>Phone: <strong>{l.seller.phone}</strong> | WhatsApp: <strong>{l.seller.whatsapp}</strong></div>
                      <div>City: <strong>{l.seller.city}</strong></div>
                      <div>Preferred Contact: <strong>{l.seller.preferredContactMethod}</strong></div>
                    </div>

                    <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-zinc-200 sm:pl-4">
                      <span className="font-bold text-zinc-800 block text-[11px] uppercase tracking-wider text-red-600">
                        Commission Record (Never Exposed Publicly)
                      </span>
                      <div className="flex items-center gap-2">
                        <span>Commission Agreed:</span>
                        <input
                          type="text"
                          defaultValue={l.commissionAgreed || 'Standard 1% or agreed fee'}
                          onBlur={(e) => {
                            updateListingStatus(l.id, l.status, { commissionAgreed: e.target.value });
                            reloadListings();
                          }}
                          className="p-1 border border-zinc-300 rounded bg-white text-xs w-52 font-semibold text-zinc-900"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Commission Status:</span>
                        <select
                          value={l.commissionStatus || 'Pending'}
                          onChange={(e) => {
                            updateListingStatus(l.id, l.status, { commissionStatus: e.target.value as any });
                            reloadListings();
                          }}
                          className="p-1 border border-zinc-300 rounded bg-white text-xs font-semibold"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid (Received)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Admin Notes */}
                  <div className="text-xs space-y-1">
                    <span className="font-semibold text-zinc-700">Verification Inspection Notes:</span>
                    <input
                      type="text"
                      defaultValue={l.adminNotes || ''}
                      onBlur={(e) => {
                        updateListingStatus(l.id, l.status, { adminNotes: e.target.value });
                        reloadListings();
                      }}
                      placeholder="Add inspection notes, verification status, or touchup check details..."
                      className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded text-xs text-zinc-800"
                    />
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
};
