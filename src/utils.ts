import { args, curry, curryN, demethodize, flip } from "./HOF";

export const binaryOp = (operator) => new Function('a', 'b', `return a ${operator} b`);
export const map = curryN(2, flip(demethodize(Array.prototype.map)));
export const stringify = JSON.stringify;
export const reduce = curryN(2, flip(demethodize(Array.prototype.reduce)));
export const compose = (...fns) => reduce((acc, fn) => fn(acc), fns);
export const pipe = flip(compose);
export const sum = (...args) => reduce((a,b)=> a + b, args);
export const substract = args(reduce(binaryOp('-')));
export const multiply = args(reduce(binaryOp('*')));
export const divide = args(reduce(binaryOp('/')));
export const getProp = curry((attr, obj) => obj[attr]);
export const avg = (...args) => sum(...args) / args.length;

export const toLocaleStringNumb = curry((lang: Intl.LocalesArgument, options: Intl.NumberFormatOptions, x: number) => x.toLocaleString(lang, options));

export const formatLocalNumber = toLocaleStringNumb(navigator.language, {});

type currency = 'USD' | 'EUR';
export const formatLocalCurrency = curry((currency, numb) => toLocaleStringNumb(navigator.language, {style: 'currency', currency}, numb));
 