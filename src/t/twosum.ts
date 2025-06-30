function twoSum(numbers: number[], target: number) {
	for (let i = 0; i < numbers.length; i++) {
		const n1 = numbers[i];
		if (!n1 || n1 > target) continue;
		for (let j = i; j < numbers.length; j++) {
			const n2 = numbers[j];
			if (!n2 || n2 > target) continue;
			if (n1 + n2 === target) {
				return [i, j];
			}
		}
	}

	return false;
}

const res = twoSum([2, 11, 15, 7], 9);
console.log(res); // [0,1]
