/**
* Excludes the item from the provided index in returned new array
* If property not present in the array, returns the entire array.
* @example
* let arr = [2,4,6]
  ]
* deleteArrayIndex(arr, 0); // [4,6]
* @param {Array<any>} obj - Data array to delete key from.
* @param {string} path - Index of element to be deleted.
* @return {Array<any>} - Returns the data which was supplied in argument after removing the property.
*/
export function deleteArrayIndex(array: Array<any>, index: number): Array<any> {
    return (array || []).filter((item, i) => i !== index);
}