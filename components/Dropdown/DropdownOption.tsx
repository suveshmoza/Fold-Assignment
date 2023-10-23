type DropdownOptionProps = {
	option: string;
	handleOptionSelect?: (option: string) => void;
	customText?: string;
};

function DropdownOption({
	option,
	handleOptionSelect,
	customText,
}: DropdownOptionProps) {
	const handleClick = () => {
		if (handleOptionSelect) {
			handleOptionSelect(option);
		}
	};

	return (
		<div
			onClick={handleClick}
			className={`px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize ${
				!handleOptionSelect ? 'text-black/50' : ''
			}`}
		>
			{customText ? `${customText} "${option}"` : option}
		</div>
	);
}

export default DropdownOption;
