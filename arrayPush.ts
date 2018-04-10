import { slice } from './lib/util';
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