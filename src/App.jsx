import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';

const PLP = lazy(() => import('./pages/PLP'));
const PDP = lazy(() => import('./pages/PDP'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <main>
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route path="/" element={<PLP />} />
              <Route path="/product/:id" element={<PDP />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </CartProvider>
    </BrowserRouter>
  );
}
