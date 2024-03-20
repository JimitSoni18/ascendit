export function singleArgCache<I, O>(func: (arg: I) => O) {
	const map = new Map<I, O>();

	return function(arg: I) {
		if (map.has(arg)) {
			return map.get(arg);
		}

		const result = func.call(this, arg);

		map.set(arg, result);
		return result;
	};
}
