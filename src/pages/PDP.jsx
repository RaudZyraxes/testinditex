import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api/client';
import ProductDescription from '../components/ProductDescription';
import ProductActions from '../components/ProductActions';
import './PDP.css';

export default function PDP({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id)
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div className="loading">Product not found.</div>;

  return (
    <div className="pdp">
      <Link to="/" className="pdp__back">&#8592; Back to list</Link>
      <div className="pdp__content">
        <div className="pdp__image">
          <img
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
          />
        </div>
        <div className="pdp__details">
          <ProductDescription product={product} />
          <ProductActions product={product} onAddToCart={onAddToCart} />
        </div>
      </div>
    </div>
  );
}
