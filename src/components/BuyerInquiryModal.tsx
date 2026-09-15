import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, MessageSquare, ShieldCheck, Car } from 'lucide-react';
import { Vehicle, OwnerListing } from '../types';
import { BRAND, createWhatsAppLink } from '../lib/constants';
import { addBuyerInquiryToListing } from '../data/marketplaceStorage';

interface BuyerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  ownerListing?: OwnerListing | null;
}

export const BuyerInquiryModal: React.FC<BuyerInquiryModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  ownerListing,
}) => {
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [message, setMessage] = useState(
    'Assalam-o-Alaikum, I am interested in this vehicle. Is it currently available for physical inspection and biometric transfer?'
  );
  const [preferredContact, setPreferredContact] = useState<'Call' | 'WhatsApp' | 'Email'>('WhatsApp');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !vehicle) return null;

  const vehicleTitle = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`;
  const isOwnerListing = vehicle.inventoryType === 'owner_listing' || Boolean(ownerListing);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) return;

    if (ownerListing) {
      addBuyerInquiryToListing(ownerListing.id, {
        vehicleTitle,
        askingPriceFormatted: vehicle.priceFormatted,
        buyerName,
        buyerPhone,
        buyerEmail,
        message,
        offerPrice,
        preferredContact,
      });
    }

    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  const whatsappMessage = `Assalam-o-Alaikum BEST CARz,%0A%0AI am interested in the vehicle inquiry on your website:%0A- Vehicle: ${vehicleTitle}%0A- Demand: ${vehicle.priceFormatted}%0A- Reg: ${vehicle.registrationCity}%0A- Listing Type: ${isOwnerListing ? 'Owner Listing (' + (ownerListing?.id || vehicle.id) + ')' : 'DHA Showroom Stock'}%0A%0APlease let me know the inspection availability.`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-zinc-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-zinc-950 text-white p-5 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-600 text-white">
                {isOwnerListing ? 'Owner Listing Inquiry' : 'Showroom Car Inquiry'}
              </span>
              <span className="text-xs text-zinc-400">Ref #{vehicle.id}</span>
            </div>
            <h3 className="font-editorial text-xl font-bold text-white leading-snug">
              {vehicleTitle}
            </h3>
            <p className="text-xs text-zinc-300 font-mono">
              Demand: <span className="text-emerald-400 font-bold">{vehicle.priceFormatted}</span> • {vehicle.registrationCity}
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-editorial text-2xl font-bold text-zinc-900">
                Inquiry Transmitted Successfully
              </h4>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{buyerName}</strong>! Your inquiry for <strong>{vehicleTitle}</strong> has been logged. {isOwnerListing ? 'BEST CARz will notify the vehicle owner and facilitate communication while safeguarding both parties.' : 'Our DHA Lahore showroom team will reach out to you shortly.'}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
                <a
                  href={createWhatsAppLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Follow-up</span>
                </a>
                <button
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-md text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-zinc-900">
                  <Car className="w-3.5 h-3.5 text-red-600" />
                  <span>Vehicle Attached Automatically:</span>
                </div>
                <div className="text-zinc-600 pl-5">
                  {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.mileage.toLocaleString()} km) • Reg: {vehicle.registrationCity}
                </div>
                {isOwnerListing && (
                  <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded mt-2 border border-amber-200 flex items-start gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      This is an <strong>OWNER LISTING</strong>. BEST CARz mediates buyer-seller communication, arranges vehicle inspections, and oversees secure payment & biometric transfer upon closing.
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Your Price Offer (PKR, Optional)
                  </label>
                  <input
                    type="text"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    placeholder="e.g. PKR 65 Lakhs"
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Message / Specific Questions
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Preferred Contact Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['WhatsApp', 'Call', 'Email'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPreferredContact(method)}
                      className={`py-1.5 px-3 text-xs font-medium rounded-md border text-center transition-all ${
                        preferredContact === method
                          ? 'border-red-600 bg-red-50 text-red-700 font-semibold'
                          : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>

                <a
                  href={createWhatsAppLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${BRAND.phoneRaw}`}
                  className="w-full sm:w-auto py-2.5 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-md font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
