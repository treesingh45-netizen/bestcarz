import React, { useState } from 'react';
import { Phone, MessageSquare, Menu, X, Clock, MapPin, Facebook, Linkedin, PlusCircle } from 'lucide-react';
import { PageType } from '../types';
import { BRAND, createWhatsAppLink } from '../lib/constants';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType, vehicleId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'buy', label: 'Buy' },
    { id: 'sell-your-car', label: 'Sell Your Car' },
    { id: 'sell-exchange', label: 'Sell / Exchange' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-xs">
      {/* Top subtle notification bar */}
      <div className="bg-zinc-950 text-zinc-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6 text-zinc-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              St No 2 E Main Blvd DHA, Iqbal Park, Lahore
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              Hours: {BRAND.hours}
            </span>
          </div>
          <div className="flex items-center space-x-5 text-zinc-300">
            <span className="text-zinc-400 font-signature text-sm tracking-wider text-white">
              Buy • Sale • Exchange — Any Car • Any Model
            </span>
            <div className="flex items-center space-x-2 border-l border-zinc-700 pl-4">
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-blue-400 transition-colors p-0.5"
                title="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={BRAND.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-sky-400 transition-colors p-0.5"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="flex items-center gap-1 text-zinc-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>{BRAND.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col text-left group focus:outline-hidden"
          >
            <div className="flex items-center gap-1">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
                BEST <span className="text-red-600">CARz</span>
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600 mb-1"></span>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-medium text-zinc-500 -mt-1 group-hover:text-red-600 transition-colors">
              BUY • SALE • EXCHANGE
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors relative ${
                    isActive
                      ? 'text-red-600 font-semibold'
                      : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 rounded-sm'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action: Replaced Facebook/LinkedIn with "Post an Ad / List Car" */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <button
              onClick={() => handleNavClick('sell-your-car')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm hover:shadow-md transition-all active:scale-95 group"
            >
              <PlusCircle className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" />
              <span>Post an Ad / List Car</span>
            </button>
          </div>

          {/* Mobile Action & Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('sell-your-car')}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-red-600 text-white rounded-md"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post Ad</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-800 hover:text-red-600 hover:bg-zinc-100 rounded-sm transition-colors ml-0.5"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-red-50 text-red-700 font-semibold'
                      : 'text-zinc-800 hover:bg-zinc-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>}
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-5 border-t border-zinc-200 space-y-3">
            <div className="text-xs text-zinc-500 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600 shrink-0" />
              <span>St No 2 E Main Blvd DHA, Iqbal Park, Lahore</span>
            </div>
            <div className="text-xs text-zinc-500 flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>Business Hours: 11:00 AM – 8:00 PM</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
              <a
                href={BRAND.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
