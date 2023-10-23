import React, { useState } from 'react';

type DropdownPros = {
	isDropdownOpen: boolean;
	inputValue: string;
	options: string[];
	handleOptionSelect: (option: string) => void;
};

function Dropdown({
	isDropdownOpen,
	options,
	inputValue,
	handleOptionSelect,
}: DropdownPros) {
	function filterOptions() {
		return options?.filter((option) =>
			option.toLowerCase().includes(inputValue.toLowerCase())
		);
	}

	if (inputValue.length === 0 && isDropdownOpen) {
		return (
			<div className="absolute z-10 top-11 left-0 w-full border bg-white rounded-lg mt-2 capitalize">
				<div className="px-4 py-2 text-black/50 hover:bg-gray-100 cursor-pointer">
					Type to search
				</div>
			</div>
		);
	}

	return (
		<>
			{isDropdownOpen && inputValue.length > 0 && (
				<div className="absolute max-h-[150px]  overflow-y-scroll z-10 top-12 left-0 w-full border bg-white rounded-lg mt-2 capitalize">
					{options.length === 0 && (
						<div
							onClick={() => handleOptionSelect(inputValue)}
							className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
						>
							Create option {`"${inputValue}"`}
						</div>
					)}
					{filterOptions()?.map((option: string) => (
						<div
							key={option}
							onClick={() => handleOptionSelect(option)}
							className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
						>
							{option}
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default Dropdown;
