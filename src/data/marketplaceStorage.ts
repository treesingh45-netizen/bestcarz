import { OwnerListing, BuyerInquiry, Vehicle } from '../types';

const STORAGE_KEY = 'bestcarz_marketplace_listings';
const INQUIRIES_KEY = 'bestcarz_marketplace_inquiries';

export const INITIAL_OWNER_LISTINGS: OwnerListing[] = [
  {
    id: 'ol-vezel-z-2019-dha',
    createdAt: '2026-03-08T10:30:00Z',
    status: 'Published',
    featured: true,
    isOwnerListing: true,
    make: 'Honda',
    model: 'Vezel',
    variant: '1.5 Hybrid Z Sensing',
    year: 2019,
    mileage: 52000,
    engineCapacity: '1496 cc',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    exteriorColor: 'Crystal Black Pearl',
    interiorColor: 'Two-Tone Brown / Black Leather',
    registrationCity: 'Lahore (Punjab)',
    registrationNumber: 'LEC-19-4589',
    numberOfOwners: '1st Owner',
    askingPrice: 6850000,
    askingPriceFormatted: 'PKR 68.50 Lakhs',
    condition: 'Excellent / 1 Fender Minor Touchup',
    bodyType: 'Crossover',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      fullName: 'Hamza Tariq (Private Owner)',
      phone: '+92 300 8472910',
      whatsapp: '+92 300 8472910',
      email: 'hamza.tariq@gmail.com',
      city: 'DHA Phase 5, Lahore',
      preferredContactMethod: 'WhatsApp',
    },
    description: 'Selling my personal Honda Vezel Z Sensing. Single handed driven in DHA Lahore and Motorway only. Regular oil changes with Mobil 1 synthetic. Dual zone AC, lane assist, adaptive cruise, half leather seats, Japanese alloy wheels. Punjab smart card and biometric readily available on spot.',
    commissionAgreed: 'Agreed 1% upon verified closing',
    commissionStatus: 'Pending',
    adminNotes: 'Verified seller CNIC and Excise biometric scan in Punjab MTMIS. Clean vehicle, recommended for buyers.',
    reviewedBy: 'BEST CARz Verification Desk',
    reviewedAt: '2026-03-09T14:20:00Z',
    inquiries: [
      {
        id: 'inq-101',
        listingId: 'ol-vezel-z-2019-dha',
        vehicleTitle: '2019 Honda Vezel 1.5 Hybrid Z Sensing',
        askingPriceFormatted: 'PKR 68.50 Lakhs',
        buyerName: 'Dr. Asad Qureshi',
        buyerPhone: '0321-4455889',
        buyerEmail: 'drasad@example.com',
        message: 'Is the battery health tested? Can I visit the DHA showroom to inspect it this weekend?',
        offerPrice: '67.0 Lakhs',
        preferredContact: 'Call',
        createdAt: '2026-03-11T12:00:00Z',
        status: 'In Touch',
      },
    ],
  },
  {
    id: 'ol-yaris-ativ-x-2022-isb',
    createdAt: '2026-03-10T15:45:00Z',
    status: 'Published',
    featured: false,
    isOwnerListing: true,
    make: 'Toyota',
    model: 'Yaris',
    variant: '1.5 ATIV X CVT',
    year: 2022,
    mileage: 38000,
    engineCapacity: '1496 cc',
    transmission: 'CVT',
    fuelType: 'Petrol',
    exteriorColor: 'Super White',
    interiorColor: 'Beige / Black',
    registrationCity: 'Islamabad',
    registrationNumber: 'ICT-22-9012',
    numberOfOwners: '1st Owner',
    askingPrice: 4750000,
    askingPriceFormatted: 'PKR 47.50 Lakhs',
    condition: 'Total Bumper-to-Bumper Genuine',
    bodyType: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      fullName: 'Babar Munir (Govt Officer)',
      phone: '+92 333 5128790',
      whatsapp: '+92 333 5128790',
      email: 'babar.munir@gov.pk',
      city: 'Islamabad / Lahore',
      preferredContactMethod: 'Call',
    },
    description: 'Top-of-the-line Toyota Yaris ATIV X 1.5 CVT. Islamabad registered, 100% bumper to bumper genuine factory paint. Push button start, climate control, steering switches, multimedia screen, rear camera. Driven strictly within Islamabad sectors and Ring Road.',
    commissionAgreed: 'PKR 40,000 standard broker commission on sale',
    commissionStatus: 'Pending',
    adminNotes: 'Inspection verified genuine seals and odometer integrity.',
    reviewedBy: 'BEST CARz Quality Lead',
    reviewedAt: '2026-03-11T09:15:00Z',
    inquiries: [],
  },
  {
    id: 'ol-alto-vxl-ags-2023-gulberg',
    createdAt: '2026-03-12T11:20:00Z',
    status: 'Pending Review',
    featured: false,
    isOwnerListing: true,
    make: 'Suzuki',
    model: 'Alto',
    variant: '660cc VXL AGS',
    year: 2023,
    mileage: 18000,
    engineCapacity: '658 cc',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    exteriorColor: 'Silky Silver Metallic',
    interiorColor: 'Grey',
    registrationCity: 'Lahore (Punjab)',
    registrationNumber: 'LEA-23-7721',
    numberOfOwners: '1st Owner',
    askingPrice: 3050000,
    askingPriceFormatted: 'PKR 30.50 Lakhs',
    condition: 'Scratchless / Zero Touchup',
    bodyType: 'Hatchback',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      fullName: 'Kamran Siddiqui',
      phone: '+92 322 9845110',
      whatsapp: '+92 322 9845110',
      email: 'kamran.siddiqui@techpk.com',
      city: 'Gulberg III, Lahore',
      preferredContactMethod: 'WhatsApp',
    },
    description: 'Urgent sale for family relocation. Alto VXL with Auto Gear Shift, ABS, dual airbags, and power windows. 20+ km/l real average in city traffic. First free services done at Suzuki certified dealership.',
    commissionAgreed: 'Agreed on standard seller terms',
    commissionStatus: 'Pending',
    adminNotes: 'Awaiting seller photos of engine bay and chassis stamp before publishing.',
    inquiries: [],
  },
];

