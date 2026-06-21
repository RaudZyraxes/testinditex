import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import ProductDescription from '../components/ProductDescription';
import ProductActions from '../components/ProductActions';
import './PDP.css';

export default function PDP() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  if (loading) return <div className="loading">Loading product...</div>;
  if (error || !product) return <div className="loading">{error ?? 'Product not found.'}</div>;

  return (
    <div className="pdp">
      <Link to="/" className="pdp__back">&#8592; Back to list</Link>
      <div className="pdp__content">
        <div className="pdp__image">
          <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
        </div>
        <div className="pdp__details">
          <ProductDescription product={product} />
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}
