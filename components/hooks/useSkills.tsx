'use client';

import { useContext } from 'react';
import { SkillsContext } from '../context/SkillsContext';

export default function useSkills() {
	const context = useContext(SkillsContext);
	if (!context) {
		throw new Error('useSkills must be used within a SkillsContext');
	}
	return context;
}
