export const isUndefined = (val: any): val is undefined => val === undefined

export const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val: Record<string, unknown>, key: string) => hasOwnProperty.call(val, key);


export const isArray = Array.isArray;
const objectToString = Object.prototype.toString
export const isMap = (val:unknown) =>objectToString.call(val) === '[object Map]';
export const isSet = (val: unknown) => objectToString.call(val) === '[object Set]';
export const isDate = (val: unknown) => objectToString.call(val) === '[object Date]';


export const isFunction = (val: any) => typeof val === 'function';
export const isString = (val: string) => typeof val === 'string';
export const isSymbol = (val: unknown) => typeof val === 'symbol';
export const isObject = (val: unknown) => val !== null && typeof val === 'object';