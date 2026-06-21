import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import PLP from './PLP';
import * as useProductsHook from '../hooks/useProducts';

const MOCK_PRODUCTS = [
  { id: '1', brand: 'Apple', model: 'iPhone 14', price: '999', imgUrl: '' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S24', price: '899', imgUrl: '' },
  { id: '3', brand: 'Apple', model: 'iPhone 13', price: '799', imgUrl: '' },
];

const renderPLP = () => render(<MemoryRouter><PLP /></MemoryRouter>);

describe('PLP', () => {
  beforeEach(() => {
    vi.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: MOCK_PRODUCTS, loading: false, error: null,
    });
  });

  it('renders all products', () => {
    renderPLP();
    expect(screen.getByText('iPhone 14')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
  });

  it('shows product count', () => {
    renderPLP();
    expect(screen.getByText('3 products')).toBeInTheDocument();
  });

  it('filters by model', () => {
    renderPLP();
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'galaxy' } });
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.queryByText('iPhone 14')).not.toBeInTheDocument();
  });

  it('filters by brand', () => {
    renderPLP();
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'apple' } });
    expect(screen.getByText('iPhone 14')).toBeInTheDocument();
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.queryByText('Galaxy S24')).not.toBeInTheDocument();
  });

  it('shows empty state when no results', () => {
    renderPLP();
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzznomatch' } });
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('shows loading state', () => {
    vi.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: [], loading: true, error: null,
    });
    renderPLP();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    vi.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: [], loading: false, error: 'Could not load products.',
    });
    renderPLP();
    expect(screen.getByText(/could not load/i)).toBeInTheDocument();
  });
});
