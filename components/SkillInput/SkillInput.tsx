import React from 'react';
import { RxCrossCircled } from 'react-icons/rx';

type SkillInputProps = {
	inputValue: string;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	selectedOption: string | null;
	index: number;
	nextToFill: number;
	handleReset: () => void;
};

const SkillInput: React.FC<SkillInputProps> = ({
	inputValue,
	onInputChange,
	selectedOption,
	index,
	nextToFill,
	handleReset,
}) => {
	return (
		<div className="relative flex">
			<input
				type="text"
				value={inputValue}
				onChange={onInputChange}
				readOnly={selectedOption !== null && index !== nextToFill}
				disabled={index > nextToFill}
				placeholder={`${index}. Add a Skill`}
				className={`w-full h-[50px] px-6 py-2 rounded-[4px] shadow-md capitalize ${
					!selectedOption && !(index > nextToFill) ? 'focus:bg-white' : ''
				} bg-teal-200 disabled:bg-gray-300 read-only:cursor-move disabled:cursor-default read-only:active:outline-none read-only:bg-teal-400 placeholder-black/50`}
			/>

			{selectedOption && (
				<span
					className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 right-5 cursor-pointer"
					onClick={handleReset}
				>
					<RxCrossCircled className="text-2xl hover:text-black/50" />
				</span>
			)}
		</div>
	);
};

export default SkillInput;
