function validateBrackets(str: string) {
	const bracketMap = {
		"(": ")",
		"{": "}",
		"[": "]",
	};
	const openBrackets = new Set(Object.keys(bracketMap));
	const stack: string[] = [];
	for (const char of str) {
	}
}

console.log(validateBrackets("()")); // true
console.log(validateBrackets("()[]{}")); // true
console.log(validateBrackets("(]")); // false
console.log(validateBrackets("([)]")); // false
console.log(validateBrackets("{[]}")); // true
