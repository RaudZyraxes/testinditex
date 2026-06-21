import './ProductCard.css';

export default function ProductCard({ product, onClick }) {
  return (
    <article
      className="product-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`${product.brand} ${product.model}`}
    >
      <div className="product-card__img-wrap">
        <img
          className="product-card__img"
          src={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
          loading="lazy"
        />
        <div className="product-card__overlay">
          <span>View product</span>
        </div>
      </div>
      <div className="product-card__info">
        <p className="product-card__brand">{product.brand}</p>
        <p className="product-card__model">{product.model}</p>
        <p className="product-card__price">
          {product.price ? `${product.price} EUR` : '—'}
        </p>
      </div>
    </article>
  );
}
