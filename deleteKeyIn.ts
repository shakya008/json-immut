import { isObjectType, isArray, slice } from './lib/util';
import { deleteArrayIndex } from './deleteArrayIndex';
import { deleteObjKey } from './deleteObjKey';
import { update } from './update';



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
export function deleteKeyIn(obj: Object|Array<any>, path: Array<string|number>): any {
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