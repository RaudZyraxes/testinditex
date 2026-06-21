import './ProductDescription.css';

const FIELDS = [
  ['Brand', 'brand'],
  ['Model', 'model'],
  ['Price', 'price'],
  ['CPU', 'cpu'],
  ['RAM', 'ram'],
  ['OS', 'os'],
  ['Screen Size', 'displayResolution'],
  ['Screen Resolution', 'displaySize'],
  ['Battery', 'battery'],
  ['Primary Camera', 'primaryCamera'],
  ['Secondary Camera', 'secondaryCmera'],
  ['Dimensions', 'dimentions'],
  ['Weight', 'weight'],
];

export default function ProductDescription({ product }) {
  return (
    <section className="product-desc">
      <h1 className="product-desc__title">
        {product.brand} {product.model}
      </h1>
      <dl className="product-desc__list">
        {FIELDS.map(([label, key]) => {
          const value = product[key];
          if (!value) return null;
          const display = Array.isArray(value) ? value.join(', ') : value;
          return (
            <div key={key} className="product-desc__item">
              <dt>{label}</dt>
              <dd>{key === 'price' ? `${display} EUR` : display}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
