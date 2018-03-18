/**
* This has set of functions to update objects and array with immutability.
* @author Shyam Singh <singh.shakya008@gmail.com>
*/


const hasOwnProperty = Object.prototype.hasOwnProperty;
const slice = Array.prototype.slice;
const isArray = Array.isArray;
import {isFunction, isObjectType} from './util';

/**
* This function will update value in array and object in single level depth.
*/
export function update(data: Object|Array<any>, key: string|number, value: any): Object|Array<any> {
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
export function extend(...args): Object {
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
export function clone(data: Object|Array<any>): Object|Array<any> {
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
export function updateIn(data: Object|Array<any>, path: Array<number|string>, cb: any): Object|Array<any> {
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

/**
* This function excludes provided key and returns new object
*/
export function deleteObjKey(obj: Object, key: string): Object {
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

/**
* Excludes the item from the provided index in returned new array
*/
export function deleteArrayIndex(array: Array<any>, index: number): Array<any> {
    return (array || []).filter((item, i) => i !== index);
}

/**
* This function excludes the items from the array in range and returns new arrays.
*/
export function deleteInRange(data: Array<any>, from: number, to: number): Array<any> {
    return data.filter((item, i)=> i < from && i > to);
}

/**
* This function deletes key in object and removes index from array by path
* @param {Object| Array<any>} obj - Data object to delete key from. It can be
*                                   array, objects, mixed of array and objects, array of arrays.
* @param {Array<string|number>} path - Path to reach the proprty to be deleted.
* @return {Object| Array<any>} - Returns the data which was supplied in argument after removing the property.
* @example
* const nestedData = {
                    profile: {
                                name: 'john',
                                age: 34
                    },
                    arr: [1,2,3,4]
                   }
  To delete the age key from profile obj
  deleteKeyIn(nestedData, ['profile', 'age']);

  Delete 2nd index in arr.
  deleteKeyIn(nestedData, ['arr', 2]);
*/
export function deleteKeyIn(obj: Object|Array<any>, path: Array<string|number>): Object|Array<any> {
    path = path || [];
    if (!isObjectType(obj)) {
        return obj;
    }
    if (path.length === 1) {
        if (isArray(obj)) {
            return deleteArrayIndex(obj, path[0] as number)
        } else {
            return deleteObjKey(obj, path[0] as string);
        }
    } else {
        const updated = deleteArrayIndex(obj[path[0]], slice.call(path, 1));
        return update(obj, path[0], updated);
    }
}

/**
* This function adds element at last of array.
* @param {Array<number>} data - Array in which value inserted.
* @param {any} value - data to be pushed into array.
*/
export function arrayPush(data: Array<any>, value: any): Array<any> {
    let cloned = slice.call(data || []);
    cloned.push(value);
    return cloned;
}

/**
* This function insert an element into an array
*/
export function arrayInsert(data: Array<any>, index: number, value: any): Array<any> {
    const len = (data || []).length;
    const newLength = (index > len ? index : len) + 1;
    let iterator: number = 0;
    const arr = new Array(newLength);
    for( let i = 0; i < newLength; i++) {
        const item = i === index? value : data[iterator++];
        arr[i] = item;
    }
    return arr;
}

/**
* This function inserts an array into a given array from the provided index
* @param {Array<any>} collection - Array in which other array to be inserted.
* @param {number} index - index in array from which second array should be inserted.
* @param {Array<any>} data - Array which should be inserted.
*/
export function arrayBatchInsert(collection: Array<any>, index: number, data: Array<any>): Array<any> {
    const len = (collection || []).length
    const newLength = (index > len ? index : len) + (data || []).length;
    const arr = new Array(newLength);
    let it: number = 0;
    let dataIt = 0;

    for (let i = 0; i< newLength; i++) {
        arr[i] = (i >= index && i < index + data.length) ? data[dataIt++] : collection[it++];
    }
    return arr;
}
