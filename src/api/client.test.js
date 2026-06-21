import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProducts, getProduct } from './client';

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('getProducts', () => {
  it('fetches from API and caches result', async () => {
    const mockData = [{ id: '1', brand: 'Apple', model: 'iPhone 14' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockData) }));

    const result = await getProducts();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('returns cached data without fetching again', async () => {
    const mockData = [{ id: '1', brand: 'Samsung', model: 'Galaxy S24' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockData) }));

    await getProducts();
    await getProducts();

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('re-fetches when cache is expired', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve([]) }));

    localStorage.setItem('products', JSON.stringify({
      data: [],
      ts: Date.now() - 3700000, // older than 1 hour
    }));

    await getProducts();

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe('getProduct', () => {
  it('caches product detail by id', async () => {
    const mockProduct = { id: '1', brand: 'Apple', model: 'iPhone 14' };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockProduct) }));

    await getProduct('1');
    await getProduct('1');

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('uses separate cache entries per product id', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve({}) }));

    await getProduct('1');
    await getProduct('2');

    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
