
import { Product, Category } from './types.ts';

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Vegetables', nameEn: 'Vegetables', nameTa: 'காயறிகள்', image: 'https://cdn-icons-png.flaticon.com/512/2321/2321848.png', color: 'emerald' },
  { id: 'c2', name: 'Dairy', nameEn: 'Dairy', nameTa: 'பால்', image: 'https://cdn-icons-png.flaticon.com/512/3052/3052914.png', color: 'blue' },
  { id: 'c3', name: 'Snacks', nameEn: 'Snacks', nameTa: 'தின்பண்டங்கள்', image: 'https://cdn-icons-png.flaticon.com/512/2553/2553642.png', color: 'red' },
  { id: 'c4', name: 'Organic', nameEn: 'Organic', nameTa: 'இயற்கை', image: 'https://cdn-icons-png.flaticon.com/512/1000/1000846.png', color: 'amber' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Avocado',
    nameEn: 'Fresh Avocado',
    nameTa: 'வெண்ணெய் பழம்',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    category: 'Vegetables',
    isVeg: true,
    rating: 4.8,
    deliveryTime: '15 MIN',
    units: [
      { id: 'u1-1', name: '500g', weight: '500g', price: 120, mrp: 150, discount: '20% OFF' },
      { id: 'u1-2', name: '1kg', weight: '1kg', price: 230, mrp: 300, discount: '23% OFF' }
    ]
  },
  {
    id: 'p2',
    name: 'Popped Chips',
    nameEn: 'Cheese Corn Popped Chips',
    nameTa: 'சீஸ் கார்ன் சிப்ஸ்',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bb087?w=400',
    category: 'Snacks',
    isVeg: true,
    rating: 4.7,
    deliveryTime: '10 MIN',
    units: [
      { id: 'u2-1', name: '55g', weight: '55g', price: 35, mrp: 45, discount: '22% OFF' }
    ]
  },
  {
    id: 'p3',
    name: 'Fresh Tomatoes',
    nameEn: 'Country Tomatoes',
    nameTa: 'நாட்டு தக்காளி',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
    category: 'Vegetables',
    isVeg: true,
    rating: 4.9,
    deliveryTime: '12 MIN',
    units: [
      { id: 'u3-1', name: '500g', weight: '500g', price: 40, mrp: 60, discount: '33% OFF' },
      { id: 'u3-2', name: '1kg', weight: '1kg', price: 75, mrp: 120, discount: '38% OFF' }
    ]
  }
];
