import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';

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

interface OrdersViewProps {
    onBack: () => void;
}

const OrdersView: React.FC<OrdersViewProps> = ({ onBack }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const userId = auth.currentUser?.uid;
                if (!userId) {
                    setLoading(false);
                    return;
                }

                const ordersRef = collection(db, 'orders');
                const q = query(ordersRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const ordersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Order));

                setOrders(ordersData);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, []);

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp.seconds * 1000).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const exportAsPDF = (order: Order) => {
        // Simple text-based PDF generation using browser print
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
                    .footer { margin-top: 40px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🌿 Green Trust Grocery</h1>
                    <p>Order Invoice</p>
                    <p><strong>Order ID:</strong> #${order.id.slice(-6)}</p>
                    <p><strong>Date:</strong> ${formatDate(order.createdAt)}</p>
                    <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
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
                    <p>Delivery: ${order.amount?.deliveryFee === 0 ? 'FREE' : '₹' + (order.amount?.deliveryFee || 0)}</p>
                    <p style="font-size: 28px; color: #16a34a;">Total: ₹${order.amount?.total || 0}</p>
                </div>
                <div class="footer">
                    <p>Thank you for shopping with Green Trust Grocery!</p>
                    <p>For support, contact us at support@greentrust.in</p>
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

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 px-4 py-4 flex items-center gap-4">
                <button onClick={onBack} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                    <i className="fa-solid fa-arrow-left text-gray-600 dark:text-gray-300"></i>
                </button>
                <div>
                    <h1 className="text-xl font-black text-gray-900 dark:text-white">Your Orders</h1>
                    <p className="text-xs text-gray-500">{orders.length} order(s) found</p>
                </div>
            </div>

            {/* Orders List */}
            <div className="p-4 space-y-4">
                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <i className="fa-solid fa-box-open text-3xl"></i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-600 dark:text-gray-400 mb-2">No orders yet</h3>
                        <p className="text-sm text-gray-400">Your order history will appear here</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700">
                            {/* Order Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <span className="text-xs text-gray-400 font-mono">#{order.id.slice(-6)}</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{formatDate(order.createdAt)}</p>
                                </div>
                                <button
                                    onClick={() => exportAsPDF(order)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-lg text-xs font-bold hover:bg-green-100 transition-colors"
                                >
                                    <i className="fa-solid fa-file-pdf"></i>
                                    Export PDF
                                </button>
                            </div>

                            {/* Items Preview */}
                            <div className="space-y-2 mb-4">
                                {(order.items || []).slice(0, 3).map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-gray-400">{item.quantity}x</span>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                                            <span className="text-xs text-gray-400">({item.weight})</span>
                                        </div>
                                        <span className="font-bold text-gray-900 dark:text-white">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                                {(order.items || []).length > 3 && (
                                    <p className="text-xs text-gray-400 font-medium">+ {order.items.length - 3} more items</p>
                                )}
                            </div>

                            {/* Total */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700">
                                <span className="text-sm font-bold text-gray-500">Total Amount</span>
                                <span className="text-xl font-black text-green-600">₹{order.amount?.total || 0}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrdersView;
