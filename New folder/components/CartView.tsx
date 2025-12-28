import React, { useState } from 'react';
import { CartItem, Product, Unit } from '../types';

interface CartViewProps {
  cart: CartItem[];
  address: string;
  onBack: () => void;
  removeFromCart: (id: string, unitId: string) => void;
  addToCart: (product: Product, unit: Unit) => void;
  clearCart: () => void;
  onExploreProducts: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, address, onBack, removeFromCart, addToCart, clearCart, onExploreProducts }) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const subtotal = cart.reduce((acc, curr) => acc + (curr.selectedUnit.price * curr.cartQuantity), 0);
  const deliveryFee = subtotal > 499 ? 0 : 30;
  const handlingFee = 5;
  const total = subtotal + deliveryFee + handlingFee;

  // Simple parsing of our detailed address string
  const addressParts = address.split(', ');
  const street = addressParts[0] || 'Unknown Street';
  const area = addressParts[1] || 'Unknown Area';
  const cityInfo = addressParts.slice(2).join(', ') || 'Chennai, Tamil Nadu';

  const handleCheckout = () => {
    const orderItems = cart.map(item => `- ${item.nameEn} (${item.selectedUnit.weight}) x ${item.cartQuantity} = ₹${item.selectedUnit.price * item.cartQuantity}`).join('%0A');
    const message = `*NEW ORDER FROM GREEN TRUST*%0A%0A*Items:*%0A${orderItems}%0A%0A*Bill Details:*%0ASubtotal: ₹${subtotal}%0ADelivery: ₹${deliveryFee}%0AHandling: ₹${handlingFee}%0A*Total: ₹${total}*%0A%0A*Delivery Address:*%0A${address}%0A%0A_Please confirm my order!_`;
    
    const waUrl = `https://wa.me/919500245626?text=${message}`;
    window.open(waUrl, '_blank');
    setCheckingOut(true);
  };

  if (checkingOut) {
    return (
      <div className="fixed inset-0 bg-white z-[70] flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        <div className="relative mb-12">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center animate-success shadow-2xl shadow-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
        
        <h2 className="text-3xl font-black text-gray-900 mb-4 animate-popIn stagger-1">Order Sent!</h2>
        <p className="text-gray-500 mb-12 max-w-[250px] mx-auto font-medium leading-relaxed animate-popIn stagger-2">
          We've sent your shopping list to WhatsApp. Waiting for seller confirmation!
        </p>
        
        <div className="w-full space-y-4 animate-popIn stagger-3">
          <button 
            onClick={() => { clearCart(); onBack(); }} 
            className="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:scale-105 active:scale-95 transition-all"
          >
            CONTINUE SHOPPING
          </button>
          <button className="text-green-600 font-black text-sm uppercase tracking-widest p-4">
            Track Order Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 animate-fadeIn">
      <div className="bg-white/80 backdrop-blur-xl px-6 py-6 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center active-pop">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-2xl font-black text-gray-900">Cart</h2>
        </div>
        <button onClick={clearCart} className="text-red-500 font-black text-xs uppercase tracking-widest bg-red-50 px-4 py-2 rounded-xl active-pop">Clear All</button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
        {/* Delivery Address Card Refined */}
        <div className="mx-6 mt-6 bg-white p-6 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 animate-popIn stagger-1">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Delivering to</p>
              </div>
              <button onClick={onBack} className="text-blue-600 text-[10px] font-black uppercase tracking-wider">Change</button>
           </div>
           <div className="pl-1">
             <p className="text-base font-black text-gray-900 mb-1">{street}</p>
             <p className="text-sm font-medium text-gray-500">{area}, {cityInfo}</p>
           </div>
        </div>

        <div className="px-6 mt-8 space-y-4">
           {cart.length > 0 ? (
             <>
               <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Your Selection</h3>
               {cart.map((item, idx) => (
                 <div key={`${item.id}-${item.selectedUnit.id}`} className="bg-white p-5 rounded-3xl flex items-center gap-5 shadow-sm border border-gray-50 animate-popIn" style={{ animationDelay: `${0.1 * idx}s` }}>
                    <div className="w-20 h-20 bg-gray-50/50 rounded-2xl p-3 flex-shrink-0 relative overflow-hidden">
                      <img src={item.image} alt={item.nameEn} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="text-sm font-black text-gray-800 leading-tight truncate">{item.nameEn}</h4>
                       <p className="text-[10px] text-blue-600 mt-1.5 font-black bg-blue-50 w-fit px-2 py-0.5 rounded-md uppercase tracking-wider">{item.selectedUnit.weight}</p>
                       <p className="text-sm font-black text-gray-900 mt-2">₹{item.selectedUnit.price * item.cartQuantity}</p>
                    </div>
                    <div className="flex items-center bg-gray-100 rounded-2xl p-1 h-12">
                      <button onClick={() => removeFromCart(item.id, item.selectedUnit.id)} className="w-10 h-10 flex items-center justify-center font-black text-xl text-gray-500 active:scale-75 transition-transform">-</button>
                      <span className="w-8 text-center text-sm font-black text-gray-900">{item.cartQuantity}</span>
                      <button onClick={() => addToCart(item, item.selectedUnit)} className="w-10 h-10 flex items-center justify-center font-black text-xl text-green-600 active:scale-75 transition-transform">+</button>
                    </div>
                 </div>
               ))}
             </>
           ) : (
             <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn">
               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                 </svg>
               </div>
               <p className="text-gray-400 font-bold">Your cart is feeling lonely</p>
               <button onClick={onExploreProducts} className="mt-6 text-green-600 font-black text-sm uppercase tracking-widest border-2 border-green-600 px-6 py-3 rounded-2xl active:scale-95 transition-all">Start Shopping</button>
             </div>
           )}
        </div>

        {cart.length > 0 && (
          <div className="m-6 bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100 animate-popIn stagger-4">
            <h3 className="font-black text-xl text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-sm font-bold text-gray-400">Items Subtotal</span>
                 <span className="text-sm font-black text-gray-900">₹{subtotal}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm font-bold text-gray-400">Delivery Charges</span>
                 <span className={`text-sm font-black ${deliveryFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                   {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                 </span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm font-bold text-gray-400">Handling Fee</span>
                 <span className="text-sm font-black text-gray-900">₹{handlingFee}</span>
               </div>
               <div className="pt-6 mt-2 border-t border-dashed border-gray-200 flex justify-between items-center">
                 <span className="text-lg font-black text-gray-900">Grand Total</span>
                 <div className="text-right">
                   <p className="text-2xl font-black text-gray-900">₹{total}</p>
                   <p className="text-[10px] text-green-600 font-black uppercase tracking-widest mt-1">Inclusive of Taxes</p>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl p-6 pb-12 border-t border-gray-100 max-w-md mx-auto z-40">
        <button 
          onClick={handleCheckout} 
          disabled={cart.length === 0} 
          className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${cart.length > 0 ? 'bg-gradient-to-r from-[#f43f76] to-[#ec4899] text-white shadow-pink-200' : 'bg-gray-200 text-gray-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Checkout via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default CartView;