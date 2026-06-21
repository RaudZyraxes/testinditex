import { useState } from 'react';
import { addToCart } from '../api/client';
import { useCart } from '../context/CartContext';
import './ProductActions.css';

export default function ProductActions({ product }) {
  const colors = product.options?.colors ?? [];
  const storages = product.options?.storages ?? [];

  const [colorCode, setColorCode] = useState(colors[0]?.code ?? '');
  const [storageCode, setStorageCode] = useState(storages[0]?.code ?? '');
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { addItem } = useCart();

  const handleAdd = async () => {
    setAdding(true);
    try {
      await addToCart({ id: product.id, colorCode, storageCode });
      addItem(product, colorCode, storageCode);
      setFeedback('Added!');
      setTimeout(() => setFeedback(''), 1500);
    } catch {
      setFeedback('Error. Try again.');
      setTimeout(() => setFeedback(''), 2000);
    } finally {
      setAdding(false);
    }
  };

  return (
    <section className="product-actions">
      <div className="product-actions__selectors">
        {storages.length > 0 && (
          <label className="product-actions__label">
            <span>Storage</span>
            <select
              value={storageCode}
              onChange={(e) => setStorageCode(Number(e.target.value))}
            >
              {storages.map((s) => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
          </label>
        )}
        {colors.length > 0 && (
          <label className="product-actions__label">
            <span>Color</span>
            <select
              value={colorCode}
              onChange={(e) => setColorCode(Number(e.target.value))}
            >
              {colors.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <button
        className={`product-actions__add${feedback === 'Added!' ? ' added' : ''}`}
        onClick={handleAdd}
        disabled={adding}
      >
        {feedback || (adding ? 'Adding...' : 'Add to cart')}
      </button>
    </section>
  );
}
