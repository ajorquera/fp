type Fn = (...args: any[]) => any;
declare const curryN: (n: any, fn: any) => (...args: any[]) => any;
declare const curry: (fn: Fn) => (...args: any[]) => any;
declare const demethodize: (fn: Fn) => (arg0: any, ...args: any[]) => any;
declare const args: (fn: Fn) => (...args: any[]) => any;
declare const flip: (fn: Fn) => (...args: any[]) => any;
declare const not: (fn: Fn) => (...args: any[]) => boolean;
declare const negate: (fn: Fn) => (...args: any[]) => number;
declare const timer: (fn: Fn, log?: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}) => (...args: any[]) => any;
declare const memoize: (fn: Fn, stringify?: {
    (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    (value: any, replacer?: (string | number)[], space?: string | number): string;
}) => (...args: any[]) => any;

declare const values: {
    <T>(o: {
        [s: string]: T;
    } | ArrayLike<T>): T[];
    (o: {}): any[];
};
declare const entries: {
    <T>(o: {
        [s: string]: T;
    } | ArrayLike<T>): [string, T][];
    (o: {}): [string, any][];
};
declare const keys: {
    (o: object): string[];
    (o: {}): string[];
};
declare const binaryOp: (operator: any) => Function;
declare const identity: (arg: any) => () => any;
declare const arg: (arg: any) => any;
declare const ifElse: (...args: any[]) => any;
declare const pickRandom: (...args: any[]) => any;
declare const map: (...args: any[]) => any;
declare const find: (...args: any[]) => any;
declare const filter: (...args: any[]) => any;
declare const reduce: (...args: any[]) => any;
declare const always: (arg: any) => () => any;
declare const acc: (...args: any[]) => (...args2: any[]) => any;
declare const flat: (arg0: any, ...args: any[]) => any;
declare const every: (...fns: any[]) => (arg: any) => any;
declare const pipe: (...fns: any[]) => (arg: any) => any;
declare const some: (...fns: any[]) => (arg: any) => boolean;
declare const sum: (...args: any[]) => any;
declare const avg: (...args: any[]) => number;
declare const uniq: (arr: any) => unknown[];
declare const compose: (...args: any[]) => any;
declare const substract: (...args: any[]) => any;
declare const multiply: (...args: any[]) => any;
declare const divide: (...args: any[]) => any;
declare const getProp: (...args: any[]) => any;
declare const setProp: (...args: any[]) => any;
declare const removeProp: (...args: any[]) => any;
declare const cloneSpread: (obj: any) => any;
type returnSameTypeFn = <T>(arg: T) => T;
declare const cloneStringify: returnSameTypeFn;
declare const equal: (...args: any[]) => any;
declare const typeOf: (x: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
declare const to: (...args: any[]) => any;
declare const valueOf: (x: any) => any;
declare const toNumber: (arg: any) => any;
declare const toBoolean: any;
declare const toString: any;
declare const toMap: any;
declare const toSet: any;
declare const toDate: any;
declare const tap: (...args: any[]) => any;
declare const isFunction: (arg: any) => any;
declare const isArray: (arg: any) => arg is any[];
declare const isBoolean: (x: any) => boolean;
declare const isString: (arg: any) => any;
declare const isObject: (arg: any) => any;
declare const isNaN: (number: unknown) => boolean;
declare const toAbs: (x: any, abs?: (x: number) => number) => number;
declare const isInfinity: (arg: any) => any;
declare const isNumber: (arg: any) => any;
declare const instanceOf: (...args: any[]) => any;
declare const isDate: (arg: any) => any;
declare const spread: (fn: any) => (args: any) => any;
declare const max: any;
declare const min: any;
declare const throwError: (msg: any) => never;
declare const stringTemplate: (...args: any[]) => any;
declare const ifNotFuncThrowError: any;
declare const curryE: any;
declare const curryNE: any;
type logLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';
type console = Pick<Console, logLevel>;
declare const createLogger: (name: logLevel, prefix?: string, cons?: console) => (...args: any[]) => void;
declare const toLocaleStringNumb: (...args: any[]) => any;
declare const toLocaleCurrency: (...args: any[]) => any;
declare const len: (obj: any) => any;

export { acc, always, arg, args, avg, binaryOp, cloneSpread, cloneStringify, compose, createLogger, curry, curryE, curryN, curryNE, demethodize, divide, entries, equal, every, filter, find, flat, flip, getProp, identity, ifElse, ifNotFuncThrowError, instanceOf, isArray, isBoolean, isDate, isFunction, isInfinity, isNaN, isNumber, isObject, isString, keys, len, map, max, memoize, min, multiply, negate, not, pickRandom, pipe, reduce, removeProp, setProp, some, spread, stringTemplate, substract, sum, tap, throwError, timer, to, toAbs, toBoolean, toDate, toLocaleCurrency, toLocaleStringNumb, toMap, toNumber, toSet, toString, typeOf, uniq, valueOf, values };
