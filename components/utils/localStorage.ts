type Skills = {
	title: string;
	items: string[];
}[];

const initialSkills = [
	{ title: 'group 1', items: ['', '', '', '', ''] },
	{
		title: 'group 2',
		items: ['', '', '', '', ''],
	},
];
export const getInitialSkillsFromLocalStorage = () => {
	const skillsData = global?.window?.localStorage.getItem('initialSkills');
	return skillsData ? JSON.parse(skillsData) : initialSkills;
};

export const getNextToFillFromLocalStorage = () => {
	const nextToFill = global?.window?.localStorage.getItem('nextToFill');
	return nextToFill ? parseInt(nextToFill) : 1;
};

export const saveSkillsToLocalStorage = (
	skills: Skills,
	nextToFill: number
) => {
	localStorage.setItem('initialSkills', JSON.stringify(skills));
	localStorage.setItem('nextToFill', nextToFill.toString());
};
