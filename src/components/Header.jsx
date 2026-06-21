import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header({ cartCount }) {
  const { pathname } = useLocation();
  const isDetail = pathname.startsWith('/product/');

  return (
    <header className="header">
      <Link to="/" className="header__logo">MOBILE SHOP</Link>
      <nav className="header__breadcrumbs" aria-label="breadcrumb">
        <Link to="/">Home</Link>
        {isDetail && <><span className="header__sep"> / </span><span>Product Detail</span></>}
      </nav>
      <div className="header__cart" aria-label={`Cart: ${cartCount} items`}>
        <span className="header__cart-icon">&#128722;</span>
        <span className="header__cart-count">{cartCount}</span>
      </div>
    </header>
  );
}
