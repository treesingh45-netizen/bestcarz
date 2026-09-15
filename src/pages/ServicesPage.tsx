import React from 'react';
import { 
  Car, RefreshCw, DollarSign, ShieldCheck, FileCheck, 
  Users, CheckCircle2, ArrowRight, MessageSquare, Phone 
} from 'lucide-react';
import { PageType } from '../types';
import { BRAND, createWhatsAppLink } from '../lib/constants';

interface ServicesPageProps {
  onNavigate: (page: PageType) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const services = [
    {
      id: 'buy',
      icon: <Car className="w-6 h-6 text-red-600" />,
      title: 'Buy Cars',
      subtitle: 'Verified Inventory & Transparent Pricing',
      description:
        'Browse certified Pakistani-market sedans, SUVs, hatchbacks, and crossovers. Every vehicle is physically inspected, cataloged with authentic mileage, and offered at transparent market-clearing rates without hidden dealer fees.',
      points: [
        'Complete 150-point mechanical & body health inspection',
        'Transparent vehicle condition reports & clear engine photos',
        'Physical viewing and on-site road testing at DHA Lahore showroom',
      ],
      actionLabel: 'Explore Available Inventory',
      actionPage: 'inventory' as PageType,
    },
    {
      id: 'sell',
      icon: <DollarSign className="w-6 h-6 text-red-600" />,
      title: 'Sell Cars',
      subtitle: 'Fast Direct Purchase & Secure Settlement',
      description:
        'Skip the inconvenience of random classified tire-kickers and intrusive home visits. BEST CARz buys cars directly with rapid valuation, transparent physical inspection, and immediate payment via certified banking channels.',
      points: [
        'Quick 20-minute showroom evaluation by senior appraisers',
        'Immediate biometric transfer from your CNIC to dealership',
        'Instant pay order or direct real-time bank transfer',
      ],
      actionLabel: 'Sell Your Car',
      actionPage: 'sell-exchange' as PageType,
    },
    {
      id: 'exchange',
      icon: <RefreshCw className="w-6 h-6 text-red-600" />,
      title: 'Exchange Cars',
      subtitle: 'Any Car • Any Model Trade-In',
      description:
        'Seamlessly transition from your existing vehicle to a newer or larger model in one straightforward transaction. Settle the agreed financial difference conveniently without enduring weeks between selling and buying.',
      points: [
        'Trade-in across classes (e.g. Alto to Yaris, Civic to Fortuner)',
        'Fair market evaluation deducted directly from upgrade price',
        'Same-day paperwork completion and key handover',
      ],
      actionLabel: 'Explore Exchange Options',
      actionPage: 'sell-exchange' as PageType,
    },
    {
      id: 'inspection',
      icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
      title: 'Vehicle Inspection & Verification',
      subtitle: 'Independent Mechanical & Structural Scrutiny',
      description:
        'Our technical team uses digital paint meters, OBD-II diagnostic scanners, and hydraulic lifts to audit body seals, suspension bushings, catalytic converters, and transmission health before any transaction is closed.',
      points: [
        'Digital paint depth measurement to detect repaints and bondo',
        'OBD-II computer scan for fault codes and emissions health',
        'Full chassis, pillar, and undercarriage rust and damage audit',
      ],
      actionLabel: 'View Inspection Standards',
      actionPage: 'buy' as PageType,
    },
    {
      id: 'documentation',
      icon: <FileCheck className="w-6 h-6 text-red-600" />,
      title: 'Documentation & Transfer Assistance',
      subtitle: 'Punjab Biometric & Excise Clearance',
      description:
        'Vehicle paperwork in Pakistan requires strict compliance with Punjab MTMIS and Excise regulations. We handle biometric transfers, verify original registration smart cards, and confirm lifetime or annual token tax clearances.',
      points: [
        'Biometric verification arranged on-site at DHA showroom',
        'Verification of original file, smart card, and return file (if applicable)',
        'Clearance of token taxes and outstanding traffic e-challans',
      ],
      actionLabel: 'Learn Documentation Steps',
      actionPage: 'buy' as PageType,
    },
    {
      id: 'consultation',
      icon: <Users className="w-6 h-6 text-red-600" />,
      title: 'Automotive Consultation',
      subtitle: 'Objective Buying Guidance for Pakistani Families',
      description:
        'Navigating fuel economy, spare parts availability, resale depreciation, and road clearance can be daunting. Our automotive advisors assist you in choosing the ideal model for your budget, family size, and commute patterns.',
      points: [
        'Unbiased comparison between Japanese imports and local assembly',
        'Total cost of ownership analysis (maintenance, fuel, insurance)',
        'Custom sourcing for rare variants or specific color preferences',
      ],
      actionLabel: 'Consult with Our Team',
      actionPage: 'contact' as PageType,
    },
  ];

  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 text-white rounded-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-zinc-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 block">
              Dealership Capabilities
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-white leading-tight">
              Our Automotive Services
            </h1>
            <p className="text-base text-zinc-300 leading-relaxed font-light">
              From showroom purchases and immediate cash buyouts to on-site biometric facilitation and custom vehicle sourcing, BEST CARz provides complete automotive dealership support in Lahore.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                  {svc.icon}
                </div>
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-zinc-950">
                    {svc.title}
                  </h3>
                  <span className="text-xs font-semibold text-red-600 block mt-0.5">
                    {svc.subtitle}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {svc.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  {svc.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-100">
                <button
                  onClick={() => {
                    onNavigate(svc.actionPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-between text-xs font-semibold py-2.5 px-4 bg-zinc-50 hover:bg-red-50 text-zinc-800 hover:text-red-700 border border-zinc-200 hover:border-red-200 rounded-md transition-colors"
                >
                  <span>{svc.actionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Inquiry Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-100 rounded-xl p-8 sm:p-10 border border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-950">
              Need assistance with vehicle verification or transfer?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-xl">
              Our DHA Lahore showroom team is on hand from 11:00 AM to 8:00 PM to assist with your specific questions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={createWhatsAppLink("Hello BEST CARz, I have a question regarding your dealership services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md transition-colors"
            >
              <Phone className="w-4 h-4 text-red-400" />
              <span>Call Showroom</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
