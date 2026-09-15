import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { BRAND, createWhatsAppLink } from '../lib/constants';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-zinc-900 px-3.5 py-2 rounded-full shadow-lg border border-zinc-200 text-xs font-medium animate-in fade-in slide-in-from-right duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Chat with BEST CARz</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-400 hover:text-zinc-600 ml-1 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <a
        href={createWhatsAppLink("Hello BEST CARz, I’m interested in a vehicle and would like more information.")}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 transition-transform active:scale-95 hover:scale-105"
        aria-label="Open WhatsApp conversation with BEST CARz"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 border-2 border-white rounded-full"></span>
      </a>
    </aside>
  );
};
