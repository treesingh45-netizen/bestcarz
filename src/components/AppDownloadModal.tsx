import React, { useState } from 'react';
import { X, Smartphone, QrCode, CheckCircle2, MessageSquare, Download, Share2 } from 'lucide-react';
import { BRAND, createWhatsAppLink } from '../lib/constants';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform?: 'android' | 'ios' | 'all';
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  platform = 'all',
}) => {
  const [copied, setCopied] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notified, setNotified] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.origin;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setNotified(true);
    setTimeout(() => {
      setNotified(false);
      onClose();
    }, 2500);
  };

  const whatsappAppInvite = createWhatsAppLink(
    "Hello BEST CARz, please send me the mobile app download link (Android/iOS) and early access invite."
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-zinc-950 text-white rounded-xl shadow-2xl border border-zinc-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red Brand Accent Bar */}
        <div className="h-1 bg-red-600"></div>

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-white leading-tight">
                BEST CARz Mobile App
              </h3>
              <p className="text-[11px] text-zinc-400">
                {platform === 'android' ? 'Google Play Edition (Android)' : platform === 'ios' ? 'Apple App Store Edition (iOS)' : 'iOS & Android Experience'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Quick Info */}
          <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Early Access & Instant Web App
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full font-semibold">
                Available Now
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              You can install the <strong>BEST CARz Progressive App</strong> instantly to your home screen right now with full offline vehicle browsing, or receive direct WhatsApp early access for the native store releases.
            </p>
          </div>

          {/* Quick Home Screen Installation Instructions */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              How to Install Right Now (Zero Download Wait)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Android Instructions */}
              <div className="p-3 bg-zinc-900/70 border border-zinc-800 rounded-md space-y-1.5">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Android (Chrome / Edge)</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-snug">
                  Tap the browser menu <strong className="text-white">(⋮)</strong> at top right and select <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home screen"</strong>.
                </p>
              </div>

              {/* iOS Instructions */}
              <div className="p-3 bg-zinc-900/70 border border-zinc-800 rounded-md space-y-1.5">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  <span>Apple iOS (Safari)</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-snug">
                  Tap the <strong className="text-white">Share</strong> button (box with upward arrow) at bottom of screen, then tap <strong className="text-white">"Add to Home Screen"</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Share or Notify via WhatsApp */}
          <div className="space-y-2 pt-2 border-t border-zinc-800/80">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Direct App Link via WhatsApp
            </span>
            <div className="flex items-center gap-2">
              <a
                href={whatsappAppInvite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request App on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>BEST CARz • Lahore, Pakistan</span>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
