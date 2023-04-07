import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { isNumber } from 'lodash';

import { getMovieTrailers } from '../../requests';

export const useMovieTrailers = (
    movieId?: number,
    options?: Omit<UseQueryOptions<any[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<any[]>(
        ['movie-trailers', movieId],
        async () => {
            if (!isNumber(movieId)) {
                return;
            }

            const response = await getMovieTrailers(movieId);
            return response.data.results;
        },
        options
    );
};
