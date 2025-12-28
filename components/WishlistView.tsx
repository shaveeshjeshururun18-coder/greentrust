
import React from 'react';
import { Product, CartItem } from '../types';
import ProductCard from './ProductCard';

interface WishlistViewProps {
  onBack: () => void;
  wishlistItems: Product[];
  onProductClick: (p: Product) => void;
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const WishlistView: React.FC<WishlistViewProps> = ({ 
  onBack, 
  wishlistItems, 
  onProductClick,
  cart,
  addToCart,
  removeFromCart,
  wishlist,
  toggleWishlist
}) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 animate-fadeIn">
      <div className="bg-white p-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
        <button onClick={onBack} className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-black text-gray-800">My Favorites</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-400">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-200" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
               </svg>
            </div>
            <p className="text-lg font-bold">No favorites yet</p>
            <p className="text-sm">Start liking products to see them here!</p>
            <button onClick={onBack} className="bg-green-600 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase shadow-lg">Explore Now</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {wishlistItems.map(p => (
              <ProductCard 
                key={p.id}
                product={p}
                onClick={() => onProductClick(p)}
                addToCart={() => addToCart(p)}
                removeFromCart={() => removeFromCart(p.id)}
                quantity={cart.find(c => c.id === p.id)?.cartQuantity || 0}
                isFavorite={wishlist.includes(p.id)}
                toggleFavorite={() => toggleWishlist(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistView;
