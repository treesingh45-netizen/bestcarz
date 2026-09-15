import React, { useState } from 'react';
import { 
  RefreshCw, DollarSign, ShieldCheck, CheckCircle2, 
  ArrowRight, MessageSquare, Phone, Upload, Sparkles, Send
} from 'lucide-react';
import { PageType } from '../types';
import { BRAND, createWhatsAppLink } from '../lib/constants';

interface SellExchangePageProps {
  onNavigate: (page: PageType) => void;
}

export const SellExchangePage: React.FC<SellExchangePageProps> = ({ onNavigate }) => {
  const [formType, setFormType] = useState<'sell' | 'exchange'>('sell');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [regCity, setRegCity] = useState('Lahore');
  const [transmission, setTransmission] = useState('Automatic');
  const [condition, setCondition] = useState('Excellent (Total Genuine)');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [desiredCar, setDesiredCar] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || !phone || !ownerName) return;
    setSubmitted(true);
  };

  const whatsappValuationText = `Hello BEST CARz, I would like an appraisal to ${formType === 'sell' ? 'SELL' : 'EXCHANGE'} my car:%0A- Make & Model: ${make || '[Car Name]'} ${year || ''}%0A- Mileage: ${mileage || '[Mileage]'}%0A- Registration: ${regCity}%0A- Condition: ${condition}%0A- Asking Demand: ${expectedPrice || '[Price]'}`;

  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* 1. Header Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 text-white rounded-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-zinc-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-red-400">
              <span>BUY • SALE • EXCHANGE — ANY CAR • ANY MODEL</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-white leading-tight">
              Sell or Exchange Your Car Without Hassle
            </h1>
            <p className="text-base text-zinc-300 leading-relaxed font-light">
              Get an honest market valuation for your vehicle at BEST CARz in DHA Lahore. Sell directly for prompt, secure payment or upgrade seamlessly by exchanging for any car in our inventory.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Direct Comparison: Sell vs Exchange */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600">
            Choose Your Preferred Path
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Sell Directly or Upgrade via Exchange
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            Both options are handled with verified inspections, on-spot biometric transfers, and zero hidden dealership deductions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Option A: Direct Cash Sale */}
          <div className="bg-white p-8 rounded-xl border-2 border-zinc-200 hover:border-zinc-300 transition-colors space-y-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-zinc-900">
                Direct Cash Sale
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Sell your car directly to BEST CARz. We inspect your vehicle, agree on fair market value, and finalize secure payment with instant biometric transfer. No endless phone calls from random classified buyers.
              </p>

              <div className="space-y-2 pt-2 text-xs text-zinc-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Prompt payment via certified bank transfer or pay order</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Immediate biometric ownership transfer from your name</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No security risks of unknown strangers visiting your family residence</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setFormType('sell');
                const formElem = document.getElementById('appraisal-form');
                formElem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-md text-xs transition-colors"
            >
              Get Appraisal to Sell
            </button>
          </div>

          {/* Option B: Trade-In / Exchange */}
          <div className="bg-white p-8 rounded-xl border-2 border-red-600/30 hover:border-red-600/60 transition-colors space-y-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-zinc-900">
                Vehicle Exchange / Upgrade
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Drive into our DHA showroom in your current car and drive away in your next one. We evaluate your existing vehicle and deduct its full agreed value from your chosen upgrade.
              </p>

              <div className="space-y-2 pt-2 text-xs text-zinc-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Exchange any car, any model (Hatchback to Sedan, Sedan to SUV)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Seamless same-day transition without being left without a vehicle</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Settle the difference conveniently via bank payment</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setFormType('exchange');
                const formElem = document.getElementById('appraisal-form');
                formElem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-xs transition-colors"
            >
              Calculate Exchange Difference
            </button>
          </div>
        </div>
      </section>

      {/* 3. The 4-Step Exchange Process */}
      <section className="bg-zinc-100 py-16 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Simple 4-Step Journey
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
              How the Exchange Process Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-red-600 block">Step 01</span>
              <h4 className="font-editorial text-lg font-bold text-zinc-900">Bring In Your Car</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Visit our DHA Lahore showroom or submit your car details online for preliminary valuation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-red-600 block">Step 02</span>
              <h4 className="font-editorial text-lg font-bold text-zinc-900">Dealership Inspection</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Our technicians verify engine, paint, chassis, and token tax paperwork within 20 minutes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-red-600 block">Step 03</span>
              <h4 className="font-editorial text-lg font-bold text-zinc-900">Agree on Value</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                We present a competitive, fair market offer based on current Lahore vehicle transaction prices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-red-600 block">Step 04</span>
              <h4 className="font-editorial text-lg font-bold text-zinc-900">Drive Away Upgraded</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Pay or receive the difference, execute biometric verification, and drive away in your upgraded car.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Appraisal Form */}
      <section id="appraisal-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-zinc-200 shadow-lg p-6 sm:p-10">
          <div className="border-b border-zinc-200 pb-6 mb-8 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Official Dealership Appraisal
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-950">
              Vehicle Valuation & Trade-In Form
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Submit your car details below. You can also send photographs directly via WhatsApp for faster preliminary quotation.
            </p>

            {/* Toggle Tabs */}
            <div className="flex items-center gap-2 mt-6 p-1 bg-zinc-100 rounded-lg max-w-xs mx-auto sm:mx-0">
              <button
                type="button"
                onClick={() => setFormType('sell')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
                  formType === 'sell'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                I Want to Sell
              </button>
              <button
                type="button"
                onClick={() => setFormType('exchange')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
                  formType === 'exchange'
                    ? 'bg-white text-red-600 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                I Want to Exchange
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h3 className="font-editorial text-2xl font-bold text-emerald-950">
                Appraisal Request Received
              </h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                Thank you, {ownerName}. Our evaluation manager will review your {year} {make} {model} and contact you at {phone} within 2 hours with our assessment and inspection schedule.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${BRAND.whatsappRaw}?text=${encodeURIComponent(whatsappValuationText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Photos on WhatsApp Now</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Car Basic Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Make / Brand *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Toyota, Honda, Suzuki"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Model & Variant *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Civic RS, Corolla Grande"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Model Year *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2022"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Current Mileage (km)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 35000"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Registration City
                  </label>
                  <select
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  >
                    <option value="Lahore">Lahore (Punjab)</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Karachi">Karachi (Sindh)</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Transmission
                  </label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  >
                    <option value="Automatic">Automatic / CVT</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>

              {/* Condition & Expected Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Vehicle Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  >
                    <option value="Excellent (Total Genuine)">Excellent (Total Genuine / Scratchless)</option>
                    <option value="Good (Minor Touch-ups)">Good (Minor 1-2 pieces touched)</option>
                    <option value="Fair (Requires work)">Fair (Multiple repaints / scratches)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Expected Selling Price (PKR)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 52 Lakhs"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* If Exchange: Desired car */}
              {formType === 'exchange' && (
                <div className="p-4 bg-red-50/70 rounded-md border border-red-200 space-y-1">
                  <label className="block text-xs font-bold text-red-900 uppercase">
                    Which Car Do You Want to Exchange For?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Toyota Fortuner Legender / Honda Civic 2022"
                    value={desiredCar}
                    onChange={(e) => setDesiredCar(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-red-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                  <span className="text-[11px] text-red-700 block">
                    You can pick any vehicle from our current inventory or request a model we can source for you.
                  </span>
                </div>
              )}

              {/* Photos & Notes */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                  Vehicle Details & Photo Submission
                </label>
                <div className="p-4 bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-md text-center space-y-2">
                  <Upload className="w-6 h-6 text-zinc-400 mx-auto" />
                  <p className="text-xs text-zinc-600">
                    To receive an accurate quote, please send exterior & interior photos directly to our WhatsApp evaluation desk.
                  </p>
                  <a
                    href={createWhatsAppLink("Hello BEST CARz, I would like to share photos of my car for valuation.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Click here to open WhatsApp (+92 321 0389000)</span>
                  </a>
                </div>
              </div>

              {/* Owner Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0321 0000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit Vehicle for Dealership Appraisal</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
