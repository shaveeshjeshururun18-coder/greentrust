
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', nameEn: 'Vegetables', nameTa: 'காய்கறிகள்', image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=200&h=200&fit=crop', color: 'bg-green-100' },
  { id: '2', nameEn: 'Dairy', nameTa: 'பால் பொருட்கள்', image: 'https://images.unsplash.com/photo-1550583724-1255d1426639?w=200&h=200&fit=crop', color: 'bg-blue-100' },
  { id: '3', nameEn: 'Snacks', nameTa: 'தின்பண்டங்கள்', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bb087?w=200&h=200&fit=crop', color: 'bg-red-100' },
  { id: '4', nameEn: 'Ghee & Oil', nameTa: 'நெய் மற்றும் எண்ணெய்', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop', color: 'bg-yellow-100' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    brandEn: '4700BC',
    brandTa: '4700BC',
    nameEn: 'Cheese & Herbs Corn Popped Chips',
    nameTa: 'சீஸ் மற்றும் மூலிகை சோள சிப்ஸ்',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bb087?w=500&h=500&fit=crop',
    category: 'Snacks',
    isVeg: true,
    rating: 4.8,
    ratingCount: 2171,
    deliveryTime: '11 MINS',
    units: [
      { id: 'u1-1', weight: '55 g', price: 35, mrp: 46, discount: '23% OFF' },
      { id: 'u1-2', weight: '2 x 55 g', price: 69, mrp: 92, discount: '25% OFF' },
      { id: 'u1-3', weight: '3 x 55 g', price: 104, mrp: 138, discount: '24% OFF' }
    ],
    descriptionEn: 'The Future of Chips. 60% less fat. Popped, not fried. High quality ingredients.',
    descriptionTa: 'சிப்ஸின் எதிர்காலம். 60% குறைந்த கொழுப்பு. பொரிக்கப்பட்டது அல்ல, பாப் செய்யப்பட்டது.',
    highlightsEn: ['60% Less Fat', 'Not Fried', 'Healthy Snack'],
    highlightsTa: ['60% குறைந்த கொழுப்பு', 'பொரிக்கப்பட்டது அல்ல', 'ஆரோக்கியமான தின்பண்டம்']
  },
  {
    id: 'p2',
    brandEn: 'BRB',
    brandTa: 'BRB',
    nameEn: 'Classic Salted Rice Popped Chips',
    nameTa: 'கிளாசிக் சால்டட் ரைஸ் பாப்ட் சிப்ஸ்',
    image: 'https://images.unsplash.com/photo-1613919113166-296c6cbaec61?w=500&h=500&fit=crop',
    category: 'Snacks',
    isVeg: true,
    rating: 4.5,
    ratingCount: 1495,
    deliveryTime: '11 MINS',
    units: [
      { id: 'u2-1', weight: '48 g', price: 35, mrp: 40, discount: '12% OFF' }
    ],
    descriptionEn: 'Premium rice popped chips with classic salt flavor.',
    descriptionTa: 'கிளாசிக் உப்பு சுவையுடன் கூடிய பிரீமியம் அரிசி பாப்ட் சிப்ஸ்.'
  },
  {
    id: 'p3',
    brandEn: 'Organic Farm',
    brandTa: 'ஆர்கானிக் ஃபார்ம்',
    nameEn: 'Fresh Naattu Thakkali (Tomato)',
    nameTa: 'நாட்டு தக்காளி',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&h=500&fit=crop',
    category: 'Vegetables',
    isVeg: true,
    rating: 4.7,
    ratingCount: 842,
    deliveryTime: '15 MINS',
    units: [
      { id: 'u3-1', weight: '500 g', price: 45, mrp: 60, discount: '25% OFF' },
      { id: 'u3-2', weight: '1 kg', price: 85, mrp: 120, discount: '29% OFF' }
    ],
    descriptionEn: 'Farm fresh country tomatoes grown without pesticides.',
    descriptionTa: 'பூச்சிக்கொல்லிகள் இல்லாமல் வளர்க்கப்பட்ட பண்ணை புதிய நாட்டு தக்காளி.'
  }
];
