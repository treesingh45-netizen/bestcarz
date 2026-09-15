import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, FileText, ArrowRight, MessageSquare, 
  HelpCircle, Car, Sparkles, Send, Phone, Search
} from 'lucide-react';
import { PageType, InventoryFilterState } from '../types';
import { BRAND, createWhatsAppLink } from '../lib/constants';

interface BuyPageProps {
  onNavigate: (page: PageType, vehicleId?: string) => void;
  onApplyFilters: (filters: Partial<InventoryFilterState>) => void;
}

export const BuyPage: React.FC<BuyPageProps> = ({ onNavigate, onApplyFilters }) => {
  // Sourcing form state
  const [makeWanted, setMakeWanted] = useState('');
  const [modelWanted, setModelWanted] = useState('');
  const [budgetWanted, setBudgetWanted] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSourcingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!makeWanted || !buyerPhone) return;
    setSubmitted(true);
  };

  const categories = [
    {
      title: 'Best for Family',
      description: 'Spacious 5-seater sedans with comfortable rear bench seating, large luggage boots, and exceptional ride comfort on Lahore streets and motorways.',
      cars: 'Toyota Corolla Altis, Toyota Yaris, Honda Civic, Honda City',
      recommendedMake: 'Toyota',
    },
    {
      title: 'Best for Fuel Economy',
      description: 'Ultra-efficient city runners offering 18 to 24+ km/L, easy maneuverability through congested bazaars, and minimal maintenance costs.',
      cars: 'Suzuki Alto 660cc, Suzuki Wagon R, Suzuki Cultus, Hybrid sedans',
      recommendedMake: 'Suzuki',
    },
    {
      title: 'Best for Daily Commute',
      description: 'Low-maintenance, dependable workhorses engineered for daily office drives, quick acceleration, and hassle-free city parking.',
      cars: 'Suzuki Swift GLX, Toyota Yaris ATIV, Honda City 1.5 CVT',
      recommendedMake: 'Suzuki',
    },
    {
      title: 'Best for Rough Roads & Long Distance',
      description: 'High-clearance body-on-frame 4x4 SUVs built to handle broken roads, northern mountain tours, monsoon rainwater, and cross-country motorways.',
      cars: 'Toyota Fortuner Legender / Sigma4, Toyota Hilux Revo / Rocco',
      recommendedMake: 'Toyota',
    },
    {
      title: 'Luxury & Executive Class',
      description: 'Premium cabins with leather seating, electric sunroofs, acoustic insulation, smart cruise control, and commanding road presence.',
      cars: 'Honda Civic RS Turbo, Toyota Corolla Grande, KIA Sportage AWD, MG HS',
      recommendedMake: 'Honda',
    },
  ];

  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 text-white rounded-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-zinc-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 block">
              Pakistani Automotive Buyer Guide
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-white leading-tight">
              Buying with Complete Confidence at BEST CARz
            </h1>
            <p className="text-base text-zinc-300 leading-relaxed font-light">
              Purchasing a used vehicle in Pakistan should never be a gamble. We eliminate the risks of tampering, hidden structural damage, non-payment of token taxes, and disputed biometric transfers.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  onNavigate('inventory');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Browse Current Stock
              </button>
              <a
                href={createWhatsAppLink("Hello BEST CARz, I'm looking for buyer guidance and advice on purchasing a car in Lahore.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold py-3 px-6 rounded-md border border-zinc-700 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Ask Our Vehicle Advisor</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Inspection Standard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600">
            Physical Inspection Criteria
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Our Dealership Inspection Standard
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            Every car brought into BEST CARz undergoes thorough physical and mechanical scrutiny before it is listed on our showroom floor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-zinc-900">
              Paint & Body Integrity
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              We use calibrated digital paint depth gauges to verify original factory seals, pillar integrity, roof paint, and detect any repainted or touched-up panels (bumber-to-bumber genuine vs touching).
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-zinc-900">
              Engine & Powertrain Test
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Complete OBD-II computer diagnostics, blow-by verification, compression checks, radiator cooling efficiency, transmission shift smoothness, and catalytic converter health.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-zinc-900">
              Legal & Biometric Clearance
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Every vehicle’s engine & chassis number is verified against original registration smart cards and Punjab Excise MTMIS database. Biometric transfer from the first owner is guaranteed on spot.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Popular Car Recommendations for Pakistan */}
      <section className="bg-zinc-100 py-16 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Market Guidance
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
              Popular Car Recommendations
            </h2>
            <p className="text-sm text-zinc-600 mt-2">
              Choosing the right vehicle for Pakistani road conditions, family sizes, and fuel realities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                    Category 0{idx + 1}
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-zinc-900">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                      Recommended Vehicles:
                    </span>
                    <span className="text-xs font-semibold text-zinc-800 block mt-0.5">
                      {cat.cars}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onApplyFilters({ make: cat.recommendedMake });
                      onNavigate('inventory');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
                  >
                    <span>View {cat.recommendedMake} in stock</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Custom Car Sourcing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Can't Find Your Desired Car?
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950">
              Custom Car Sourcing Service
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              If your desired car, specific model year, or exact exterior color is not currently listed in our showroom inventory, BEST CARz will locate it for you. We evaluate hundreds of vehicles across Lahore and Punjab every week.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-700">
                  <strong>Strict Quality Filtering:</strong> We only inspect first-owner, authentic non-accidental vehicles with complete document trails.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-700">
                  <strong>Transparent Pricing:</strong> No hidden commission markups or inflated demands.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-700">
                  <strong>Guaranteed Transfer:</strong> Complete Punjab biometric transfer arranged before final payment.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={createWhatsAppLink("Hello BEST CARz, I'm looking for a specific vehicle to buy that isn't in stock right now.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Tell Us What You Need On WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 shadow-md">
              <h3 className="font-editorial text-2xl font-bold text-zinc-950 mb-1">
                Vehicle Sourcing Request
              </h3>
              <p className="text-xs text-zinc-500 mb-6">
                Fill in your requirements and our Lahore acquisition team will respond with suitable candidates within 24 hours.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-900 text-xs space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-bold">
                    ✓
                  </div>
                  <h4 className="font-bold text-sm text-emerald-950">
                    Sourcing Request Received
                  </h4>
                  <p>
                    Thank you, {buyerName}. Our car sourcing desk has received your request for a {makeWanted} {modelWanted}. We will message or call you at {buyerPhone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSourcingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                        Make / Brand *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Honda, Toyota"
                        value={makeWanted}
                        onChange={(e) => setMakeWanted(e.target.value)}
                        className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                        Model / Variant
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Civic RS Turbo"
                        value={modelWanted}
                        onChange={(e) => setModelWanted(e.target.value)}
                        className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                      Approximate Budget (PKR)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 60 - 70 Lakhs"
                      value={budgetWanted}
                      onChange={(e) => setBudgetWanted(e.target.value)}
                      className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0321 0000000"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Sourcing Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
