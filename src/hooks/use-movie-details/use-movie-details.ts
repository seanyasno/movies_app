import { useQuery } from '@tanstack/react-query';
import { isNumber } from 'lodash';

import { getMovieDetails } from '../../requests';

export const useMovieDetails = (movieId?: number) => {
    return useQuery(['movieDetails', movieId], async () => {
        if (!isNumber(movieId)) {
            return;
        }

        const response = await getMovieDetails(movieId);
        return response.data;
    });
};
