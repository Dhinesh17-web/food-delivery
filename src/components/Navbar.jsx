import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition ${isActive ? 'text-primary' : 'text-slate-700 hover:text-primary'}`;

export default function Navbar() {
  const { items } = useCart();
  const location = useLocation();

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-primary">
          Food Delivery
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            Cart {cartCount > 0 ? `(${cartCount})` : ''}
          </NavLink>
          <NavLink to="/admin" className={navLinkClass}>
            Admin
          </NavLink>
        </nav>
        <div className="hidden text-xs text-slate-500 sm:block">
          {location.pathname}
        </div>
      </div>
    </header>
  );
}

