import { useEffect, useState } from 'react';
import { IProduct, products as staticProducts } from '../lib/data';

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>(staticProducts); // Start with static data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setProducts(data); // Use API data if available and not empty
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('API fetch failed, keeping static data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}
