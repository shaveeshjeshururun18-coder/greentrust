
export enum Category {
  VEGETABLES = 'Vegetables, Greens & Herbs',
  FRUITS = 'Fruits',
  PACKAGED = 'Box / Packaged Items'
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  unit: string;
  image: string;
  tamilName?: string;
  isEssential?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface RecipeSuggestion {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}
