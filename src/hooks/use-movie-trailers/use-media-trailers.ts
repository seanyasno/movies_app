import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getMediaTrailers } from '../../requests';
import { MediaType } from '../../types';

export const useMediaTrailers = (
    mediaId: number,
    mediaType: MediaType,
    options?: Omit<UseQueryOptions<any[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<any[]>(
        ['media-trailers', mediaId],
        async () => {
            if (mediaType === MediaType.PERSON) {
                return [];
            }

            const response = await getMediaTrailers(mediaId, mediaType);
            return response.data.results;
        },
        options
    );
};
