import React, { ReactNode } from 'react';

function DropdownContainer({ children }: { children: ReactNode }) {
	return (
		<div className="absolute max-h-[150px]  overflow-y-auto z-10 top-12 left-0 w-full border bg-white rounded-lg mt-2 ">
			{children}
		</div>
	);
}

export default DropdownContainer;
