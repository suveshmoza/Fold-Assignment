'use client';
import { ReactNode, createContext, useState } from 'react';
import { moveEmptySkillsToLast } from '../utils/sort';

type Skills = {
	title: string;
	items: string[];
}[];

const initialSkills: Skills = [
	{ title: 'group 1', items: ['TypeScript', '', '', '', ''] },
	{
		title: 'group 2',
		items: ['', '', '', '', ''],
	},
];

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
	const [skills, setSkills] = useState(initialSkills);
	const [nextToFill, setNextToFill] = useState(2);

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
				setNextToFill((prev) => prev - 1);
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
