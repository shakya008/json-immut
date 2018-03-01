const toString = Object.prototype.toString;
export function isFunction(argument) {
	return toString.call(argument) === '[object Function]';
}

export function isObjectType(arg) {
	return typeof arg === 'object';
}