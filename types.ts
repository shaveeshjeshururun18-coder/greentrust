
export interface Unit {
  id: string;
  weight: string;
  price: number;
  mrp: number;
  discount: string;
}

export interface Product {
  id: string;
  brandEn?: string;
  brandTa?: string;
  nameEn: string;
  nameTa: string;
  image: string;
  category: string;
  isVeg: boolean;
  rating: number;
  ratingCount: number;
  deliveryTime: string;
  units: Unit[];
  descriptionEn?: string;
  descriptionTa?: string;
  highlightsEn?: string[];
  highlightsTa?: string[];
}

export interface Category {
  id: string;
  nameEn: string;
  nameTa: string;
  image: string;
  color: string;
}

export interface CartItem extends Product {
  selectedUnit: Unit;
  cartQuantity: number;
}

export interface UserLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface SubCategory {
  id: string;
  name: string;
  items: string[];
}

export interface DetailedCategory {
  id: string;
  name: string;
  icon: string;
  image: string;
  subcategories: SubCategory[];
}

export type ViewState = 'home' | 'categories' | 'cart' | 'account' | 'product-detail' | 'location-picker' | 'wishlist' | 'orders' | 'basketbuddy' | 'wallet' | 'all-categories' | 'developer' | 'support' | 'feedback';

// Extend Window interface for ReCaptcha
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}
