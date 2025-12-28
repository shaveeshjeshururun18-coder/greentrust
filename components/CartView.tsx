import React, { useState } from 'react';
import { CartItem, Product, Unit } from '../types';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CartViewProps {
  cart: CartItem[];
  address: string;
  onBack: () => void;
  removeFromCart: (id: string, unitId: string) => void;
  addToCart: (product: Product, unit: Unit) => void;
  clearCart: () => void;
  onExploreProducts: () => void;
  isLoggedIn: boolean;
  onLoginReq: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, address, onBack, removeFromCart, addToCart, clearCart, onExploreProducts, isLoggedIn, onLoginReq }) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'gpay' | 'phonepe'>('cod');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculations
  const subtotal = cart.reduce((acc, curr) => acc + (curr.selectedUnit.price * curr.cartQuantity), 0);
  const deliveryFee = subtotal > 499 ? 0 : 30;
  const handlingFee = 5;
  const total = subtotal + deliveryFee + handlingFee;

  // Simple parsing of our detailed address string
  const addressParts = address.split(', ');
  const street = addressParts[0] || 'Unknown Street';
  const area = addressParts[1] || 'Unknown Area';
  const cityInfo = addressParts.slice(2).join(', ') || 'Chennai, Tamil Nadu';

  // Google Pay / UPI Configuration
  const VPA = 'prasathr3009@oksbi';
  const MERCHANT_NAME = 'Green Trust';

  const saveOrderToDB = async () => {
    try {
      setIsProcessing(true);
      const orderData = {
        userId: auth.currentUser?.uid || 'guest',
        userPhone: auth.currentUser?.phoneNumber || 'unknown',
        items: cart.map(item => ({
          name: item.nameEn,
          weight: item.selectedUnit.weight,
          quantity: item.cartQuantity,
          price: item.selectedUnit.price
        })),
        amount: {
          subtotal,
          deliveryFee,
          handlingFee,
          total
        },
        address,
        paymentMethod,
        status: 'pending',
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'orders'), orderData);
      return true;
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Note: Could not save order history, but proceeding with checkout.");
      return true; // Proceed anyway so we don't block sales
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      onLoginReq();
      return;
    }

    await saveOrderToDB();

    const orderItems = cart.map(item => `- ${item.nameEn} (${item.selectedUnit.weight}) x ${item.cartQuantity} = ₹${item.selectedUnit.price * item.cartQuantity}`).join('%0A');
    const message = `*NEW ORDER FROM GREEN TRUST*%0A%0A*Items:*%0A${orderItems}%0A%0A*Bill Details:*%0ASubtotal: ₹${subtotal}%0ADelivery: ₹${deliveryFee}%0AHandling: ₹${handlingFee}%0A*Total: ₹${total}*%0A%0A*Payment Mode:* ${paymentMethod.toUpperCase()}%0A*Delivery Address:*%0A${address}%0A%0A_Please confirm my order!_`;

    const waUrl = `https://wa.me/919500245626?text=${message}`;
    window.open(waUrl, '_blank');
    setCheckingOut(true);
  };

  const handleGPay = async () => {
    if (!isLoggedIn) {
      onLoginReq();
      return;
    }

    await saveOrderToDB();

    // Basic UPI Intent
    const upiUrl = `upi://pay?pa=${VPA}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${total}&cu=INR&tn=Order from Green Trust`;

    // Detect Mobile (Simple check)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Deep Link to UPI App (GPay preference if possible, but standard UPI works)
      window.location.href = upiUrl;
      // We assume they went to pay, show waiting state/success
      setTimeout(() => setCheckingOut(true), 5000);
    } else {
      // Desktop: Show QR Code
      setShowQR(true);
    }
  };

  if (showQR) {
    const qrData = `upi://pay?pa=${VPA}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${total}&cu=INR&tn=Order from Green Trust`;
    const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

    return (
      <div className="fixed inset-0 bg-black/80 z-[80] flex flex-col items-center justify-center p-6 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center relative">
          <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full p-1 border border-gray-100 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#EA4335" d="M12 24c6.6 0 12-5.4 12-12S18.6 0 12 0 0 5.4 0 12s5.4 12 12 12z" /><path fill="#FFF" d="M17.8 8.6h-2.5c-.3 0-.6.2-.7.4l-2.4 5.8-2.5-5.8c-.1-.3-.3-.4-.7-.4H6.4c-.4 0-.6.5-.3.8l4 8.7-2.3 5.2c-.1.3.1.6.4.6h2.5c.3 0 .6-.2.7-.4l6.4-14.1c.3-.3.1-.8-.3-.8z" /><path fill="#FFF" d="M9.8 8.6H5.4c-.3 0-.5.3-.4.6l.8 3.5c.1.3.3.5.6.5h3.4c.5 0 .9-.3 1-.8l.9-3.2c.2-.4-.2-.6-.6-.6z" /></svg>
              </div>
              <span className="font-black text-xl text-gray-800">Google Pay</span>
            </div>
          </div>

          <p className="text-gray-500 font-medium mb-6">Scan with any UPI App to Pay</p>

          <div className="bg-white p-2 rounded-xl border-2 border-dashed border-gray-200 inline-block mb-4">
            <img src={qrImage} alt="Payment QR" className="w-48 h-48" />
          </div>

          <p className="text-2xl font-black text-gray-900 mb-8">₹{total}</p>

          <button
            onClick={() => { setShowQR(false); setCheckingOut(true); }}
            className="w-full bg-green-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-green-700 transition-colors"
          >
            I Have Paid
          </button>
        </div>
      </div>
    );
  }

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

        <h2 className="text-3xl font-black text-gray-900 mb-4 animate-popIn stagger-1">Order Confirmed!</h2>
        <p className="text-gray-500 mb-12 max-w-[250px] mx-auto font-medium leading-relaxed animate-popIn stagger-2">
          Thank you for your payment. We are processing your order right away!
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
    <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-950 animate-fadeIn">
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-6 py-6 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center active-pop">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Cart</h2>
        </div>
        <button onClick={clearCart} className="text-red-500 font-black text-xs uppercase tracking-widest bg-red-50 dark:bg-red-900/30 px-4 py-2 rounded-xl active-pop">Clear All</button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-40 md:pb-0">
        <div className="md:flex md:items-start md:gap-8 md:max-w-7xl md:mx-auto md:p-6">

          {/* LEFT COLUMN: Address & Items */}
          <div className="w-full md:w-[65%] space-y-6">

            {/* Delivery Address Card */}
            <div className="mx-6 md:mx-0 mt-6 md:mt-0 bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-slate-800 animate-popIn stagger-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Delivering to</p>
                </div>
                <button onClick={onBack} className="text-blue-600 text-[10px] font-black uppercase tracking-wider">Change</button>
              </div>
              <div className="pl-1">
                <p className="text-base font-black text-gray-900 dark:text-white mb-1">{street}</p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{area}, {cityInfo}</p>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="px-6 md:px-0 space-y-4">
              {cart.length > 0 ? (
                <>
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Your Selection</h3>
                  {cart.map((item, idx) => (
                    <div key={`${item.id}-${item.selectedUnit.id}`} className="bg-white dark:bg-slate-900 p-5 rounded-3xl flex items-center gap-5 shadow-sm border border-gray-50 dark:border-slate-800 animate-popIn" style={{ animationDelay: `${0.1 * idx}s` }}>
                      <div className="w-20 h-20 bg-gray-50/50 dark:bg-slate-800/50 rounded-2xl p-3 flex-shrink-0 relative overflow-hidden">
                        <img src={item.image} alt={item.nameEn} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-black text-gray-800 dark:text-white leading-tight truncate">{item.nameEn}</h4>
                        <p className="text-[10px] text-blue-600 mt-1.5 font-black bg-blue-50 dark:bg-blue-900/30 w-fit px-2 py-0.5 rounded-md uppercase tracking-wider">{item.selectedUnit.weight}</p>
                        <p className="text-sm font-black text-gray-900 dark:text-gray-200 mt-2">₹{item.selectedUnit.price * item.cartQuantity}</p>
                      </div>
                      <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-2xl p-1 h-12">
                        <button onClick={() => removeFromCart(item.id, item.selectedUnit.id)} className="w-10 h-10 flex items-center justify-center font-black text-xl text-gray-500 dark:text-gray-400 active:scale-75 transition-transform">-</button>
                        <span className="w-8 text-center text-sm font-black text-gray-900 dark:text-white">{item.cartQuantity}</span>
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
          </div>

          {/* RIGHT COLUMN: Summary & Payment & Actions (Sticky on Desktop) */}
          <div className="w-full md:w-[35%] md:sticky md:top-24 space-y-6">

            {/* Order Summary */}
            {cart.length > 0 && (
              <div className="mx-6 md:mx-0 mt-8 md:mt-0 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-slate-800 animate-popIn stagger-4">
                <h3 className="font-black text-xl text-gray-900 dark:text-white mb-6">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-400">Items Subtotal</span>
                    <span className="text-sm font-black text-gray-900 dark:text-gray-200">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-400">Delivery Charges</span>
                    <span className={`text-sm font-black ${deliveryFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-400">Handling Fee</span>
                    <span className="text-sm font-black text-gray-900 dark:text-white">₹{handlingFee}</span>
                  </div>
                  <div className="pt-6 mt-2 border-t border-dashed border-gray-200 flex justify-between items-center">
                    <span className="text-lg font-black text-gray-900 dark:text-white">Grand Total</span>
                    <div className="text-right">
                      <p className="text-2xl font-black text-gray-900 dark:text-white">₹{total}</p>
                      <p className="text-[10px] text-green-600 font-black uppercase tracking-widest mt-1">Inclusive of Taxes</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="mx-6 md:mx-0 mt-2 mb-40 md:mb-0 animate-popIn stagger-5">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-1 gap-3">

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-[1.5rem] border-[3px] flex items-center gap-4 cursor-pointer transition-all active:scale-95 ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg shadow-green-100 dark:shadow-none' : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm ${paymentMethod === 'cod' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <i className="fa-solid fa-hand-holding-dollar"></i>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-black ${paymentMethod === 'cod' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>Cash on Delivery</p>
                    <p className="text-[10px] font-bold text-gray-400">Pay cash upon receiving your order</p>
                  </div>
                  {paymentMethod === 'cod' && <i className="fa-solid fa-circle-check text-green-500 text-xl"></i>}
                </div>

                {/* Google Pay */}
                <div
                  onClick={() => setPaymentMethod('gpay')}
                  className={`p-4 rounded-[1.5rem] border-[3px] flex items-center gap-4 cursor-pointer transition-all active:scale-95 ${paymentMethod === 'gpay' ? 'border-gray-300 bg-white shadow-xl shadow-gray-200' : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60'}`}
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 border border-gray-100">
                    <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#EA4335" d="M12 24c6.6 0 12-5.4 12-12S18.6 0 12 0 0 5.4 0 12s5.4 12 12 12z" /><path fill="#FFF" d="M17.8 8.6h-2.5c-.3 0-.6.2-.7.4l-2.4 5.8-2.5-5.8c-.1-.3-.3-.4-.7-.4H6.4c-.4 0-.6.5-.3.8l4 8.7-2.3 5.2c-.1.3.1.6.4.6h2.5c.3 0 .6-.2.7-.4l6.4-14.1c.3-.3.1-.8-.3-.8z" /><path fill="#FFF" d="M9.8 8.6H5.4c-.3 0-.5.3-.4.6l.8 3.5c.1.3.3.5.6.5h3.4c.5 0 .9-.3 1-.8l.9-3.2c.2-.4-.2-.6-.6-.6z" /></svg>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-black ${paymentMethod === 'gpay' ? 'text-gray-900' : 'text-gray-500'}`}>Google Pay</p>
                    <p className="text-[10px] font-bold text-gray-400">Instant Payment via UPI</p>
                  </div>
                  {paymentMethod === 'gpay' && <i className="fa-solid fa-circle-check text-black text-xl"></i>}
                </div>

                {/* PhonePe */}
                <div
                  onClick={() => setPaymentMethod('phonepe')}
                  className={`p-4 rounded-[1.5rem] border-[3px] flex items-center gap-4 cursor-pointer transition-all active:scale-95 ${paymentMethod === 'phonepe' ? 'border-[#6739B7] bg-[#6739B7]/10 shadow-lg shadow-purple-100' : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60'}`}
                >
                  <div className="w-12 h-12 bg-[#6739B7] rounded-full flex items-center justify-center text-white font-bold">Pe</div>
                  <div className="flex-1">
                    <p className={`text-sm font-black ${paymentMethod === 'phonepe' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>PhonePe</p>
                    <p className="text-[10px] font-bold text-gray-400">Fast & Secure UPI</p>
                  </div>
                  {paymentMethod === 'phonepe' && <i className="fa-solid fa-circle-check text-[#6739B7] text-xl"></i>}
                </div>

              </div>
            </div>

            {/* DESKTOP ACTIONS (Hidden on Mobile) */}
            <div className="hidden md:block space-y-3">
              {paymentMethod === 'gpay' && (
                <button
                  onClick={handleGPay}
                  disabled={cart.length === 0}
                  className={`w-full py-4 rounded-[2rem] font-black text-lg shadow-xl active:scale-95 flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 transition-all ${cart.length === 0 ? 'opacity-50 grayscale' : ''}`}
                >
                  <div className="w-14 h-6 bg-white rounded flex items-center justify-center p-0.5">
                    <svg viewBox="0 0 134 66" className="w-full h-full"><path fill="#fff" d="M134 33c0 18.2-14.8 33-33 33H33C14.8 66 0 51.2 0 33S14.8 0 33 0h68c18.2 0 33 14.8 33 33z" /><path fill="#4285F4" d="M36.1 27.5h-15v2.2h15c0 12.1-9.9 22-22 22s-22-9.9-22-22 9.9-22 22-22c5.8 0 11.1 2.3 15.2 6l-6.2 6.2C21.6 8.3 19.3 7 14.1 7 8 7 3 12 3 18s5 11 11.1 11c4.9 0 9.1-3 10.7-7.5h-10.7v-8.8h17c.5 2.5.8 5.2.8 8 .1 9.4-6.4 16.8-15.8 16.8z" /><path fill="#34A853" d="M63 43.1V9.9h7.8v33.2z" /><path fill="#EA4335" d="M52.5 19.1v17.5c-3.1 1.6-6.6 2.5-10.3 2.5-9.2 0-16.7-7.5-16.7-16.7 0-9.2 7.5-16.7 16.7-16.7 3.7 0 7.2.9 10.3 2.5zm-3.5 14.2c2-1.3 3.5-3.5 3.5-6.1 0-2.6-1.5-4.8-3.5-6.1-1.9-1.3-4.2-2-6.8-2s-4.9.7-6.8 2c-2 1.3-3.5 3.5-3.5 6.1 0 2.6 1.5 4.8 3.5 6.1 1.9 1.3 4.2 2 6.8 2 2.6 0 4.9-.7 6.8-2z" /><path fill="#FBBC04" d="M84.3 19.1l-2.8 7.2-2.9-7.2h-8.3l7 15.7v6.6h7.8v-6.3l7.3-16h-8.1z" /></svg>
                  </div>
                  <span>Pay</span>
                </button>
              )}

              {paymentMethod === 'phonepe' && (
                <button
                  onClick={handleGPay}
                  disabled={cart.length === 0}
                  className={`w-full py-4 rounded-[2rem] font-black text-lg shadow-xl active:scale-95 flex items-center justify-center gap-3 bg-[#6739B7] text-white hover:bg-[#5e33a6] transition-all ${cart.length === 0 ? 'opacity-50 grayscale' : ''}`}
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#6739B7] font-bold text-xs">Pe</div>
                  <span>Pay with PhonePe</span>
                </button>
              )}

              {paymentMethod === 'cod' && (
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className={`w-full py-4 rounded-[2rem] font-black text-lg shadow-lg shimmer-effect active:scale-95 flex items-center justify-center gap-3 ${cart.length > 0 ? 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white' : 'bg-gray-200 text-gray-400'}`}
                >
                  <i className="fa-brands fa-whatsapp text-2xl"></i>
                  Place Order via WhatsApp
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* FIXED FOOTER (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 pb-12 border-t border-gray-100 dark:border-slate-800 max-w-md mx-auto z-40 space-y-3">
        {paymentMethod === 'gpay' && (
          <button
            onClick={handleGPay}
            disabled={cart.length === 0}
            className={`w-full py-4 rounded-[2rem] font-black text-lg shadow-xl active:scale-95 flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 transition-all ${cart.length === 0 ? 'opacity-50 grayscale' : ''}`}
          >
            <div className="w-14 h-6 bg-white rounded flex items-center justify-center p-0.5">
              <svg viewBox="0 0 134 66" className="w-full h-full"><path fill="#fff" d="M134 33c0 18.2-14.8 33-33 33H33C14.8 66 0 51.2 0 33S14.8 0 33 0h68c18.2 0 33 14.8 33 33z" /><path fill="#4285F4" d="M36.1 27.5h-15v2.2h15c0 12.1-9.9 22-22 22s-22-9.9-22-22 9.9-22 22-22c5.8 0 11.1 2.3 15.2 6l-6.2 6.2C21.6 8.3 19.3 7 14.1 7 8 7 3 12 3 18s5 11 11.1 11c4.9 0 9.1-3 10.7-7.5h-10.7v-8.8h17c.5 2.5.8 5.2.8 8 .1 9.4-6.4 16.8-15.8 16.8z" /><path fill="#34A853" d="M63 43.1V9.9h7.8v33.2z" /><path fill="#EA4335" d="M52.5 19.1v17.5c-3.1 1.6-6.6 2.5-10.3 2.5-9.2 0-16.7-7.5-16.7-16.7 0-9.2 7.5-16.7 16.7-16.7 3.7 0 7.2.9 10.3 2.5zm-3.5 14.2c2-1.3 3.5-3.5 3.5-6.1 0-2.6-1.5-4.8-3.5-6.1-1.9-1.3-4.2-2-6.8-2s-4.9.7-6.8 2c-2 1.3-3.5 3.5-3.5 6.1 0 2.6 1.5 4.8 3.5 6.1 1.9 1.3 4.2 2 6.8 2 2.6 0 4.9-.7 6.8-2z" /><path fill="#FBBC04" d="M84.3 19.1l-2.8 7.2-2.9-7.2h-8.3l7 15.7v6.6h7.8v-6.3l7.3-16h-8.1z" /></svg>
            </div>
            <span>Pay</span>
          </button>
        )}

        {paymentMethod === 'phonepe' && (
          <button
            onClick={handleGPay} // Using same intent handler for now, deep linking handles selection
            disabled={cart.length === 0}
            className={`w-full py-4 rounded-[2rem] font-black text-lg shadow-xl active:scale-95 flex items-center justify-center gap-3 bg-[#6739B7] text-white hover:bg-[#5e33a6] transition-all ${cart.length === 0 ? 'opacity-50 grayscale' : ''}`}
          >
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#6739B7] font-bold text-xs">Pe</div>
            <span>Pay with PhonePe</span>
          </button>
        )}

        {paymentMethod === 'cod' && (
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className={`w-full py-4 rounded-[2rem] font-black text-lg shadow-lg shimmer-effect active:scale-95 flex items-center justify-center gap-3 ${cart.length > 0 ? 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white' : 'bg-gray-200 text-gray-400'}`}
          >
            <i className="fa-brands fa-whatsapp text-2xl"></i>
            Place Order via WhatsApp
          </button>
        )}
      </div>
    </div>
  );
};

export default CartView;