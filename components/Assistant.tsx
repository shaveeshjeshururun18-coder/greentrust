
import React, { useState, useEffect } from 'react';
import { CartItem, RecipeSuggestion } from '../types';
import { getRecipeSuggestions, getSmartAssistantResponse } from '../services/gemini';

interface AssistantProps {
  cartItems: CartItem[];
}

export const Assistant: React.FC<AssistantProps> = ({ cartItems }) => {
  const [recipes, setRecipes] = useState<RecipeSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'bot', text: string}[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (cartItems.length >= 2) {
        setLoading(true);
        const data = await getRecipeSuggestions(cartItems);
        setRecipes(data);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [cartItems]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const userMsg = query;
    setQuery('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    const botResponse = await getSmartAssistantResponse(userMsg, cartItems);
    setChatHistory(prev => [...prev, { role: 'bot', text: botResponse }]);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-emerald-100 relative overflow-hidden">
        <h2 className="text-3xl font-black mb-1 tracking-tighter">Kitchen AI</h2>
        <p className="text-emerald-100 text-sm font-bold opacity-90 uppercase tracking-widest">Your Private Chef</p>
        <i className="fas fa-wand-sparkles absolute -top-4 -right-4 text-9xl text-white/10 -rotate-12"></i>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-7">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Chat Assistant</h3>
        <div className="space-y-5 mb-6 max-h-[300px] overflow-y-auto scrollbar-hide px-1">
          {chatHistory.length === 0 && (
            <div className="bg-slate-50 rounded-2xl p-5 text-sm font-medium text-slate-500 italic leading-relaxed">
              "Tell me a quick recipe using the items in my basket." <br/><br/>
              "How do I store my leafy greens to keep them fresh?"
            </div>
          )}
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-sm font-medium leading-relaxed ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none shadow-lg shadow-emerald-100' : 'bg-slate-100 text-slate-700 rounded-tl-none border border-slate-200'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-emerald-500 text-xs flex gap-1.5 items-center px-5 animate-pulse"><i className="fas fa-circle text-[4px]"></i><i className="fas fa-circle text-[4px]"></i><i className="fas fa-circle text-[4px]"></i></div>}
        </div>
        <form onSubmit={handleAsk} className="relative mt-4">
          <input 
            type="text" 
            placeholder="Type your question here..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-2xl py-4.5 px-6 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-400"
          />
          <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-200 active:scale-90 transition-transform flex items-center justify-center"><i className="fas fa-paper-plane text-xs"></i></button>
        </form>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-7">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Custom Recipes</h3>
           {cartItems.length < 2 && <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-lg">Add 2+ items</span>}
        </div>
        <div className="space-y-4">
          {recipes.length > 0 ? recipes.map((r, i) => (
            <div key={i} className="bg-emerald-50/50 border border-emerald-100/50 rounded-3xl p-6 hover:bg-emerald-50 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-black text-emerald-900 text-base leading-tight group-hover:text-emerald-600 transition-colors">{r.title}</h4>
                <i className="fas fa-chevron-right text-[10px] text-emerald-300 group-hover:translate-x-1 transition-transform"></i>
              </div>
              <p className="text-xs font-bold text-emerald-700 opacity-80 line-clamp-2 leading-relaxed">{r.description}</p>
            </div>
          )) : (
            <div className="text-center py-16 opacity-30">
               <i className="fas fa-mortar-pestle text-5xl mb-4 text-slate-200"></i>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Add items to get cooking</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
