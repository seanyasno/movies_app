import { useQuery } from '@tanstack/react-query';

import { getTrendingMediaByType } from '../../requests';

export const useTrendingMovies = () => {
    return useQuery({
        queryKey: ['movies'],
        queryFn: async () => {
            const response = await getTrendingMediaByType();
            return response.data.results;
        },
    });
};
