import { useQuery } from '@tanstack/react-query';

import { getTrendingMediaByType } from '../../requests';
import { MediaType } from '../../types';

export const useTrendingMediaByType = (
    mediaType: MediaType = MediaType.MOVIE
) => {
    return useQuery({
        queryKey: ['trending-media', mediaType],
        queryFn: async () => {
            const response = await getTrendingMediaByType(mediaType);
            return response.data.results;
        },
    });
};
