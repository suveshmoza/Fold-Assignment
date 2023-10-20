import Image from 'next/image';

export default function Home() {
	return (
		<div className="px-12 py-8 flex flex-col justify-start items-start">
			<ul className="list-disc list-inside mb-4 font-medium">
				<li>Things you&apos;re good at!</li>
			</ul>

			<div className="w-full bg-white shadow-md rounded-md px-8 py-6 pb-10 ">
				<div>
					<p className="text-gray-500">
						The skills you mention here will help hackathon organizers in
						assessing you as a potential participant.
					</p>
					<div className="mt-10">
						<ul className="grid grid-cols-1  md:grid-cols-2 gap-4">
							<li className="w-full h-[50px] rounded  bg-teal-400">
								1. JavaScript
							</li>
							<li className="w-full h-[50px] rounded  bg-teal-400">
								1. JavaScript
							</li>
							<li className="w-full h-[50px] rounded  bg-teal-400">
								1. JavaScript
							</li>
							<li className="w-full h-[50px] rounded  bg-teal-400">
								1. JavaScript
							</li>
							<li className="w-full h-[50px] rounded  bg-teal-400">
								1. JavaScript
							</li>
							<li className="w-full h-[50px] rounded  bg-teal-400">
								1. JavaScript
							</li>
							<li className="w-full h-[50px] rounded  bg-teal-400">
								1. JavaScript
							</li>
							<li className="w-full h-[50px] rounded  bg-teal-400">
								1. JavaScript
							</li>
							<li className="w-full h-[50px] rounded  bg-teal-400">
								1. JavaScript
							</li>
							<li className="w-full h-[50px] rounded  bg-teal-400">
								1. JavaScript
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
