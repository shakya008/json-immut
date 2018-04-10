export const toString = Object.prototype.toString;
export const hasOwnProperty = Object.prototype.hasOwnProperty;
export const slice = Array.prototype.slice;
export const isArray = Array.isArray;
export function isFunction(argument) {
	return toString.call(argument) === '[object Function]';
}

export function isObjectType(arg) {
	return typeof arg === 'object';
}
