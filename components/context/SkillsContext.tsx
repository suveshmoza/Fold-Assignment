'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';
import {
	getInitialSkillsFromLocalStorage,
	getNextToFillFromLocalStorage,
	saveSkillsToLocalStorage,
} from '../utils/localStorage';
import { moveEmptySkillsToLast } from '../utils/sort';

type Skills = {
	title: string;
	items: string[];
}[];

type SkillsContext = {
	skills: Skills;
	nextToFill: number;
	updateSkillPosition: (updatePositions: Skills) => void;
	addElement: (index: number, value: string) => void;
	removeElement: (index: number) => void;
};

export const SkillsContext = createContext<SkillsContext | null>(null);

export default function SkillsContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [skills, setSkills] = useState(getInitialSkillsFromLocalStorage());
	const [nextToFill, setNextToFill] = useState(getNextToFillFromLocalStorage());

	useEffect(() => {
		saveSkillsToLocalStorage(skills, nextToFill);
	}, [skills, nextToFill]);

	const updateSkillPosition = (updatedPositions: Skills) => {
		const sortedList = moveEmptySkillsToLast(updatedPositions);
		setSkills(sortedList);
	};

	const removeElement = (index: number) => {
		if (index >= 1 && index <= 10) {
			const groupIndex = index <= 5 ? 0 : 1;
			const itemIndex = index <= 5 ? index - 1 : index - 6;
			if (
				groupIndex < skills.length &&
				itemIndex < skills[groupIndex].items.length
			) {
				const updatedSkills = [...skills];
				updatedSkills[groupIndex].items[itemIndex] = '';
				setSkills(moveEmptySkillsToLast(updatedSkills));
				setNextToFill((prev) => Math.max(prev - 1, 1));
			}
		}
	};

	const addElement = (index: number, value: string) => {
		if (index >= 1 && index <= 10) {
			const groupIndex = index <= 5 ? 0 : 1;
			const itemIndex = index <= 5 ? index - 1 : index - 6;
			if (
				groupIndex < skills.length &&
				itemIndex < skills[groupIndex].items.length
			) {
				const updatedSkills = [...skills];
				updatedSkills[groupIndex].items[itemIndex] = value;
				setSkills(updatedSkills);
				setNextToFill((prev) => prev + 1);
			}
		}
	};

	return (
		<SkillsContext.Provider
			value={{
				skills,
				nextToFill,
				updateSkillPosition,
				removeElement,
				addElement,
			}}
		>
			{children}
		</SkillsContext.Provider>
	);
}
