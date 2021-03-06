import { updateIn } from '../updateIn';

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

