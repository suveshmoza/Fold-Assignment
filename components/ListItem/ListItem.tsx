'use client';
import React, { useState, useEffect, useRef } from 'react';
import useSkills from '../hooks/useSkills';
import Dropdown from '../Dropdown/Dropdown';
import SkillInput from '../SkillInput/SkillInput';
import useStackExchangeAPI from '../hooks/useStackExchangeAPI';

type ListItemProps = {
	defaultValue: string;
	index: number;
};

function ListItem({ defaultValue, index }: ListItemProps) {
	const { removeElement, nextToFill, addElement } = useSkills();
	const [selectedOption, setSelectedOption] = useState<string | null>(
		defaultValue
	);
	const [inputValue, setInputValue] = useState(defaultValue);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const listItemRef = useRef<HTMLDivElement | null>(null);
	const [mounted, setMounted] = useState(false);
	const { options, loading, fetchOptions } = useStackExchangeAPI();

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		function getValueWithIndex(inputValue: string) {
			return `${index}. ${inputValue}`;
		}
		if (defaultValue.length > 0) {
			setInputValue(getValueWithIndex(defaultValue));
			setSelectedOption(getValueWithIndex(defaultValue));
		}
		document.addEventListener('click', handleDocumentClick);
		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, [defaultValue, index]);

	const handleDocumentClick = (e: any) => {
		if (listItemRef.current && !listItemRef.current.contains(e.target)) {
			setIsDropdownOpen(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		setIsDropdownOpen(true);
		fetchOptions(e.target.value);
	};

	const handleOptionSelect = (option: string) => {
		setSelectedOption(option);
		setInputValue(option);
		addElement(index, option);
		setIsDropdownOpen(false);
	};

	const handleReset = () => {
		setSelectedOption(null);
		removeElement(index);
		setInputValue('');
	};

	if (!mounted) {
		return (
			<div className="w-full h-[50px] animate-pulse rounded-md bg-gray-300"></div>
		);
	}

	return (
		<div ref={listItemRef} className="relative">
			<SkillInput
				inputValue={inputValue}
				onInputChange={handleInputChange}
				selectedOption={selectedOption}
				index={index}
				nextToFill={nextToFill}
				handleReset={handleReset}
			/>
			<Dropdown
				isDropdownOpen={isDropdownOpen}
				inputValue={inputValue}
				options={options}
				handleOptionSelect={handleOptionSelect}
			/>
		</div>
	);
}

export default ListItem;
