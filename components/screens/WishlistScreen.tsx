import React from 'react';
import { Product, CartItem } from '../../types';
import { ProductCard } from '../ProductCard';

interface WishlistScreenProps {
    wishlist: Product[];
    cart: CartItem[];
    onAddToCart: (product: Product) => void;
    onRemoveFromCart: (id: string) => void;
    onToggleWishlist: (product: Product) => void;
    onProductClick: (product: Product) => void;
    onBack: () => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
    wishlist,
    cart,
    onAddToCart,
    onRemoveFromCart,
    onToggleWishlist,
    onProductClick,
    onBack
}) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-5 py-4 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/30 active:scale-95 transition-all"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">My Wishlist <span className="text-emerald-600">({wishlist.length})</span></h2>
            </div>

            <div className="p-5 pb-32">
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {wishlist.map(p => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                cartQuantity={cart.find(i => i.id === p.id)?.quantity || 0}
                                onAddToCart={onAddToCart}
                                onRemoveFromCart={onRemoveFromCart}
                                onClick={() => onProductClick(p)}
                                isWishlisted={true}
                                onToggleWishlist={() => onToggleWishlist(p)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <i className="fas fa-heart-crack text-4xl text-slate-300 dark:text-slate-600"></i>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Your wishlist is empty</h3>
                        <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center max-w-xs">Tap the heart icon on products to save them for later!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
