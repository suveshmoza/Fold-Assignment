import { useState, useRef, useEffect } from 'react';

type DragItem = {
	grpI: number;
	itemI: number;
};

type Group = {
	title: string;
	items: string[];
};

type DragNDropProps = {
	data: {
		title: string;
		items: string[];
	}[];
};

function DragNDrop(props: DragNDropProps) {
	const { data } = props;

	const [list, setList] = useState<Group[]>(data);
	const [dragging, setDragging] = useState(false);

	const dragItem = useRef<DragItem | null>(null);
	const dragItemNode = useRef<HTMLDivElement | null>(null);

	const handletDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		item: DragItem
	) => {
		console.log(typeof e.target);
		dragItemNode.current = e.target as HTMLDivElement;
		dragItemNode.current.addEventListener('dragend', handleDragEnd);
		dragItem.current = item;

		setTimeout(() => {
			setDragging(true);
		}, 0);
	};

	const balanceList = (list: Group[]) => {
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
	};

	const handleDragEnter = (
		e: React.DragEvent<HTMLDivElement>,
		targetItem: DragItem
	) => {
		if (dragItemNode.current !== e.target) {
			console.log('DragItem:', dragItem);
			let newList = JSON.parse(JSON.stringify(list));
			newList[targetItem.grpI].items.splice(
				targetItem.itemI,
				0,
				newList[dragItem.current!.grpI].items.splice(
					dragItem.current!.itemI,
					1
				)[0]
			);
			newList = balanceList(newList);
			dragItem.current = targetItem;
			setList(newList);
		}
	};

	const handleDragEnd = () => {
		setDragging(false);
		console.log('DRAGEND:', dragItem.current);
		dragItem.current = null;
		if (dragItemNode.current) {
			dragItemNode.current.removeEventListener('dragend', handleDragEnd);
		}
		dragItemNode.current = null;
	};

	const getStyles = (item: DragItem) => {
		if (
			dragItem.current &&
			dragItem.current.grpI === item.grpI &&
			dragItem.current.itemI === item.itemI
		) {
			return 'w-full h-[50px] bg-teal-400 rounded mb-4 opacity-0 cursor-move';
		}
		return 'w-full h-[50px] bg-teal-400 rounded mb-4 cursor-move';
	};

	useEffect(() => {
		setList(data);
	}, [data]);

	if (list) {
		return (
			<div className="mt-8 grid grid-cols-2 gap-4 transition-all duration-300">
				{list.map((grp, grpI) => (
					<div
						key={grp.title}
						onDragEnter={
							dragging && !grp.items.length
								? (e) => handleDragEnter(e, { grpI, itemI: 0 })
								: undefined
						}
						className=""
					>
						{grp.items.map((item, itemI) => (
							<div
								draggable
								key={item}
								onDragStart={(e) => handletDragStart(e, { grpI, itemI })}
								onDragEnter={
									dragging
										? (e) => {
												handleDragEnter(e, { grpI, itemI });
										  }
										: undefined
								}
								className={
									dragging
										? getStyles({ grpI, itemI })
										: 'w-full h-[50px] bg-teal-400 rounded mb-4 cursor-move'
								}
							>
								{item}
							</div>
						))}
					</div>
				))}
			</div>
		);
	} else {
		return null;
	}
}

export default DragNDrop;
