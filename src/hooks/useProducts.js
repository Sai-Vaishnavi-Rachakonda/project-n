import { useEffect, useState } from "react";

/**
 * Load a limited list of products from the Fake Store API.
 * Returns loading and error state along with the data.
 */
export default function useProducts(limit = 5) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) {
          setProducts(data);
        }
      } catch (e) {
        setError("Could not load products. Please retry.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [limit]);

  return { products, loading, error };
}


