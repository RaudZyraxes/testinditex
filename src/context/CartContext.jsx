import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

function readStorage() {
  try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
}

function persist(items) {
  localStorage.setItem('cart', JSON.stringify(items));
  return items;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStorage);

  const addItem = useCallback((product, colorCode, storageCode) => {
    const colorName = product.options?.colors?.find(c => c.code === colorCode)?.name ?? '';
    const storageName = product.options?.storages?.find(s => s.code === storageCode)?.name ?? '';

    setItems(prev => {
      const idx = prev.findIndex(
        i => i.id === product.id && i.colorCode === colorCode && i.storageCode === storageCode
      );
      const next = idx >= 0
        ? prev.map((item, i) => i === idx ? { ...item, qty: item.qty + 1 } : item)
        : [...prev, { id: product.id, brand: product.brand, model: product.model, price: product.price, imgUrl: product.imgUrl, colorCode, storageCode, colorName, storageName, qty: 1 }];
      return persist(next);
    });
  }, []);

  const removeItem = useCallback((id, colorCode, storageCode) => {
    setItems(prev => persist(
      prev.filter(i => !(i.id === id && i.colorCode === colorCode && i.storageCode === storageCode))
    ));
  }, []);

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
