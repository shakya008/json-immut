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
