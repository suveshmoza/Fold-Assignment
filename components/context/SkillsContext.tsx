'use client';
import { ReactNode, createContext, useState } from 'react';
import { moveEmptySkillsToLast } from '../utils/sort';

type Skills = {
	title: string;
	items: string[];
}[];

const initialSkills: Skills = [
	{ title: 'group 1', items: ['JS', 'TS', 'Python', 'Solidity', 'Figma'] },
	{
		title: 'group 2',
		items: ['AI/ML', 'C++', '', '', ''],
	},
];

type SkillsContext = {
	skills: Skills;
	nextToFill: number;
	updateSkillPosition: (updatePositions: Skills) => void;
	// addElement: (index: number, value: string) => void;
	// removeElement: (index: number) => void;
};

export const SkillsContext = createContext<SkillsContext | null>(null);

export default function SkillsContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [skills, setSkills] = useState(initialSkills);
	const [nextToFill, setNextToFill] = useState(8);
	console.log('INSIDE CONTEXT', skills);

	const updateSkillPosition = (updatedPositions: Skills) => {
		const sortedList = moveEmptySkillsToLast(updatedPositions);
		setSkills(sortedList);
	};

	return (
		<SkillsContext.Provider value={{ skills, nextToFill, updateSkillPosition }}>
			{children}
		</SkillsContext.Provider>
	);
}
