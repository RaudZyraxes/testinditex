import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import PLP from './PLP';
import * as client from '../api/client';

const MOCK_PRODUCTS = [
  { id: '1', brand: 'Apple', model: 'iPhone 14', price: '999', imgUrl: '' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S24', price: '899', imgUrl: '' },
  { id: '3', brand: 'Apple', model: 'iPhone 13', price: '799', imgUrl: '' },
];

const renderPLP = () =>
  render(<MemoryRouter><PLP /></MemoryRouter>);

describe('PLP', () => {
  beforeEach(() => {
    vi.spyOn(client, 'getProducts').mockResolvedValue(MOCK_PRODUCTS);
  });

  it('renders all products', async () => {
    renderPLP();
    expect(await screen.findByText('iPhone 14')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
  });

  it('filters by model', async () => {
    renderPLP();
    await screen.findByText('iPhone 14');

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'galaxy' } });

    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.queryByText('iPhone 14')).not.toBeInTheDocument();
    expect(screen.queryByText('iPhone 13')).not.toBeInTheDocument();
  });

  it('filters by brand', async () => {
    renderPLP();
    await screen.findByText('iPhone 14');

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'apple' } });

    expect(screen.getByText('iPhone 14')).toBeInTheDocument();
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.queryByText('Galaxy S24')).not.toBeInTheDocument();
  });

  it('shows empty state when no results', async () => {
    renderPLP();
    await screen.findByText('iPhone 14');

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzznomatch' } });

    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it('shows product count', async () => {
    renderPLP();
    expect(await screen.findByText('3 products')).toBeInTheDocument();
  });
});
