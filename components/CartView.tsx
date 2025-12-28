import React, { useState } from 'react';
import { CartItem, Product, Unit } from '../types.ts';

interface CartViewProps {
  cart: CartItem[];
  address: string;
  onBack: () => void;
  removeFromCart: (id: string, unitName: string) => void;
  addToCart: (product: Product, unit: Unit) => void;
  getQuantity: (productId: string, unitName: string) => number;
  clearCart: () => void;
  onExploreProducts: () => void;
}

const CartView: React.FC<CartViewProps> = ({
  cart,
  address,
  onBack,
  removeFromCart,
  addToCart,
  getQuantity,
  clearCart,
  onExploreProducts
}) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const subtotal = cart.reduce((acc, curr) => acc + (curr.selectedUnit.price * curr.cartQuantity), 0);
  const deliveryFee = subtotal > 499 ? 0 : 30;
  const handlingFee = 5;
  const total = subtotal + deliveryFee + handlingFee;

  const addressParts = address.split(', ');
  const street = addressParts[0] || 'Select Location';
  const area = addressParts[1] || 'Chennai';

  const handleCheckout = () => {
    const orderItems = cart.map(item => `- ${item.name} (${item.selectedUnit.name}) x ${item.cartQuantity} = ₹${item.selectedUnit.price * item.cartQuantity}`).join('%0A');
    const message = `*NEW ORDER FROM GREEN TRUST*%0A%0A*Items:*%0A${orderItems}%0A%0A*Bill Details:*%0ASubtotal: ₹${subtotal}%0ADelivery: ₹${deliveryFee}%0AHandling: ₹${handlingFee}%0A*Total: ₹${total}*%0A%0A*Delivery Address:*%0A${address}%0A%0A_Please confirm my order!_`;

    const waUrl = `https://wa.me/919500245626?text=${message}`;
    window.open(waUrl, '_blank');
    setCheckingOut(true);
  };

  if (checkingOut) {
    return (
      <div className="fixed inset-0 bg-white z-[70] flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        <div className="relative mb-12">
          <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center animate-popIn shadow-2xl shadow-emerald-100">
            <i className="fa-solid fa-check text-5xl text-white"></i>
          </div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full animate-ping opacity-75"></div>
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-4 animate-popIn stagger-1">Order Sent!</h2>
        <p className="text-slate-500 mb-12 max-w-[250px] mx-auto font-medium leading-relaxed animate-popIn stagger-2">
          We've sent your shopping list to WhatsApp. Waiting for seller confirmation!
        </p>

        <div className="w-full space-y-4 animate-popIn stagger-3">
          <button
            onClick={() => { clearCart(); onBack(); }}
            className="w-full bg-emerald-500 text-white py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-emerald-100 active-pop transition-all uppercase tracking-widest"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-fadeIn min-h-screen">
      <div className="bg-white/80 backdrop-blur-xl px-6 py-8 flex items-center justify-between sticky top-0 z-20 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center active-pop">
            <i className="fa-solid fa-chevron-left text-slate-900"></i>
          </button>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Checkout</h2>
        </div>
        <button onClick={clearCart} className="text-rose-500 font-black text-[10px] uppercase tracking-widest bg-rose-50 px-5 py-2.5 rounded-xl active-pop">Clear All</button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
        {/* Address Card */}
        <div className="mx-6 mt-8 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-50 animate-popIn">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
                <i className="fa-solid fa-location-dot text-white text-sm"></i>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivering to</p>
            </div>
            <button onClick={onBack} className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Change</button>
          </div>
          <div className="pl-1">
            <p className="text-lg font-black text-slate-900 mb-1">{street}</p>
            <p className="text-xs font-bold text-slate-400 capitalize">{area}</p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="px-6 mt-10 space-y-5">
          {cart.length > 0 ? (
            <>
              <div className="flex justify-between items-end mb-4 px-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Your Selection</h3>
                <span className="text-[10px] font-black text-slate-900">{cart.length} Items</span>
              </div>
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.selectedUnit.name}`} className="bg-white p-5 rounded-[2.5rem] flex items-center gap-5 shadow-lg shadow-slate-100 border border-slate-50 animate-popIn" style={{ animationDelay: `${0.1 * idx}s` }}>
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl p-3 flex-shrink-0 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-black text-slate-900 leading-tight truncate">{item.name}</h4>
                    <span className="text-[10px] text-emerald-600 font-black bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-wider inline-block mt-2">
                      {item.selectedUnit.name}
                    </span>
                    <p className="text-lg font-black text-slate-900 mt-2">₹{item.selectedUnit.price * item.cartQuantity}</p>
                  </div>
                  <div className="flex flex-col items-center bg-slate-50 rounded-2xl p-1 gap-2">
                    <button onClick={() => addToCart(item, item.selectedUnit)} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 active-pop border border-slate-100">
                      <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                    <span className="text-sm font-black text-slate-900">{item.cartQuantity}</span>
                    <button onClick={() => removeFromCart(item.id, item.selectedUnit.name)} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 active-pop border border-slate-100">
                      <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-fadeIn">
              <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center mb-6 text-slate-300">
                <i className="fa-solid fa-cart-arrow-down text-4xl"></i>
              </div>
              <p className="text-slate-400 font-extrabold text-lg">Your cart is empty</p>
              <button onClick={onExploreProducts} className="mt-8 bg-emerald-500 text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-100 active-pop transition-all">Start Shopping</button>
            </div>
          )}
        </div>

        {/* Bill Summary */}
        {cart.length > 0 && (
          <div className="m-6 mt-10 bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl animate-popIn stagger-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
            <h3 className="font-black text-xl mb-8 tracking-tight">Order Summary</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-sm font-bold">Items Subtotal</span>
                <span className="text-sm font-black text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-sm font-bold">Delivery Fee</span>
                <span className={`text-sm font-black ${deliveryFee === 0 ? 'text-emerald-400' : 'text-white'}`}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-sm font-bold">Platform Handling</span>
                <span className="text-sm font-black text-white">₹{handlingFee}</span>
              </div>
              <div className="pt-8 mt-4 border-t border-white/10 flex justify-between items-end">
                <div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1">Total Payable</span>
                  <p className="text-3xl font-black tracking-tighter">₹{total}</p>
                </div>
                <div className="flex items-baseline gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                  <i className="fa-solid fa-tag text-emerald-400 text-[10px]"></i>
                  <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Saved ₹{subtotal > 499 ? 30 : 0}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 pb-10 bg-white/90 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-40">
          <button
            onClick={handleCheckout}
            className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-100 active-pop transition-all flex items-center justify-center gap-4 group"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i>
            Place Order via WhatsApp
            <i className="fa-solid fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartView;