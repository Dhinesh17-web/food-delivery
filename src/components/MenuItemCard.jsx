import { useCart } from '../context/CartContext';

export default function MenuItemCard({ item, restaurantId }) {
  const { addItem } = useCart();

  return (
    <div className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <img
        src={item.image}
        alt={item.name}
        className="h-20 w-20 rounded-md object-cover"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${item.veg ? 'bg-emerald-500' : 'bg-orange-500'}`}
            />
            <p className="text-sm font-semibold text-slate-900">{item.name}</p>
          </div>
          <p className="text-sm text-slate-600">₹{item.price}</p>
        </div>
        <button
          onClick={() => addItem({ ...item, restaurantId })}
          className="w-28 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

