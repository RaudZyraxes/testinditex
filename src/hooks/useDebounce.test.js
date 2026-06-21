import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('delays update', () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 300), {
      initialProps: { val: 'a' },
    });
    rerender({ val: 'ab' });
    expect(result.current).toBe('a');
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe('ab');
  });

  it('only fires once for rapid updates', () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 300), {
      initialProps: { val: 'a' },
    });
    rerender({ val: 'ab' });
    rerender({ val: 'abc' });
    rerender({ val: 'abcd' });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe('abcd');
  });
});
