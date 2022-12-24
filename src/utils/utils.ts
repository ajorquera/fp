import { args, curry, curryN, demethodize, flip, not } from "../HOF/index";

export const binaryOp = (operator) => new Function('a', 'b', `return a ${operator} b`);
export const identity = arg => () => arg;
export const ifElse = curry((condition, ifFn, elseFn) => (...args) => condition(...args) ? ifFn(...args) : elseFn(...args));

export const map = curryN(2, flip(demethodize(Array.prototype.map)));
export const reduce = curryN(3, flip(demethodize(Array.prototype.reduce)));

export const every = (...fns) => arg => demethodize(Array.prototype.every)(fns, fn => fn(arg));
export const pipe = (...fns) => arg => reduce(arg, (acc, fn) => fn(acc), fns);
export const some = (...fns) => arg => fns.some(fn => fn(arg));
export const sum = (...args) => reduce(0, (a,b)=> a + b, Array.isArray(args[0]) ? args[0] : args);                                  
export const avg = (...args) => sum(...args) / args.length;

export const compose = flip(pipe);
export const substract = args(reduce(binaryOp('-')));
export const multiply = args(reduce(binaryOp('*')));
export const divide = args(reduce(binaryOp('/')));
export const getProp = curry((attr, obj) => obj[attr]);

export const cloneSpread = (obj) => ({...obj});
export const equal = curry((a,b) => a === b);
export const cloneStringify = (obj) => JSON.parse(JSON.stringify(obj)); 
export const typeOf = (x) => typeof x;
export const to = curry((constr, x) => new constr(x));

export const toNumber = to(Number);
export const toBoolean = to(Boolean);
export const toSring = to(String);

export const isInfinity = equal(Infinity);
export const isFunction = pipe(typeOf, equal('function'));
export const isArray = Array.isArray;
export const isBoolean = x => typeof x === 'boolean';
export const isNaN = Number.isNaN;
export const toAbs = (x, abs=Math.abs) => abs(x)
export const isNumber = x => !isNaN(Number(x)) && Math.abs(x) !== Infinity;
export const isNumber2 = every(pipe(toNumber, not(isNaN)), pipe(toAbs, not(isInfinity)));


export const throwError = (msg) => { throw msg  };

export const stringTemplate = curry((template, obj) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    return new Function(...keys, `return \`${template}\``)(...values);
});

export const ifNotFuncThrowError = ifElse(not(isFunction), (arg) => throwError('No function provided. Receive: ' + JSON.stringify(arg)))

export const curryE = ifNotFuncThrowError(curry);
export const curryNE = ifNotFuncThrowError(curryN);


export const toLocaleStringNumb = curry((lang: Intl.LocalesArgument, options: Intl.NumberFormatOptions, x: number) => x.toLocaleString(lang, options));

export const formatLocalNumber = toLocaleStringNumb(navigator.language, {});
export const formatLocalPercentage = toLocaleStringNumb(navigator.language, {style: 'percent'});

type currency = 'USD' | 'EUR';
export const formatLocalCurrency = curry((currency: currency, numb: number) => toLocaleStringNumb(navigator.language, {style: 'currency', currency}, numb));