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

```javascript
const json={
  a: 1,
  b:2
};
const updated = update(json, 'a', 10);
/*
output
{
 a:10
 b:2
}
updated == json // false
*/
```
