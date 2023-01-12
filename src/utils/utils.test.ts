import { not } from '../index';
import {binaryOp, compose, curryE, equal, every, filter, formatCurrency, getProp, identity, ifElse,isNumber, map, pipe, reduce, some, stringTemplate, sum, toLocaleStringNumb} from './utils'

let languageGetter;

const formatLocalNumber = toLocaleStringNumb('es', {})
const formatLocalCurrency = formatCurrency('es');

test('reduce', () => {
    const result = reduce(0, (acc, val) => acc + val, [1,2,3]);
    expect(result).toBe(6);
});


test('binaryOper', () => {
    const sum = binaryOp('+');

    expect(sum(1,2)).toBe(3);
    expect(sum(1,2,5)).not.toBe(8);

    const substract = binaryOp('-');
    expect(substract(1,2)).toBe(-1);
});



test('sum', () => {
    expect(sum(1,2)).toBe(3);
    expect(sum([1,2])).toBe(3);
    expect(sum(1,2,5)).toBe(8);
    expect(sum([1,2,5])).toBe(8);
    expect(sum(100,2,3,4,-5)).toBe(104);
});


test('map', () => {
    const result = map((val) => val + 1, [1,2,3]);
    expect(result).toEqual([2,3,4]);
})


test('getProp', () => {
    const obj = {data: 'my-cooldata'};
    const getDataProp = getProp('data');

    expect(getDataProp(obj)).toBe(obj.data);
})


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
    )([1,2,3]);

    expect(result).toBe(9);
});

test('compose', () => {
    let result;

    result = compose(
        sum,
        map((val) => val + 1),
    )([1,2,3]);

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

test('stringTemplate' , () => {
    const template = stringTemplate('${greating}, ${name}!');
    expect(template({name: 'John', greating: 'Hello'})).toBe('Hello, John!');
    expect(template({name: 'Andres', greating: 'Hey'})).toBe('Hey, Andres!');
});

test('curryE', () => {
    const fn = (a,b,c) => [a,b,c];
    let curriedFn;

    expect(() => curryE({})).toThrowError('No function provided. Receive: {}');

    curriedFn = curryE(fn);

    const result = curriedFn(1)(2)(3);
    expect(result).toEqual([1,2,3]);
})

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
    const result = filter((val) => val > 1, [1,2,3]);
    expect(result).toEqual([2,3]);
});

