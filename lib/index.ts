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
* @example
* let obj = {
    a: 1,
    b: 2
  }
* let result = update(obj, 'a', 4);
* console.log(result.a)  // 4
* @param {Object| Array<any>} obj - Data object to update key from. It can be
*                                   array, objects, mixed of array and objects, array of arrays.
* @param {string|number} path - Path to reach the proprty to be deleted.
* @param {any} value - Value that needs to be updated.
* @return {Object| Array<any>} - Returns the data which was supplied in argument after updating the property.
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
* This method merges multiple objects and return immutable object after merging
* @example
* let obj1 = {
    a: 1,
    b: 2
  }
* let obj2 = {
    c: 3,
    d: 4
  }
* extend(obj1, obj2);
* @param {Object} obj - Data object to that needs be merged.
* @return {Object| Array<any>} - Returns the union of data which was supplied in argument.
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
* @example
* let obj = {
    a: 1,
    b: 2
  }
* clone(obj);
* @param {Object| Array<any>} obj - Data object to be cloned from. It can be
*                                   array, objects, mixed of array and objects, array of arrays.
* @return {Object| Array<any>} - Returns the shallow copy of objects or arrays.
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
* This function removes the key from the object.
* If key not present in the object, returns the entire object.
* @example
* let obj = {
    a: 1,
    b: 2
  }
* deleteObjKey(obj, a);
* @param {Object} obj - Data object to delete key from.
* @param {string} path - Path to reach the proprty to be deleted.
* @return {Object} - Returns the data which was supplied in argument after removing the property.
*/
export function deleteObjKey(obj: Object, key: string): Object {
    if (!isObjectType(obj)) {
        return obj;
    }
    if (isArray(obj)) {
        console.log("Use deleteArrayIndex() to remove entity from array.");
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
* This function removes the property from the array at given index.
* If property not present in the array, returns the entire array.
* @example
* let arr = [2,4,6]
  ]
* deleteArrayIndex(arr, 0); // [4,6]
* @param {Array<any>} obj - Data array to delete key from.
* @param {string} path - Index of element to be deleted.
* @return {Array<any>} - Returns the data which was supplied in argument after removing the property.
*/
export function deleteArrayIndex(array: Array<any>, index: number): Array<any> {
    return (array || []).filter((item, i) => i !== index);
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
*/
export function arrayPush(data: Array<any>, value: any): Array<any> {
    return slice.call(data || [], 0).push(value);
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
* Array batch insert, splice
*/
