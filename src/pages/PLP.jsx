import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import './PLP.css';

export default function PLP() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return p.brand.toLowerCase().includes(q) || p.model.toLowerCase().includes(q);
  });

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="loading">{error}</div>;

  return (
    <div className="plp">
      <div className="plp__hero">
        <h1 className="plp__title">All products</h1>
        <div className="plp__search-wrap">
          <svg className="plp__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            className="plp__search"
            type="search"
            placeholder="Search brand or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>
      </div>

      <div className="plp__meta">
        <span className="plp__count">{filtered.length} products</span>
      </div>

      <div className="plp__grid">
        {filtered.length === 0 ? (
          <p className="plp__empty">No results for &ldquo;{search}&rdquo;</p>
        ) : (
          filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
