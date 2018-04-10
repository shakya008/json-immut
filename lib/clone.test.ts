import { clone } from '../clone';
import { update } from '../update';


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