
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