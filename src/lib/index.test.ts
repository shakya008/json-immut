import { update } from './index';

describe("json-immut function update()", () => {
	const obj = {
		name: 'John',
		age: 21,
		pin: 110054
	}
	it("Returns the same value if its not type of object", () => {
		const strObj = "string data";
		expect(update(strObj, 'x', '32')).toEqual(strObj);
		const numObj = 1234;
		expect(update(numObj, 'x', '32')).toEqual(numObj);
	});
	it("Updates the existing key with new value", () => {
		const updated = update(obj, 'age', 43);
		expect(updated).not.toEqual(obj);
		expect(updated.age).toEqual(43);
	})
})