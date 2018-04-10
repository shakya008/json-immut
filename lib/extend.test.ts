import { extend } from '../extend';

describe("json-immut function extend()", () => {
		let objOne = {
			name: 'John',
			age: 21,
			pin: 110054
		}
		let objTwo = {
			address: 'JanakPuri',
			phone: 987564352,
			pin: 110054
		}
		let merged = {
			name: 'John',
			age: 21,
			pin: 110054,
			address: 'JanakPuri',
			phone: 987564352
		}
		const arr = [1,2,3,4];
		it("should return empty object if its not type of object", () => {
			const strObj = "string data";
			const numObj = 1234;
			expect(extend(numObj, strObj)).toEqual({});
		});
		it("should merge multiple objects and return immutable object after merging", () => {
			const extended: any = extend(objOne, objTwo);
			expect(extended).not.toEqual(objOne);
			expect(extended).toEqual(merged);
		});
		it("should not repeat same properties of objects", () => {
			const extended: any = extend(objOne, objTwo);
			expect(extended.pin).toEqual(110054);
		});
});