import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

const renderHeader = (cartCount = 0, path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Header cartCount={cartCount} />
    </MemoryRouter>
  );

describe('Header', () => {
  it('renders logo link', () => {
    renderHeader();
    expect(screen.getByText('MOBILE SHOP')).toBeInTheDocument();
  });

  it('displays cart count', () => {
    renderHeader(5);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows only Home breadcrumb on PLP', () => {
    renderHeader(0, '/');
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByText('Product Detail')).not.toBeInTheDocument();
  });

  it('shows product detail breadcrumb on PDP', () => {
    renderHeader(0, '/product/abc123');
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Product Detail')).toBeInTheDocument();
  });
});
