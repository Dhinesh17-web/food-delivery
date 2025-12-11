import { useEffect, useState } from 'react';
import { collections, firebaseHelpers } from '../firebase';
import { getNextStatus } from '../utils/orderStatus';

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let unsub;
    try {
      unsub = firebaseHelpers.onSnapshot(
        collections.orders,
        (snap) => {
          const list = [];
          snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
          setOrders(list);
        },
        () => setError('Live updates unavailable.')
      );
    } catch (err) {
      setError('Connect Firebase to view and control orders.');
    }
    return () => unsub && unsub();
  }, []);

  const advanceStatus = async (order) => {
    const next = getNextStatus(order.status);
    if (!next) return;
    try {
      const docRef = firebaseHelpers.doc(collections.orders, order.id);
      await firebaseHelpers.updateDoc(docRef, {
        status: next,
        updatedAt: firebaseHelpers.serverTimestamp(),
      });
    } catch (err) {
      setError('Failed to update status. Check Firebase config.');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">Admin Panel</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {orders.length === 0 && !error && (
        <p className="text-sm text-slate-600">
          No orders yet. Place an order to see it here.
        </p>
      )}
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Order #{order.id}
                </p>
                <p className="text-xs text-slate-600">{order.user?.name}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                {order.status}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-700">
              <span>{order.items?.length || 0} items</span>
              <span>₹{order.total?.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => advanceStatus(order)}
                disabled={!getNextStatus(order.status)}
                className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Advance Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

