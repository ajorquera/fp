'use strict';

const curryN = (n, fn) => (...args2) => args2.length >= n ? fn(...args2) : curryN(n - args2.length, fn.bind(null, ...args2));
const curry = (fn) => curryN(fn.length, fn);
const demethodize = (fn) => (arg0, ...args2) => fn.apply(arg0, args2);
const args = (fn) => (...args2) => fn(args2);
const flip = (fn) => (...args2) => fn(...args2.reverse());
const not = (fn) => (...args2) => !fn(...args2);
const negate = (fn) => (...args2) => -fn(...args2);
const timer = (fn, log = console.log) => (...args2) => {
  const start = Date.now();
  const result = fn(...args2);
  const end = Date.now();
  log(`Time: ${end - start}ms`);
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

const values = Object.values;
const entries = Object.entries;
const keys = Object.keys;
const binaryOp = (operator) => new Function("a", "b", `return a ${operator} b`);
const identity = (arg2) => () => arg2;
const arg = (arg2) => arg2;
const ifElse = curry(
  (condition, ifFn, elseFn) => (...args2) => condition(...args2) ? ifFn(...args2) : elseFn(...args2)
);
function randomNumber(min2, max2) {
  min2 = Math.ceil(min2);
  max2 = Math.floor(max2);
  return Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
}
const pickRandom = (...args2) => args2[randomNumber(0, args2.length - 1)];
const map = curryN(2, flip(demethodize(Array.prototype.map)));
const find = curryN(2, flip(demethodize(Array.prototype.find)));
const filter = curryN(2, flip(demethodize(Array.prototype.filter)));
const reduce = curryN(3, flip(demethodize(Array.prototype.reduce)));
const always = (arg2) => () => arg2;
const acc = (...args2) => (...args22) => args2.reduce((acc2, fn) => acc2.push(fn(...args22)), []);
const flat = demethodize(Array.prototype.flat);
const every = (...fns) => (arg2) => demethodize(Array.prototype.every)(fns, (fn) => fn(arg2));
const pipe = (...fns) => (arg2) => reduce(arg2, (acc2, fn) => fn(acc2), fns);
const some = (...fns) => (arg2) => fns.some((fn) => fn(arg2));
const sum = (...args2) => reduce(0, (a, b) => a + b, Array.isArray(args2[0]) ? args2[0] : args2);
const avg = (...args2) => sum(...args2) / args2.length;
const uniq = (arr) => [...new Set(arr)];
const compose = flip(pipe);
const substract = args(reduce(binaryOp("-")));
const multiply = args(reduce(binaryOp("*")));
const divide = args(reduce(binaryOp("/")));
const getProp = curry((path, obj) => {
  const pathArr = String(path).split(".");
  return pathArr.reduce((acc2, val) => acc2 === void 0 ? acc2 : acc2[val], obj);
});
const setProp = curry((path, value, obj) => {
  const pathArr = String(path).split(".");
  const lastKey = pathArr.pop();
  const lastObj = pathArr.reduce((acc2, val) => acc2 === void 0 ? acc2 : acc2[val], obj);
  if (lastObj) {
    lastObj[lastKey] = value;
  }
  return obj;
});
const removeProp = curry((attr, obj) => {
  const { [attr]: _, ...rest } = obj;
  return rest;
});
const cloneSpread = (obj) => ({ ...obj });
const cloneStringify = (obj) => JSON.parse(JSON.stringify(obj));
const equal = curry((a, b) => a === b);
const typeOf = (x) => typeof x;
const to = curry((constr, x) => new constr(x));
const valueOf = (x) => x.valueOf();
const toNumber = pipe(to(Number), valueOf);
const toBoolean = to(Boolean);
const toString = to(String);
const toMap = to(Map);
const toSet = to(Set);
const toDate = to(Date);
const tap = curry((fn, arg2) => {
  fn(arg2);
  return arg2;
});
const isFunction = pipe(typeOf, equal("function"));
const isArray = Array.isArray;
const isBoolean = (x) => typeof x === "boolean";
const isString = pipe(typeOf, equal("string"));
const isObject = every(pipe(typeOf, equal("object")), not(isArray));
const isNaN = Number.isNaN;
const toAbs = (x, abs = Math.abs) => abs(x);
const isInfinity = pipe(toAbs, equal(Infinity));
const isNumber = every(pipe(toNumber, not(isNaN)), pipe(toAbs, not(isInfinity)));
const instanceOf = curry((constr, x) => x instanceof constr);
const isDate = every(instanceOf(Date), pipe(toNumber, isNumber));
const spread = (fn) => (args2) => fn(...args2);
const max = ifElse(isArray, spread(Math.max), Math.max);
const min = ifElse(isArray, spread(Math.min), Math.min);
const throwError = (msg) => {
  throw msg;
};
const stringTemplate = curry((template, obj) => {
  const keys2 = Object.keys(obj);
  const values2 = Object.values(obj);
  return new Function(...keys2, `return \`${template}\``)(...values2);
});
const ifNotFuncThrowError = ifElse(
  not(isFunction),
  (arg2) => throwError("No function provided. Receive: " + JSON.stringify(arg2))
);
const curryE = ifNotFuncThrowError(curry);
const curryNE = ifNotFuncThrowError(curryN);
const createLogger = (name, prefix = "", cons = console) => {
  return (...args2) => prefix ? cons[name](prefix, ...args2) : cons[name](...args2);
};
const toLocaleStringNumb = curry(
  (lang, options, x) => x.toLocaleString(lang, options)
);
const toLocaleCurrency = curry(
  (lang, currency, numb) => toLocaleStringNumb(lang, { style: "currency", currency }, numb)
);
const len = (obj) => {
  let len2;
  if (isObject(obj)) {
    len2 = pipe(values, getProp("length"))(obj);
  } else if (isArray(obj) || isString(obj)) {
    len2 = getProp("length", obj);
  }
  return len2;
};

exports.acc = acc;
exports.always = always;
exports.arg = arg;
exports.args = args;
exports.avg = avg;
exports.binaryOp = binaryOp;
exports.cloneSpread = cloneSpread;
exports.cloneStringify = cloneStringify;
exports.compose = compose;
exports.createLogger = createLogger;
exports.curry = curry;
exports.curryE = curryE;
exports.curryN = curryN;
exports.curryNE = curryNE;
exports.demethodize = demethodize;
exports.divide = divide;
exports.entries = entries;
exports.equal = equal;
exports.every = every;
exports.filter = filter;
exports.find = find;
exports.flat = flat;
exports.flip = flip;
exports.getProp = getProp;
exports.identity = identity;
exports.ifElse = ifElse;
exports.ifNotFuncThrowError = ifNotFuncThrowError;
exports.instanceOf = instanceOf;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.isInfinity = isInfinity;
exports.isNaN = isNaN;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
exports.keys = keys;
exports.len = len;
exports.map = map;
exports.max = max;
exports.memoize = memoize;
exports.min = min;
exports.multiply = multiply;
exports.negate = negate;
exports.not = not;
exports.pickRandom = pickRandom;
exports.pipe = pipe;
exports.reduce = reduce;
exports.removeProp = removeProp;
exports.setProp = setProp;
exports.some = some;
exports.spread = spread;
exports.stringTemplate = stringTemplate;
exports.substract = substract;
exports.sum = sum;
exports.tap = tap;
exports.throwError = throwError;
exports.timer = timer;
exports.to = to;
exports.toAbs = toAbs;
exports.toBoolean = toBoolean;
exports.toDate = toDate;
exports.toLocaleCurrency = toLocaleCurrency;
exports.toLocaleStringNumb = toLocaleStringNumb;
exports.toMap = toMap;
exports.toNumber = toNumber;
exports.toSet = toSet;
exports.toString = toString;
exports.typeOf = typeOf;
exports.uniq = uniq;
exports.valueOf = valueOf;
exports.values = values;
//# sourceMappingURL=fp.js.map
