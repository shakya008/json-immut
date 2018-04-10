import { deleteObjKey } from '../deleteObjKey';

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