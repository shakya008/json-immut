import { update } from '../update';

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