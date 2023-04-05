import { useQuery } from '@tanstack/react-query';

import { getLatestMovies } from '../../requests';

export const useLatestMovies = () => {
    return useQuery({
        queryKey: ['latest-movies'],
        queryFn: async () => {
            const response = await getLatestMovies();
            return response.data.results;
        },
    });
};
