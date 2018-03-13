"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString = Object.prototype.toString;
function isFunction(argument) {
    return toString.call(argument) === '[object Function]';
}
exports.isFunction = isFunction;
function isObjectType(arg) {
    return typeof arg === 'object';
}
exports.isObjectType = isObjectType;
