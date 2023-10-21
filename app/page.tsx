import SkillsContainer from '@/components/SkillsContainer/SkillsContainer';

export default function Home() {
	return (
		<div className="px-12 py-8 flex flex-col justify-start items-start">
			<ul className="list-disc list-inside mb-4 font-medium">
				<li>Things you&apos;re good at!</li>
			</ul>
			<SkillsContainer />
		</div>
	);
}
