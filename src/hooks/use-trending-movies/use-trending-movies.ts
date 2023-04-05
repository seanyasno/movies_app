import { useQuery } from '@tanstack/react-query';

import { getTrendingMovies } from '../../requests';

export const useTrendingMovies = () => {
    return useQuery({
        queryKey: ['movies'],
        queryFn: async () => {
            const response = await getTrendingMovies();
            return response.data.results;
        },
    });
};
