import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api/client';
import ProductCard from '../components/ProductCard';
import './PLP.css';

export default function PLP() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.brand.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q)
    );
  });

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="plp">
      <div className="plp__toolbar">
        <span className="plp__count">{filtered.length} products</span>
        <input
          className="plp__search"
          type="search"
          placeholder="Search by brand or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
      </div>
      {filtered.length === 0 ? (
        <p className="plp__empty">No products found for &ldquo;{search}&rdquo;</p>
      ) : (
        <div className="plp__grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
