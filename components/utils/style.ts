import { MutableRefObject } from 'react';

type DragItem = {
	grpI: number;
	itemI: number;
};

export const getStyles = (
	dragging: boolean,
	dragItem: MutableRefObject<DragItem | null>,
	item: DragItem
) => {
	return dragging &&
		dragItem.current &&
		dragItem.current.grpI === item.grpI &&
		dragItem.current.itemI === item.itemI
		? 'mb-4 opacity-0'
		: 'mb-4 ';
};
