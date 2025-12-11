import { Link } from 'react-router-dom';

export default function RestaurantCard({ restaurant }) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="h-40 w-full overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            {restaurant.name}
          </h3>
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
            ⭐ {restaurant.rating}
          </span>
        </div>
        <p className="text-sm text-slate-600">{restaurant.cuisine}</p>
        {restaurant.vegOnly && (
          <span className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
            Pure Veg
          </span>
        )}
      </div>
    </Link>
  );
}

