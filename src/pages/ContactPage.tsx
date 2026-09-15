import React, { useState } from 'react';
import { 
  MapPin, Phone, MessageSquare, Clock, Mail, 
  Send, CheckCircle2, Navigation, ExternalLink 
} from 'lucide-react';
import { BRAND, createWhatsAppLink } from '../lib/constants';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Buying');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'St No 2 E Main Blvd DHA, Iqbal Park, Lahore, 54810, Pakistan'
  )}`;

  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* 1. Header Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 text-white rounded-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-zinc-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 block">
              DHA Lahore Showroom & Inquiries
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-white leading-tight">
              Get in Touch with BEST CARz
            </h1>
            <div className="space-y-1">
              <p className="text-sm font-semibold tracking-wider text-zinc-300 uppercase">
                {BRAND.tagline}
              </p>
              <p className="font-signature text-2xl text-red-400">
                {BRAND.subtagline}
              </p>
            </div>
            <p className="text-base text-zinc-300 leading-relaxed font-light">
              Whether you are looking to purchase a verified vehicle, request a fair market appraisal to sell, or schedule an on-spot physical inspection, our team in Lahore is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Grid: Contact Info & Interactive Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (5 Cols): Business Details & Showroom Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                  Dealership Headquarters
                </span>
                <h3 className="font-editorial text-2xl font-bold text-zinc-950 mt-1">
                  BEST CARz Showroom
                </h3>
              </div>

              <div className="space-y-5 text-xs text-zinc-600">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 text-sm block">Showroom Address</span>
                    <span className="text-zinc-700 leading-relaxed block mt-0.5">
                      {BRAND.address}
                    </span>
                    <span className="text-[11px] text-zinc-400 block mt-1">
                      Located on Main Boulevard DHA near Iqbal Park, Lahore
                    </span>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 text-sm block">Direct Phone</span>
                    <a
                      href={`tel:${BRAND.phoneRaw}`}
                      className="text-zinc-900 hover:text-red-600 font-semibold text-sm block mt-0.5 transition-colors"
                    >
                      {BRAND.phone}
                    </a>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">
                      Direct connection to showroom desk
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 text-sm block">WhatsApp Concierge</span>
                    <a
                      href={createWhatsAppLink("Hello BEST CARz, I'm reaching out from your website.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 font-semibold text-sm block mt-0.5 transition-colors"
                    >
                      {BRAND.whatsapp}
                    </a>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">
                      Fast responses during operating hours
                    </span>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-md bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 text-sm block">Business Hours</span>
                    <span className="text-zinc-800 font-medium block mt-0.5">
                      {BRAND.hours}
                    </span>
                    <span className="text-[11px] text-zinc-500 block mt-0.5">
                      {BRAND.days}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-100">
                <a
                  href={createWhatsAppLink("Hello BEST CARz, I would like to schedule a showroom visit.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${BRAND.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>Call Showroom</span>
                </a>
              </div>
            </div>

            {/* Showroom Visit Invitation Banner */}
            <div className="bg-red-50/70 border border-red-200 rounded-xl p-6 text-xs text-red-950 space-y-2">
              <h4 className="font-editorial text-lg font-bold text-red-950">
                Showroom Visit Invitation
              </h4>
              <p className="leading-relaxed text-zinc-700">
                "Visit our showroom during business hours for vehicle inspection and consultation. Our sales specialists will present vehicles under showroom lighting with complete maintenance history."
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols): Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-10 shadow-md">
              <div className="border-b border-zinc-200 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                  Send a Direct Message
                </span>
                <h3 className="font-editorial text-3xl font-bold text-zinc-950 mt-1">
                  Dealership Contact Form
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Have an inquiry regarding buying, selling, or exchanging? Fill out the form below.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-editorial text-2xl font-bold text-emerald-950">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you, {name}. Your inquiry ({inquiryType}) has been dispatched to our sales team in DHA Lahore. We will contact you at {phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                        Inquiry Nature
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                      >
                        <option value="Buying">Buying a Vehicle</option>
                        <option value="Selling">Selling My Vehicle</option>
                        <option value="Exchanging">Exchanging / Trade-in</option>
                        <option value="Inspection">Inspection / Biometric Question</option>
                        <option value="General">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                      Your Message or Vehicle Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please let us know which car model you are inquiring about, or describe your vehicle for sale..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-red-600"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visual Map & Direction Guide for Lahore */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
          <div className="p-6 sm:p-8 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Finding Us in Lahore
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-950 mt-1">
                Showroom Location & Navigation
              </h3>
              <p className="text-xs text-zinc-600 mt-1">
                St No 2 E Main Blvd DHA, Iqbal Park, Lahore, 54810, Pakistan
              </p>
            </div>

            <a
              href={BRAND.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold py-2.5 px-4 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors self-start sm:self-auto"
            >
              <Navigation className="w-4 h-4 text-red-500" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </div>

          {/* Embedded Interactive Google Map */}
          <div className="w-full h-80 sm:h-96 md:h-[420px] bg-zinc-100 relative border-b border-zinc-200">
            <iframe
              src={BRAND.googleMapsEmbedUrl}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BEST CARZ DHA Showroom Google Map Location"
            ></iframe>
          </div>

          {/* Stylized Visual Map Card */}
          <div className="p-6 sm:p-10 bg-zinc-950 text-white relative">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-4 h-4" />
                <span>Lahore Landmark Directions</span>
              </div>
              <h4 className="font-editorial text-2xl font-bold text-white">
                Easily Accessible from Ring Road & Main Boulevard DHA
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>From Lahore Ring Road (DHA Phase 5 / Phase 6 Interchange):</strong> Head toward Main Boulevard DHA; Iqbal Park is situated minutes from the primary commercial corridor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>From Cantt / Mall Road:</strong> Proceed via Sherpao Bridge into DHA Main Boulevard directly to Street No. 2.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Dedicated Customer Parking:</strong> Secure front-row parking available for client vehicle inspections.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
