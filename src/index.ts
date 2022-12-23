type Fn = (...args: any[]) => any;

export const curryN = (n, fn) => (...args) => args.length >= n ? fn(...args) : curryN(n - args.length, fn.bind(null, ...args));
export const curry = (fn: Fn) => curryN(fn.length, fn);
export const demethodize = (fn: Fn) => (arg0, ...args) => fn.apply(arg0, args);
export const args = (fn: Fn) => (...args) => fn(args);
export const flip = (fn: Fn) => (...args) => fn(...args.reverse())
export const not = (fn: Fn) => (...args) => !fn(...args);
export const timer = (fn: Fn) => (...args) => {
  const start = Date.now();
  const result = fn(...args);
  const end = Date.now();
  console.log(`Time: ${end - start}ms`);
  return result;
};

export const logger = (fn: Fn) => (...args) => {
  console.log(`Arguments: ${args}`);
  const result = fn(...args);
  console.log(`Result: ${result}`);
  return result;
};

export const memoize = (fn: Fn) => {
  const cache = {};
  return (...args) => {
    const key = stringify(args)
    let result = cache[key]
    if (!result) {
      result = fn(...args);
      cache[key] = result;
    }

    return result;
  }
}



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
 