export type PageType = 
  | 'home' 
  | 'inventory' 
  | 'vehicle-detail' 
  | 'buy' 
  | 'sell-exchange' 
  | 'sell-your-car'
  | 'seller-dashboard'
  | 'admin-portal'
  | 'services' 
  | 'about' 
  | 'contact';

export type ListingStatus = 'Pending Review' | 'Published' | 'Under Offer' | 'Sold' | 'Rejected';

export interface BuyerInquiry {
  id: string;
  listingId: string;
  vehicleTitle: string;
  askingPriceFormatted: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  message: string;
  offerPrice?: string;
  preferredContact: 'Call' | 'WhatsApp' | 'Email';
  createdAt: string;
  status: 'New' | 'In Touch' | 'Closed';
}

export interface OwnerListing {
  id: string;
  createdAt: string;
  status: ListingStatus;
  isOwnerListing: true;
  featured?: boolean;
  
  // Step 1: Vehicle Details
  make: string;
  model: string;
  variant: string;
  year: number;
  mileage: number;
  engineCapacity: string;
  transmission: 'Automatic' | 'Manual' | 'CVT' | 'e-CVT';
  fuelType: 'Petrol' | 'Hybrid' | 'Diesel';
  exteriorColor: string;
  interiorColor: string;
  registrationCity: string;
  registrationNumber: string;
  numberOfOwners: string;
  askingPrice: number;
  askingPriceFormatted: string;
  condition: string;
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Crossover' | 'Pickup' | '7-Seater';

  // Step 2: Photos
  images: string[];
  photoSlots?: Record<string, string>;

  // Step 3: Seller Information
  seller: {
    fullName: string;
    phone: string;
    whatsapp: string;
    email: string;
    city: string;
    preferredContactMethod: 'Call' | 'WhatsApp' | 'Email' | 'Any';
  };

  // Step 4: Description
  description: string;

  // Admin backoffice fields (internal only, never exposed publicly)
  commissionAgreed?: string; // e.g. "Agreed 1% on sale" or "PKR 50,000 flat"
  commissionStatus?: 'Pending' | 'Paid';
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;

  // Inquiries received for this listing
  inquiries?: BuyerInquiry[];
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  mileage: number; // in kilometers
  price: number; // in PKR
  priceFormatted: string; // e.g. "PKR 74.5 Lakhs"
  transmission: 'Automatic' | 'Manual' | 'CVT' | 'e-CVT';
  fuelType: 'Petrol' | 'Hybrid' | 'Diesel';
  engine: string;
  color: string;
  registrationCity: string;
  location: string;
  condition: string;
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Crossover' | 'Pickup' | '7-Seater';
  availability: 'Available' | 'Reserved' | 'Sold';
  inventoryType?: 'showroom' | 'sample_catalog' | 'owner_listing'; // clearly differentiate verified physical showroom stock, representative market catalog, and third-party owner listings
  ownerListingRef?: OwnerListing;
  featured?: boolean;
  description: string;
  overview: string;
  technicalSpecs: {
    engineDisplacement: string;
    power: string;
    torque: string;
    drivetrain: string;
    transmissionDetail: string;
    fuelTankCapacity: string;
    groundClearance: string;
  };
  features: string[];
  safety: string[];
  interior: string;
  exterior: string;
  fuelEconomy: {
    city: string;
    highway: string;
    notes: string;
  };
  idealFor: string;
  marketPosition: string;
  conditionReport: {
    engineRating: string;
    bodyRating: string;
    tyreRating: string;
    suspensionRating: string;
    biometricStatus: string;
    tokenTaxStatus: string;
    notes: string;
  };
  images: string[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  vehiclePurchased: string;
  review: string;
  date: string;
  city: string;
  rating: number;
}

export interface InventoryFilterState {
  make: string;
  model: string;
  bodyType: string;
  priceRange: string;
  yearMin: string;
  yearMax: string;
  mileageMax: string;
  transmission: string;
  fuelType: string;
  engine: string;
  location: string;
  condition: string;
  inventoryType?: string; // '' for all, 'showroom' for verified showroom cars, 'sample_catalog' for market demo collection
  searchQuery: string;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'mileage-asc';
}
