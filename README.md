## Update json with immutability
It makes easy to update json with immutability. In frontend frameworks like angular, vuejs it is required to update the objects/arrays with immutability. But json update does not maintain the immutablity as json objects are mutable. This library contains set of functions to update the json objects and arrays with immutability.

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
