
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'dc1', nameEn: 'Farm Fresh Vegetables', nameTa: 'பண்ணை பசுமை காய்கறிகள்', image: '/categories/Vegetables.png', color: 'bg-green-100' },
  { id: 'dc2', nameEn: 'Organic Fruits', nameTa: 'இயற்கை பழங்கள்', image: '/categories/Fruits.png', color: 'bg-orange-100' },
  { id: 'dc3', nameEn: 'Herbs & Greens', nameTa: 'கீரை & மூலிகை', image: '/categories/Herbs_Greens.png', color: 'bg-emerald-100' },
  { id: 'dc4', nameEn: 'Exotic & Premium', nameTa: 'ஏற்றுமதி தரம்', image: '/categories/Exotic_Premium_Produce.png', color: 'bg-purple-100' },
  { id: 'dc5', nameEn: 'Daily Essentials', nameTa: 'தினசரி அத்தியாவசியங்கள்', image: '/categories/Fresh_Packs_Combos.png', color: 'bg-red-100' },
  { id: 'dc6', nameEn: 'Flowers', nameTa: 'பூக்கள்', image: 'https://images.unsplash.com/photo-1490750967868-58cb75069faf?w=200&h=200&fit=crop', color: 'bg-pink-100' },
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
    image: '/categories/Vegetables.png',
    subcategories: [
      {
        id: 'sc1-2',
        name: 'Root & Tuber Vegetables',
        items: ['Potato', 'Sweet Potato', 'Yam', 'Tapioca', 'Carrot', 'Baby Carrot', 'Beetroot', 'Radish', 'Turnip', 'Ginger', 'Garlic', 'Garlic (Peeled)', 'Turmeric', 'Lotus Stem', 'Water Chestnut']
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
        id: 'sc1-3',
        name: 'Cruciferous Vegetables',
        items: ['Cabbage', 'Chinese Cabbage', 'Cauliflower', 'Broccoli', 'Brussels Sprouts', 'Knol Khol']
      },
      {
        id: 'sc1-7',
        name: 'Mushrooms',
        items: ['Button Mushroom', 'Oyster Mushroom']
      }
    ]
  },
  {
    id: 'dc2',
    name: 'Fruits',
    icon: 'fa-apple-whole',
    image: '/categories/Fruits.png',
    subcategories: [
      {
        id: 'sc2-1',
        name: 'Tropical Fruits',
        items: ['Banana', 'Mango', 'Papaya', 'Pineapple', 'Guava', 'Sapota (Chikoo)', 'Pomegranate', 'Jackfruit']
      },
      {
        id: 'sc2-4',
        name: 'Citrus Fruits',
        items: ['Orange', 'Lemon', 'Lime', 'Sweet Lime (Mosambi)', 'Grapefruit', 'Pomelo']
      },
      {
        id: 'sc2-3',
        name: 'Berries',
        items: ['Strawberry', 'Blueberry', 'Blackberry', 'Raspberry', 'Cranberry', 'Mulberry']
      },
      {
        id: 'sc2-5',
        name: 'Melons',
        items: ['Watermelon', 'Musk Melon', 'Sun Melon', 'Cantaloupe']
      },
      {
        id: 'sc2-2',
        name: 'Core Fruits',
        items: ['Apple', 'Pear', 'Quince']
      }
    ]
  },
  {
    id: 'dc3',
    name: 'Herbs & Greens',
    icon: 'fa-leaf',
    image: '/categories/Herbs_Greens.png',
    subcategories: [
      {
        id: 'sc3-1',
        name: 'Leafy Greens',
        items: ['Spinach', 'Amaranthus', 'Methi (Fenugreek)', 'Coriander', 'Mint', 'Curry Leaves', 'Spring Onion', 'Lettuce', 'Kale', 'Arugula', 'Bok Choy', 'Swiss Chard', 'Celery', 'Leeks']
      },
      {
        id: 'sc3-2',
        name: 'Herbs',
        items: ['Basil', 'Parsley', 'Dill', 'Rosemary', 'Thyme', 'Oregano', 'Sage', 'Lemongrass']
      }
    ]
  },
  {
    id: 'dc4',
    name: 'Exotic & Premium',
    icon: 'fa-gem',
    image: '/categories/Exotic_Premium_Produce.png',
    subcategories: [
      {
        id: 'sc4-1',
        name: 'Exotic Fruits',
        items: ['Avocado', 'Kiwi', 'Dragon Fruit', 'Mangosteen', 'Rambutan', 'Longan', 'Durian', 'Passion Fruit', 'Persimmon']
      },
      {
        id: 'sc4-2',
        name: 'Exotic Vegetables',
        items: ['Asparagus', 'Artichoke', 'Brussels Sprouts', 'Zucchini (Yellow)', 'Bell Pepper (Red/Yellow)', 'Broccoli', 'Cherry Tomato', 'Celery', 'Leeks']
      }
    ]
  },
  {
    id: 'dc5',
    name: 'Fresh Packs',
    icon: 'fa-box-open',
    image: '/categories/Fresh_Packs_Combos.png',
    subcategories: [
      {
        id: 'sc5-1',
        name: 'Fresh Packs & Combos',
        items: ['Salad Mix', 'Soup Mix', 'Stir Fry Mix', 'Smoothie Pack', 'Fruit Platter']
      }
    ]
  },
  {
    id: 'dc6',
    name: 'Flowers',
    icon: 'fa-spa',
    image: 'https://images.unsplash.com/photo-1490750967868-58cb75069faf?w=200&h=200&fit=crop',
    subcategories: [
      {
        id: 'sc6-1',
        name: 'Flowers & Specialty Items',
        items: ['Banana Flower', 'Marigold', 'Jasmine', 'Rose Petals', 'Lotus']
      }
    ]
  }
];

