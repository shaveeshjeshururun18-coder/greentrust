
export type ViewState = 'home' | 'food' | 'bolt' | '99store' | 'deal-rush' | 'categories' | 'cart' | 'account' | 'product-detail' | 'wishlist' | 'location-picker' | 'orders';

export interface Unit {
  id: string;
  weight: string;
  price: number;
  mrp: number;
  discount: string;
  name: string;
}

export interface Product {
  id: string;
  brandEn?: string;
  brandTa?: string;
  nameEn: string;
  nameTa: string;
  name: string;
  image: string;
  category: string;
  isVeg: boolean;
  rating: number;
  ratingCount?: number;
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
  name: string;
  image: string;
  color: string;
}

export interface CartItem extends Product {
  selectedUnit: Unit;
  cartQuantity: number;
}

export interface UserLocation {
  address: string;
  lat?: number;
  lng?: number;
}
