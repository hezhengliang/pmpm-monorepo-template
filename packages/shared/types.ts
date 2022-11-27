export const isUndefined = (val: any): val is undefined => val === undefined

export const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val, key) => hasOwnProperty.call(val, key);


export const isArray = Array.isArray;
const objectToString = Object.prototype.toString
export const isMap = (val) =>objectToString.call(val) === '[object Map]';
export const isSet = (val) => objectToString.call(val) === '[object Set]';
export const isDate = (val) => objectToString.call(val) === '[object Date]';


export const isFunction = (val) => typeof val === 'function';
export const isString = (val) => typeof val === 'string';
export const isSymbol = (val) => typeof val === 'symbol';
export const isObject = (val) => val !== null && typeof val === 'object';