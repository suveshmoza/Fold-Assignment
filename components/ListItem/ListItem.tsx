'use client';
import AsyncCreatableSelect from 'react-select/async-creatable';

// const filterColors = (inputValue: string) => {
// 	return colourOptions.filter((i) =>
// 		i.label.toLowerCase().includes(inputValue.toLowerCase())
// 	);
// };

// const promiseOptions = (inputValue: string) =>
// 	new Promise<ColourOption[]>((resolve) => {
// 		setTimeout(() => {
// 			resolve(filterColors(inputValue));
// 		}, 1000);
// 	});

function ListItem() {
	return (
		<AsyncCreatableSelect
			cacheOptions
			defaultOptions
			styles={{
				control: (styles) => ({
					...styles,
					backgroundColor: 'rgb(45 212 191)',
				}),
			}}
			// loadOptions={promiseOptions}
			className="text-black bg-white"
		/>
	);
}

export default ListItem;
