import { update, updateIn, extend, clone,
	deleteObjKey, deleteArrayIndex } from './index';

describe("json-immut function update()", () => {
	const obj = {
		name: 'John',
		age: 21,
		pin: 110054
	}
	const arr = [1,2,3,4];
	it("Returns the same value if its not type of object", () => {
		const strObj = "string data";
		expect(update(strObj, 'x', '32')).toBe(strObj);
		const numObj = 1234;
		expect(update(numObj, 'x', '32')).toBe(numObj);
	});
	it("Updates the existing property with new value", () => {
		const updated: any = update(obj, 'age', 43);
		expect(updated).not.toBe(obj);
		expect(updated.age).toBe(43);
	});
	it("Adds the non existing property with new value", () => {
		const updated: any = update(obj, 'address', 'b1c/4c');
		expect(updated).not.toBe(obj);
		expect(updated.address).toBeDefined();
		expect(Object.keys(updated).length).toBe(4);
	});
	it("Updates array for existing index", () => {
        const updated: any = update(arr, 1, 10);
        expect(updated).not.toBe(arr);
        expect(updated[1]).toBe(10);
	});
	it("Adds new index if not exists", () => {
        const updated: any = update(arr, 4, 10);
        expect(updated).not.toBe(arr);
        expect(updated[4]).toBe(10);
        expect(updated.length).toBe(5);
	});
});

describe("json-immut function updateIn()", () => {
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
	it("Should update the object at level one", () => {
		const updated: any = updateIn(nestedObj, ['level'], 20);
		expect(updated).not.toBe(nestedObj);
		expect(updated.profile).toBe(nestedObj.profile);
		expect(updated.level).toBe(20);
		expect(nestedObj.level).toBe(1);
	});
	it("Should update the object at nested level, case 1", () => {
		const updated: any = updateIn(nestedObj, ['profile', 'name'], 'Jack');
		expect(updated).not.toBe(nestedObj);
		expect(updated.profile).not.toBe(nestedObj.profile);
		expect(updated.profile.name).toBe('Jack');
		expect(nestedObj.profile.address).toBe(nestedObj.profile.address);
		expect(nestedObj.profile.arr).toBe(nestedObj.profile.arr);
		expect(nestedObj.profile.arr2).toBe(nestedObj.profile.arr2);
	});
	it("Should update the object at nested level, case 2", () => {
		const pin = 6574;
		const updated: any = updateIn(nestedObj, ['profile', 'address', 'pin'], pin);
		expect(updated).not.toBe(nestedObj);
		expect(updated.profile).not.toBe(nestedObj.profile);
		expect(updated.profile.address).not.toBe(nestedObj.profile.address);
		expect(updated.profile.address.pin).not.toBe(nestedObj.profile.address.pin);
		expect(updated.profile.name).toBe(nestedObj.profile.name);
		expect(updated.profile.address).not.toBe(nestedObj.profile.address);
		expect(updated.profile.arr).toBe(nestedObj.profile.arr);
		expect(updated.profile.arr2).toBe(nestedObj.profile.arr2);
	});
	it("Should update the object and array at nested level, case 3", () => {
		const val = 6574;
		const updated: any = updateIn(nestedObj, ['profile', 'arr', 0, 'a'], val);
		expect(updated).not.toBe(nestedObj);
		expect(updated.profile).not.toBe(nestedObj.profile);
		expect(updated.profile.address).toBe(nestedObj.profile.address);
		expect(updated.profile.arr).not.toBe(nestedObj.profile.arr);
		expect(updated.profile.arr[0]).not.toBe(nestedObj.profile.arr[0]);
		expect(updated.profile.arr[0].a).toBe(val);
		expect(updated.profile.address).toBe(nestedObj.profile.address);
		expect(updated.profile.arr2).toBe(nestedObj.profile.arr2);
	});
	it("Update by callback function", () => {
		const updated: any = updateIn(nestedObj, ['profile', 'age'], (age) => {
			return age * 1.5;
		});
		expect(updated.profile.age).toBe(48);
	});
	it("Update the value in path which does not exists at one level", () => {
		const phone = 987564352;
		const updated: any = updateIn(nestedObj, ['profile', 'phone'], phone);
		expect(updated.profile.phone).toBe(phone);
	});
	it("Update the value in path which does not exists at multiple level", () => {
		const phone = 987564352;
		const updated: any = updateIn(nestedObj, ['contact', 'phone'], phone);
		expect(updated.contact.phone).toBe(phone);
	});
});

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

describe("json-immut function clone()", () => {
		let obj: any = {
			name: 'John',
			age: 21,
			pin: 110054
		}
		const arr = [1,2,3,4];
		it("should return the same value if its not type of object", () => {
			const strObj = "string data";
			expect(clone(strObj)).toBe(strObj);
			const numObj = 1234;
			expect(clone(numObj)).toBe(numObj);
		});
		it("should clone or make a shallow copy of objects", () => {
			const cloned = clone(obj);
			expect(cloned).not.toBe(obj);
			expect(cloned).toEqual(obj);
		});
		it("should create a shallow copy", () => {
			let cloned: any= clone(obj);
			expect(cloned).toEqual(obj);
			obj = update(obj, 'age', 43);
			cloned = clone(obj);
			expect(cloned.age).toBe(43);
		});
});

describe("json-immut function deleteObjKey()", () => {
		const obj = {
			name: 'John',
			age: 21,
			pin: 110054
		}
		const arr = [1,2,3,4];
		it("should return the same value if its not type of object", () => {
			const strObj = "string data";
			expect(deleteObjKey(strObj, 'address')).toBe(strObj);
			const numObj = 1234;
			expect(deleteObjKey(numObj, 'address')).toBe(numObj);
		});
		it("should return array if input is array", () => {
			const deleted = deleteObjKey(arr, 'address');
			expect(deleted).toEqual(arr);
		});
		it("should delete the key from object if present", () => {
			const deleted: any = deleteObjKey(obj, 'pin');
			expect(deleted.pin).toBeUndefined();
		});
		it("should return same object if key is not present", () => {
			const deleted = deleteObjKey(obj, 'address');
			expect(deleted).not.toBe(obj);
			expect(deleted).toEqual(obj);
		});
});

describe("json-immut function deleteArrayIndex()", () => {
		const obj = {
			name: 'John',
			age: 21,
			pin: 110054
		}
		const arr = [1,2,3,4];

		it("should delete the key from array at gven index", () => {
			const deletedArr: any = deleteArrayIndex(arr, 0);
			expect(deletedArr.length).toEqual(3);
			expect(deletedArr).toEqual([2,3,4]);
		});
		it("should return same object if key is not present", () => {
			const deletedArr: any = deleteArrayIndex(arr, 6);
			expect(deletedArr).toEqual(arr);
		});
});
