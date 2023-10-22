const debounce = <T extends any[]>(
	func: (...args: T) => void,
	delay: number
) => {
	let timer: NodeJS.Timeout | null = null;

	return (...args: T) => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			if (timer) {
				timer = null;
				func(...args);
			}
		}, delay);
	};
};

export default debounce;
