import { isObjectType, isArray, hasOwnProperty } from './lib/util';


/**
* This function excludes provided key and returns new object
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
export function deleteObjKey(obj: Object, key: string): any {
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