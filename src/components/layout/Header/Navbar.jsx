import React, { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Home,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  X,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { CartDrawer } from './CartDrawer';
import { ROLES } from '../../../config/constants';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useLocalStorage('shopverse-theme', false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(location.pathname === '/catalog' ? params.get('search') ?? '' : '');
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/catalog?search=${encodeURIComponent(query)}` : '/catalog');
  };

  const closeCart = useCallback(() => setCartOpen(false), []);
  const linkClassName = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  return (
    <>
      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation">
          <Link to="/" className="brand" aria-label="ShopVerse home">
            <img className="brand-logo" src="/shopverse-mark.png" alt="" />
            <span>Shop<span>Verse</span></span>
          </Link>
          <form className="navbar-search" onSubmit={submitSearch} role="search">
            <input
              aria-label="Search products"
              placeholder="Search products, shops and more..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && <button type="button" className="search-clear" aria-label="Clear search" onClick={() => setSearch('')}><X size={15} /></button>}
            <button type="submit" aria-label="Submit search"><Search size={18} /></button>
          </form>
          <div className="nav-links">
            <NavLink to="/" end className={linkClassName}><Home size={15} /><span>Home</span></NavLink>
            <NavLink to="/catalog" className={linkClassName}>Discover</NavLink>
            {user?.role === ROLES.VENDOR || user?.role === ROLES.ADMIN
              ? <NavLink to="/vendor" className={linkClassName}>My shop</NavLink>
              : <Link to="/vendor" className="nav-link">Sell with us</Link>}
          </div>
          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              onClick={() => setDarkMode((current) => !current)}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {user ? (
              <button type="button" className="account-button" onClick={logout} title="Sign out">
                <span className="account-avatar">{user.name?.slice(0, 1).toUpperCase() || 'U'}</span>
                <span className="account-name">{user.name}</span><ChevronDown size={13} />
              </button>
            ) : <Link to="/login" className="sign-in-link">Sign in</Link>}
            <button
              type="button"
              id="header-cart-button"
              className="header-cart-button"
              aria-label={`Open shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              aria-expanded={cartOpen}
              aria-controls="cart-drawer-title"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart size={19} /><span className="cart-count">{cartCount}</span><span className="cart-button-label">Bag</span>
            </button>
          </div>
        </nav>
      </header>
      <CartDrawer open={cartOpen} onClose={closeCart} />
    </>
  );
};
