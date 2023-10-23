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

export function moveEmptySkillsToLast(data: Group[]): Group[] {
	let nonEmptyItems: string[] = [];
	let emptyItems: string[] = [];

	data.forEach((group) => {
		group.items.forEach((item) => {
			if (item === '') {
				emptyItems.push(item);
			} else {
				nonEmptyItems.push(item);
			}
		});
	});

	let allItems: string[] = nonEmptyItems.concat(emptyItems);

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
