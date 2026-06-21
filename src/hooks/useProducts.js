import { useState, useEffect } from 'react';
import { getProducts } from '../api/client';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Could not load products. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
