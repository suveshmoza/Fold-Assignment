import axios from 'axios';
import { useState } from 'react';
import debounce from '../utils/debounce';

const useStackExchangeAPI = () => {
	const [options, setOptions] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchOptions = async (query: string) => {
		query = query.toLowerCase();
		if (query.length === 0) return;

		try {
			setLoading(true);
			const { data } = await axios.get(
				`https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&inname=${query}&site=stackoverflow`
			);

			if (data.items && Array.isArray(data.items)) {
				const namesArray = data.items.map(
					(item: { name: string }) => item.name
				);
				setOptions(namesArray);
			} else {
				console.log('Data format is not as expected.');
				setOptions([]);
			}
		} catch (error) {
			console.error('An error occurred:', error);
			setOptions([]);
		} finally {
			setLoading(false);
		}
	};

	const debouncedFetchOptions = debounce((query) => fetchOptions(query), 300);

	return {
		options,
		loading,
		fetchOptions: debouncedFetchOptions,
	};
};

export default useStackExchangeAPI;
