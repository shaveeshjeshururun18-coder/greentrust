
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

import { DetailedCategory } from './types.ts';

export const DETAILED_CATEGORIES: DetailedCategory[] = [
  {
    id: 'dc1',
    name: 'Vegetables',
    icon: 'fa-carrot',
    subcategories: [
      {
        id: 'sc1-1',
        name: 'Leafy Greens & Herbs',
        items: ['Arai Keerai', 'Spinach / Keerai', 'Basil', 'Coriander', 'Mint', 'Parsley', 'Dill Leaves', 'Rosemary', 'Sage', 'Kaffir Lime Leaves', 'Lemongrass', 'Kale', 'Indian Basil (Tulsi)', 'Lavender']
      },
      {
        id: 'sc1-2',
        name: 'Root & Tuber Vegetables',
        items: ['Potato', 'Sweet Potato', 'Yam', 'Tapioca', 'Carrot', 'Baby Carrot', 'Beetroot', 'Radish', 'Turnip', 'Ginger', 'Garlic', 'Garlic (Peeled)', 'Turmeric', 'Lotus Stem', 'Water Chestnut']
      },
      {
        id: 'sc1-3',
        name: 'Cruciferous Vegetables',
        items: ['Cabbage', 'Chinese Cabbage', 'Cauliflower', 'Broccoli', 'Brussels Sprouts', 'Knol Khol']
      },
      {
        id: 'sc1-4',
        name: 'Gourds & Squash',
        items: ['Bottle Gourd', 'Bitter Gourd', 'Snake Gourd', 'Ivy Gourd', 'Pointed Gourd', 'Ash Gourd', 'Pumpkin', 'Butternut Squash', 'Chow Chow (Chayote)']
      },
      {
        id: 'sc1-5',
        name: 'Fruiting Vegetables',
        items: ['Tomato', 'Cherry Tomato', 'Brinjal (Eggplant)', 'Ladies Finger (Okra)', 'Cucumber', 'Zucchini', 'Sweet Corn', 'Baby Corn', 'Baby Corn (Peeled)', 'Drumstick (Moringa)', 'Capsicum (Bell Pepper)', 'Chillies']
      },
      {
        id: 'sc1-6',
        name: 'Beans, Peas & Pods',
        items: ['Beans (French / Long / Avarai)', 'Butter Beans', 'Green Peas', 'Edamame']
      },
      {
        id: 'sc1-7',
        name: 'Mushrooms',
        items: ['Button Mushroom']
      }
    ]
  },
  {
    id: 'dc2',
    name: 'Fruits',
    icon: 'fa-apple-whole',
    subcategories: [
      {
        id: 'sc2-1',
        name: 'Tropical Fruits',
        items: ['Banana', 'Mango', 'Papaya', 'Pineapple', 'Guava', 'Sapota (Chikoo)', 'Pomegranate']
      },
      {
        id: 'sc2-2',
        name: 'Core Fruits',
        items: ['Apple', 'Pear', 'Plum', 'Persimmon']
      },
      {
        id: 'sc2-3',
        name: 'Berries',
        items: ['Strawberry', 'Blueberry', 'Blackberry', 'Raspberry']
      },
      {
        id: 'sc2-4',
        name: 'Citrus Fruits',
        items: ['Orange', 'Lemon']
      },
      {
        id: 'sc2-5',
        name: 'Melons',
        items: ['Watermelon', 'Musk Melon', 'Sun Melon']
      },
      {
        id: 'sc2-6',
        name: 'Exotic & Premium Fruits',
        items: ['Avocado', 'Kiwi', 'Grapes', 'Dragon Fruit', 'Passion Fruit', 'Jabiticaba']
      }
    ]
  },
  {
    id: 'dc3',
    name: 'Flowers & Specialty',
    icon: 'fa-spa',
    subcategories: [
      {
        id: 'sc3-1',
        name: 'Flowers',
        items: ['Banana Flower']
      }
    ]
  },
  {
    id: 'dc4',
    name: 'Fresh Packs',
    icon: 'fa-box-open',
    subcategories: [
      {
        id: 'sc4-1',
        name: 'Combos',
        items: ['Vegetable Combo Pack', 'Fruit Combo Pack', 'Mixed Produce Box', 'Herb Box', 'Mushroom Pack']
      }
    ]
  }
];
