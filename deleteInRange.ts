/**
* This function excludes the items from the array in range and returns new arrays.
*/
export function deleteInRange(data: Array<any>, from: number, to: number): Array<any> {
    return data.filter((item, i)=> i < from && i > to);
}