export function getStoredOwnerListings(): OwnerListing[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_OWNER_LISTINGS));
      return INITIAL_OWNER_LISTINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_OWNER_LISTINGS;
  }
}

export function saveStoredOwnerListings(listings: OwnerListing[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
    window.dispatchEvent(new Event('bestcarz_listings_updated'));
  } catch (e) {
    console.error('Failed to save owner listings', e);
  }
}

export function createOwnerListing(data: Omit<OwnerListing, 'id' | 'createdAt' | 'status' | 'isOwnerListing'>): OwnerListing {
  const current = getStoredOwnerListings();
  const newListing: OwnerListing = {
    ...data,
    id: `ol-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'Pending Review', // Do not automatically publish
    isOwnerListing: true,
    inquiries: [],
  };
  const updated = [newListing, ...current];
  saveStoredOwnerListings(updated);
  return newListing;
}

export function updateListingStatus(
  id: string,
  status: OwnerListing['status'],
  extra?: {
    adminNotes?: string;
    commissionAgreed?: string;
    commissionStatus?: 'Pending' | 'Paid';
    featured?: boolean;
  }
): void {
  const current = getStoredOwnerListings();
  const updated = current.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(extra?.adminNotes !== undefined ? { adminNotes: extra.adminNotes } : {}),
        ...(extra?.commissionAgreed !== undefined ? { commissionAgreed: extra.commissionAgreed } : {}),
        ...(extra?.commissionStatus !== undefined ? { commissionStatus: extra.commissionStatus } : {}),
        ...(extra?.featured !== undefined ? { featured: extra.featured } : {}),
        reviewedBy: 'BEST CARz Desk',
        reviewedAt: new Date().toISOString(),
      };
    }
    return item;
  });
  saveStoredOwnerListings(updated);
}

export function deleteOwnerListing(id: string): void {
  const current = getStoredOwnerListings();
  const updated = current.filter((item) => item.id !== id);
  saveStoredOwnerListings(updated);
}

export function addBuyerInquiryToListing(
  listingId: string,
  inquiryData: Omit<BuyerInquiry, 'id' | 'createdAt' | 'status' | 'listingId'>
): BuyerInquiry {
  const current = getStoredOwnerListings();
  const newInquiry: BuyerInquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}`,
    listingId,
    createdAt: new Date().toISOString(),
    status: 'New',
  };

  const updated = current.map((item) => {
    if (item.id === listingId) {
      return {
        ...item,
        inquiries: [newInquiry, ...(item.inquiries || [])],
      };
    }
    return item;
  });

  saveStoredOwnerListings(updated);
  return newInquiry;
}

