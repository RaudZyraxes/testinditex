import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

const PRODUCT = { id: '1', brand: 'Apple', model: 'iPhone', price: '999', imgUrl: '',
  options: { colors: [{ code: 1, name: 'Black' }], storages: [{ code: 2, name: '128 GB' }] } };

function TestConsumer() {
  const { items, cartCount, addItem, removeItem } = useCart();
  return (
    <div>
      <span data-testid="count">{cartCount}</span>
      <span data-testid="items">{items.length}</span>
      <button onClick={() => addItem(PRODUCT, 1, 2)}>add</button>
      <button onClick={() => removeItem('1', 1, 2)}>remove</button>
    </div>
  );
}

const renderCart = () =>
  render(<CartProvider><TestConsumer /></CartProvider>);

describe('CartContext', () => {
  beforeEach(() => localStorage.clear());

  it('starts empty', () => {
    renderCart();
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('adds an item', () => {
    renderCart();
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('items').textContent).toBe('1');
  });

  it('increments qty for same item', () => {
    renderCart();
    fireEvent.click(screen.getByText('add'));
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByTestId('count').textContent).toBe('2');
    expect(screen.getByTestId('items').textContent).toBe('1');
  });

  it('removes an item', () => {
    renderCart();
    fireEvent.click(screen.getByText('add'));
    fireEvent.click(screen.getByText('remove'));
    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('items').textContent).toBe('0');
  });

  it('persists to localStorage', () => {
    renderCart();
    fireEvent.click(screen.getByText('add'));
    const stored = JSON.parse(localStorage.getItem('cart'));
    expect(stored).toHaveLength(1);
    expect(stored[0].brand).toBe('Apple');
  });
});
