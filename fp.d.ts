type Fn = (...args: any[]) => any;
declare const curryN: (n: any, fn: any) => (...args: any[]) => any;
declare const curry: (fn: Fn) => (...args: any[]) => any;
declare const demethodize: (fn: Fn) => (arg0: any, ...args: any[]) => any;
declare const args: (fn: Fn) => (...args: any[]) => any;
declare const flip: (fn: Fn) => (...args: any[]) => any;
declare const not: (fn: Fn) => (...args: any[]) => boolean;
declare const timer: (fn: Fn) => (...args: any[]) => any;
declare const logger: (fn: Fn) => (...args: any[]) => any;
declare const memoize: (fn: Fn, stringify?: {
    (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    (value: any, replacer?: (string | number)[], space?: string | number): string;
}) => (...args: any[]) => any;

declare const binaryOp: (operator: any) => Function;
declare const map: (...args: any[]) => any;
declare const stringify: {
    (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    (value: any, replacer?: (string | number)[], space?: string | number): string;
};
declare const reduce: (...args: any[]) => any;
declare const compose: (...fns: any[]) => any;
declare const pipe: (...args: any[]) => any;
declare const sum: (...args: any[]) => any;
declare const substract: (...args: any[]) => any;
declare const multiply: (...args: any[]) => any;
declare const divide: (...args: any[]) => any;
declare const getProp: (...args: any[]) => any;
declare const avg: (...args: any[]) => number;
declare const toLocaleStringNumb: (...args: any[]) => any;
declare const formatLocalNumber: any;
declare const formatLocalCurrency: (...args: any[]) => any;

export { args, avg, binaryOp, compose, curry, curryN, demethodize, divide, flip, formatLocalCurrency, formatLocalNumber, getProp, logger, map, memoize, multiply, not, pipe, reduce, stringify, substract, sum, timer, toLocaleStringNumb };
