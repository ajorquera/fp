import { curry, demethodize, flip } from './HOF';
import {binaryOp, formatLocalCurrency, formatLocalNumber, getProp, map, sum} from './utils'

let languageGetter;
beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'language', 'get')
})

test('curry', () => {
    const value = 'value'
    const mockFn = jest.fn((a,b) => value);

    const fn = (a,b) => mockFn(a,b)

    const first = curry(fn)

    const second = first(1);

    expect(mockFn).not.toHaveBeenCalled();

    const result = second(2);

    expect(result).toBe(value)
    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(1,2);
})

test('binaryOper', () => {
    const sum = binaryOp('+');

    expect(sum(1,2)).toBe(3);
    expect(sum(1,2,5)).not.toBe(8);

    const substract = binaryOp('-');
    expect(substract(1,2)).toBe(-1);
});

test('sum', () => {
    expect(sum(1,2)).toBe(3);
    expect(sum(1,2,5)).toBe(8);
    expect(sum(100,2,3,4,-5)).toBe(104);
});

test('demethodize', () => {
    const map = demethodize(Array.prototype.map);
    const result = map([1,2,3], (val) => val + 1);
    expect(result).toEqual([2,3,4]);
});

test('map', () => {
    const result = map((val) => val + 1, [1,2,3]);
    expect(result).toEqual([2,3,4]);
})

test('flip', () => {
    const fn = (a,b,c) => [a,b,c];
    const result = flip(fn)(1,2,3);
    expect(result).toEqual([3,2,1]);
});

test('getProp', () => {
    const obj = {data: 'my-cooldata'};
    const getDataProp = getProp('data');

    expect(getDataProp(obj)).toBe(obj.data);
})

test('formatLocalNumber', () => {
    languageGetter.mockReturnValueOnce('es');
    const number = 453453.23423423424;
    expect(formatLocalNumber(number)).toBe('453,453.234')
});

test('formatLocalCurrency', () => {
    languageGetter.mockReturnValueOnce('es');
    const number = 453453.23423423424;
    //expect(formatLocalCurrency('EUR',number)).toContain('453.453,23 €')
    expect(formatLocalCurrency('EUR',number)).toContain('453.453,23')
    expect(formatLocalCurrency('EUR',number)).toContain('€')

    languageGetter.mockReturnValueOnce('en');

    expect(formatLocalCurrency('EUR',number)).toBe('€453,453.23')
});