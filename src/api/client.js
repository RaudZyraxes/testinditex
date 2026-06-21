const BASE_URL = 'https://itx-frontend-test.onrender.com';
const TTL = 3600000; // 1 hour

function cacheGet(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const { data, ts } = JSON.parse(raw);
  if (Date.now() - ts > TTL) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
}

function cacheSet(key, data) {
  localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
}

export async function getProducts() {
  const cached = cacheGet('products');
  if (cached) return cached;
  const res = await fetch(`${BASE_URL}/api/product`);
  const data = await res.json();
  cacheSet('products', data);
  return data;
}

export async function getProduct(id) {
  const key = `product_${id}`;
  const cached = cacheGet(key);
  if (cached) return cached;
  const res = await fetch(`${BASE_URL}/api/product/${id}`);
  const data = await res.json();
  cacheSet(key, data);
  return data;
}

export async function addToCart({ id, colorCode, storageCode }) {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, colorCode, storageCode }),
  });
  return res.json();
}
