'use client';
import { useState, useRef } from 'react';
import ListItem from '../ListItem/ListItem';
import useSkills from '../hooks/useSkills';
import { balanceList } from '../utils/sort';
import { getStyles } from '../utils/style';

type DragItem = {
	grpI: number;
	itemI: number;
};

function DragNDrop() {
	const { skills, updateSkillPosition } = useSkills();
	const [dragging, setDragging] = useState(false);

	const dragItem = useRef<DragItem | null>(null);
	const dragItemNode = useRef<HTMLDivElement | null>(null);

	const handletDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		item: DragItem
	) => {
		dragItemNode.current = e.target as HTMLDivElement;
		dragItemNode.current.addEventListener('dragend', handleDragEnd);
		dragItem.current = item;

		setTimeout(() => {
			setDragging(true);
		}, 0);
	};

	const handleDragEnter = (
		e: React.DragEvent<HTMLDivElement>,
		targetItem: DragItem
	) => {
		if (dragItemNode.current !== e.target) {
			let newList = JSON.parse(JSON.stringify(skills));
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
			updateSkillPosition(newList);
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

	return (
		<div className="mt-8 grid grid-cols-2 gap-4 transition-all duration-300">
			{skills?.map((grp, grpI) => (
				<div
					key={grp.title}
					onDragEnter={
						dragging && !grp.items.length
							? (e) => handleDragEnter(e, { grpI, itemI: 0 })
							: undefined
					}
				>
					{grp.items.map((item, itemI) => (
						<div
							draggable
							key={itemI}
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
									? getStyles(dragging, dragItem, { grpI, itemI })
									: 'rounded-md mb-4'
							}
						>
							<ListItem
								defaultValue={item}
								index={grpI === 0 ? itemI + 1 : itemI + 6}
							/>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default DragNDrop;
