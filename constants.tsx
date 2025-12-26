
import { Category, Product } from './types';

export const MASTER_PRODUCTS: Product[] = [
  // Vegetables
  { id: 'v1', name: 'Arai Keerai', tamilName: 'அரைக்கீரை', category: Category.VEGETABLES, price: 15, unit: 'bundle', image: 'https://picsum.photos/seed/keerai/400/400' },
  { id: 'v2', name: 'Asparagus', tamilName: 'அஸ்பாரகஸ்', category: Category.VEGETABLES, price: 120, unit: '250g', image: 'https://picsum.photos/seed/asparagus/400/400' },
  { id: 'v3', name: 'Baby Carrot', tamilName: 'பேபி கேரட்', category: Category.VEGETABLES, price: 45, unit: '250g', image: 'https://picsum.photos/seed/babycarrot/400/400' },
  { id: 'v4', name: 'Baby Corn', tamilName: 'பேபி கார்ன்', category: Category.VEGETABLES, price: 30, unit: 'pack', image: 'https://picsum.photos/seed/babycorn/400/400' },
  { id: 'v5', name: 'Baby Potato', tamilName: 'பேபி உருளைக்கிழங்கு', category: Category.VEGETABLES, price: 25, unit: '500g', image: 'https://picsum.photos/seed/babypotato/400/400' },
  { id: 'v6', name: 'Beans', tamilName: 'பீன்ஸ்', category: Category.VEGETABLES, price: 40, unit: '500g', image: 'https://picsum.photos/seed/beans/400/400', isEssential: true },
  { id: 'v7', name: 'Beetroot', tamilName: 'பீட்ரூட்', category: Category.VEGETABLES, price: 20, unit: '500g', image: 'https://picsum.photos/seed/beetroot/400/400' },
  { id: 'v8', name: 'Bitter Gourd', tamilName: 'பாகற்காய்', category: Category.VEGETABLES, price: 30, unit: '500g', image: 'https://picsum.photos/seed/bittergourd/400/400' },
  { id: 'v9', name: 'Broccoli', tamilName: 'ப்ரோக்கோலி', category: Category.VEGETABLES, price: 90, unit: 'pc', image: 'https://picsum.photos/seed/broccoli/400/400' },
  { id: 'v10', name: 'Cabbage', tamilName: 'முட்டைக்கோஸ்', category: Category.VEGETABLES, price: 25, unit: 'pc', image: 'https://picsum.photos/seed/cabbage/400/400', isEssential: true },
  { id: 'v11', name: 'Capsicum', tamilName: 'குடை மிளகாய்', category: Category.VEGETABLES, price: 45, unit: '500g', image: 'https://picsum.photos/seed/capsicum/400/400' },
  { id: 'v12', name: 'Carrot', tamilName: 'கேரட்', category: Category.VEGETABLES, price: 35, unit: '500g', image: 'https://picsum.photos/seed/carrot/400/400', isEssential: true },
  { id: 'v13', name: 'Cauliflower', tamilName: 'காலிஃபிளவர்', category: Category.VEGETABLES, price: 40, unit: 'pc', image: 'https://picsum.photos/seed/cauliflower/400/400' },
  { id: 'v14', name: 'Chilli', tamilName: 'பச்சை மிளகாய்', category: Category.VEGETABLES, price: 15, unit: '100g', image: 'https://picsum.photos/seed/chilli/400/400' },
  { id: 'v15', name: 'Coriander', tamilName: 'கொத்தமல்லி', category: Category.VEGETABLES, price: 10, unit: 'bundle', image: 'https://picsum.photos/seed/coriander/400/400' },
  { id: 'v16', name: 'Drumstick', tamilName: 'முருங்கைக்காய்', category: Category.VEGETABLES, price: 15, unit: '2pcs', image: 'https://picsum.photos/seed/drumstick/400/400' },
  { id: 'v17', name: 'Garlic', tamilName: 'பூண்டு', category: Category.VEGETABLES, price: 60, unit: '250g', image: 'https://picsum.photos/seed/garlic/400/400' },
  { id: 'v18', name: 'Ginger', tamilName: 'இஞ்சி', category: Category.VEGETABLES, price: 40, unit: '250g', image: 'https://picsum.photos/seed/ginger/400/400' },
  { id: 'v19', name: 'Lemon', tamilName: 'எலுமிச்சை', category: Category.VEGETABLES, price: 15, unit: '3pcs', image: 'https://picsum.photos/seed/lemon/400/400' },
  { id: 'v20', name: 'Mushroom', tamilName: 'காளான்', category: Category.VEGETABLES, price: 55, unit: 'pack', image: 'https://picsum.photos/seed/mushroom/400/400' },
  { id: 'v21', name: 'Onion', tamilName: 'வெங்காயம்', category: Category.VEGETABLES, price: 45, unit: 'kg', image: 'https://picsum.photos/seed/onion/400/400', isEssential: true },
  { id: 'v22', name: 'Potato', tamilName: 'உருளைக்கிழங்கு', category: Category.VEGETABLES, price: 40, unit: 'kg', image: 'https://picsum.photos/seed/potato/400/400', isEssential: true },
  { id: 'v23', name: 'Tomato', tamilName: 'தக்காளி', category: Category.VEGETABLES, price: 30, unit: 'kg', image: 'https://picsum.photos/seed/tomato/400/400', isEssential: true },

  // Fruits
  { id: 'f1', name: 'Apple', tamilName: 'ஆப்பிள்', category: Category.FRUITS, price: 180, unit: 'kg', image: 'https://picsum.photos/seed/apple/400/400', isEssential: true },
  { id: 'f2', name: 'Avocado', tamilName: 'வெண்ணெய் பழம்', category: Category.FRUITS, price: 250, unit: 'kg', image: 'https://picsum.photos/seed/avocado/400/400' },
  { id: 'f3', name: 'Banana', tamilName: 'வாழைப்பழம்', category: Category.FRUITS, price: 60, unit: 'dozen', image: 'https://picsum.photos/seed/banana/400/400', isEssential: true },
  { id: 'f4', name: 'Blueberry', tamilName: 'அவுரிநெல்லி', category: Category.FRUITS, price: 350, unit: 'pack', image: 'https://picsum.photos/seed/blueberry/400/400' },
  { id: 'f5', name: 'Dragon Fruit', tamilName: 'டிராகன் பழம்', category: Category.FRUITS, price: 80, unit: 'pc', image: 'https://picsum.photos/seed/dragonfruit/400/400' },
  { id: 'f6', name: 'Grapes', tamilName: 'திராட்சை', category: Category.FRUITS, price: 90, unit: '500g', image: 'https://picsum.photos/seed/grapes/400/400' },
  { id: 'f7', name: 'Guava', tamilName: 'கொய்யா', category: Category.FRUITS, price: 60, unit: '500g', image: 'https://picsum.photos/seed/guava/400/400' },
  { id: 'f8', name: 'Mango', tamilName: 'மாம்பழம்', category: Category.FRUITS, price: 120, unit: 'kg', image: 'https://picsum.photos/seed/mango/400/400' },
  { id: 'f9', name: 'Orange', tamilName: 'ஆரஞ்சு', category: Category.FRUITS, price: 80, unit: 'kg', image: 'https://picsum.photos/seed/orange/400/400' },
  { id: 'f10', name: 'Papaya', tamilName: 'பப்பாளி', category: Category.FRUITS, price: 40, unit: 'pc', image: 'https://picsum.photos/seed/papaya/400/400' },
  { id: 'f11', name: 'Pineapple', tamilName: 'அன்னாசி', category: Category.FRUITS, price: 70, unit: 'pc', image: 'https://picsum.photos/seed/pineapple/400/400' },
  { id: 'f12', name: 'Pomegranate', tamilName: 'மாதுளை', category: Category.FRUITS, price: 160, unit: 'kg', image: 'https://picsum.photos/seed/pomegranate/400/400' },

  // Packaged
  { id: 'p1', name: 'Fruit Box', tamilName: 'பழப் பெட்டி', category: Category.PACKAGED, price: 499, unit: 'box', image: 'https://picsum.photos/seed/fruitbox/400/400' },
  { id: 'p2', name: 'Herb Box', tamilName: 'மூலிகை பெட்டி', category: Category.PACKAGED, price: 150, unit: 'box', image: 'https://picsum.photos/seed/herbbox/400/400' },
  { id: 'p3', name: 'Mushroom Pouch', tamilName: 'காளான் பை', category: Category.PACKAGED, price: 85, unit: 'pouch', image: 'https://picsum.photos/seed/mushroompouch/400/400' },
];
