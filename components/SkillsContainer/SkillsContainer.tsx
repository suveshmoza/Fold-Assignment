import DragNDrop from '../DragNDrop/DragNDrop';

function SkillsContainer() {
	return (
		<div className="w-full bg-white shadow-md rounded-md px-8 py-6 pb-10 ">
			<div>
				<p className="text-gray-500">
					The skills you mention here will help hackathon organizers in
					assessing you as a potential participant.
				</p>
				<DragNDrop />
			</div>
		</div>
	);
}

export default SkillsContainer;
