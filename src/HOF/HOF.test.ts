import { always, identity } from '../index';
import { curry, demethodize, flip, not } from './HOF';

test('curry', () => {
  const value = 'value';
  const mockFn = jest.fn((a, b) => value);

  const fn = (a, b) => mockFn(a, b);

  const first = curry(fn);

  const second = first(1);

  expect(mockFn).not.toHaveBeenCalled();

  const result = second(2);

  expect(result).toBe(value);
  expect(mockFn).toBeCalledTimes(1);
  expect(mockFn).toBeCalledWith(1, 2);
});

test('demethodize', () => {
  const map = demethodize(Array.prototype.map);
  const result = map([1, 2, 3], (val) => val + 1);
  expect(result).toEqual([2, 3, 4]);
});

test('flip', () => {
  const fn = (a, b, c) => [a, b, c];
  const result = flip(fn)(1, 2, 3);
  expect(result).toEqual([3, 2, 1]);
});

test('not', () => {
  const getTrue = always(true);
  const getFalse = not(getTrue);

  expect(getFalse()).toBe(false);
});
