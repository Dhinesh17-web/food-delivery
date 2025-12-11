import { useMemo, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';

export default function Home() {
  const [search, setSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => {
    return restaurants.filter((res) => {
      const matchesSearch = res.name.toLowerCase().includes(search.toLowerCase());
      const matchesVeg = vegOnly ? res.vegOnly : true;
      const matchesRating = res.rating >= minRating;
      return matchesSearch && matchesVeg && matchesRating;
    });
  }, [search, vegOnly, minRating]);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-primary/90 to-amber-500 px-6 py-10 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Crave it? Get it delivered.</h1>
        <p className="mt-2 text-sm text-white/80">
          Explore restaurants, add your favorites to cart, and track orders live.
        </p>
        <div className="mt-6 flex flex-col gap-3 rounded-xl bg-white/10 p-4 backdrop-blur sm:flex-row sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurants"
            className="flex-1 rounded-lg border border-white/30 bg-white/80 px-3 py-2 text-slate-900 placeholder:text-slate-500 focus:outline-none"
          />
          <div className="flex items-center gap-4 text-sm">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={vegOnly}
                onChange={(e) => setVegOnly(e.target.checked)}
                className="h-4 w-4"
              />
              <span>Pure Veg</span>
            </label>
            <label className="flex items-center gap-2">
              <span>Min Rating</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="rounded border border-white/30 bg-white/80 px-2 py-1 text-slate-900"
              >
                <option value={0}>All</option>
                <option value={3}>3.0+</option>
                <option value={4}>4.0+</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Restaurants ({filtered.length})
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
}

