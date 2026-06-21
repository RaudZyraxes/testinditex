import { useState, useEffect } from 'react';
import { getProduct } from '../api/client';

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getProduct(id)
      .then(setProduct)
      .catch(() => setError('Could not load product.'))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
