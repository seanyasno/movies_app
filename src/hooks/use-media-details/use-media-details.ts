import { useQuery } from '@tanstack/react-query';

import { getMediaDetailsByType } from '../../requests';
import { MediaType } from '../../types';

export const useMediaDetails = (mediaId: number, mediaType: MediaType) => {
    return useQuery(['mediaDetails', mediaId], async () => {
        const response = await getMediaDetailsByType(mediaId, mediaType);
        return response.data;
    });
};
