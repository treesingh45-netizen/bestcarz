import React from 'react';
import { 
  ShieldCheck, Award, MapPin, Clock, Phone, MessageSquare, 
  CheckCircle2, ArrowRight, Sparkles 
} from 'lucide-react';
import { PageType } from '../types';
import { BRAND, createWhatsAppLink } from '../lib/constants';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 text-white rounded-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-zinc-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 block">
              Our Heritage & Philosophy
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-white leading-tight">
              About BEST CARz
            </h1>
            <div className="space-y-1">
              <p className="text-base font-semibold tracking-wide text-zinc-200 uppercase">
                {BRAND.tagline}
              </p>
              <p className="font-signature text-2xl text-red-400">
                {BRAND.subtagline}
              </p>
            </div>
            <p className="text-base text-zinc-300 leading-relaxed font-light">
              An established automotive dealership based in DHA Lahore. Built on the principles of transparent vehicle inspection, reliable paperwork verification, and fair market dealing across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Dealership Story & High-Resolution Showroom Atmosphere */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              The BEST CARz Distinction
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950">
              Restoring Confidence to the Pakistani Car Market
            </h2>
            <p className="text-sm text-zinc-700 leading-relaxed">
              In a marketplace historically burdened by ambiguous mechanical conditions, odometer tampering, and disputed biometric transfers, <strong>BEST CARz</strong> was established to provide vehicle buyers and sellers with an uncompromised standard of dealership excellence.
            </p>
            <p className="text-sm text-zinc-700 leading-relaxed">
              Located strategically on St No 2 E Main Boulevard DHA (Iqbal Park), Lahore, our showroom is designed to be an open, professional venue where automotive buyers can examine verified vehicles at leisure, conduct comprehensive test drives, and review original documentation in complete clarity.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onNavigate('inventory');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold py-3 px-6 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                <span>Browse Current Showroom Cars</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
                alt="BEST CARz Lahore Showroom Atmosphere"
                className="w-full aspect-4/3 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="font-editorial text-xl font-bold">Showroom Presence in DHA Lahore</div>
                  <div className="text-xs text-zinc-300">St No 2 E Main Blvd DHA, Iqbal Park, Lahore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Mission Pillars */}
      <section className="bg-zinc-100 py-16 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Our Core Mission
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
              What Guides Every Deal
            </h2>
            <p className="text-sm text-zinc-600 mt-2">
              Four fundamental commitments that define how BEST CARz serves every customer in Lahore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-editorial text-xl font-bold text-zinc-900">
                Transparent Inspection
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                We disclose every paint touch-up, panel replacement, and mechanical nuance before closing any deal. No surprises.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-editorial text-xl font-bold text-zinc-900">
                Fair Market Values
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Whether you are buying, selling, or exchanging, our numbers are rooted in real prevailing Lahore market transactions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-editorial text-xl font-bold text-zinc-900">
                Clear Documentation
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Biometric transfer is not left as an afterthought. We facilitate legal ownership transfer on spot with Punjab Excise MTMIS compliance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-editorial text-xl font-bold text-zinc-900">
                Any Car • Any Model
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                From budget 660cc city hatchbacks to 4x4 off-roaders and luxury sedans, we cater to every budget and requirement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Business Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-zinc-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-zinc-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Dealership Registry & Details
            </span>
            <h3 className="font-editorial text-3xl font-bold text-zinc-950 mt-1">
              Official Business Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase">Business Legal Name</span>
              <div className="font-editorial text-2xl font-bold text-zinc-950">{BRAND.name}</div>
              <span className="text-xs text-zinc-500 block">{BRAND.tagline}</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase">Physical Address</span>
              <div className="font-medium text-zinc-900 leading-relaxed">{BRAND.address}</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase">Operating Hours</span>
              <div className="font-medium text-zinc-900">{BRAND.hours}</div>
              <div className="text-xs text-zinc-500">{BRAND.days}</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase">Telephone Desk</span>
              <a href={`tel:${BRAND.phoneRaw}`} className="font-medium text-zinc-900 hover:text-red-600 block">
                {BRAND.phone}
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase">WhatsApp Concierge</span>
              <a
                href={createWhatsAppLink("Hello BEST CARz")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-700 hover:text-emerald-800 block"
              >
                {BRAND.whatsapp}
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase">Primary Region</span>
              <div className="font-medium text-zinc-900">Lahore, Punjab, Pakistan</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
