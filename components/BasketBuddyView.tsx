import React, { useState, useRef, useEffect } from 'react';

interface BasketBuddyViewProps {
    onBack: () => void;
    onNavigate: (view: any) => void;
    onSelectCategory: (category: string) => void;
}

const BasketBuddyView: React.FC<BasketBuddyViewProps> = ({ onBack, onNavigate, onSelectCategory }) => {
    const [messages, setMessages] = useState<{ type: 'bot' | 'user'; text: string }[]>([
        { type: 'bot', text: 'Hi! I am BasketBuddy 🧺. I can help you shop and learn how to order.' }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleAction = (action: string) => {
        if (action === 'how_to_order') {
            setMessages(prev => [...prev, { type: 'user', text: 'How do I place an order?' }]);
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    text: `It's easy! Follow these steps:\n\n1. **Browse**: Click on categories or search for items.\n2. **Add**: Click 'Add' on the product.\n3. **Cart**: Click the Cart icon (top right).\n4. **Checkout**: Click 'Place Order' and follow instructions.\n\nTry adding a vegetable now!`
                }]);
            }, 800);
        } else if (action === 'veg') {
            setMessages(prev => [...prev, { type: 'user', text: 'Show me Vegetables' }]);
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: 'Taking you to the Farm Fresh Vegetables aisle! 🥦' }]);
                setTimeout(() => {
                    onSelectCategory('dc1');
                    onNavigate('categories');
                }, 1200);
            }, 500);
        } else if (action === 'fruit') {
            setMessages(prev => [...prev, { type: 'user', text: 'Show me Fruits' }]);
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: 'Opening the Fruit Basket for you! 🍎' }]);
                setTimeout(() => {
                    onSelectCategory('dc2');
                    onNavigate('categories');
                }, 1200);
            }, 500);
        } else if (action === 'contact') {
            setMessages(prev => [...prev, { type: 'user', text: 'I need support' }]);
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: '📞 Call us anytime at +91 95002 45626' }]);
            }, 800);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 animate-fadeIn relative z-40">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-green-200 dark:border-green-800 overflow-hidden p-1.5">
                        <img src="/basket_icon.png" alt="BasketBuddy" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-slate-900 dark:text-white leading-none">BasketBuddy</h1>
                        <p className="text-xs text-green-600 font-bold opacity-80">Your Personal Shopping Assistant</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
                {/* Welcome Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center mb-6">
                    <div className="w-16 h-16 bg-green-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce-slow">
                        👋
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">New to GREEN trust Grocery?</h2>
                    <p className="text-sm text-slate-500 mb-4 max-w-xs mx-auto">I can teach you how to order fresh groceries in seconds.</p>
                    <button
                        onClick={() => handleAction('how_to_order')}
                        className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-green-200 hover:scale-105 transition-transform"
                    >
                        Teach Me How to Order
                    </button>
                </div>

                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.type === 'bot' && (
                            <div className="w-8 h-8 rounded-full bg-white border border-green-100 flex items-center justify-center mr-2 flex-shrink-0 self-end mb-1 p-1 overflow-hidden">
                                <img src="/basket_icon.png" alt="Bot" className="w-full h-full object-contain" />
                            </div>
                        )}
                        <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm font-medium leading-relaxed whitespace-pre-line shadow-sm ${msg.type === 'user'
                            ? 'bg-green-600 text-white rounded-br-none shadow-green-200 dark:shadow-none'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input Area (Simplified for now with Quick Chips) */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 sticky bottom-0 z-10 w-full md:max-w-6xl md:mx-auto">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 pl-1">Quick Actions</p>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    <button onClick={() => handleAction('how_to_order')} className="whitespace-nowrap px-4 py-2.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl text-xs font-bold border border-green-100 dark:border-green-800 hover:bg-green-100 transition-colors">
                        🎓 How to Order
                    </button>
                    <button onClick={() => handleAction('veg')} className="whitespace-nowrap px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors">
                        🥦 Shop Veggies
                    </button>
                    <button onClick={() => handleAction('fruit')} className="whitespace-nowrap px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors">
                        🍎 Shop Fruits
                    </button>
                    <button onClick={() => handleAction('contact')} className="whitespace-nowrap px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors">
                        📞 Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BasketBuddyView;
