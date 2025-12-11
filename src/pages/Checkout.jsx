import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useCart } from '../context/CartContext';
import { collections, firebaseHelpers } from '../firebase';
import { ORDER_STEPS } from '../utils/orderStatus';

export default function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Cart is empty.');
      return;
    }
    setLoading(true);
    setError('');

    const orderId = uuid();
    const orderDoc = firebaseHelpers.doc(collections.orders, orderId);
    const orderPayload = {
      items,
      total,
      user: form,
      status: ORDER_STEPS[0],
      timeline: [{ status: ORDER_STEPS[0], at: new Date().toISOString() }],
      createdAt: firebaseHelpers.serverTimestamp(),
      updatedAt: firebaseHelpers.serverTimestamp(),
    };

    try {
      await firebaseHelpers.setDoc(orderDoc, orderPayload);
      clear();
      navigate(`/track/${orderId}`);
    } catch (err) {
      // Fallback: allow demo without Firestore by storing in memory via navigation state.
      const fallbackOrder = {
        ...orderPayload,
        id: orderId,
        // use plain timestamps for the simulator
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      clear();
      navigate(`/track/${orderId}`, { state: { fallbackOrder } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <h1 className="text-xl font-semibold text-slate-900">Checkout</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-slate-700">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Mobile</label>
            <input
              required
              value={form.mobile}
              onChange={(e) =>
                setForm((f) => ({ ...f, mobile: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Address</label>
            <textarea
              required
              rows={3}
              value={form.address}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          {error && (
            <p className="text-sm font-semibold text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? 'Placing order...' : `Place Order • ₹${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}

