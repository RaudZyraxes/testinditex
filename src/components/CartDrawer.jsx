import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, cartCount } = useCart();
  const total = items.reduce((sum, i) => sum + (Number(i.price) || 0) * i.qty, 0);

  return (
    <>
      {open && <div className="cart-overlay" onClick={onClose} aria-hidden="true" />}
      <aside className={`cart-drawer${open ? ' open' : ''}`} aria-label="Shopping cart">
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Cart <span>({cartCount})</span></h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">&#10005;</button>
        </div>

        {items.length === 0 ? (
          <p className="cart-drawer__empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {items.map(item => (
                <li key={`${item.id}-${item.colorCode}-${item.storageCode}`} className="cart-drawer__item">
                  <img src={item.imgUrl} alt={`${item.brand} ${item.model}`} className="cart-drawer__img" />
                  <div className="cart-drawer__info">
                    <p className="cart-drawer__brand">{item.brand}</p>
                    <p className="cart-drawer__model">{item.model}</p>
                    <p className="cart-drawer__meta">{item.storageName} · {item.colorName}</p>
                    <p className="cart-drawer__price">
                      {item.price ? `${item.price} EUR` : '—'}
                      {item.qty > 1 && <span> × {item.qty}</span>}
                    </p>
                  </div>
                  <button
                    className="cart-drawer__remove"
                    onClick={() => removeItem(item.id, item.colorCode, item.storageCode)}
                    aria-label={`Remove ${item.brand} ${item.model}`}
                  >&#10005;</button>
                </li>
              ))}
            </ul>
            <div className="cart-drawer__footer">
              <span>Total</span>
              <strong>{total.toFixed(2)} EUR</strong>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
