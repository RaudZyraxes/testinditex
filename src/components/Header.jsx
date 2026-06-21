import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import './Header.css';

export default function Header() {
  const { pathname } = useLocation();
  const { cartCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const isDetail = pathname.startsWith('/product/');

  return (
    <>
      <header className="header">
        <Link to="/" className="header__logo">MOBILE SHOP</Link>
        <nav className="header__breadcrumbs" aria-label="breadcrumb">
          <Link to="/">Home</Link>
          {isDetail && <><span className="header__sep"> / </span><span>Product Detail</span></>}
        </nav>
        <button
          className="header__cart-btn"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart, ${cartCount} items`}
        >
          <svg className="header__cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="header__cart-count" aria-hidden="true">{cartCount}</span>
          )}
        </button>
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
