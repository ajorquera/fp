import { not } from '../index';
import {
  binaryOp,
  compose,
  createLogger,
  curryE,
  equal,
  every,
  filter,
  getProp,
  identity,
  ifElse,
  isDate,
  isNumber,
  map,
  pipe,
  reduce,
  some,
  stringTemplate,
  sum,
  toLocaleCurrency,
  toLocaleStringNumb,
} from './utils';

test('reduce', () => {
  const result = reduce(0, (acc, val) => acc + val, [1, 2, 3]);
  expect(result).toBe(6);
});

test('binaryOper', () => {
  const sum = binaryOp('+');

  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 2, 5)).not.toBe(8);

  const substract = binaryOp('-');
  expect(substract(1, 2)).toBe(-1);
});

test('sum', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum([1, 2])).toBe(3);
  expect(sum(1, 2, 5)).toBe(8);
  expect(sum([1, 2, 5])).toBe(8);
  expect(sum(100, 2, 3, 4, -5)).toBe(104);
});

test('map', () => {
  const result = map((val) => val + 1, [1, 2, 3]);
  expect(result).toEqual([2, 3, 4]);
});

test('getProp', () => {
  const obj = { data: 'my-cooldata', nested: { data: 'my-nested-data' } };
  const getDataProp = getProp('data');
  const getNestedDataProp = getProp('nested.data');

  expect(getDataProp(obj)).toBe(obj.data);
  expect(getNestedDataProp(obj)).toBe(obj.nested.data);
});

test('isNumber', () => {
  expect(isNumber(1)).toBe(true);
  expect(isNumber('1')).toBe(true);
  expect(isNumber(NaN)).toBe(false);
  expect(isNumber(Infinity)).toBe(false);
});

test('pipe', () => {
  let result;

  result = pipe(
    map((val) => val + 1),
    sum
  )([1, 2, 3]);

  expect(result).toBe(9);
});

test('compose', () => {
  let result;

  result = compose(
    sum,
    map((val) => val + 1)
  )([1, 2, 3]);

  expect(result).toBe(9);
});

const getTrue = identity(true);
const getFalse = not(getTrue);
test('every', () => {
  const allIdentity = every(getTrue, getTrue, getTrue);
  expect(allIdentity(true)).toBe(true);

  const oneFalse = every(getFalse, getTrue, getTrue);
  expect(oneFalse(true)).toBe(false);
});

test('some', () => {
  const allFalse = some(getFalse, getFalse, getFalse);
  expect(allFalse(false)).toBe(false);

  const oneNotIdentity = some(getTrue, getTrue, getTrue, getFalse);
  expect(oneNotIdentity(false)).toBe(true);
});

test('stringTemplate', () => {
  const template = stringTemplate('${greating}, ${name}!');
  expect(template({ name: 'John', greating: 'Hello' })).toBe('Hello, John!');
  expect(template({ name: 'Andres', greating: 'Hey' })).toBe('Hey, Andres!');
});

test('curryE', () => {
  const fn = (a, b, c) => [a, b, c];
  let curriedFn;

  expect(() => curryE({})).toThrowError('No function provided. Receive: {}');

  curriedFn = curryE(fn);

  const result = curriedFn(1)(2)(3);
  expect(result).toEqual([1, 2, 3]);
});

test('ifElse', () => {
  const trueMock = jest.fn();
  const falseMock = jest.fn();

  const checkArg = ifElse(equal(true), trueMock, falseMock);

  checkArg(true);
  expect(trueMock).toBeCalledTimes(1);
  expect(falseMock).toBeCalledTimes(0);

  checkArg(false);

  expect(trueMock).toBeCalledTimes(1);
  expect(falseMock).toBeCalledTimes(1);
});

test('filter', () => {
  const result = filter((val) => val > 1, [1, 2, 3]);
  expect(result).toEqual([2, 3]);
});

describe('createLogger', () => {
  const strToLog = 'test';
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});

  const mockConsole = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  };

  beforeEach(() => {
    (console.log as jest.Mock).mockClear();
    (console.warn as jest.Mock).mockClear();
    (console.error as jest.Mock).mockClear();
  });

  test('should log, warn and error', () => {
    const log = createLogger('log');
    const warn = createLogger('warn');
    const error = createLogger('error');

    log(strToLog);
    warn(strToLog);
    error(strToLog);

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(strToLog);

    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toBeCalledWith(strToLog);

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith(strToLog);
  });

  test('should log, warn and error with prefix', () => {
    const prefix = 'prefix';
    const logPrefix = createLogger('log', prefix);

    logPrefix(strToLog);

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(prefix, strToLog);
  });

  test('should log, warn and error with custom console', () => {
    const logConsoleMock = createLogger('log', '', mockConsole);
    logConsoleMock(strToLog);

    expect(mockConsole.log).toBeCalledTimes(1);
    expect(mockConsole.log).toBeCalledWith(strToLog);
  });
});

test('toLocaleStringNumb', () => {
  const toESNumber = toLocaleStringNumb('es', {});

  expect(toESNumber(1000)).toBe('1000');
  expect(toESNumber(1000000)).toBe('1.000.000');
  expect(toESNumber(1000000.123)).toBe('1.000.000,123');

  const toUSNumber = toLocaleStringNumb('en-US', {});

  expect(toUSNumber(1000)).toBe('1,000');
  expect(toUSNumber(1000000)).toBe('1,000,000');
  expect(toUSNumber(1000000.1233232)).toBe('1,000,000.123');
});

test('toLocaleCurrency', () => {
  const toESEuroCurrency = toLocaleCurrency('es', 'EUR');

  expect(toESEuroCurrency(1000)).toBe('1000,00 €');
  expect(toESEuroCurrency(1000000)).toBe('1.000.000,00 €');
  expect(toESEuroCurrency(1000000.123)).toBe('1.000.000,12 €');

  const toUSUsdCurrency = toLocaleCurrency('en-US', 'USD');

  expect(toUSUsdCurrency(1000)).toBe('$1,000.00');
  expect(toUSUsdCurrency(1000000)).toBe('$1,000,000.00');
  expect(toUSUsdCurrency(1000000.1233232)).toBe('$1,000,000.12');
});

test('isDate', () => {
  expect(isDate(new Date())).toBe(true);
  expect(isDate(new Date('sdf'))).toBe(false);
  expect(isDate('')).toBe(false);
  expect(isDate(1)).toBe(false);
  expect(isDate({})).toBe(false);
});
