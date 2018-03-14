const hasOwnProperty = Object.prototype.hasOwnProperty;
const slice = Array.prototype.slice;
const isArray = Array.isArray;
import {isFunction, isObjectType} from './util';

/**
* This function will update value in array and object in single level depth.
*/
export function update(data, key, value) {
    if (!isObjectType(data)) {
        return data;
    }
    data = clone(data);
    data[key] = value;
    return data;
}

/**
* This method merged multiple objects and return immutable object after merging
*/
export function extend(...args) {
    let target = {};
    for (let i = 0; i < args.length; i++) {
        let source = args[i];
        for (let key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
/**
* This function makes shallow copy of objects and arrays.
*/
export function clone(data) {
    if (!isObjectType(data)) {
        return data;
    }
    if (isArray(data)) {
        return slice.call(data, 0);
    }
    let cloned = {};
    for (let key in data) {
        if (hasOwnProperty.call(data, key)) {
            cloned[key] = data[key];
        }
    }
    return cloned;
}
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
export function updateIn(data, path, cb) {
    if (!isObjectType(data)) {
        return data;
    }
    path = path || [];
    if (path.length === 1) {
        let val;
        if (isFunction(cb)) {
            val = cb(data[path[0]]);
        } else {
            val = cb;
        }
        return update(data, path[0], val);
    } else {
        const updated = updateIn(data[path[0]] || {}, slice.call(path, 1), cb);
        return update(data, path[0], updated);
    }
}

export function deleteObjKey(obj, key) {
    if (!isObjectType(obj)) {
        return obj;
    }
    let cloned = {};
    for (let prop in obj) {
        if (hasOwnProperty.call(obj, prop) && prop !== key) {
            cloned[prop] = obj[prop];
        }
    }
    return cloned;
}

export function deleteArrayIndex(array, index) {
    return (array || []).filter((item, i) => i !== index);
}

export function deleteKeyIn(obj, path) {
    path = path || [];
    if (!isObjectType(obj)) {
        return obj;
    }
    if (path.length === 1) {
        if (isArray(obj)) {
            return deleteArrayIndex(obj, path[0])
        } else {
            return deleteObjKey(obj, path[0]);
        }
    } else {
        const updated = deleteArrayIndex(obj[path[0]], slice.call(path, 1));
        return update(obj, path[0], updated);
    }
}
/**
* Insert into array method
*/