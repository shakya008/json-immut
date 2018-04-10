import { isObjectType, isFunction, slice } from './lib/util';
import { update } from './update';

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
export function updateIn(data: Object|Array<any>, path: Array<number|string>, cb: any): any {
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