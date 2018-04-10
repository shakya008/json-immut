import { isObjectType} from './lib/util';
import { clone } from './clone'

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
export function update(data: Object|Array<any>, key: string|number, value: any): any {
    if (!isObjectType(data)) {
        return data;
    }
    data = clone(data);
    data[key] = value;
    return data;
}