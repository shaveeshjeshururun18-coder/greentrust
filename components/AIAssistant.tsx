import React, { useState, useRef, useEffect } from 'react';

interface AIAssistantProps {
    onNavigate: (view: any) => void;
    onSelectCategory: (category: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onNavigate, onSelectCategory }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ type: 'bot' | 'user'; text: string }[]>([
        { type: 'bot', text: 'Hi! I am the Green Genie 🧞‍♂️. Need help?' }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleAction = (action: string) => {
        if (action === 'veg') {
            setMessages(prev => [...prev, { type: 'user', text: 'Show me Vegetables' }]);
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: 'Taking you to the Farm Fresh Vegetables aisle! 🥦' }]);
                setTimeout(() => {
                    onSelectCategory('vegetables');
                    onNavigate('categories');
                }, 1200);
            }, 500);
        } else if (action === 'fruit') {
            setMessages(prev => [...prev, { type: 'user', text: 'Show me Fruits' }]);
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: 'Opening the Fruit Basket for you! 🍎' }]);
                setTimeout(() => {
                    onSelectCategory('fruits');
                    onNavigate('categories');
                }, 1200);
            }, 500);
        } else if (action === 'checkout') {
            setMessages(prev => [...prev, { type: 'user', text: 'How do I checkout?' }]);
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: '1. Click the Cart icon (top right).\n2. Click "Place Order".\n3. Login & Pay via UPI/Cash. Easy!' }]);
            }, 800);
        } else if (action === 'delivery') {
            setMessages(prev => [...prev, { type: 'user', text: 'When will I get my order?' }]);
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: '⚡ We deliver in 10-30 MINUTES for local areas!' }]);
            }, 800);
        } else if (action === 'contact') {
            setMessages(prev => [...prev, { type: 'user', text: 'I need support' }]);
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: '📞 Call us anytime at +91 95002 45626' }]);
            }, 800);
        }
    };

    return (
        <>
            {/* Floating Genie Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-24 left-5 z-[60] w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center animate-bounce-slow active:scale-95 transition-transform border-4 border-white dark:border-slate-800"
                >
                    <span className="text-2xl">🧺</span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 left-5 z-[60] w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-popIn origin-bottom-left flex flex-col">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl bg-white/20 rounded-full p-1 border border-white/10">🧺</span>
                            <div>
                                <h3 className="font-bold text-white text-sm">BasketBuddy</h3>
                                <p className="text-[10px] text-green-100 font-medium">AI Shop Assistant</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-64 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed whitespace-pre-line ${msg.type === 'user' ? 'bg-purple-600 text-white rounded-tr-none shadow-md shadow-purple-200 dark:shadow-none' : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 shadow-sm rounded-tl-none border border-gray-100 dark:border-slate-700'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                        <p className="text-[10px] uppercase font-black text-gray-400 mb-2 pl-1 tracking-wider">Quick Actions</p>
                        <div className="flex gap-2 w-full overflow-x-auto no-scrollbar pb-1">
                            <button onClick={() => handleAction('veg')} className="flex-shrink-0 py-2 px-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl text-[10px] font-bold hover:bg-green-100 transition-colors border border-green-100 dark:border-green-900/30">
                                🥦 Veggies
                            </button>
                            <button onClick={() => handleAction('fruit')} className="flex-shrink-0 py-2 px-3 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-xl text-[10px] font-bold hover:bg-orange-100 transition-colors border border-orange-100 dark:border-orange-900/30">
                                🍎 Fruits
                            </button>
                            <button onClick={() => handleAction('delivery')} className="flex-shrink-0 py-2 px-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-[10px] font-bold hover:bg-blue-100 transition-colors border border-blue-100 dark:border-blue-900/30">
                                ⚡ Delivery?
                            </button>
                            <button onClick={() => handleAction('contact')} className="flex-shrink-0 py-2 px-3 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-xl text-[10px] font-bold hover:bg-gray-100 transition-colors border border-gray-200 dark:border-slate-700">
                                📞 Support
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAssistant;
