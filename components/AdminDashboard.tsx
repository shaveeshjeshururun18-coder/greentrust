import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, getDocs, Timestamp, doc, updateDoc } from 'firebase/firestore';

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
    userEmail?: string;
    customerPhone?: string;
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
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

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

    const markAsComplete = async (orderIds: string[]) => {
        try {
            for (const orderId of orderIds) {
                const orderRef = doc(db, 'orders', orderId);
                await updateDoc(orderRef, { status: 'delivered' });
            }
            // Refresh orders
            const ordersRef = collection(db, 'orders');
            const q = query(ordersRef, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Order));
            setOrders(ordersData);
            setSelectedOrders([]);
        } catch (error) {
            console.error('Error updating orders:', error);
            alert('Failed to update orders');
        }
    };

    const toggleOrderSelection = (orderId: string) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedOrders.length === orders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(orders.map(o => o.id));
        }
    };

    const exportAsPDF = (order: Order) => {
        const printContent = `
            <html>
            <head>
                <title>Order Invoice - ${order.id.slice(-6)}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; }
                    h1 { color: #16a34a; }
                    .header { border-bottom: 2px solid #16a34a; padding-bottom: 20px; margin-bottom: 20px; }
                    .item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
                    .total { font-size: 24px; font-weight: bold; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🌿 Green Trust Grocery</h1>
                    <p><strong>Order ID:</strong> #${order.id.slice(-6)}</p>
                    <p><strong>Date:</strong> ${formatDate(order.createdAt)}</p>
                    <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
                    <p><strong>Phone:</strong> ${order.customerPhone || order.userPhone || 'N/A'}</p>
                </div>
                <h3>Delivery Address</h3>
                <p>${order.address || 'Not provided'}</p>
                <h3>Items Ordered</h3>
                ${(order.items || []).map(item => `
                    <div class="item">
                        <span>${item.name} (${item.weight}) x ${item.quantity}</span>
                        <span>₹${item.price * item.quantity}</span>
                    </div>
                `).join('')}
                <div class="total">
                    <p>Subtotal: ₹${order.amount?.subtotal || 0}</p>
                    <p>Delivery: ₹${order.amount?.deliveryFee || 0}</p>
                    <p style="color: #16a34a;">Total: ₹${order.amount?.total || 0}</p>
                </div>
            </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.print();
        }
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
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-6 font-sans pb-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Admin Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Manage incoming orders</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Total Orders: </span>
                        <span className="text-green-600 font-black text-lg">{orders.length}</span>
                    </div>
                </header>

                {/* Bulk Actions Toolbar */}
                {selectedOrders.length > 0 && (
                    <div className="mb-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-check-circle text-green-600 text-xl"></i>
                            <span className="font-bold text-gray-900 dark:text-white">
                                {selectedOrders.length} order(s) selected
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => markAsComplete(selectedOrders)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                            >
                                <i className="fa-solid fa-check"></i>
                                Mark as Complete
                            </button>
                            <button
                                onClick={() => setSelectedOrders([])}
                                className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                )}

                {/* Select All Checkbox */}
                {orders.length > 0 && (
                    <div className="mb-4 flex items-center gap-3 px-2">
                        <input
                            type="checkbox"
                            checked={selectedOrders.length === orders.length && orders.length > 0}
                            onChange={toggleSelectAll}
                            className="w-5 h-5 rounded border-2 border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            Select All ({orders.length} orders)
                        </label>
                    </div>
                )}

                {/* Orders List */}
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl text-center">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fa-solid fa-box-open text-3xl text-gray-400"></i>
                            </div>
                            <h3 className="text-lg font-bold text-gray-600 dark:text-gray-400 mb-2">No orders yet</h3>
                            <p className="text-sm text-gray-400">Orders will appear here as they come in</p>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
                                {/* Checkbox and Order Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedOrders.includes(order.id)}
                                        onChange={() => toggleOrderSelection(order.id)}
                                        className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <div className="flex-1 flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                            'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                                <span className="text-sm text-gray-400 font-mono">#{order.id.slice(-6)}</span>
                                            </div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{formatDate(order.createdAt)}</p>
                                            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-1">
                                                Phone: {order.customerPhone || order.userPhone || 'N/A'}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => exportAsPDF(order)}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-lg text-sm font-bold hover:bg-green-100 transition-colors"
                                        >
                                            <i className="fa-solid fa-file-pdf"></i>
                                            Export
                                        </button>
                                    </div>
                                </div>

                                {/* Items Preview */}
                                <div className="space-y-2 mb-4">
                                    {(order.items || []).slice(0, 3).map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-gray-800 dark:text-gray-200">
                                                {item.quantity}x {item.name} ({item.weight})
                                            </span>
                                            <span className="font-bold text-gray-900 dark:text-white">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                    {(order.items || []).length > 3 && (
                                        <p className="text-xs text-gray-400 font-medium">+ {order.items.length - 3} more items</p>
                                    )}
                                </div>

                                {/* Total */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Payment</p>
                                        <p className="text-sm font-black text-gray-700 dark:text-gray-300">{order.paymentMethod?.toUpperCase()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-500 uppercase">Total Amount</p>
                                        <p className="text-2xl font-black text-green-600">₹{order.amount?.total || 0}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
