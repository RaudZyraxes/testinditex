import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import Header from './Header';

const renderHeader = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <CartProvider>
        <Header />
      </CartProvider>
    </MemoryRouter>
  );

describe('Header', () => {
  beforeEach(() => localStorage.clear());

  it('renders logo', () => {
    renderHeader();
    expect(screen.getByText('MOBILE SHOP')).toBeInTheDocument();
  });

  it('shows Home breadcrumb on PLP', () => {
    renderHeader('/');
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByText('Product Detail')).not.toBeInTheDocument();
  });

  it('shows Product Detail breadcrumb on PDP', () => {
    renderHeader('/product/abc');
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Product Detail')).toBeInTheDocument();
  });

  it('renders cart button', () => {
    renderHeader();
    expect(screen.getByLabelText(/open cart/i)).toBeInTheDocument();
  });
});
