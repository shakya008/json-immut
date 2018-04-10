import { hasOwnProperty } from './lib/util';

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