"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hasOwnProperty = Object.prototype.hasOwnProperty;
var slice = Array.prototype.slice;
var isArray = Array.isArray;
var util_1 = require("./util");
/**
* This function will update value in array and object in single level depth.
*/
function update(data, key, value) {
    if (!util_1.isObjectType(data)) {
        return data;
    }
    data = clone(data);
    data[key] = value;
    return data;
}
exports.update = update;
/**
* This method merged multiple objects and return immutable object after merging
*/
function extend() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var target = {};
    for (var i = 0; i < args.length; i++) {
        var source = args[i];
        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
exports.extend = extend;
/**
* This function makes shallow copy of objects and arrays.
*/
function clone(data) {
    if (!util_1.isObjectType(data)) {
        return data;
    }
    if (isArray(data)) {
        return slice.call(data, 0);
    }
    var cloned = {};
    for (var key in data) {
        if (hasOwnProperty.call(data, key)) {
            cloned[key] = data[key];
        }
    }
    return cloned;
}
exports.clone = clone;
/**
* This function updates the value in an object at deep level as well
* @example
* let obj = {
    a: 1,
    b: {
        a: 67,
        c: {
            x:20
            }
        }
    }
    updateIn(obj, ['b','c','x'], 100)
*/
function updateIn(data, path, cb) {
    if (!util_1.isObjectType(data)) {
        return data;
    }
    path = path || [];
    if (path.length === 1) {
        var val = void 0;
        if (util_1.isFunction(cb)) {
            val = cb(data[path[0]]);
        }
        else {
            val = cb;
        }
        return update(data, path[0], val);
    }
    else {
        var updated = updateIn(data[path[0]] || {}, path.slice(1), cb);
        return update(data, path[0], updated);
    }
}
exports.updateIn = updateIn;
