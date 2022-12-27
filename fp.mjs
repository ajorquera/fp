const curryN = (n, fn) => (...args2) => args2.length >= n ? fn(...args2) : curryN(n - args2.length, fn.bind(null, ...args2));
const curry = (fn) => curryN(fn.length, fn);
const demethodize = (fn) => (arg0, ...args2) => fn.apply(arg0, args2);
const args = (fn) => (...args2) => fn(args2);
const flip = (fn) => (...args2) => fn(...args2.reverse());
const not = (fn) => (...args2) => !fn(...args2);
const negate = (fn) => (...args2) => -fn(...args2);
const timer = (fn) => (...args2) => {
  const start = Date.now();
  const result = fn(...args2);
  const end = Date.now();
  console.log(`Time: ${end - start}ms`);
  return result;
};
const logger = (fn) => (...args2) => {
  console.log(`Arguments: ${args2}`);
  const result = fn(...args2);
  console.log(`Result: ${result}`);
  return result;
};
const memoize = (fn, stringify = JSON.stringify) => {
  const cache = {};
  return (...args2) => {
    const key = stringify(args2);
    let result = cache[key];
    if (!result) {
      result = fn(...args2);
      cache[key] = result;
    }
    return result;
  };
};

const binaryOp = (operator) => new Function("a", "b", `return a ${operator} b`);
const identity = (arg2) => () => arg2;
const arg = (arg2) => arg2;
const ifElse = curry((condition, ifFn, elseFn) => (...args2) => condition(...args2) ? ifFn(...args2) : elseFn(...args2));
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const pickRandom = (...args2) => args2[randomNumber(0, args2.length - 1)];
const map = curryN(2, flip(demethodize(Array.prototype.map)));
const reduce = curryN(3, flip(demethodize(Array.prototype.reduce)));
const every = (...fns) => (arg2) => demethodize(Array.prototype.every)(fns, (fn) => fn(arg2));
const pipe = (...fns) => (arg2) => reduce(arg2, (acc, fn) => fn(acc), fns);
const some = (...fns) => (arg2) => fns.some((fn) => fn(arg2));
const sum = (...args2) => reduce(0, (a, b) => a + b, Array.isArray(args2[0]) ? args2[0] : args2);
const avg = (...args2) => sum(...args2) / args2.length;
const compose = flip(pipe);
const substract = args(reduce(binaryOp("-")));
const multiply = args(reduce(binaryOp("*")));
const divide = args(reduce(binaryOp("/")));
const getProp = curry((attr, obj) => obj[attr]);
const removeProp = curry((attr, obj) => {
  const { [attr]: _, ...rest } = obj;
  return rest;
});
const values = Object.values;
const entries = Object.entries;
const keys = Object.keys;
const cloneSpread = (obj) => ({ ...obj });
const equal = curry((a, b) => a === b);
const cloneStringify = (obj) => JSON.parse(JSON.stringify(obj));
const typeOf = (x) => typeof x;
const to = curry((constr, x) => new constr(x));
const toNumber = to(Number);
const toBoolean = to(Boolean);
const toSring = to(String);
const isInfinity = equal(Infinity);
const isFunction = pipe(typeOf, equal("function"));
const isArray = Array.isArray;
const isBoolean = (x) => typeof x === "boolean";
const isObject = every(pipe(typeOf, equal("object")), not(isArray));
const isNaN = Number.isNaN;
const toAbs = (x, abs = Math.abs) => abs(x);
const isNumber = (x) => !isNaN(Number(x)) && Math.abs(x) !== Infinity;
const isNumber2 = every(pipe(toNumber, not(isNaN)), pipe(toAbs, not(isInfinity)));
const throwError = (msg) => {
  throw msg;
};
const stringTemplate = curry((template, obj) => {
  const keys2 = Object.keys(obj);
  const values2 = Object.values(obj);
  return new Function(...keys2, `return \`${template}\``)(...values2);
});
const ifNotFuncThrowError = ifElse(not(isFunction), (arg2) => throwError("No function provided. Receive: " + JSON.stringify(arg2)));
const curryE = ifNotFuncThrowError(curry);
const curryNE = ifNotFuncThrowError(curryN);
const toLocaleStringNumb = curry((lang, options, x) => x.toLocaleString(lang, options));
const formatLocalCurrency = curry((currency, numb) => toLocaleStringNumb(navigator.language, { style: "currency", currency }, numb));

export { arg, args, avg, binaryOp, cloneSpread, cloneStringify, compose, curry, curryE, curryN, curryNE, demethodize, divide, entries, equal, every, flip, formatLocalCurrency, getProp, identity, ifElse, ifNotFuncThrowError, isArray, isBoolean, isFunction, isInfinity, isNaN, isNumber, isNumber2, isObject, keys, logger, map, memoize, multiply, negate, not, pickRandom, pipe, reduce, removeProp, some, stringTemplate, substract, sum, throwError, timer, to, toAbs, toBoolean, toLocaleStringNumb, toNumber, toSring, typeOf, values };
//# sourceMappingURL=fp.mjs.map
