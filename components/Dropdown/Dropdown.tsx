import React, { useState } from 'react';
import DropdownOption from './DropdownOption';
import DropdownContainer from './DropdownContainer';

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
			<DropdownContainer>
				<DropdownOption option="Type to Search" />
			</DropdownContainer>
		);
	}

	return (
		<>
			{isDropdownOpen && inputValue.length > 0 && (
				<DropdownContainer>
					{options.length === 0 && (
						<DropdownOption
							handleOptionSelect={handleOptionSelect}
							customText="Create option"
							option={inputValue}
						/>
					)}
					{filterOptions()?.map((option: string) => (
						<DropdownOption
							key={option}
							handleOptionSelect={handleOptionSelect}
							option={option}
						/>
					))}
				</DropdownContainer>
			)}
		</>
	);
}

export default Dropdown;
