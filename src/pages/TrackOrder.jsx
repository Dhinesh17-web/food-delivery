import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import StatusTimeline from '../components/StatusTimeline';
import { collections, firebaseHelpers } from '../firebase';
import { ORDER_STEPS, getNextStatus } from '../utils/orderStatus';

export default function TrackOrder() {
  const { orderId } = useParams();
  const location = useLocation();
  const fallbackOrder = location.state?.fallbackOrder;

  const [order, setOrder] = useState(fallbackOrder || null);
  const [error, setError] = useState('');

  // Subscribe to Firestore if available.
  useEffect(() => {
    if (!orderId || fallbackOrder) return undefined;
    let unsub;
    try {
      const docRef = firebaseHelpers.doc(collections.orders, orderId);
      unsub = firebaseHelpers.onSnapshot(
        docRef,
        (snap) => {
          if (snap.exists()) {
            setOrder({ id: snap.id, ...snap.data() });
          } else {
            setError('Order not found.');
          }
        },
        () => {
          setError('Live updates unavailable.');
        }
      );
    } catch (err) {
      setError('Live updates unavailable.');
    }
    return () => unsub && unsub();
  }, [orderId, fallbackOrder]);

  // Simulator that auto-advances status in Firestore for demo.
  useEffect(() => {
    if (!order || fallbackOrder) return undefined;
    if (order.status === ORDER_STEPS[ORDER_STEPS.length - 1]) return undefined;
    const interval = setInterval(async () => {
      const next = getNextStatus(order.status);
      if (!next) {
        clearInterval(interval);
        return;
      }
      try {
        const docRef = firebaseHelpers.doc(collections.orders, orderId);
        await firebaseHelpers.updateDoc(docRef, {
          status: next,
          updatedAt: firebaseHelpers.serverTimestamp(),
        });
      } catch (err) {
        // ignore; likely offline or missing config
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [order, fallbackOrder, orderId]);

  // Local simulator for fallback orders.
  useEffect(() => {
    if (!fallbackOrder) return undefined;
    setOrder(fallbackOrder);
    const interval = setInterval(() => {
      setOrder((current) => {
        if (!current) return current;
        const next = getNextStatus(current.status);
        if (!next) {
          clearInterval(interval);
          return current;
        }
        const updated = {
          ...current,
          status: next,
          timeline: [
            ...(current.timeline || []),
            { status: next, at: new Date().toISOString() },
          ],
        };
        return updated;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [fallbackOrder]);

  const info = useMemo(() => {
    if (!order) return null;
    return {
      name: order.user?.name,
      mobile: order.user?.mobile,
      address: order.user?.address,
    };
  }, [order]);

  if (error) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold text-slate-900">Track Order</h1>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold text-slate-900">Track Order</h1>
        <p className="text-sm text-slate-600">Loading order...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Order #{orderId}
          </h1>
          <p className="text-sm text-slate-600">{order.status}</p>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Live tracking
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <StatusTimeline currentStatus={order.status} />
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-800">Delivery Info</p>
            <div className="mt-2 space-y-1 text-sm text-slate-600">
              <p>{info?.name}</p>
              <p>{info?.mobile}</p>
              <p className="text-slate-500">{info?.address}</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-800">Items</p>
            <div className="mt-2 space-y-2 text-sm text-slate-700">
              {(order.items || []).map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-slate-200 pt-2 font-semibold">
                Total: ₹{order.total?.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

