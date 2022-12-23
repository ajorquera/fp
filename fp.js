'use strict';

const curryN = (n, fn) => (...args2) => args2.length >= n ? fn(...args2) : curryN(n - args2.length, fn.bind(null, ...args2));
const curry = (fn) => curryN(fn.length, fn);
const demethodize = (fn) => (arg0, ...args2) => fn.apply(arg0, args2);
const args = (fn) => (...args2) => fn(args2);
const flip = (fn) => (...args2) => fn(...args2.reverse());
const not = (fn) => (...args2) => !fn(...args2);
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
const map = curryN(2, flip(demethodize(Array.prototype.map)));
const stringify = JSON.stringify;
const reduce = curryN(2, flip(demethodize(Array.prototype.reduce)));
const compose = (...fns) => reduce((acc, fn) => fn(acc), fns);
const pipe = flip(compose);
const sum = (...args2) => reduce((a, b) => a + b, args2);
const substract = args(reduce(binaryOp("-")));
const multiply = args(reduce(binaryOp("*")));
const divide = args(reduce(binaryOp("/")));
const getProp = curry((attr, obj) => obj[attr]);
const avg = (...args2) => sum(...args2) / args2.length;
const toLocaleStringNumb = curry((lang, options, x) => x.toLocaleString(lang, options));
const formatLocalNumber = toLocaleStringNumb(navigator.language, {});
const formatLocalCurrency = curry((currency, numb) => toLocaleStringNumb(navigator.language, { style: "currency", currency }, numb));

exports.args = args;
exports.avg = avg;
exports.binaryOp = binaryOp;
exports.compose = compose;
exports.curry = curry;
exports.curryN = curryN;
exports.demethodize = demethodize;
exports.divide = divide;
exports.flip = flip;
exports.formatLocalCurrency = formatLocalCurrency;
exports.formatLocalNumber = formatLocalNumber;
exports.getProp = getProp;
exports.logger = logger;
exports.map = map;
exports.memoize = memoize;
exports.multiply = multiply;
exports.not = not;
exports.pipe = pipe;
exports.reduce = reduce;
exports.stringify = stringify;
exports.substract = substract;
exports.sum = sum;
exports.timer = timer;
exports.toLocaleStringNumb = toLocaleStringNumb;
//# sourceMappingURL=fp.js.map
