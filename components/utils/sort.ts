type Group = {
	title: string;
	items: string[];
};

export function balanceList(list: Group[]) {
	const left = list[0].items;
	const right = list[1].items;

	while (left.length > 5 || right.length > 5) {
		if (left.length > 5) {
			const itemToMove = left.pop()!;
			right.unshift(itemToMove);
		} else if (right.length > 5) {
			const itemToMove = right.shift()!;
			left.push(itemToMove);
		}
	}
	return list;
}

export function moveEmptySkillsToLast(data: Group[]) {
	const allItems = data.reduce((acc, group) => acc.concat(group.items), []);
	allItems.sort((a, b) => {
		if (a !== '' && b === '') {
			return -1;
		} else if (a === '' && b !== '') {
			return 1;
		} else {
			return 0;
		}
	});

	let currentIndex = 0;
	data.forEach((group) => {
		group.items = allItems.slice(
			currentIndex,
			currentIndex + group.items.length
		);
		currentIndex += group.items.length;
	});

	return data;
}