// Convert a published owner listing into the standard Vehicle interface for catalog & detail views
export function ownerListingToVehicle(listing: OwnerListing): Vehicle {
  return {
    id: listing.id,
    make: listing.make,
    model: listing.model,
    variant: listing.variant,
    year: listing.year,
    mileage: listing.mileage,
    price: listing.askingPrice,
    priceFormatted: listing.askingPriceFormatted,
    transmission: listing.transmission,
    fuelType: listing.fuelType,
    engine: listing.engineCapacity,
    color: listing.exteriorColor,
    registrationCity: listing.registrationCity,
    location: `${listing.seller.city} (Owner Listing via BEST CARz)`,
    condition: listing.condition,
    bodyType: listing.bodyType,
    availability: listing.status === 'Sold' ? 'Sold' : listing.status === 'Under Offer' ? 'Reserved' : 'Available',
    inventoryType: 'owner_listing',
    ownerListingRef: listing,
    featured: listing.featured,
    description: listing.description,
    overview: `Owner Listing submitted by ${listing.seller.fullName} in ${listing.seller.city}. Brokered and promoted by BEST CARz with transparent commission terms.`,
    technicalSpecs: {
      engineDisplacement: listing.engineCapacity,
      power: 'Standard OEM specification',
      torque: 'Standard OEM specification',
      drivetrain: 'Front Wheel Drive (FWD)',
      transmissionDetail: `${listing.transmission} transmission`,
      fuelTankCapacity: 'Standard factory capacity',
      groundClearance: '150 mm',
    },
    features: [
      `${listing.numberOfOwners} Owned`,
      `Registration: ${listing.registrationNumber} (${listing.registrationCity})`,
      `Interior: ${listing.interiorColor}`,
      'Air Conditioning & Heater',
      'Power Steering & Power Windows',
      'Keyless Entry / Remote',
      'Sound System with Bluetooth',
    ],
    safety: [
      'Anti-Lock Braking System (ABS)',
      'Dual Front Airbags',
      'Seatbelt Pretensioners',
      'Security Alarm & Immobilizer',
    ],
    interior: `${listing.interiorColor} interior in ${listing.condition} condition.`,
    exterior: `Finished in ${listing.exteriorColor}. ${listing.condition}.`,
    fuelEconomy: {
      city: '11.0 - 14.0 km/l (estimated)',
      highway: '15.0 - 18.0 km/l (estimated)',
      notes: 'Fuel efficiency varies with driving habits and AC usage.',
    },
    idealFor: 'Buyers seeking authentic pre-owned private vehicles in Pakistan with BEST CARz facilitation.',
    marketPosition: 'Verified private seller vehicle with seller contact and BEST CARz commission facilitation.',
    conditionReport: {
      engineRating: '8.8 / 10 (Seller declared)',
      bodyRating: '8.5 / 10 (Seller declared condition)',
      tyreRating: '8.0 / 10 (Good usable tread)',
      suspensionRating: '8.5 / 10 (Smooth drive)',
      biometricStatus: 'Seller guarantees verified biometric transfer in Punjab / ICT',
      tokenTaxStatus: 'Up to date as per seller declaration',
      notes: 'Owner listing. BEST CARz advises independent 150-point physical verification before payment.',
    },
    images: listing.images.length > 0 ? listing.images : [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    ],
  };
}
