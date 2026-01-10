import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, getDocs, Timestamp } from 'firebase/firestore';

interface OrderItem {
    name: string;
    weight: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    userId: string;
    userPhone: string;
    items: OrderItem[];
    amount: {
        subtotal: number;
        deliveryFee: number;
        handlingFee: number;
        total: number;
    };
    address: string;
    paymentMethod: string;
    status: string;
    createdAt: Timestamp;
}

const AdminDashboard: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersRef = collection(db, 'orders');
                const q = query(ordersRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const ordersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Order));

                setOrders(ordersData);
            } catch (err: any) {
                console.error("Error fetching orders:", err);
                setError(err.message || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp.seconds * 1000).toLocaleString();
    };

    if (error) {
        return (
            <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                        <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Something went wrong</h3>
                    <p className="text-sm text-slate-500 font-medium mb-6">{error}</p>
                    <button onClick={() => window.location.reload()} className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500 font-medium">Manage your incoming orders</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
                        <span className="font-bold text-gray-700">Total Orders: </span>
                        <span className="text-green-600 font-black text-lg">{orders.length}</span>
                    </div>
                </header>

                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex flex-col lg:flex-row justify-between gap-6">

                                {/* Order Meta & Customer Info */}
                                <div className="lg:w-1/3 space-y-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                            <span className="text-xs text-gray-400 font-mono">#{order.id.slice(-6)}</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-500">{formatDate(order.createdAt)}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Customer Details</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                                    <i className="fa-solid fa-phone text-xs"></i>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold">Phone</p>
                                                    <a href={`tel:${order.userPhone}`} className="text-sm font-black text-gray-900 hover:text-blue-600">{order.userPhone || 'N/A'}</a>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                                    <i className="fa-solid fa-location-dot text-xs"></i>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold">Delivery Address</p>
                                                    <p className="text-sm font-medium text-gray-800 leading-snug">{order.address || 'No address provided'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="lg:w-1/2">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Ordered Items</h4>
                                    <div className="space-y-3">
                                        {(order.items || []).map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-400 text-xs">
                                                        {item.quantity}x
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-gray-800">{item.name}</p>
                                                        <p className="text-xs text-gray-500 font-bold">{item.weight}</p>
                                                    </div>
                                                </div>
                                                <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="lg:w-1/6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                                    <div>
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Payment</h4>
                                        <p className="text-sm font-bold text-gray-800 capitalize mb-1">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</p>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-gray-400">Subtotal</span>
                                            <span className="text-xs font-bold">₹{order.amount?.subtotal || 0}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-gray-400">Delivery</span>
                                            <span className="text-xs font-bold text-green-600">{!order.amount?.deliveryFee ? 'FREE' : `₹${order.amount.deliveryFee}`}</span>
                                        </div>
                                        <div className="pt-2 border-t border-dashed border-gray-200">
                                            <p className="text-xs text-gray-400 uppercase font-black">Total</p>
                                            <p className="text-2xl font-black text-gray-900">₹{order.amount?.total || 0}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}

                    {orders.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <i className="fa-solid fa-box-open text-2xl"></i>
                            </div>
                            <p className="text-gray-400 font-bold text-lg">No orders found yet</p>
                            <p className="text-sm text-gray-400">Waiting for customers to make a purchase</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
