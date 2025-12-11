import { Link, useNavigate } from 'react-router-dom';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, increment, decrement, remove, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-slate-900">Your Cart</h1>
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-600">
            Cart is empty.{' '}
            <Link to="/" className="text-primary underline">
              Browse restaurants
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-600">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(item.id)}
                    className="h-8 w-8 rounded-full border border-slate-200 text-lg leading-none"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increment(item.id)}
                    className="h-8 w-8 rounded-full border border-slate-200 text-lg leading-none"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => remove(item.id)}
                  className="text-xs font-semibold text-primary"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <CartSummary total={total} onCheckout={() => navigate('/checkout')} />
      </div>
    </div>
  );
}

