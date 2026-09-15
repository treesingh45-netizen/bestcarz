import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, ArrowUpRight, Facebook, Linkedin } from 'lucide-react';
import { PageType } from '../types';
import { BRAND, createWhatsAppLink } from '../lib/constants';
import { AppStoreBadges } from './AppStoreBadges';
import { AppDownloadModal } from './AppDownloadModal';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [appModalPlatform, setAppModalPlatform] = useState<'android' | 'ios' | 'all'>('all');

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Col 1: Brand & Credo */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-editorial text-3xl font-bold tracking-tight text-white">
                BEST <span className="text-red-500">CARz</span>
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mt-0.5">
                {BRAND.tagline}
              </span>
              <span className="font-signature text-lg text-red-400 mt-1">
                {BRAND.subtagline}
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              An established automotive dealership based in DHA Lahore. Built on transparent vehicle inspection, reliable paperwork verification, and fair market dealing across Pakistan.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
              <a
                href={createWhatsAppLink("Hello BEST CARz, I'm interested in buying or selling a vehicle in Lahore.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat via WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <div className="flex items-center gap-1.5">
                <a
                  href={BRAND.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-blue-400 border border-zinc-700 rounded-sm transition-colors"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-sky-400 border border-zinc-700 rounded-sm transition-colors"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-white transition-colors text-zinc-400 hover:translate-x-1 duration-150 inline-flex items-center"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('inventory')}
                  className="hover:text-white transition-colors text-zinc-400 hover:translate-x-1 duration-150 inline-flex items-center"
                >
                  Car Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('buy')}
                  className="hover:text-white transition-colors text-zinc-400 hover:translate-x-1 duration-150 inline-flex items-center"
                >
                  Buy a Car & Buyer Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('sell-your-car')}
                  className="hover:text-red-400 transition-colors text-white font-semibold hover:translate-x-1 duration-150 inline-flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  List Your Car (Marketplace)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('sell-exchange')}
                  className="hover:text-white transition-colors text-zinc-400 hover:translate-x-1 duration-150 inline-flex items-center"
                >
                  Sell or Exchange Your Car
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="hover:text-white transition-colors text-zinc-400 hover:translate-x-1 duration-150 inline-flex items-center"
                >
                  Our Dealership Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-white transition-colors text-zinc-400 hover:translate-x-1 duration-150 inline-flex items-center"
                >
                  About BEST CARz
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-white transition-colors text-zinc-400 hover:translate-x-1 duration-150 inline-flex items-center"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Dealership Hours & Operation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Showroom Hours
            </h4>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white font-medium">Business Hours</div>
                  <div className="text-xs text-zinc-400 mt-0.5">{BRAND.hours}</div>
                  <div className="text-xs text-zinc-500">{BRAND.days}</div>
                </div>
              </div>
              <div className="pt-2 text-xs text-zinc-400 border-t border-zinc-900 leading-relaxed">
                Prior appointment recommended for vehicle inspections, detailed mechanical diagnostics, and on-spot biometric transfers.
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Physical Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Lahore Showroom
            </h4>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white font-medium">Physical Address</div>
                  <div className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                    {BRAND.address}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <div>
                  <span className="text-xs text-zinc-500 block">Direct Phone</span>
                  <a
                    href={`tel:${BRAND.phoneRaw}`}
                    className="text-white hover:text-red-400 transition-colors font-medium text-xs"
                  >
                    {BRAND.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-xs text-zinc-500 block">WhatsApp Desk</span>
                  <a
                    href={createWhatsAppLink("Hello BEST CARz")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 transition-colors font-medium text-xs"
                  >
                    {BRAND.whatsapp}
                  </a>
                </div>
              </div>

              {/* Download Mobile Apps */}
              <div className="pt-3 border-t border-zinc-900 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                  Download Mobile Apps
                </span>
                <AppStoreBadges
                  size="sm"
                  onBadgeClick={(platform) => {
                    setAppModalPlatform(platform);
                    setAppModalOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>



        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© BEST CARz. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>BUY • SALE • EXCHANGE</span>
            <span>ANY CAR • ANY MODEL</span>
            <span>Lahore, Pakistan</span>
          </div>
        </div>
      </div>

      {/* Mobile App Download & Early Access Modal */}
      <AppDownloadModal
        isOpen={appModalOpen}
        onClose={() => setAppModalOpen(false)}
        platform={appModalPlatform}
      />
    </footer>
  );
};
