import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PLP from './pages/PLP';
import PDP from './pages/PDP';

export default function App() {
  const [cartCount, setCartCount] = useState(() =>
    Number(localStorage.getItem('cartCount') || 0)
  );

  const updateCart = (count) => {
    setCartCount(count);
    localStorage.setItem('cartCount', count);
  };

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={<PLP />} />
          <Route path="/product/:id" element={<PDP onAddToCart={updateCart} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
