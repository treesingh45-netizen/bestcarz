import React from 'react';
import { Fuel, Gauge, MapPin, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { Vehicle } from '../types';
import { createWhatsAppLink } from '../lib/constants';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicleId: string) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
  const whatsappMessage = `Hello BEST CARz, I’m interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant} (Listed at ${vehicle.priceFormatted}). Please share more details.`;

  return (
    <div className="group bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Vehicle Image Container */}
        <div className="relative aspect-16/10 overflow-hidden bg-zinc-100 cursor-pointer" onClick={() => onSelect(vehicle.id)}>
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase bg-zinc-950/85 text-white backdrop-blur-xs rounded-sm">
              {vehicle.year}
            </span>
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase bg-white/90 text-zinc-900 backdrop-blur-xs rounded-sm border border-zinc-200/50">
              {vehicle.bodyType}
            </span>
          </div>

          <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
            {vehicle.inventoryType === 'owner_listing' ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-zinc-950 backdrop-blur-xs rounded-sm shadow-xs">
                ★ OWNER LISTING
              </span>
            ) : vehicle.inventoryType === 'sample_catalog' ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-amber-700/90 text-white backdrop-blur-xs rounded-sm shadow-xs">
                Demo • Market Sample
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-emerald-700/90 text-white backdrop-blur-xs rounded-sm shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                DHA Showroom Stock
              </span>
            )}
          </div>

          {/* Location watermark */}
          <div className="absolute bottom-2 left-3 flex items-center gap-1 text-[11px] font-medium text-white/90 drop-shadow-md">
            <MapPin className="w-3 h-3 text-red-500" />
            <span>
              {vehicle.inventoryType === 'sample_catalog'
                ? 'Pakistan Market Spec (Sourced on Order)'
                : vehicle.location}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="mb-3">
            <h3
              onClick={() => onSelect(vehicle.id)}
              className="font-editorial text-xl font-bold text-zinc-900 group-hover:text-red-700 transition-colors cursor-pointer line-clamp-1"
            >
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
              {vehicle.variant}
            </p>
          </div>

          {/* Key Specs Matrix */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-zinc-100 text-zinc-600 text-xs">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">{vehicle.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-400 font-semibold text-[10px]">TR</span>
              <span className="truncate">{vehicle.transmission}</span>
            </div>
          </div>

          {/* Condition note */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-500">
            <ShieldCheck className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span className="truncate">{vehicle.condition}</span>
          </div>
        </div>
      </div>

      {/* Card Footer with Price & Actions */}
      <div className="px-5 pb-5 pt-1">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Demand</span>
          <span className="font-editorial text-xl sm:text-2xl font-bold text-zinc-950">
            {vehicle.priceFormatted}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelect(vehicle.id)}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 bg-zinc-900 hover:bg-red-700 text-white rounded-sm transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={createWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 bg-zinc-100 hover:bg-emerald-50 text-zinc-800 hover:text-emerald-700 border border-zinc-200 hover:border-emerald-200 rounded-sm transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
