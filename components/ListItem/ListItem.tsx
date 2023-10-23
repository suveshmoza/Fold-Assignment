'use client';
import React, { useState, useEffect, useRef } from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import axios from 'axios';
import debounce from '../utils/debounce';
import useSkills from '../hooks/useSkills';
import Dropdown from '../Dropdown/Dropdown';

type ListItemProps = {
	defaultValue: string;
	index: number;
};

function ListItem({ defaultValue, index }: ListItemProps) {
	const { removeElement, nextToFill, addElement } = useSkills();
	const [options, setOptions] = useState<string[]>([]);
	const [selectedOption, setSelectedOption] = useState<string | null>(
		defaultValue
	);
	const [inputValue, setInputValue] = useState(defaultValue);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const listItemRef = useRef<HTMLDivElement | null>(null);
	const [mounted, setMounted] = useState(false);

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

	const fetchOptions = async (query: string) => {
		query = query.toLowerCase();
		if (query.length === 0) return;
		try {
			const { data } = await axios.get(
				`https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&inname=${query}&site=stackoverflow`
			);

			if (data.items && Array.isArray(data.items)) {
				const namesArray = data.items.map(
					(item: { name: string }) => item.name
				);
				setOptions(namesArray);
			} else {
				console.log('Data format is not as expected.');
				setOptions([]);
			}
		} catch (error) {
			console.error('An error occurred:', error);
			setOptions([]);
		}
	};

	const debouncedFetchOptions = debounce(
		(query: string) => fetchOptions(query),
		300
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		setIsDropdownOpen(true);
		debouncedFetchOptions(e.target.value);
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
			<div className="relative flex">
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					readOnly={selectedOption !== null && index !== nextToFill}
					disabled={index > nextToFill}
					placeholder={`${index}. Add a Skill`}
					className={`w-full h-[50px] px-6 py-2 rounded-[4px] shadow-md capitalize ${
						!selectedOption && !(index > nextToFill) ? 'focus:bg-white' : ''
					} bg-teal-200 disabled:bg-gray-300 read-only:cursor-move disabled:cursor-default read-only:active:outline-none read-only:bg-teal-400 placeholder-black/50`}
				/>

				{selectedOption && (
					<span
						className="absolute  top-1/2 -translate-x-1/2 -translate-y-1/2 right-5 cursor-pointer"
						onClick={handleReset}
					>
						<RxCrossCircled className="text-2xl	hover:text-black/50 " />
					</span>
				)}
			</div>
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
