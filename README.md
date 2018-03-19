## Update json with immutability
It makes easy to update json with immutability. In frontend frameworks like angular, vuejs it is required to update the objects/arrays with immutability. But json update does not maintain the immutablity as json objects are mutable. This library contains set of functions to update the json objects and arrays with immutability.
## Installation
In a browser:
```html
<script src="json-immut.js"></script>
```

Using npm:
```shell
$ npm install --save json-immut
```

In Node.js:
```js
// Load the full build.
var immut = require('json-immut');
immut.update({}, 'foo', 10);
immut.updateIn();
```
ES6 Module pattern
```js
import {update, updateIn } from 'json-immut';
// Load full build
import * as immut from 'json-immut';
immut.update();
```
## Methods
#### update(obj, key, value)
   Returns a new JSON object/array by updating key/index with value without affecting source. Adds new key/index if already not exists.
```javascript
const json={
  a: 1,
  b:2
};
const updated = update(json, 'a', 10);
updated === json //false
updated.a // 10

var arr = [1,2,3,4];
const arrUpdated = update(arr, 1, 100);
arrUpdated === arr // false
arrUpdated[1] // 100
arr[1] // 2
```
#### updateIn(obj, path, cb)
   This function also returns new JSON by updating in the path provided.

`obj`: Object to be updated.

`path` : Array of nodes to reach the target property to update in nesting.

`cb`: Value for updating. `cb` also accepts function and returned value from this function will be updated.
```js
const nestedObj = {
		profile: {
			name: 'John',
			age: 32,
			address: {
				Hn: 43,
				pin: 2534,
				next: {
					right: {
						left: 10,
						right: 11
					},
					left: {
						add: 24,
						min: 23
					}
				}
			},
			arr: [{a:1}, {a: {b:2}}],
			arr2: [1,2,3,4]
		},
		level: 1
	}
  const updated = updateIn(nestedObj, ['profile', 'name'], 'Jack');
  // Here, this will update the `name` property in `profile` of `nestedObj` with immutability
  
  const pin = 6574;
  const updated = updateIn(nestedObj, ['profile', 'address', 'pin'], pin);
  // Updates the `pin` which falls in object `nestedObj.profile.address`
  
  
	const val = 6574;
  const updated = updateIn(nestedObj, ['profile', 'arr', 0, 'a'], val);
  // Updates the value in the array of objects. `nestedObj.arr[0].a`
  
  // Updates using `cb` as function
  const updated = updateIn(nestedObj, ['profile', 'age'], (age) => {
			return age * 1.5;
  });
  // `cb` function argument is existing value at the path provided

```
*Note*: updateIn() function will add all the properties in the nested path which does not already exists. If we want to update `nestedObj` in path ['contact', 'phone'], then it will add `contact` and `phone` properties.
```js
 const updated = updateIn(nestObj, ['contact', 'phone'], 9765432847);
 updated.contact // {"phone": 9765432847}
```
#### deleteObjKey(obj, key);
Returns new object by excluding the provided key.
```js
const obj = {
	name: 'John',
	age: 26
}
const updated = deleteObjKey(obj, 'age');
obj === updated // false
updated.hasOwnProperty('age') // false
```
#### deleteArrayIndex(data: Array<any>, index: number);
 Returns new array of length less than of `data`. returned new array does not have item at `index`.
	
#### deleteinRange(data: Array<any>, start: number, end: number);
 Returns new array which does not include items from `start` index to `end` index in provided `data` array.
	
#### deleteKeyIn(data: Object|Array<any>, path: Array<string|number>);
This function returns a new object/Array by excluding the key/index found in provided path. This works on mixed data structure.
##### Example: if we want to delete the `pin` from the `nestedObj`, then it will be like:
```js
const updated = deleteKeyIn(nestedObj, ['profile', 'adress', 'pin']);
updated === nestedObj // false
```
##### Example: if we want to delete the second index of `arr2` from the `nestedObj`, then it will be like:
```js
const updated = deleteKeyIn(nestedObj, ['profile', 'arr2', 2]);
updated === nestedObj // false
```

#### arrayPush(data: Array<any>, item: any);
This method pushed `item` in `data` array and returns new array. It is simmilar to Array.push but returns new array without altering the original.

#### arrayInsert(data: Array<any>, index: number, item: any);
This method inserts `item` at `index` into `data` array and returns new array without altering original.
	
#### arrayBatchInsert(collection: Array<any>, index: number, data: Array<any>);
This method inserts `data` array into `collection` from `index` and returns new array.

#### clone(data: Object|Array<any>)
This method makes a shallow copy of provided Object/Array and returns it.

#### extend(obj1, obj2, ...)
This method accepts multiple objects and merges them into a new object from left to right and returns new object.
