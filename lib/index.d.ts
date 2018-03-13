/**
* This function will update value in array and object in single level depth.
*/
export declare function update(data: any, key: any, value: any): any;
/**
* This method merged multiple objects and return immutable object after merging
*/
export declare function extend(...args: any[]): {};
/**
* This function makes shallow copy of objects and arrays.
*/
export declare function clone(data: any): any;
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
export declare function updateIn(data: any, path: any, cb: any): any;
