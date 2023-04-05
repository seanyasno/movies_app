import { useQuery } from '@tanstack/react-query';

import { getPopularMovies } from '../../requests';

export const usePopularMovies = () => {
    return useQuery({
        queryKey: ['popular-movies'],
        queryFn: async () => {
            const response = await getPopularMovies();
            return response.data.results;
        },
    });
};
