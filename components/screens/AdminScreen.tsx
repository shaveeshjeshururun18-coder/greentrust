import React, { useState } from 'react';
import { Product } from '../../types';

interface AdminScreenProps {
    products: Product[];
    onUpdateProduct: (product: Product) => void;
    onExit: () => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({ products, onUpdateProduct, onExit }) => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
    const [editingProduct, setEditingProduct] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<{ price: string, stock: string }>({ price: '', stock: '' });

    // Mock Data for Dashboard
    const stats = [
        { label: 'Total Sales', value: '₹1,24,500', icon: 'fa-indian-rupee-sign', color: 'bg-emerald-500' },
        { label: 'Active Orders', value: '12', icon: 'fa-box-open', color: 'bg-blue-500' },
        { label: 'Customers', value: '840', icon: 'fa-users', color: 'bg-purple-500' },
        { label: 'Low Stock', value: '3', icon: 'fa-triangle-exclamation', color: 'bg-amber-500' },
    ];

    const handleEditClick = (p: Product) => {
        setEditingProduct(p.id);
        setEditForm({ price: p.price.toString(), stock: '50' }); // Mock stock
    };

    const handleSave = (p: Product) => {
        onUpdateProduct({
            ...p,
            price: parseInt(editForm.price) || p.price
        });
        setEditingProduct(null);
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 animate-in fade-in duration-300">
            <div className="bg-slate-900 text-white p-5 sticky top-0 z-10 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-lg">
                        <i className="fas fa-shield-cat"></i>
                    </div>
                    <div>
                        <h2 className="font-black text-lg tracking-tight leading-none">Seller Mode</h2>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Admin Dashboard</p>
                    </div>
                </div>
                <button onClick={onExit} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-600 transition-colors">
                    <i className="fas fa-power-off"></i>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex p-2 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
                {['dashboard', 'products', 'orders'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-3 px-6 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="p-5 pb-32">
                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom duration-500">
                        {stats.map(s => (
                            <div key={s.label} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className={`w-10 h-10 rounded-full ${s.color} bg-opacity-10 flex items-center justify-center mb-3 ${s.color.replace('bg-', 'text-')}`}>
                                    <i className={`fas ${s.icon} text-lg`}></i>
                                </div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white mb-1">{s.value}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                            </div>
                        ))}

                        <div className="col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-900/20 mt-4">
                            <h3 className="font-black text-xl mb-2">Grow Business</h3>
                            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Launch a new campaign today to boost your sales by 30%.</p>
                            <button className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg">Start Campaign</button>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
                        {products.map(p => (
                            <div key={p.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex gap-4 items-center">
                                <img src={p.image} className="w-16 h-16 rounded-xl object-cover bg-slate-100" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{p.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{p.category} • {p.unit}</p>

                                    {editingProduct === p.id ? (
                                        <div className="flex gap-2 mt-2 items-center">
                                            <span className="text-xs font-bold text-slate-400">₹</span>
                                            <input
                                                type="number"
                                                value={editForm.price}
                                                onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                                                className="w-20 bg-slate-100 dark:bg-slate-700 rounded-lg px-2 py-1 text-sm font-bold"
                                                autoFocus
                                            />
                                            <button onClick={() => handleSave(p)} className="bg-emerald-500 text-white w-7 h-7 rounded-lg flex items-center justify-center"><i className="fas fa-check text-xs"></i></button>
                                        </div>
                                    ) : (
                                        <p className="text-emerald-600 font-black text-lg mt-1">₹{p.price}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleEditClick(p)}
                                    className={`w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center ${editingProduct === p.id ? 'bg-slate-100 text-slate-400' : 'text-slate-400 hover:text-emerald-600 hover:border-emerald-600'}`}
                                >
                                    <i className="fas fa-pen"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                            <i className="fas fa-inbox text-3xl text-slate-400"></i>
                        </div>
                        <p className="font-bold text-slate-400">No new orders</p>
                    </div>
                )}
            </div>
        </div>
    );
};
