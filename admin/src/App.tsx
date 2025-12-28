import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';

interface Order {
  id: string;
  userPhone: string;
  items: { name: string; quantity: number; weight: string; price: number }[];
  amount: { total: number; deliveryFee: number; subtotal: number };
  address: string;
  status: 'pending' | 'accepted' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: any;
}

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'dashboard' | 'orders' | 'customers'>('orders');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'delivered'>('all');

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (e) {
      console.error("Error updating status:", e);
      alert("Failed to update status");
    }
  };

  // Stats Calculation
  const totalSales = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((acc, curr) => acc + curr.amount.total, 0);

  const todayOrders = orders.filter(o => {
    const today = new Date();
    const orderDate = o.createdAt?.toDate();
    return orderDate &&
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear();
  }).length;

  const pendingCount = orders.filter(o => o.status === 'pending').length;

  const filteredOrders = orders.filter(o => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white fixed h-full z-20 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/50">
            GT
          </div>
          <span className="font-bold text-lg tracking-wide">Green Trust</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === 'dashboard' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span>📊</span> <span className="font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveView('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === 'orders' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span>📦</span> <span className="font-medium">Orders</span>
            {pendingCount > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{pendingCount}</span>}
          </button>
          <button
            onClick={() => setActiveView('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === 'customers' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span>👥</span> <span className="font-medium">Customers</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-700"></div>
            <div>
              <p className="text-sm font-bold">Admin</p>
              <p className="text-[10px] text-slate-500">Super User</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 text-white z-20 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">GT</div>
          <span className="font-bold">Green Trust Admin</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-6 pt-20 md:pt-6">

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Sales</p>
              <h3 className="text-2xl font-black text-slate-900">₹{totalSales.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl">💰</div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Today's Orders</p>
              <h3 className="text-2xl font-black text-slate-900">{todayOrders}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl">📅</div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Pending Actions</p>
              <h3 className="text-2xl font-black text-slate-900">{pendingCount}</h3>
            </div>
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-xl">⚠️</div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {['all', 'pending', 'accepted', 'delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filterStatus === status ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* ORDERS LIST */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 font-medium">No orders found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700 animate-pulse' :
                        order.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                      }`}>
                      {order.status}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">#{order.id.slice(-6).toUpperCase()}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-bold">{order.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 flex-shrink-0">
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{order.userPhone}</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-[250px] leading-relaxed">{order.address}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 mb-4 space-y-2">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">{item.name} <span className="text-slate-400 text-xs">x{item.quantity}</span></span>
                      <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-xs text-center text-slate-400 font-bold italic pt-1">+{order.items.length - 3} more items</p>
                  )}
                  <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Amount</span>
                    <span className="text-lg font-black text-green-600">₹{order.amount.total}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(order.id, 'accepted')}
                        className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(order.id, 'cancelled')}
                        className="px-4 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {order.status === 'accepted' && (
                    <button
                      onClick={() => updateStatus(order.id, 'delivered')}
                      className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-200 hover:scale-105 transition-transform"
                    >
                      Mark Delivered
                    </button>
                  )}
                  <a href={`tel:${order.userPhone}`} className="px-4 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
                    📞
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
