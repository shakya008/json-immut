import { isObjectType, isArray, slice, hasOwnProperty } from './lib/util'

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
export function clone(data: Object|Array<any>): any {
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