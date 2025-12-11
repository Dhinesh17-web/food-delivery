import { Link, useParams } from 'react-router-dom';
import MenuItemCard from '../components/MenuItemCard';
import { getRestaurantById } from '../data/restaurants';

export default function Restaurant() {
  const { id } = useParams();
  const restaurant = getRestaurantById(id);

  if (!restaurant) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-slate-600">Restaurant not found.</p>
        <Link to="/" className="text-primary underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-64 w-full object-cover"
        />
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {restaurant.name}
              </h1>
              <p className="text-sm text-slate-600">{restaurant.cuisine}</p>
            </div>
            <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              ⭐ {restaurant.rating}
            </div>
          </div>
          {restaurant.vegOnly && (
            <p className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
              Pure Veg
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Menu</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {restaurant.menu.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              restaurantId={restaurant.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

