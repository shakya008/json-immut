import { deleteArrayIndex } from '../deleteArrayIndex';

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
