import { args, curry, curryN, demethodize, flip, not } from '../HOF/index';

export const binaryOp = (operator) => new Function('a', 'b', `return a ${operator} b`);
export const identity = (arg) => () => arg;
export const arg = (arg) => arg;
export const ifElse = curry(
  (condition, ifFn, elseFn) =>
    (...args) =>
      condition(...args) ? ifFn(...args) : elseFn(...args)
);

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const pickRandom = (...args) => args[randomNumber(0, args.length - 1)];

export const map = curryN(2, flip(demethodize(Array.prototype.map)));
export const find = curryN(2, flip(demethodize(Array.prototype.find)));
export const filter = curryN(2, flip(demethodize(Array.prototype.filter)));
export const reduce = curryN(3, flip(demethodize(Array.prototype.reduce)));
export const always = (arg) => () => arg;

export const flat = demethodize(Array.prototype.flat);
export const every =
  (...fns) =>
  (arg) =>
    demethodize(Array.prototype.every)(fns, (fn) => fn(arg));
export const pipe =
  (...fns) =>
  (arg) =>
    reduce(arg, (acc, fn) => fn(acc), fns);
export const some =
  (...fns) =>
  (arg) =>
    fns.some((fn) => fn(arg));
export const sum = (...args) => reduce(0, (a, b) => a + b, Array.isArray(args[0]) ? args[0] : args);
export const avg = (...args) => sum(...args) / args.length;
export const uniq = (arr) => [...new Set(arr)];

export const compose = flip(pipe);
export const substract = args(reduce(binaryOp('-')));
export const multiply = args(reduce(binaryOp('*')));
export const divide = args(reduce(binaryOp('/')));

export const getProp = curry((path: string | number, obj) => {
  const pathArr = String(path).split('.');
  return pathArr.reduce((acc, val) => (acc === undefined ? acc : acc[val]), obj);
});

export const setProp = curry((path: string | number, value, obj) => {
  const pathArr = String(path).split('.');
  const lastKey = pathArr.pop();
  const lastObj = pathArr.reduce((acc, val) => (acc === undefined ? acc : acc[val]), obj);
  if (lastObj) {
    lastObj[lastKey] = value;
  }
  return obj;
});

export const removeProp = curry((attr, obj) => {
  const { [attr]: _, ...rest } = obj;
  return rest;
});

export const values = Object.values;
export const entries = Object.entries;
export const keys = Object.keys;

export const cloneSpread = (obj) => ({ ...obj });

type returnSameTypeFn = <T>(arg: T) => T;
export const cloneStringify: returnSameTypeFn = (obj) => JSON.parse(JSON.stringify(obj));
export const equal = curry((a, b) => a === b);
export const typeOf = (x) => typeof x;
export const to = curry((constr, x) => new constr(x));
export const valueOf = (x) => x.valueOf();

export const toNumber = pipe(to(Number), valueOf);
export const toBoolean = to(Boolean);
export const toString = to(String);
export const toDate = to(Date);
export const tap = curry((fn, arg) => {
  fn(arg);
  return arg;
});

export const isInfinity = equal(Infinity);
export const isFunction = pipe(typeOf, equal('function'));
export const isArray = Array.isArray;
export const isBoolean = (x) => typeof x === 'boolean';
export const isObject = every(pipe(typeOf, equal('object')), not(isArray));
export const isNaN = Number.isNaN;
export const toAbs = (x, abs = Math.abs) => abs(x);
export const isNumber = (x) => !isNaN(Number(x)) && Math.abs(x) !== Infinity;
export const isNumber2 = every(pipe(toNumber, not(isNaN)), pipe(toAbs, not(isInfinity)));
export const instanceOf = curry((constr, x) => x instanceof constr);
export const isDate = every(instanceOf(Date), pipe(toNumber, isNumber));

export const spread = (fn) => (args) => fn(...args);
export const max = ifElse(isArray, spread(Math.max), Math.max);

export const throwError = (msg) => {
  throw msg;
};

export const stringTemplate = curry((template, obj) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  return new Function(...keys, `return \`${template}\``)(...values);
});

export const ifNotFuncThrowError = ifElse(not(isFunction), (arg) =>
  throwError('No function provided. Receive: ' + JSON.stringify(arg))
);

export const curryE = ifNotFuncThrowError(curry);
export const curryNE = ifNotFuncThrowError(curryN);

type logLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';
type console = Pick<Console, logLevel>;
export const createLogger = (name: logLevel, prefix = '', cons: console = console) => {
  return (...args) => (prefix ? cons[name](prefix, ...args) : cons[name](...args));
};

export const toLocaleStringNumb = curry((lang: Intl.LocalesArgument, options: Intl.NumberFormatOptions, x: number) =>
  x.toLocaleString(lang, options)
);

type currency = 'USD' | 'EUR';
type lang = 'es' | 'en';
export const toLocaleCurrency = curry((lang: lang, currency: currency, numb: number) =>
  toLocaleStringNumb(lang, { style: 'currency', currency }, numb)
);
