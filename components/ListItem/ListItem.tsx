import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import axios from 'axios';
import debounce from '../utils/debounce';
import useSkills from '../hooks/useSkills';

type ListItemProps = {
	defaultValue: string;
	index: number;
};

function ListItem({ defaultValue, index }: ListItemProps) {
	const { removeElement, nextToFill, addElement } = useSkills();
	const [options, setOptions] = useState<string[] | null>(null);
	const [selectedOption, setSelectedOption] = useState<string | null>(
		defaultValue
	);
	const [inputValue, setInputValue] = useState(defaultValue);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const listItemRef = useRef<HTMLDivElement | null>(null);

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

	const handleDocumentClick = (e) => {
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

	const debouncedFetchOptions = useCallback(
		debounce((query: string) => fetchOptions(query), 300),
		[]
	);

	const filterOptions = () => {
		return options?.filter((option) =>
			option.toLowerCase().includes(inputValue.toLowerCase())
		);
	};

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
			{isDropdownOpen && inputValue.length === 0 && (
				<div className="absolute z-10 top-11 left-0 w-full border bg-white rounded-lg mt-2 capitalize">
					<div
						onClick={() => {
							setIsDropdownOpen(false);
						}}
						className="px-4 py-2 text-black/50 hover:bg-gray-100 cursor-pointer"
					>
						Type to search
					</div>
				</div>
			)}
			{isDropdownOpen && inputValue.length > 0 && (
				<div className="absolute max-h-[150px]  overflow-y-scroll z-10 top-12 left-0 w-full border bg-white rounded-lg mt-2 capitalize">
					{filterOptions()?.map((option) => (
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
		</div>
	);
}

export default ListItem;
