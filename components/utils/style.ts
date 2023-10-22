export const getStyles = (dragging, dragItem, item) => {
	return dragging &&
		dragItem.current &&
		dragItem.current.grpI === item.grpI &&
		dragItem.current.itemI === item.itemI
		? 'mb-4 opacity-0'
		: 'mb-4';
};