// Mock Data Utilities
const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop', // Potato
  'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&h=500&fit=crop', // Tomato
  'https://images.unsplash.com/photo-1620574387735-36473550e6be?w=500&h=500&fit=crop', // Onion
  'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop', // Carrot
  'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?w=500&h=500&fit=crop', // Snacks
  'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=500&h=500&fit=crop', // Vegetables
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&h=500&fit=crop', // Fruit
  'https://images.unsplash.com/photo-1563565375-f3fdf5efa269?w=500&h=500&fit=crop', // Grapes
  'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=500&h=500&fit=crop', // Orange
  'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=500&h=500&fit=crop'  // Berries
];

const TAMIL_NAMES: { [key: string]: string } = {
  'Potato': 'உருளைக்கிழங்கு',
  'Tomato': 'தக்காளி',
  'Onion': 'வெங்காயம்',
  'Carrot': 'கேரட்',
  'Beans': 'பீன்ஸ்',
  'Brinjal': 'கத்தரிக்காய்',
  'Ladies Finger': 'வெண்டைக்காய்',
  'Cabbage': 'முட்டைக்கோஸ்',
  'Cauliflower': 'பூக்கோசு',
  'Ginger': 'இஞ்சி',
  'Garlic': 'பூண்டு',
  'Chilli': 'மிளகாய்',
  'Apple': 'ஆப்பிள்',
  'Orange': 'ஆரஞ்சு',
  'Banana': 'வாழைப்பழம்',
  'Grapes': 'திராட்சை',
  'Mango': 'மாம்பழம்',
  'Pineapple': 'அன்னாசி',
  'Watermelon': 'தர்பூசணி',
  'Spinach': 'பசலைக்கீரை',
  'Coriander': 'கொத்தமல்லி',
  'Mint': 'புதினா',
};

// Generate Global Product List from DETAILED_CATEGORIES
export const ALL_PRODUCTS = (() => {
  const products: Product[] = [];
  DETAILED_CATEGORIES.forEach(cat => {
    cat.subcategories.forEach(sub => {
      sub.items.forEach((itemName, index) => {
        const imageIndex = (itemName.length + index) % PRODUCT_IMAGES.length;
        const rawImage = PRODUCT_IMAGES[imageIndex];
        const image = rawImage.startsWith('http') ? rawImage : `/assets/products/${rawImage}`;
        const tamilName = TAMIL_NAMES[itemName] || itemName;

        const product: Product = {
          id: `mock-${itemName.replace(/\s+/g, '-').toLowerCase()}`,
          nameEn: itemName,
          nameTa: tamilName,
          image: image,
          category: cat.name,
          brandEn: 'Farm Fresh',
          brandTa: 'Farm Fresh',
          isVeg: true,
          rating: 4.5,
          ratingCount: 100 + (index * 10),
          deliveryTime: '15 MINS',
          units: [{ id: 'u1', weight: '500g', price: 40 + (index * 5), mrp: 50 + (index * 6), discount: '' }],
          descriptionEn: 'Fresh and organic, sourced directly from farmers.',
          descriptionTa: ''
        };
        products.push(product);
      });
    });
  });
  // Add the manual PRODUCTS (Trending) to this list too
  PRODUCTS.forEach(p => {
    if (!products.find(existing => existing.id === p.id)) {
      products.push(p);
    }
  });

  return products;
})();
