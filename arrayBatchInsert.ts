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
