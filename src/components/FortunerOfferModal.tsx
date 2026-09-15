import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare, Phone, Building2 } from 'lucide-react';
import { BRAND, createWhatsAppLink } from '../lib/constants';
import { PageType } from '../types';

interface FortunerOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageType, vehicleId?: string) => void;
}

export const FortunerOfferModal: React.FC<FortunerOfferModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [tenureYears, setTenureYears] = useState<number>(3);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);

  if (!isOpen) return null;

  // Approximate calculation for Fortuner Legender 2023 (PKR 18,800,000)
  const vehiclePrice = 18800000;
  const downPaymentAmount = (vehiclePrice * downPaymentPercent) / 100;
  const financedAmount = vehiclePrice - downPaymentAmount;
  const annualRate = 0.1399; // 13.99%
  const totalMonths = tenureYears * 12;
  const totalProfit = financedAmount * annualRate * tenureYears;
  const estimatedMonthlyInstallment = Math.round((financedAmount + totalProfit) / totalMonths);

  const formatPKR = (amount: number) => {
    return 'PKR ' + amount.toLocaleString('en-PK');
  };

  const whatsappInquiry = createWhatsAppLink(
    `Hello BEST CARz, I am interested in the Toyota Fortuner 13.99% Financing Offer (Tenure: ${tenureYears} Years, Down Payment: ${downPaymentPercent}%). Please share approval details and partner bank requirements.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Brand Header Accent */}
        <div className="h-1 bg-red-600"></div>

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Partner Financing Offer
              </span>
            </div>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-zinc-950 mt-0.5">
              Toyota Fortuner Financing Plan
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Top Banner with Real Vehicle Photo and Rate Highlight */}
          <div className="flex flex-col sm:flex-row gap-5 items-center bg-zinc-50 p-4 rounded-lg border border-zinc-200">
            <div className="w-full sm:w-44 h-28 rounded-md overflow-hidden bg-zinc-200 shrink-0 border border-zinc-200">
              <img
                src="/fortuner_offer.jpg"
                alt="Toyota Fortuner at BEST CARz"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1 text-center sm:text-left flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 block">
                Exclusive Verified Promotion
              </span>
              <h3 className="font-editorial text-xl font-bold text-zinc-950">
                TOYOTA FORTUNER
              </h3>
              <p className="text-xs text-zinc-600">
                Applicable on showroom and verified inventory Fortuner models (Legender 2.8 & 2.7G).
              </p>
              <div className="flex items-baseline justify-center sm:justify-start gap-1 pt-1">
                <span className="text-xs text-zinc-500 font-medium">Starting From</span>
                <span className="font-editorial text-2xl font-extrabold text-zinc-950">13.99%</span>
                <span className="text-xs text-zinc-500">Fixed/Floating Markup</span>
              </div>
            </div>
          </div>

          {/* Financing Partner Information */}
          <div className="p-4 bg-red-50/50 border border-red-100 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wide">
              <Building2 className="w-4 h-4 text-red-600" />
              <span>Financing Partners & Facility Origin</span>
            </div>
            <p className="text-xs text-zinc-700 leading-relaxed">
              BEST CARz facilitates auto financing in coordination with premier Pakistani banking institutions including <strong>Bank Alfalah Auto Loan</strong> and <strong>Meezan Bank Car Ijarah</strong>. The promotional 13.99% rate tier is available for eligible salaried executives, corporate accounts, and verified business owners subject to credit evaluation.
            </p>
          </div>

          {/* Interactive Estimated Calculator */}
          <div className="space-y-4 border border-zinc-200 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Indicative Installment Calculator
              </span>
              <span className="text-[11px] text-zinc-500">Based on 13.99% per annum</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Down Payment Selector */}
              <div>
                <label className="block text-zinc-600 font-medium mb-1.5">
                  Down Payment: <strong className="text-zinc-950">{downPaymentPercent}% ({formatPKR(downPaymentAmount)})</strong>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[30, 40, 50].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDownPaymentPercent(pct)}
                      className={`py-1.5 text-center font-semibold rounded-sm border transition-colors ${
                        downPaymentPercent === pct
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Tenure Selector */}
              <div>
                <label className="block text-zinc-600 font-medium mb-1.5">
                  Tenure: <strong className="text-zinc-950">{tenureYears} Years ({totalMonths} Months)</strong>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 5].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTenureYears(yr)}
                      className={`py-1.5 text-center font-semibold rounded-sm border transition-colors ${
                        tenureYears === yr
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      {yr} Yr
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimated Result Card */}
            <div className="bg-zinc-900 text-white p-4 rounded-md flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-zinc-400 block uppercase tracking-wider">
                  Estimated Monthly Installment
                </span>
                <div className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {formatPKR(estimatedMonthlyInstallment)} <span className="text-xs font-sans text-zinc-400 font-normal">/ month</span>
                </div>
              </div>
              <div className="text-xs text-zinc-300 text-right space-y-0.5">
                <div>Financed Amount: <strong className="text-white">{formatPKR(financedAmount)}</strong></div>
                <div>Down Payment: <strong className="text-white">{formatPKR(downPaymentAmount)}</strong></div>
              </div>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Islamic (Ijarah) & Conventional options</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Expedited processing within 5–7 business days</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full Punjab Biometric & Paperwork handling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Transparent markup with no hidden dealership fees</span>
            </div>
          </div>

          {/* Required Documents */}
          <div className="text-xs text-zinc-600 space-y-1 bg-zinc-50 p-3 rounded-md border border-zinc-200">
            <span className="font-bold text-zinc-800 block">Documentation Required for Processing:</span>
            <p>1. Valid CNIC copy & 2 passport photos</p>
            <p>2. Salary certificate & 3 months pay slips (for salaried) OR 6 months verified bank statement (for business)</p>
            <p>3. NTN certificate and utility bill copy of residence in Lahore/Punjab</p>
          </div>

          {/* Mandatory Disclaimer */}
          <p className="text-[11px] text-zinc-400 leading-relaxed text-center italic border-t border-zinc-100 pt-3">
            Terms & conditions apply. Financing subject to approval by partner banking institutions. Calculations shown are indicative benchmarks based on 13.99% base tier and may vary per individual credit profile and SBP regulations.
          </p>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigate('vehicle-detail', 'toyota-fortuner-legender-2023');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto text-xs font-semibold text-zinc-800 hover:text-red-600 transition-colors flex items-center justify-center gap-1.5 py-2 px-3"
          >
            <span>View Fortuner Specifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-800 rounded-md text-xs font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>Call Dealership</span>
            </a>

            <a
              href={whatsappInquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Apply via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
